import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, error, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        // Base
        'flex h-11 w-full rounded-lg border border-border/90 bg-white px-3.5 text-[0.875rem] text-charcoal',
        'placeholder:text-slate-light/80',
        // Transicion suave al enfocar
        'transition-[border-color,box-shadow,transform,background-color] duration-200',
        // Focus
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35 focus-visible:border-gold',
        // Disabled
        'disabled:cursor-not-allowed disabled:bg-paper disabled:text-slate-light',
        // Estado de error
        error
          ? 'border-danger/55 focus-visible:ring-danger/25 focus-visible:border-danger/70'
          : 'hover:border-gold/35',
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
