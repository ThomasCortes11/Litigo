'use server';

import { prisma } from '@/lib/prisma';
import { buildCheckoutUrl } from '@/lib/wompi';
import { generatePaymentReference } from '@/lib/utils';

export interface PaymentStatusResult {
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'ERROR' | 'VOIDED' | 'NOT_FOUND';
  affiliateCode?: string | null;
}

export async function initiateMembershipCheckout(token: string): Promise<{ checkoutUrl?: string; error?: string }> {
  if (!/^[0-9a-f-]{36}$/i.test(token)) return { error: 'Solicitud no válida.' };

  const application = await prisma.application.findUnique({
    where: { accessToken: token },
    include: { affiliate: { include: { memberships: { where: { status: 'ACTIVE' }, take: 1 } } } },
  });
  if (!application) return { error: 'Solicitud no encontrada.' };
  if (application.status !== 'APPROVED') return { error: 'La solicitud aún no está aprobada para activar una membresía.' };
  if (application.affiliate.memberships.length > 0) return { error: 'Ya existe una membresía activa.' };

  const plan = await prisma.membershipPlan.findFirst({ where: { status: 'ACTIVE' }, orderBy: { createdAt: 'asc' } });
  if (!plan) return { error: 'No hay un plan de membresía disponible.' };

  const reference = generatePaymentReference();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const checkoutUrl = buildCheckoutUrl({
    reference,
    amountInCents: Math.round(Number(plan.monthlyPrice) * 100),
    currency: 'COP',
    redirectUrl: `${appUrl}/afiliacion/confirmacion?ref=${reference}`,
    customerEmail: application.affiliate.email,
  });

  const changed = await prisma.$transaction(async (tx) => {
    const approved = await tx.application.updateMany({ where: { id: application.id, status: 'APPROVED' }, data: { status: 'PAYMENT_PENDING' } });
    if (approved.count !== 1) return false;
    await tx.payment.create({
      data: {
        affiliateId: application.affiliateId,
        applicationId: application.id,
        planId: plan.id,
        reference,
        amount: plan.monthlyPrice,
        currency: 'COP',
        status: 'PENDING',
      },
    });
    return true;
  });

  return changed ? { checkoutUrl } : { error: 'La solicitud cambió de estado. Actualiza la página e inténtalo de nuevo.' };
}

/**
 * Consulta el estado persistido. La activación nunca se reconcilia desde el
 * navegador: el webhook firmado de Wompi es la única fuente de verdad.
 */
export async function checkPaymentStatus(reference: string): Promise<PaymentStatusResult> {
  const payment = await prisma.payment.findUnique({
    where: { reference },
    include: { affiliate: true },
  });

  if (!payment) return { status: 'NOT_FOUND' };

  return { status: payment.status, affiliateCode: payment.affiliate.affiliateCode };
}

/**
 * Reintento de pago: genera una nueva URL de checkout para una afiliacion
 * que sigue PENDIENTE (por ejemplo, si el usuario cerro la ventana de Wompi).
 */
export async function retryPayment(reference: string): Promise<{ checkoutUrl?: string; error?: string }> {
  const payment = await prisma.payment.findUnique({ where: { reference }, include: { application: true } });
  if (!payment) return { error: 'No se encontro la orden de pago.' };
  if (payment.status === 'APPROVED') return { error: 'Este pago ya fue aprobado.' };
  if (!payment.application || payment.application.status !== 'PAYMENT_PENDING') return { error: 'Este pago no pertenece a una solicitud aprobada.' };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const checkoutUrl = buildCheckoutUrl({
    reference: payment.reference,
    amountInCents: Math.round(Number(payment.amount) * 100),
    currency: payment.currency,
    redirectUrl: `${appUrl}/afiliacion/confirmacion?ref=${payment.reference}`,
  });

  return { checkoutUrl };
}
