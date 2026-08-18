'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LitigoLogo } from '@/components/ui/logo';

const navLinks = [
  { href: '/#beneficios',            label: 'Beneficios' },
  { href: '/#como-funciona',         label: 'Cómo funciona' },
  { href: '/#preguntas-frecuentes',  label: 'Consultas frecuentes' },
];

export function MarketingHeader() {
  const [open,     setOpen]     = React.useState(false);
  

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0D0F]/95 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.85)] backdrop-blur-md">
      <div className="container flex h-[72px] items-center justify-between">
        <Link href="/" className="inline-flex items-center">
          <LitigoLogo variant="dark" size="sm" />
        </Link>

        {/* Navegacion desktop */}
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.8125rem] font-semibold tracking-[0.02em] text-paper/90 transition-colors duration-200 hover:text-gold-light focus-visible:text-gold-light"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/afiliacion"
            className="cta-pulse inline-flex h-10 items-center justify-center rounded-lg bg-[#163A5F] px-5 text-[0.8125rem] font-semibold tracking-[0.02em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2F5D7C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
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
          className="flex h-10 w-10 items-center justify-center rounded-md text-paper/65 transition-colors duration-200 hover:bg-white/5 hover:text-paper lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu movil */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={cn(
          'overflow-hidden border-t border-white/[0.08] bg-black/95 transition-[max-height] duration-300 lg:hidden',
          open ? 'max-h-80' : 'max-h-0',
        )}
      >
        <nav className="container flex flex-col gap-1 py-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 text-[0.875rem] font-semibold text-paper/90 transition-colors duration-200 hover:bg-white/5 hover:text-gold-light"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/afiliacion"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex h-11 items-center justify-center rounded-lg bg-[#163A5F] px-5 text-[0.875rem] font-semibold text-white transition-all duration-200 hover:bg-[#2F5D7C]"
          >
            Afiliarme
          </Link>
        </nav>
      </div>
    </header>
  );
}
