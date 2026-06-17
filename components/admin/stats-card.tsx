import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
}

export function StatsCard({ label, value, icon: Icon, trend, trendPositive }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate">{label}</p>
          <p className="mt-2 font-display text-3xl font-semibold text-ink">{value}</p>
          {trend && (
            <p className={cn('mt-1 text-xs font-medium', trendPositive ? 'text-success' : 'text-slate')}>{trend}</p>
          )}
        </div>
        <div className="rounded bg-gold/10 p-2.5">
          <Icon className="h-5 w-5 text-gold-dark" />
        </div>
      </CardContent>
    </Card>
  );
}
