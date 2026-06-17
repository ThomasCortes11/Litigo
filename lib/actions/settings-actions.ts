'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logAudit } from '@/lib/audit';
import { settingsUpdateSchema, legalDocumentUpdateSchema } from '@/lib/validations/settings';

export interface SettingsActionState {
  success: boolean;
  error?: string;
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error('No autenticado');
  return session.user;
}

export async function updateSettingsAction(
  _prevState: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const user = await requireAdmin();

  const parsed = settingsUpdateSchema.safeParse({
    company_name: formData.get('company_name'),
    company_nit: formData.get('company_nit'),
    membership_price: formData.get('membership_price'),
    support_email: formData.get('support_email'),
    support_phone: formData.get('support_phone'),
  });

  if (!parsed.success) {
    return { success: false, error: 'Revisa los datos del formulario.' };
  }

  await Promise.all(
    Object.entries(parsed.data).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      }),
    ),
  );

  await logAudit({ actorId: user.id, action: 'SETTINGS_UPDATED', entityType: 'Setting' });

  revalidatePath('/admin/configuracion');

  return { success: true };
}

export async function updateLegalDocumentAction(
  _prevState: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const user = await requireAdmin();

  const parsed = legalDocumentUpdateSchema.safeParse({
    type: formData.get('type'),
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!parsed.success) {
    return { success: false, error: 'Revisa el contenido del documento.' };
  }

  const current = await prisma.legalDocument.findFirst({
    where: { type: parsed.data.type, isActive: true },
  });

  await prisma.$transaction(async (tx) => {
    if (current) {
      await tx.legalDocument.update({ where: { id: current.id }, data: { isActive: false } });
    }
    await tx.legalDocument.create({
      data: {
        type: parsed.data.type,
        title: parsed.data.title,
        content: parsed.data.content,
        version: (current?.version ?? 0) + 1,
        isActive: true,
      },
    });
  });

  await logAudit({
    actorId: user.id,
    action: 'LEGAL_DOCUMENT_UPDATED',
    entityType: 'LegalDocument',
    metadata: { type: parsed.data.type },
  });

  revalidatePath('/admin/configuracion');
  revalidatePath('/terminos-y-condiciones');
  revalidatePath('/contrato-afiliacion');
  revalidatePath('/politica-tratamiento-datos');

  return { success: true };
}
