import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium tracking-wide',
    'transition-colors duration-200',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-ink text-paper hover:bg-ink-light',
        gold:
          'bg-gold text-white hover:bg-gold-dark',
        outline:
          'border border-border bg-transparent text-charcoal hover:bg-paper hover:border-slate/50',
        ghost:
          'bg-transparent text-charcoal hover:bg-paper',
        destructive:
          'bg-danger text-white hover:bg-danger/90',
        link:
          'text-ink underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-6',
        sm: 'h-8 px-4 text-xs',
        lg: 'h-12 px-8 text-[0.9375rem]',
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
