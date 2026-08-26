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
        // Base premium: azul petróleo profundo con tacto dorado
        'flex h-12 w-full rounded-xl border border-[#23415d] bg-[#071d2d]/95 px-3.5 text-[0.875rem] text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
        'placeholder:text-slate-400',
        // Transicion suave al enfocar
        'transition-[border-color,box-shadow,transform,background-color] duration-200',
        // Focus premium
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7bd8e]/25 focus-visible:border-[#d7bd8e]',
        // Disabled
        'disabled:cursor-not-allowed disabled:bg-slate-900 disabled:text-slate-400',
        // Estado de error
        error
          ? 'border-red-400/80 focus-visible:ring-red-400/30 focus-visible:border-red-400'
          : 'hover:border-[#d7bd8e]/70',
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
