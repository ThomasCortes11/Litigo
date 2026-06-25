'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/#beneficios',            label: 'Beneficios' },
  { href: '/#como-funciona',         label: 'Cómo funciona' },
  { href: '/#preguntas-frecuentes',  label: 'Consultas frecuentes' },
];

export function MarketingHeader() {
  const [open,     setOpen]     = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-b border-white/[0.07] bg-ink/92 backdrop-blur-lg'
          : 'bg-ink',
      )}
    >
      <div className="container flex h-[68px] items-center justify-between">
        <Link href="/" className="font-display text-[1.3rem] font-semibold tracking-wide text-paper">
          LITIGO
        </Link>

        {/* Navegacion desktop */}
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.8125rem] font-light text-paper/55 transition-colors duration-200 hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/afiliacion"
            className="inline-flex h-9 items-center justify-center rounded px-5 text-[0.8125rem] font-medium text-white bg-gold transition-colors duration-200 hover:bg-gold-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Afiliarme
          </Link>
        </div>

        {/* Boton menu movil */}
        <button
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center text-paper/60 hover:text-paper lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu movil */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={cn(
          'overflow-hidden border-t border-white/[0.06] bg-ink transition-[max-height] duration-300 lg:hidden',
          open ? 'max-h-72' : 'max-h-0',
        )}
      >
        <nav className="container flex flex-col gap-1 py-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded py-2.5 text-[0.875rem] font-light text-paper/65 hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/afiliacion"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex h-11 items-center justify-center rounded bg-gold px-5 text-[0.875rem] font-medium text-white hover:bg-gold-dark"
          >
            Afiliarme
          </Link>
        </nav>
      </div>
    </header>
  );
}
