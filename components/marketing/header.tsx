'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, ShieldCheck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/#beneficios', label: 'Beneficios' },
  { href: '/#como-funciona', label: 'Como funciona' },
  { href: '/#preguntas-frecuentes', label: 'Preguntas frecuentes' },
];

export function MarketingHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Barra de utilidad: refuerza credibilidad antes de llegar a la navegacion */}
      <div className="hidden bg-ink-light text-paper/65 lg:block">
        <div className="container flex h-9 items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-light" />
            Plataforma con pago seguro y datos protegidos
          </span>
          <a href="mailto:soporte@litigo.com.co" className="inline-flex items-center gap-1.5 hover:text-paper">
            <Mail className="h-3.5 w-3.5" />
            soporte@litigo.com.co
          </a>
        </div>
      </div>

      <div className="border-b border-white/10 bg-ink/95 backdrop-blur">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-2xl font-semibold tracking-wide text-paper">
            LITIGO
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 text-sm font-medium text-paper/80 transition-colors hover:text-gold-light"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button asChild variant="gold">
              <Link href="/afiliacion">Afiliarme ahora</Link>
            </Button>
          </div>

          <button
            aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-paper lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          className={cn(
            'overflow-hidden border-t border-white/10 bg-ink transition-[max-height] duration-300 lg:hidden',
            open ? 'max-h-96' : 'max-h-0',
          )}
        >
          <nav className="container flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-paper/90">
                {link.label}
              </a>
            ))}
            <Button asChild variant="gold" className="mt-2 w-full">
              <Link href="/afiliacion" onClick={() => setOpen(false)}>
                Afiliarme ahora
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
