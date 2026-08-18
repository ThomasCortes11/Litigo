'use server';

import { put } from '@vercel/blob';
import { headers } from 'next/headers';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { logAudit } from '@/lib/audit';
import { rateLimit } from '@/lib/rate-limit';
import { applicationProfileSchema, type ApplicationProfileValues } from '@/lib/validations/application';

const allowedDocumentTypes = new Set(['application/pdf', 'image/jpeg', 'image/png']);
const maxDocumentSize = 10 * 1024 * 1024;

export interface ApplicationActionState {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof ApplicationProfileValues, string>>;
}

export async function submitApplicationProfile(
  _prevState: ApplicationActionState,
  formData: FormData,
): Promise<ApplicationActionState> {
  const parsed = applicationProfileSchema.safeParse({
    token: formData.get('token'),
    legalArea: formData.get('legalArea'),
    situationType: formData.get('situationType'),
    hasProcess: formData.get('hasProcess'),
    hasDeadline: formData.get('hasDeadline'),
    nearestDate: formData.get('nearestDate') || undefined,
    hasLawyer: formData.get('hasLawyer'),
    peopleInvolved: formData.get('peopleInvolved'),
    availableDocuments: formData.get('availableDocuments'),
    requestedHelp: formData.get('requestedHelp'),
    description: formData.get('description'),
    criminalSituation: formData.get('criminalSituation') || undefined,
    criminalRole: formData.get('criminalRole') || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ApplicationProfileValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ApplicationProfileValues;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { success: false, error: 'Revisa las respuestas del perfilamiento.', fieldErrors };
  }

  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const limited = rateLimit(`application-profile:${ip}`, 5, 10 * 60 * 1000);
  if (!limited.success) return { success: false, error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' };

  const data = parsed.data;
  const application = await prisma.application.findUnique({ where: { accessToken: data.token } });
  if (!application || !['DRAFT', 'AWAITING_INFORMATION'].includes(application.status)) {
    return { success: false, error: 'Esta solicitud no está disponible para edición.' };
  }

  const answers = {
    situationType: data.situationType,
    hasProcess: data.hasProcess,
    hasDeadline: data.hasDeadline,
    nearestDate: data.nearestDate ?? null,
    hasLawyer: data.hasLawyer,
    peopleInvolved: data.peopleInvolved,
    availableDocuments: data.availableDocuments,
    requestedHelp: data.requestedHelp,
    description: data.description,
    ...(data.legalArea === 'PENAL' ? { criminalSituation: data.criminalSituation ?? null, criminalRole: data.criminalRole ?? null } : {}),
  };

  const file = formData.get('document');
  let uploadedDocument: { fileName: string; blobPath: string; contentType: string; size: number } | undefined;
  if (file instanceof File && file.size > 0) {
    if (!allowedDocumentTypes.has(file.type) || file.size > maxDocumentSize) {
      return { success: false, error: 'El documento debe ser PDF, JPG o PNG y no superar 10 MB.' };
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return { success: false, error: 'La carga de documentos no está disponible temporalmente.' };
    }
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const blob = await put(`applications/${application.id}/${crypto.randomUUID()}-${safeName}`, file, {
      access: 'public',
      addRandomSuffix: false,
    });
    uploadedDocument = { fileName: safeName, blobPath: blob.pathname, contentType: file.type, size: file.size };
  }

  await prisma.$transaction(async (tx) => {
    for (const [questionKey, answer] of Object.entries(answers)) {
      await tx.applicationAnswer.upsert({
        where: { applicationId_questionKey: { applicationId: application.id, questionKey } },
        create: { applicationId: application.id, questionKey, answer: answer === null ? Prisma.JsonNull : answer },
        update: { answer: answer === null ? Prisma.JsonNull : answer },
      });
    }

    if (uploadedDocument) {
      await tx.applicationDocument.create({ data: { applicationId: application.id, ...uploadedDocument } });
    }

    await tx.application.update({
      where: { id: application.id },
      data: { status: 'SUBMITTED', legalArea: data.legalArea, urgency: data.hasDeadline === 'YES' ? 'HIGH' : 'NORMAL', submittedAt: new Date(), informationRequested: null },
    });
  });

  await logAudit({ action: 'APPLICATION_SUBMITTED', entityType: 'Application', entityId: application.id, ipAddress: ip });
  return { success: true };
}
