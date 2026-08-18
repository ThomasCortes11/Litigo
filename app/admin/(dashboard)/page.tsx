import { Users, UserCheck, UserX, UserPlus, Wallet, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { StatsCard } from '@/components/admin/stats-card';
import { Badge } from '@/components/ui/badge';
import { formatCurrencyCOP, formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Panel',
  robots: { index: false, follow: false },
};

async function getDashboardStats() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [total, active, inactive, recent, revenueResult, totalPayments, approvedPayments, applicationGroups, latestAffiliates] =
    await Promise.all([
      prisma.affiliate.count({ where: { deletedAt: null } }),
      prisma.affiliate.count({ where: { status: 'ACTIVE', deletedAt: null } }),
      prisma.affiliate.count({ where: { status: { in: ['INACTIVE', 'SUSPENDED'] }, deletedAt: null } }),
      prisma.affiliate.count({ where: { createdAt: { gte: thirtyDaysAgo }, deletedAt: null } }),
      prisma.payment.aggregate({ where: { status: 'APPROVED' }, _sum: { amount: true } }),
      prisma.payment.count(),
      prisma.payment.count({ where: { status: 'APPROVED' } }),
      prisma.application.groupBy({ by: ['status'], _count: { _all: true } }),
      prisma.affiliate.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, fullName: true, city: true, status: true, createdAt: true },
      }),
    ]);

  const conversionRate = totalPayments > 0 ? (approvedPayments / totalPayments) * 100 : 0;

  const applicationCounts = Object.fromEntries(applicationGroups.map((group) => [group.status, group._count._all]));
  return { total, active, inactive, recent, revenue: revenueResult._sum.amount ?? 0, conversionRate, applicationCounts, latestAffiliates };
}

const statusVariant: Record<string, 'success' | 'warning' | 'default' | 'danger'> = {
  ACTIVE: 'success',
  PENDING: 'warning',
  INACTIVE: 'default',
  SUSPENDED: 'danger',
  SUBMITTED: 'warning',
  UNDER_REVIEW: 'warning',
  AWAITING_INFORMATION: 'warning',
  APPROVED: 'success',
  REJECTED: 'danger',
  PAYMENT_PENDING: 'warning',
};

const statusLabel: Record<string, string> = {
  ACTIVE: 'Activo',
  PENDING: 'Pendiente',
  INACTIVE: 'Inactivo',
  SUSPENDED: 'Suspendido',
  SUBMITTED: 'Nuevas',
  UNDER_REVIEW: 'En revisión',
  AWAITING_INFORMATION: 'Información pendiente',
  APPROVED: 'Aprobadas',
  REJECTED: 'No aprobadas',
  PAYMENT_PENDING: 'Pendientes de pago',
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink lg:text-[1.85rem]">Panel general</h1>
        <p className="mt-1 text-sm text-slate">Embudo de captación, revisión, aprobación y membresías activas.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard label="Solicitudes nuevas" value={(stats.applicationCounts.SUBMITTED ?? 0).toLocaleString('es-CO')} icon={UserPlus} accent />
        <StatsCard label="En revisión" value={(stats.applicationCounts.UNDER_REVIEW ?? 0).toLocaleString('es-CO')} icon={Users} />
        <StatsCard label="Pendientes de información" value={(stats.applicationCounts.AWAITING_INFORMATION ?? 0).toLocaleString('es-CO')} icon={UserX} />
        <StatsCard label="Aprobadas" value={(stats.applicationCounts.APPROVED ?? 0).toLocaleString('es-CO')} icon={UserCheck} accent />
        <StatsCard label="Membresías activas" value={stats.active.toLocaleString('es-CO')} icon={UserCheck} />
        <StatsCard label="Ingresos totales" value={formatCurrencyCOP(Number(stats.revenue))} icon={Wallet} accent />
        <StatsCard label="No aprobadas" value={(stats.applicationCounts.REJECTED ?? 0).toLocaleString('es-CO')} icon={UserX} />
        <StatsCard label="Pendientes de pago" value={(stats.applicationCounts.PAYMENT_PENDING ?? 0).toLocaleString('es-CO')} icon={Wallet} />
        <StatsCard label="Tasa de conversion" value={`${stats.conversionRate.toFixed(1)}%`} icon={TrendingUp} trendPositive={stats.conversionRate >= 50} />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">Ultimas afiliaciones</h2>
          <Link href="/admin/afiliados" className="text-sm font-medium text-gold-dark transition-colors duration-200 hover:text-gold">
            Ver todos
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/90 bg-white shadow-card">
          {stats.latestAffiliates.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate">Aun no hay afiliados registrados.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate">Nombre</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate">Ciudad</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate">Estado</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate">Registro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats.latestAffiliates.map((a) => (
                  <tr key={a.id} className="transition-colors hover:bg-paper/50">
                    <td className="px-5 py-4">
                      <Link href={`/admin/afiliados/${a.id}`} className="font-medium text-ink hover:text-gold-dark">
                        {a.fullName}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-slate">{a.city}</td>
                    <td className="px-5 py-4">
                      <Badge variant={statusVariant[a.status]}>{statusLabel[a.status]}</Badge>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate">{formatDate(a.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
