'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logAudit } from '@/lib/audit';
import { updateAffiliateSchema, affiliateStatusSchema } from '@/lib/validations/affiliate';

export interface AdminActionResult {
  success: boolean;
  error?: string;
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error('No autenticado');
  return session.user;
}

export async function updateAffiliateStatus(input: unknown): Promise<AdminActionResult> {
  const user = await requireAdmin();
  const parsed = affiliateStatusSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: 'Datos invalidos' };

  const affiliate = await prisma.affiliate.update({
    where: { id: parsed.data.id },
    data: { status: parsed.data.status },
  });

  await logAudit({
    actorId: user.id,
    action: 'AFFILIATE_STATUS_CHANGED',
    entityType: 'Affiliate',
    entityId: affiliate.id,
    metadata: { newStatus: parsed.data.status },
  });

  revalidatePath('/admin/afiliados');
  revalidatePath(`/admin/afiliados/${affiliate.id}`);

  return { success: true };
}

export async function updateAffiliateDetails(input: unknown): Promise<AdminActionResult> {
  const user = await requireAdmin();
  const parsed = updateAffiliateSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: 'Datos invalidos' };

  const affiliate = await prisma.affiliate.update({
    where: { id: parsed.data.id },
    data: {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      city: parsed.data.city,
    },
  });

  await logAudit({
    actorId: user.id,
    action: 'AFFILIATE_UPDATED',
    entityType: 'Affiliate',
    entityId: affiliate.id,
  });

  revalidatePath(`/admin/afiliados/${affiliate.id}`);

  return { success: true };
}

export async function softDeleteAffiliate(id: string): Promise<AdminActionResult> {
  const user = await requireAdmin();

  await prisma.affiliate.update({
    where: { id },
    data: { deletedAt: new Date(), status: 'INACTIVE' },
  });

  await logAudit({
    actorId: user.id,
    action: 'AFFILIATE_DELETED',
    entityType: 'Affiliate',
    entityId: id,
  });

  revalidatePath('/admin/afiliados');

  return { success: true };
}
