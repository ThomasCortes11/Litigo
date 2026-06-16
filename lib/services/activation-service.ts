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
    include: { affiliate: true },
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
    await activateAffiliate(payment.affiliateId, payment.id);
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

async function activateAffiliate(affiliateId: string, paymentId: string) {
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

  const membership = await prisma.membership.create({
    data: {
      affiliateId: affiliate.id,
      value: payment?.amount ?? 0,
      endDate,
      status: 'ACTIVE',
    },
  });

  await prisma.payment.update({
    where: { id: paymentId },
    data: { membershipId: membership.id },
  });

  await prisma.affiliate.update({
    where: { id: affiliate.id },
    data: { status: 'ACTIVE', affiliateCode },
  });

  await logAudit({
    action: 'AFFILIATE_ACTIVATED',
    entityType: 'Affiliate',
    entityId: affiliate.id,
    metadata: { affiliateCode, membershipId: membership.id },
  });

  await sendAffiliateWelcomeEmail({
    to: affiliate.email,
    fullName: affiliate.fullName,
    affiliateCode,
    membershipEndDate: endDate,
  });
}
