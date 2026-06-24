'use server';

import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { affiliateFormSchema, type AffiliateFormValues } from '@/lib/validations/affiliate';
import { rateLimit } from '@/lib/rate-limit';
import { logAudit } from '@/lib/audit';
import { buildCheckoutUrl } from '@/lib/wompi';
import { generatePaymentReference } from '@/lib/utils';

export interface AffiliationActionState {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof AffiliateFormValues, string>>;
  checkoutUrl?: string;
}

const MEMBERSHIP_PRICE_FALLBACK_COP = 49900;

/**
 * Server Action principal del flujo publico de afiliacion.
 * Registro -> valida -> guarda afiliado PENDING -> crea orden de pago -> retorna URL de checkout Wompi.
 */
export async function submitAffiliation(
  _prevState: AffiliationActionState,
  formData: FormData,
): Promise<AffiliationActionState> {
  try {
  // Next.js 15: headers() es asincrono.
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  const limited = rateLimit(`affiliation:${ip}`, 5, 10 * 60 * 1000);
  if (!limited.success) {
    return { success: false, error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' };
  }

  const raw = {
    fullName: formData.get('fullName'),
    documentType: formData.get('documentType'),
    documentNumber: formData.get('documentNumber'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    city: formData.get('city'),
    acceptedContract: formData.get('acceptedContract') === 'on',
    acceptedTerms: formData.get('acceptedTerms') === 'on',
    acceptedDataPolicy: formData.get('acceptedDataPolicy') === 'on',
  };

  const parsed = affiliateFormSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof AffiliateFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof AffiliateFormValues;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { success: false, error: 'Revisa los datos del formulario.', fieldErrors };
  }

  const data = parsed.data;

  const existing = await prisma.affiliate.findUnique({ where: { documentNumber: data.documentNumber } });
  if (existing && existing.status === 'ACTIVE') {
    return {
      success: false,
      error: 'Este documento ya tiene una afiliacion activa. Si crees que es un error, contacta a soporte.',
    };
  }

  const now = new Date();

  const affiliate = existing
    ? await prisma.affiliate.update({
        where: { id: existing.id },
        data: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          city: data.city,
          documentType: data.documentType,
          status: 'PENDING',
          acceptedContractAt: now,
          acceptedTermsAt: now,
          acceptedDataPolicyAt: now,
        },
      })
    : await prisma.affiliate.create({
        data: {
          fullName: data.fullName,
          documentType: data.documentType,
          documentNumber: data.documentNumber,
          email: data.email,
          phone: data.phone,
          city: data.city,
          status: 'PENDING',
          acceptedContractAt: now,
          acceptedTermsAt: now,
          acceptedDataPolicyAt: now,
        },
      });

  await logAudit({
    action: existing ? 'AFFILIATE_REAPPLIED' : 'AFFILIATE_REGISTERED',
    entityType: 'Affiliate',
    entityId: affiliate.id,
    ipAddress: ip,
  });

  const priceSetting = await prisma.setting.findUnique({ where: { key: 'membership_price' } });
  const priceInCop = priceSetting ? parseInt(priceSetting.value, 10) : MEMBERSHIP_PRICE_FALLBACK_COP;
  const amountInCents = priceInCop * 100;
  const reference = generatePaymentReference();

  await prisma.payment.create({
    data: {
      affiliateId: affiliate.id,
      reference,
      amount: priceInCop,
      currency: 'COP',
      status: 'PENDING',
    },
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const checkoutUrl = buildCheckoutUrl({
    reference,
    amountInCents,
    currency: 'COP',
    redirectUrl: `${appUrl}/afiliacion/confirmacion?ref=${reference}`,
    customerEmail: data.email,
  });

  return { success: true, checkoutUrl };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[submitAffiliation] Error procesando afiliacion:', {
      message: errorMessage,
      stack: errorStack,
      formData: {
        email: String(formData.get('email') ?? ''),
        documentNumber: String(formData.get('documentNumber') ?? ''),
      },
    });

    return {
      success: false,
      error: 'Ocurrió un error al procesar tu afiliación. Por favor intenta de nuevo.',
    };
  }
}
