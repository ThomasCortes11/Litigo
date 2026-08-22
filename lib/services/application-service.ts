import { prisma } from '@/lib/prisma';
import type { ApplicationStatus } from '@prisma/client';

const transitions: Record<ApplicationStatus, ApplicationStatus[]> = {
  DRAFT: ['SUBMITTED'],
  SUBMITTED: ['UNDER_REVIEW', 'APPROVED', 'REJECTED', 'AWAITING_INFORMATION'],
  UNDER_REVIEW: ['INITIAL_CONSULTATION', 'AWAITING_INFORMATION', 'APPROVED', 'REJECTED'],
  INITIAL_CONSULTATION: ['UNDER_REVIEW', 'AWAITING_INFORMATION', 'APPROVED', 'REJECTED'],
  AWAITING_INFORMATION: ['UNDER_REVIEW'],
  APPROVED: ['PAYMENT_PENDING'],
  REJECTED: [],
  PAYMENT_PENDING: ['ACTIVE', 'PAYMENT_PAST_DUE', 'CANCELLED'],
  ACTIVE: ['PAYMENT_PAST_DUE', 'CANCELLED'],
  PAYMENT_PAST_DUE: ['ACTIVE', 'CANCELLED'],
  CANCELLED: [],
};

export function canTransitionApplication(from: ApplicationStatus, to: ApplicationStatus) {
  return transitions[from].includes(to);
}

export async function transitionApplicationStatus(
  applicationId: string,
  nextStatus: ApplicationStatus,
  data: { informationRequested?: string | null; rejectionReason?: string | null } = {},
) {
  return prisma.$transaction(async (tx) => {
    const application = await tx.application.findUnique({ where: { id: applicationId } });
    if (!application) throw new Error('Solicitud no encontrada');
    if (!canTransitionApplication(application.status, nextStatus)) {
      throw new Error(`Transición inválida: ${application.status} -> ${nextStatus}`);
    }

    return tx.application.update({
      where: { id: applicationId },
      data: {
        status: nextStatus,
        reviewedAt: nextStatus === 'UNDER_REVIEW' ? null : new Date(),
        informationRequested: data.informationRequested ?? null,
        rejectionReason: data.rejectionReason ?? null,
      },
    });
  });
}
