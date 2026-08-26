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
          'flex h-12 w-full appearance-none rounded-xl border border-[#23415d] bg-[#071d2d]/95',
          'px-3.5 pr-9 text-[0.875rem] text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
          'transition-[border-color,box-shadow,background-color] duration-200',
          'hover:border-[#d7bd8e]/70',
          'focus-visible:outline-none focus-visible:ring-[2.5px] focus-visible:ring-[#d7bd8e]/25 focus-visible:border-[#d7bd8e]',
          'disabled:cursor-not-allowed disabled:bg-slate-900 disabled:text-slate-400',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate"
        strokeWidth={1.75}
      />
    </div>
  );
});
Select.displayName = 'Select';

export { Select };
