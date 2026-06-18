import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

export default async function TerminosPage() {
  const doc = await prisma.legalDocument.findFirst({
    where: { type: 'TERMS', isActive: true },
    orderBy: { version: 'desc' },
  });

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-border bg-ink">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-2xl font-semibold text-paper">LITIGO</Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-paper/70 hover:text-paper">
            <ChevronLeft className="h-4 w-4" /> Inicio
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl py-16">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-dark">Documento legal</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
            {doc?.title ?? 'Terminos y Condiciones'}
          </h1>
          {doc && (
            <p className="mt-2 text-xs text-slate">
              Version {doc.version} — Ultima actualizacion: {formatDate(doc.updatedAt)}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-white px-8 py-10 shadow-card">
          <div className="prose max-w-none space-y-4 text-sm leading-relaxed text-charcoal">
            {(doc?.content ?? 'Este documento aun no ha sido publicado.').split('\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/afiliacion" className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-medium text-ink shadow-gold-glow hover:bg-gold-light">
            Ir al formulario de afiliacion
          </Link>
        </div>
      </main>
    </div>
  );
}
