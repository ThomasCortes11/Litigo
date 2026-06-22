import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-[0.6875rem] font-medium tracking-wide uppercase',
  {
    variants: {
      variant: {
        default:  'bg-ink/8 text-ink/70',
        success:  'bg-success/8 text-success',
        warning:  'bg-warning/8 text-warning',
        danger:   'bg-danger/8 text-danger',
        gold:     'bg-gold/10 text-gold-dark',
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
