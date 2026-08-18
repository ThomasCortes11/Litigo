import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

export const metadata = { title: 'Politica de Tratamiento de Datos' };

export default async function PoliticaDatosPage() {
  const doc = await prisma.legalDocument.findFirst({
    where: { type: 'DATA_POLICY', isActive: true },
    orderBy: { version: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <header className="border-b border-border bg-ink">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-2xl font-semibold text-paper">LITIGO</Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-paper/70 hover:text-paper">
            <ChevronLeft className="h-4 w-4" /> Inicio
          </Link>
        </div>
      </header>

      <main className="container max-w-4xl py-14 sm:py-20">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-dark">Documento legal</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {doc?.title ?? 'Politica de Tratamiento de Datos'}
          </h1>
          {doc && (
            <p className="mt-2 text-xs text-slate">
              Version {doc.version} — Ultima actualizacion: {formatDate(doc.updatedAt)}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-white px-6 py-8 shadow-[0_16px_40px_-28px_rgba(11,13,15,0.35)] sm:px-12 sm:py-12">
          <div className="prose max-w-none space-y-4 text-sm leading-relaxed text-charcoal">
            {(doc?.content ?? 'Este documento aun no ha sido publicado.').split('\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/afiliacion" className="inline-flex items-center gap-2 rounded-md bg-[#163A5F] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_24px_-16px_rgba(22,58,95,0.7)] hover:bg-[#2F5D7C]">
            Ir al formulario de afiliacion
          </Link>
        </div>
      </main>
    </div>
  );
}
