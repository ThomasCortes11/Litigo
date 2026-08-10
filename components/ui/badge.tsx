import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[0.6875rem] font-medium tracking-[0.08em] uppercase',
  {
    variants: {
      variant: {
        default:  'border border-ink/10 bg-ink/7 text-ink/75',
        success:  'border border-success/15 bg-success/8 text-success',
        warning:  'border border-warning/20 bg-warning/10 text-warning',
        danger:   'border border-danger/20 bg-danger/10 text-danger',
        gold:     'border border-gold/20 bg-gold/12 text-gold-dark',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
