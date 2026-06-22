import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'flex h-11 w-full appearance-none rounded border border-border bg-white',
          'px-3.5 pr-9 text-[0.875rem] text-charcoal',
          'transition-[border-color,box-shadow] duration-150',
          'hover:border-slate/40',
          'focus-visible:outline-none focus-visible:ring-[2.5px] focus-visible:ring-gold/30 focus-visible:border-gold/60',
          'disabled:cursor-not-allowed disabled:bg-paper disabled:text-slate-light',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-light"
        strokeWidth={1.75}
      />
    </div>
  );
});
Select.displayName = 'Select';

export { Select };
