import { prisma } from '@/lib/prisma';
import { generateAffiliateCode } from '@/lib/utils';
import { sendAffiliateWelcomeEmail, sendPaymentFailedEmail } from '@/lib/email';
import { logAudit } from '@/lib/audit';
import type { WompiTransaction } from '@/lib/wompi';

const MEMBERSHIP_DURATION_DAYS = 30;

/**
 * Procesa el resultado de una transaccion de Wompi ya validada (firma
 * verificada por el caller) y aplica el efecto correspondiente:
 *  - APPROVED -> activa afiliado, crea membresia, envia correo, auditoria.
 *  - DECLINED/ERROR/VOIDED -> marca el pago, notifica al afiliado, auditoria.
 *  - PENDING -> solo actualiza el estado del pago, sin efectos colaterales.
 *
 * Es idempotente: si la transaccion ya fue procesada con ese estado, no
 * repite el correo ni crea una membresia duplicada (Wompi puede reenviar
 * el mismo evento varias veces).
 */
export async function processWompiTransaction(transaction: WompiTransaction) {
  const payment = await prisma.payment.findUnique({
    where: { reference: transaction.reference },
    include: { affiliate: true, application: true },
  });

  if (!payment) {
    console.error(`[activation] No existe pago con referencia ${transaction.reference}`);
    return;
  }

  // Idempotencia: si ya estaba en este mismo estado final, no repetir efectos.
  if (payment.status === transaction.status && payment.status !== 'PENDING') {
    return;
  }

  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: transaction.status,
      wompiTransactionId: transaction.id,
      paymentMethod: transaction.payment_method_type,
      rawResponse: transaction as unknown as object,
    },
  });

  if (transaction.status === 'APPROVED') {
    if (payment.application && payment.application.status !== 'PAYMENT_PENDING') {
      await logAudit({ action: 'PAYMENT_APPROVED_OUT_OF_FLOW', entityType: 'Payment', entityId: payment.id, metadata: { applicationStatus: payment.application.status } });
      return;
    }
    await activateAffiliate(payment.affiliateId, payment.id, payment.applicationId, payment.planId);
  } else if (['DECLINED', 'ERROR', 'VOIDED'].includes(transaction.status)) {
    await logAudit({
      action: 'PAYMENT_FAILED',
      entityType: 'Payment',
      entityId: payment.id,
      metadata: { status: transaction.status, transactionId: transaction.id },
    });

    await sendPaymentFailedEmail({
      to: payment.affiliate.email,
      fullName: payment.affiliate.fullName,
      reason: transaction.status,
    });
  }
}

async function activateAffiliate(affiliateId: string, paymentId: string, applicationId?: string | null, planId?: string | null) {
  const affiliate = await prisma.affiliate.findUnique({ where: { id: affiliateId } });
  if (!affiliate) return;

  // Idempotencia: si ya estaba activo y ya tiene codigo, no duplicar membresia.
  if (affiliate.status === 'ACTIVE' && affiliate.affiliateCode) {
    return;
  }

  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + MEMBERSHIP_DURATION_DAYS);

  const affiliateCode = affiliate.affiliateCode ?? generateAffiliateCode();

  const result = await prisma.$transaction(async (tx) => {
    const activeMembership = await tx.membership.findFirst({ where: { affiliateId: affiliate.id, status: 'ACTIVE' } });
    if (activeMembership) return { membership: activeMembership, activated: false };

    const membership = await tx.membership.create({
      data: { affiliateId: affiliate.id, planId: planId ?? undefined, value: payment?.amount ?? 0, endDate, status: 'ACTIVE' },
    });
    await tx.payment.update({ where: { id: paymentId }, data: { membershipId: membership.id } });
    await tx.affiliate.update({ where: { id: affiliate.id }, data: { status: 'ACTIVE', affiliateCode } });
    if (applicationId) await tx.application.update({ where: { id: applicationId }, data: { status: 'ACTIVE' } });
    return { membership, activated: true };
  });

  if (!result.activated) return;

  await logAudit({
    action: 'AFFILIATE_ACTIVATED',
    entityType: 'Affiliate',
    entityId: affiliate.id,
    metadata: { affiliateCode, membershipId: result.membership.id },
  });

  await sendAffiliateWelcomeEmail({
    to: affiliate.email,
    fullName: affiliate.fullName,
    affiliateCode,
    membershipEndDate: endDate,
  });
}
