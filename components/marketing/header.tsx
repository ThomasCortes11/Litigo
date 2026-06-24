'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/#beneficios', label: 'Beneficios' },
  { href: '/#como-funciona', label: 'Como funciona' },
  { href: '/#preguntas-frecuentes', label: 'Consultas frecuentes' },
];

export function MarketingHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background,border-color,box-shadow] duration-300',
        scrolled
          ? 'border-b border-white/10 bg-ink/95 shadow-[0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md'
          : 'bg-ink',
      )}
    >
      <div className="container flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="font-display text-[1.35rem] font-semibold tracking-wide text-paper"
        >
          LITIGO
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navegacion principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.8125rem] font-medium text-paper/60 transition-colors duration-200 hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="mailto:soporte@litigo.com.co"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.8125rem] font-medium text-paper/90 transition hover:border-white/25 hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4 text-gold" />
            Soporte
          </a>
          <Button asChild variant="gold" className="h-9 px-5 text-[0.8125rem]">
            <Link href="/afiliacion">Afiliarme</Link>
          </Button>
        </div>

        <button
          aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center text-paper/70 hover:text-paper lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Botón flotante de soporte en desktop */}
      <a
        href="mailto:soporte@litigo.com.co"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full border border-white/15 bg-ink/95 px-4 py-3 text-sm text-paper shadow-[0_18px_48px_rgba(0,0,0,0.22)] transition hover:bg-ink lg:flex"
      >
        <MessageCircle className="h-4 w-4 text-gold" />
        Soporte
      </a>

      {/* Menu movil */}
      <div
        className={cn(
          'overflow-hidden border-t border-white/[0.07] bg-ink transition-[max-height] duration-300 lg:hidden',
          open ? 'max-h-80' : 'max-h-0',
        )}
      >
        <nav className="container flex flex-col gap-1 py-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded py-2.5 text-sm text-paper/70 hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <Button asChild variant="gold" className="mt-3 w-full">
            <Link href="/afiliacion" onClick={() => setOpen(false)}>Afiliarme</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
