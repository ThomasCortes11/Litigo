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

  const [total, active, inactive, recent, revenueResult, totalPayments, approvedPayments, latestAffiliates] =
    await Promise.all([
      prisma.affiliate.count({ where: { deletedAt: null } }),
      prisma.affiliate.count({ where: { status: 'ACTIVE', deletedAt: null } }),
      prisma.affiliate.count({ where: { status: { in: ['INACTIVE', 'SUSPENDED'] }, deletedAt: null } }),
      prisma.affiliate.count({ where: { createdAt: { gte: thirtyDaysAgo }, deletedAt: null } }),
      prisma.payment.aggregate({ where: { status: 'APPROVED' }, _sum: { amount: true } }),
      prisma.payment.count(),
      prisma.payment.count({ where: { status: 'APPROVED' } }),
      prisma.affiliate.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, fullName: true, city: true, status: true, createdAt: true },
      }),
    ]);

  const conversionRate = totalPayments > 0 ? (approvedPayments / totalPayments) * 100 : 0;

  return { total, active, inactive, recent, revenue: revenueResult._sum.amount ?? 0, conversionRate, latestAffiliates };
}

const statusVariant: Record<string, 'success' | 'warning' | 'default' | 'danger'> = {
  ACTIVE: 'success',
  PENDING: 'warning',
  INACTIVE: 'default',
  SUSPENDED: 'danger',
};

const statusLabel: Record<string, string> = {
  ACTIVE: 'Activo',
  PENDING: 'Pendiente',
  INACTIVE: 'Inactivo',
  SUSPENDED: 'Suspendido',
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Panel general</h1>
        <p className="mt-1 text-sm text-slate">Resumen en tiempo real de afiliaciones y pagos.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard label="Afiliados activos" value={stats.active.toLocaleString('es-CO')} icon={UserCheck} accent />
        <StatsCard label="Total afiliados" value={stats.total.toLocaleString('es-CO')} icon={Users} />
        <StatsCard label="Ingresos totales" value={formatCurrencyCOP(Number(stats.revenue))} icon={Wallet} accent />
        <StatsCard label="Afiliados inactivos" value={stats.inactive.toLocaleString('es-CO')} icon={UserX} />
        <StatsCard label="Nuevos (30 dias)" value={stats.recent.toLocaleString('es-CO')} icon={UserPlus} trendPositive />
        <StatsCard label="Tasa de conversion" value={`${stats.conversionRate.toFixed(1)}%`} icon={TrendingUp} trendPositive={stats.conversionRate >= 50} />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">Ultimas afiliaciones</h2>
          <Link href="/admin/afiliados" className="text-sm text-gold-dark hover:underline">
            Ver todos
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-white">
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
