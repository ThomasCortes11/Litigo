'use server';

import { put } from '@vercel/blob';
import { headers } from 'next/headers';
import { Prisma } from '@prisma/client';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { prisma } from '@/lib/prisma';
import { logAudit } from '@/lib/audit';
import { rateLimit } from '@/lib/rate-limit';
import { applicationProfileSchema, type ApplicationProfileValues } from '@/lib/validations/application';

const allowedDocumentTypes = new Set(['application/pdf', 'image/jpeg', 'image/png']);
const maxDocumentSize = 10 * 1024 * 1024;

async function uploadDocumentLocally(file: File, applicationId: string) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const fileName = `${crypto.randomUUID()}-${safeName}`;
  const targetDir = path.join(process.cwd(), 'public', 'uploads', 'applications', applicationId);
  await mkdir(targetDir, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  const targetPath = path.join(targetDir, fileName);
  await writeFile(targetPath, bytes);

  return {
    fileName: safeName,
    blobPath: `/uploads/applications/${applicationId}/${fileName}`,
    contentType: file.type,
    size: file.size,
  };
}

export interface ApplicationActionState {
  success: boolean;
  error?: string;
  errorDetails?: string[];
  fieldErrors?: Partial<Record<keyof ApplicationProfileValues, string>>;
}

const fieldLabels: Partial<Record<keyof ApplicationProfileValues, string>> = {
  token: 'Enlace de la solicitud',
  legalArea: 'Área jurídica',
  situationType: 'Tipo de situación',
  hasProcess: 'Proceso actual',
  hasDeadline: 'Fecha límite o audiencia',
  nearestDate: 'Fecha más cercana',
  hasLawyer: 'Abogado actual',
  peopleInvolved: 'Personas o entidades involucradas',
  availableDocuments: 'Documentos disponibles',
  requestedHelp: 'Necesidad de asesoría',
  description: 'Descripción del caso',
  criminalSituation: 'Situación penal',
  criminalRole: 'Rol en la situación penal',
};

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
    const errorDetails = parsed.error.issues.map((issue) => {
      const key = issue.path[0] as keyof ApplicationProfileValues;
      return `${fieldLabels[key] ?? 'Campo del formulario'}: ${issue.message}`;
    });
    return { success: false, error: 'No se pudo enviar el perfilamiento porque hay respuestas incompletas o inválidas.', errorDetails, fieldErrors };
  }

  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const limited = rateLimit(`application-profile:${ip}`, 5, 10 * 60 * 1000);
  if (!limited.success) return { success: false, error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' };

  const data = parsed.data;
  let application;
  try {
    application = await prisma.application.findUnique({ where: { accessToken: data.token } });
  } catch (error) {
    console.error('[submitApplicationProfile] Error consultando la solicitud:', error);
    return { success: false, error: 'No se pudo consultar tu solicitud.', errorDetails: ['La base de datos no está disponible. Verifica que PostgreSQL/Docker esté iniciado y vuelve a intentarlo.'] };
  }

  if (!application || !['DRAFT', 'AWAITING_INFORMATION'].includes(application.status)) {
    return { success: false, error: 'No se pudo enviar el perfilamiento.', errorDetails: ['La solicitud no existe, ya fue enviada o ya no está disponible para edición.'] };
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
      return { success: false, error: 'No se pudo adjuntar el documento.', errorDetails: ['El archivo debe ser PDF, JPG o PNG y no superar 10 MB.'] };
    }

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const blob = await put(`applications/${application.id}/${crypto.randomUUID()}-${safeName}`, file, {
        access: 'public',
        addRandomSuffix: false,
      });
      uploadedDocument = { fileName: safeName, blobPath: blob.pathname, contentType: file.type, size: file.size };
    } else {
      uploadedDocument = await uploadDocumentLocally(file, application.id);
    }
  }

  try {
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
  } catch (error) {
    console.error('[submitApplicationProfile] Error guardando el perfilamiento:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { success: false, error: 'No se pudo guardar el perfilamiento.', errorDetails: ['La solicitud ya no existe. Regresa al inicio y solicita un nuevo enlace.'] };
      }
      if (error.code === 'P2002') {
        return { success: false, error: 'No se pudo guardar el perfilamiento.', errorDetails: ['Ya existe una respuesta o documento con estos datos. Recarga la página e inténtalo nuevamente.'] };
      }
    }
    return { success: false, error: 'No se pudo guardar el perfilamiento.', errorDetails: ['La base de datos rechazó el registro. Revisa que Docker/PostgreSQL esté activo y vuelve a intentarlo.'] };
  }

  await logAudit({ action: 'APPLICATION_SUBMITTED', entityType: 'Application', entityId: application.id, ipAddress: ip });
  return { success: true };
}
