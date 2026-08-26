'use server';

import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { affiliateFormSchema, type AffiliateFormValues } from '@/lib/validations/affiliate';
import { rateLimit } from '@/lib/rate-limit';
import { logAudit } from '@/lib/audit';

export interface AffiliationActionState {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof AffiliateFormValues, string>>;
  applicationToken?: string;
}

/**
 * Captura inicial del interesado. El pago solo se habilita después de una
 * evaluación administrativa y una aprobación explícita en backend.
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

  const activeExisting = await prisma.affiliate.findFirst({
    where: {
      deletedAt: null,
      OR: [
        { documentNumber: data.documentNumber },
        { email: { equals: data.email, mode: 'insensitive' } },
      ],
    },
  });

  if (activeExisting) {
    return {
      success: false,
      error: 'Este documento o correo ya está asociado a una afiliación activa o pendiente.',
    };
  }

  const existing = await prisma.affiliate.findFirst({
    where: {
      documentNumber: data.documentNumber,
      OR: [{ deletedAt: { not: null } }, { email: { equals: data.email, mode: 'insensitive' } }],
    },
  });

  const now = new Date();

  const affiliate = await prisma.$transaction(async (tx) => {
    const savedAffiliate = existing
      ? await tx.affiliate.update({
          where: { id: existing.id },
          data: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            city: data.city,
            documentType: data.documentType,
            deletedAt: null,
            status: 'PENDING',
            acceptedContractAt: now,
            acceptedTermsAt: now,
            acceptedDataPolicyAt: now,
          },
        })
      : await tx.affiliate.create({
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

    await tx.application.upsert({
      where: { affiliateId: savedAffiliate.id },
      create: {
        affiliateId: savedAffiliate.id,
        status: 'DRAFT',
      },
      update: {
        status: 'DRAFT',
        submittedAt: null,
        informationRequested: null,
        rejectionReason: null,
      },
    });

    return savedAffiliate;
  });

  await logAudit({
    action: existing ? 'AFFILIATE_REAPPLIED' : 'AFFILIATE_REGISTERED',
    entityType: 'Affiliate',
    entityId: affiliate.id,
    ipAddress: ip,
  });

  const application = await prisma.application.findUnique({ where: { affiliateId: affiliate.id } });
  return { success: true, applicationToken: application?.accessToken };
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
