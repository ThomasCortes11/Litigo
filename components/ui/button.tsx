import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold tracking-wide',
    'transition-all duration-300 active:translate-y-px',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-[#163A5F] text-white shadow-[0_12px_24px_-16px_rgba(22,58,95,0.7)] hover:bg-[#2F5D7C] hover:-translate-y-0.5',
        gold:
          'bg-[#163A5F] text-white shadow-[0_12px_24px_-16px_rgba(22,58,95,0.7)] hover:bg-[#2F5D7C] hover:-translate-y-0.5',
        outline:
          'border border-border bg-white text-charcoal hover:border-[#2F5D7C]/60 hover:bg-[#F5F3EE]',
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
