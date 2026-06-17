import { Users, UserCheck, UserX, UserPlus, Wallet, TrendingUp } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { StatsCard } from '@/components/admin/stats-card';
import { formatCurrencyCOP } from '@/lib/utils';

export const metadata = { title: 'Panel | Litigo' };

async function getDashboardStats() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [total, active, inactive, recent, revenueResult, totalPayments, approvedPayments] = await Promise.all([
    prisma.affiliate.count({ where: { deletedAt: null } }),
    prisma.affiliate.count({ where: { status: 'ACTIVE', deletedAt: null } }),
    prisma.affiliate.count({ where: { status: { in: ['INACTIVE', 'SUSPENDED'] }, deletedAt: null } }),
    prisma.affiliate.count({ where: { createdAt: { gte: thirtyDaysAgo }, deletedAt: null } }),
    prisma.payment.aggregate({ where: { status: 'APPROVED' }, _sum: { amount: true } }),
    prisma.payment.count(),
    prisma.payment.count({ where: { status: 'APPROVED' } }),
  ]);

  const conversionRate = totalPayments > 0 ? (approvedPayments / totalPayments) * 100 : 0;

  return {
    total,
    active,
    inactive,
    recent,
    revenue: revenueResult._sum.amount ?? 0,
    conversionRate,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Panel general</h1>
      <p className="mt-1 text-sm text-slate">Resumen del estado de afiliaciones y pagos.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard label="Total afiliados" value={stats.total.toLocaleString('es-CO')} icon={Users} />
        <StatsCard label="Afiliados activos" value={stats.active.toLocaleString('es-CO')} icon={UserCheck} />
        <StatsCard label="Afiliados inactivos" value={stats.inactive.toLocaleString('es-CO')} icon={UserX} />
        <StatsCard label="Nuevos (30 dias)" value={stats.recent.toLocaleString('es-CO')} icon={UserPlus} />
        <StatsCard label="Ingresos totales" value={formatCurrencyCOP(Number(stats.revenue))} icon={Wallet} />
        <StatsCard label="Tasa de conversion" value={`${stats.conversionRate.toFixed(1)}%`} icon={TrendingUp} />
      </div>
    </div>
  );
}
