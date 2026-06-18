import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  accent?: boolean;
}

export function StatsCard({ label, value, icon: Icon, trend, trendPositive, accent }: StatsCardProps) {
  return (
    <Card className={cn('overflow-hidden', accent && 'border-gold/40')}>
      <div className={cn('h-1 w-full', accent ? 'bg-gold' : 'bg-transparent')} />
      <CardContent className="flex items-start justify-between p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate">{label}</p>
          <p className="mt-2 font-display text-3xl font-semibold text-ink">{value}</p>
          {trend && (
            <p className={cn('mt-1 text-xs font-medium', trendPositive ? 'text-success' : 'text-slate')}>
              {trend}
            </p>
          )}
        </div>
        <div className={cn('rounded-lg p-3', accent ? 'bg-gold/15' : 'bg-ink/5')}>
          <Icon className={cn('h-5 w-5', accent ? 'text-gold-dark' : 'text-slate')} />
        </div>
      </CardContent>
    </Card>
  );
}
