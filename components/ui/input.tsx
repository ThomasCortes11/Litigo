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
        'flex h-12 w-full rounded-md border border-border/90 bg-white px-3.5 text-[0.875rem] text-charcoal shadow-[0_1px_2px_rgba(11,13,15,0.03)]',
        'placeholder:text-slate-light/80',
        // Transicion suave al enfocar
        'transition-[border-color,box-shadow,transform,background-color] duration-200',
        // Focus
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5D7C]/25 focus-visible:border-[#2F5D7C]',
        // Disabled
        'disabled:cursor-not-allowed disabled:bg-paper disabled:text-slate-light',
        // Estado de error
        error
          ? 'border-danger/55 focus-visible:ring-danger/25 focus-visible:border-danger/70'
          : 'hover:border-[#2F5D7C]/55',
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
