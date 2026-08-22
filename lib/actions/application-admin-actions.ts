'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logAudit } from '@/lib/audit';
import { transitionApplicationStatus } from '@/lib/services/application-service';
import { applicationStatusTransitionSchema } from '@/lib/validations/application';
import { sendApplicationApprovedEmail, sendApplicationInformationEmail, sendApplicationRejectedEmail } from '@/lib/email';

export interface ApplicationAdminActionResult { success: boolean; error?: string }

async function requireReviewer() {
  const session = await auth();
  const role = session?.user?.role;
  if (!session?.user || !['SUPERADMIN', 'ADMIN', 'REVIEWER', 'ANALYST'].includes(role ?? '')) throw new Error('No autorizado');
  return session.user;
}

export async function reviewApplication(input: unknown): Promise<ApplicationAdminActionResult> {
  try {
    const user = await requireReviewer();
    const parsed = applicationStatusTransitionSchema.safeParse(input);
    if (!parsed.success) return { success: false, error: 'Datos de evaluación inválidos.' };
    const data = parsed.data;
    if (data.nextStatus === 'AWAITING_INFORMATION' && !data.informationRequested) return { success: false, error: 'Indica qué información necesita el equipo.' };
    if (data.nextStatus === 'REJECTED' && !data.rejectionReason) return { success: false, error: 'Indica el motivo interno del rechazo.' };

    const current = await prisma.application.findUnique({ where: { id: data.applicationId }, select: { status: true } });
    if (!current) return { success: false, error: 'Solicitud no encontrada.' };
    const application = await transitionApplicationStatus(data.applicationId, data.nextStatus, { informationRequested: data.informationRequested, rejectionReason: data.rejectionReason });

    await prisma.applicationEvaluation.create({
      data: {
        applicationId: application.id,
        reviewerId: user.id,
        complexity: data.complexity,
        internalNotes: data.internalNotes,
        recommendation: data.nextStatus === 'APPROVED' ? 'APPROVE' : data.nextStatus === 'REJECTED' ? 'REJECT' : data.nextStatus === 'AWAITING_INFORMATION' ? 'REQUEST_INFORMATION' : 'PENDING',
      },
    });
    await logAudit({ actorId: user.id, action: 'APPLICATION_STATUS_CHANGED', entityType: 'Application', entityId: application.id, metadata: { previousStatus: current.status, newStatus: application.status } });
    const recipient = await prisma.affiliate.findUnique({ where: { id: application.affiliateId }, select: { email: true, fullName: true } });
    if (recipient) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
      if (data.nextStatus === 'APPROVED') {
        try {
          await sendApplicationApprovedEmail({ to: recipient.email, fullName: recipient.fullName });
          console.log('[admin] Email de aprobacion enviado a:', recipient.email);
        } catch (e) {
          console.error('[admin] Error enviando email de aprobacion:', e);
        }
      }
      if (data.nextStatus === 'AWAITING_INFORMATION') void sendApplicationInformationEmail({ to: recipient.email, fullName: recipient.fullName, url: `${baseUrl}/afiliacion/perfilamiento?token=${(await prisma.application.findUnique({ where: { id: application.id }, select: { accessToken: true } }))?.accessToken}`, detail: data.informationRequested });
      if (data.nextStatus === 'REJECTED') void sendApplicationRejectedEmail({ to: recipient.email, fullName: recipient.fullName });
    }
    revalidatePath('/admin');
    revalidatePath('/admin/afiliados');
    revalidatePath(`/admin/afiliados/${application.affiliateId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'No fue posible actualizar la solicitud.' };
  }
}
