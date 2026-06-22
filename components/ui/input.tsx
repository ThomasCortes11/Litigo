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
        'flex h-11 w-full rounded border bg-white px-3.5 text-[0.875rem] text-charcoal',
        'placeholder:text-slate-light/70',
        // Transicion suave al enfocar
        'transition-[border-color,box-shadow] duration-150',
        // Focus
        'focus-visible:outline-none focus-visible:ring-[2.5px] focus-visible:ring-gold/30 focus-visible:border-gold/60',
        // Disabled
        'disabled:cursor-not-allowed disabled:bg-paper disabled:text-slate-light',
        // Estado de error
        error
          ? 'border-danger/50 focus-visible:ring-danger/20 focus-visible:border-danger/60'
          : 'border-border hover:border-slate/40',
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
