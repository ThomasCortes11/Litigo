import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

export default async function PoliticaDatosPage() {
  const doc = await prisma.legalDocument.findFirst({
    where: { type: 'DATA_POLICY', isActive: true },
    orderBy: { version: 'desc' },
  });

  return (
    <article className="container max-w-prose py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-dark">Documento legal</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
        {doc?.title ?? 'Politica de Tratamiento de Datos'}
      </h1>
      {doc && <p className="mt-1 text-xs text-slate">Version {doc.version} - actualizado el {formatDate(doc.updatedAt)}</p>}

      <div className="prose-litigo mt-10 space-y-4 text-sm leading-relaxed text-charcoal">
        {(doc?.content ?? 'Este documento aun no ha sido publicado.').split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
