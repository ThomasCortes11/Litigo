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
        // Base — dark-friendly
        'flex h-11 w-full rounded border bg-neutral-800 px-3.5 text-[0.875rem] text-gray-100',
        'placeholder:text-gray-400',
        // Transicion suave al enfocar
        'transition-[border-color,box-shadow,transform] duration-150',
        // Focus
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/30 focus-visible:border-teal-400',
        // Disabled
        'disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:text-gray-500',
        // Estado de error
        error
          ? 'border-danger/50 focus-visible:ring-danger/20 focus-visible:border-danger/60'
          : 'border-neutral-700 hover:border-neutral-600',
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
