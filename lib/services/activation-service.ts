import { prisma } from '@/lib/prisma';
import { generateAffiliateCode } from '@/lib/utils';
import { sendAffiliateWelcomeEmail } from '@/lib/email';
import { logAudit } from '@/lib/audit';

const MEMBERSHIP_DURATION_DAYS = 30;

/**
 * Activa un afiliado manualmente (cuando confirma el pago por WhatsApp).
 * Crea la membresia, genera el codigo de afiliado y envia el correo de bienvenida.
 */
export async function activateAffiliate(affiliateId: string, paymentId: string, applicationId?: string | null, planId?: string | null) {
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
