import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold tracking-wide',
    'transition-all duration-200 active:translate-y-px',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-ink text-paper shadow-[0_10px_22px_-14px_rgba(8,15,26,0.65)] hover:bg-ink-light',
        gold:
          'bg-gradient-to-r from-gold to-gold-light text-ink shadow-gold-glow hover:from-gold-light hover:to-[#d8b887] hover:-translate-y-0.5',
        outline:
          'border border-border bg-white/70 text-charcoal backdrop-blur-[1px] hover:border-gold/45 hover:bg-white',
        ghost:
          'bg-transparent text-charcoal hover:bg-paper/80',
        destructive:
          'bg-danger text-white shadow-[0_10px_22px_-16px_rgba(110,32,32,0.6)] hover:bg-danger/90',
        link:
          'text-ink underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-6',
        sm: 'h-8 px-4 text-xs',
        lg: 'h-12 px-8 text-[0.9375rem] tracking-[0.02em]',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
