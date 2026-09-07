import { z } from 'zod';

export const legalAreas = [
  'LABORAL',
  'CIVIL',
  'FAMILIA',
  'PENAL',
  'COMERCIAL',
  'ARRENDAMIENTOS',
  'TRANSITO',
  'ADMINISTRATIVO',
  'OTRA',
] as const;

export const applicationProfileSchema = z.object({
  token: z.string().uuid(),
  legalArea: z.enum(legalAreas),
  situationType: z.string().trim().min(2).max(160),
  hasProcess: z.enum(['YES', 'NO', 'UNKNOWN']),
  hasDeadline: z.enum(['YES', 'NO', 'UNKNOWN']),
  nearestDate: z.string().trim().max(40).optional(),
  hasLawyer: z.enum(['YES', 'NO', 'PREVIOUSLY']),
  peopleInvolved: z.coerce.number().int().min(1).max(100),
  availableDocuments: z.enum(['YES', 'NO', 'UNKNOWN']),
  requestedHelp: z.string().trim().min(2).max(500),
  description: z.string().trim().min(1, 'Escribe al menos una palabra sobre tu caso.').max(5000),
  criminalSituation: z.string().trim().max(120).optional(),
  criminalRole: z.string().trim().max(80).optional(),
});

export type ApplicationProfileValues = z.infer<typeof applicationProfileSchema>;

export const applicationStatusTransitionSchema = z.object({
  applicationId: z.string().uuid(),
  nextStatus: z.enum([
    'UNDER_REVIEW',
    'INITIAL_CONSULTATION',
    'AWAITING_INFORMATION',
    'APPROVED',
    'REJECTED',
  ]),
  informationRequested: z.string().trim().max(2000).optional(),
  rejectionReason: z.string().trim().max(2000).optional(),
  complexity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  internalNotes: z.string().trim().max(5000).optional(),
});
