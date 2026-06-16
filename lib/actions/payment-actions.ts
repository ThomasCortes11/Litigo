'use server';

import { prisma } from '@/lib/prisma';
import { buildCheckoutUrl, fetchWompiTransaction } from '@/lib/wompi';
import { processWompiTransaction } from '@/lib/services/activation-service';

export interface PaymentStatusResult {
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'ERROR' | 'VOIDED' | 'NOT_FOUND';
  affiliateCode?: string | null;
}

/**
 * Consulta el estado actual de un pago por referencia. Si esta PENDING y
 * ya tiene transactionId, reconcilia contra la API de Wompi directamente
 * (cubre el caso en que el webhook se demore o falle).
 */
export async function checkPaymentStatus(reference: string): Promise<PaymentStatusResult> {
  const payment = await prisma.payment.findUnique({
    where: { reference },
    include: { affiliate: true },
  });

  if (!payment) return { status: 'NOT_FOUND' };

  if (payment.status === 'PENDING' && payment.wompiTransactionId) {
    try {
      const transaction = await fetchWompiTransaction(payment.wompiTransactionId);
      await processWompiTransaction(transaction);
      const refreshed = await prisma.payment.findUnique({ where: { reference }, include: { affiliate: true } });
      return {
        status: refreshed?.status ?? payment.status,
        affiliateCode: refreshed?.affiliate.affiliateCode,
      };
    } catch (error) {
      console.error('[payment-actions] No se pudo reconciliar contra Wompi:', error);
    }
  }

  return { status: payment.status, affiliateCode: payment.affiliate.affiliateCode };
}

/**
 * Reintento de pago: genera una nueva URL de checkout para una afiliacion
 * que sigue PENDIENTE (por ejemplo, si el usuario cerro la ventana de Wompi).
 */
export async function retryPayment(reference: string): Promise<{ checkoutUrl?: string; error?: string }> {
  const payment = await prisma.payment.findUnique({ where: { reference } });
  if (!payment) return { error: 'No se encontro la orden de pago.' };
  if (payment.status === 'APPROVED') return { error: 'Este pago ya fue aprobado.' };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const checkoutUrl = buildCheckoutUrl({
    reference: payment.reference,
    amountInCents: Math.round(Number(payment.amount) * 100),
    currency: payment.currency,
    redirectUrl: `${appUrl}/afiliacion/confirmacion?ref=${payment.reference}`,
  });

  return { checkoutUrl };
}
