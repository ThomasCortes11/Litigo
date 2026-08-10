import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[120px] w-full rounded-lg border border-border/90 bg-white',
        'px-3.5 py-2.5 text-[0.875rem] text-charcoal leading-relaxed',
        'placeholder:text-slate-light/70',
        'transition-[border-color,box-shadow,background-color] duration-200',
        'hover:border-gold/30 hover:bg-white',
        'focus-visible:outline-none focus-visible:ring-[2.5px] focus-visible:ring-gold/30 focus-visible:border-gold/65',
        'disabled:cursor-not-allowed disabled:bg-paper disabled:text-slate-light',
        'resize-y',
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
