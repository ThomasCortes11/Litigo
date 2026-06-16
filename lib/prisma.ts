import { PrismaClient } from '@prisma/client';

/**
 * Patron singleton para evitar agotar conexiones a la base de datos
 * durante hot-reload en desarrollo y en entornos serverless.
 */
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
