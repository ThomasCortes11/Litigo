import { prisma } from '@/lib/prisma';

interface AuditEntry {
  actorId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Record<string, unknown> | null;
  ipAddress?: string | null;
}

/**
 * Registra un evento de auditoria. Nunca debe lanzar: un fallo en el
 * logging no puede tumbar la operacion de negocio que lo origino.
 */
export async function logAudit(entry: AuditEntry): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: entry.actorId ?? null,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId ?? null,
        metadata: entry.metadata ? JSON.parse(JSON.stringify(entry.metadata)) : undefined,
        ipAddress: entry.ipAddress ?? null,
      },
    });
  } catch (error) {
    console.error('[audit] No se pudo registrar el evento de auditoria:', error);
  }
}
