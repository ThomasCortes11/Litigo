'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

/**
 * Revela su contenido con un fundido sutil cuando entra en el viewport.
 * Se usa con moderacion (encabezados de seccion, no cada tarjeta individual)
 * para que la pagina se sienta cuidada sin caer en animacion excesiva.
 */
export function FadeIn({ children, className, delayMs = 0 }: FadeInProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        'transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
        className,
      )}
    >
      {children}
    </div>
  );
}
