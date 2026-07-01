import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { LitigoLogo } from '@/components/ui/logo';

export const metadata = { title: 'Contrato de Afiliacion' };

export default async function ContratoPage() {
  const doc = await prisma.legalDocument.findFirst({
    where: { type: 'CONTRACT', isActive: true },
    orderBy: { version: 'desc' },
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-neutral-800 bg-black">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <LitigoLogo variant="dark" size="md" />
          </Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white">
            <ChevronLeft className="h-4 w-4" /> Inicio
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl py-16">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-dark">Documento legal</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
            {doc?.title ?? 'Contrato de Afiliacion'}
          </h1>
          {/* Resumen destacado del contrato */}
          <div className="mt-6 grid gap-6 rounded-lg border border-neutral-800 bg-neutral-900/70 p-4 sm:p-6 shadow-sm lg:grid-cols-[1fr,2fr]">
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-300">Valor mensual</p>
                <div className="mt-2 text-3xl font-semibold text-teal-300">$80.000</div>

                <p className="mt-4 text-sm text-gray-300">Tipo de afiliación</p>
                <div className="mt-1 font-medium text-gray-100">Individual</div>

                <p className="mt-4 text-sm text-gray-300">Formulario Nº</p>
                <div className="mt-1 font-medium text-gray-100">0194</div>
              </div>

              <div className="mt-6 text-xs text-gray-400">
                Fecha de actualización: {doc ? formatDate(doc.updatedAt) : '—'}
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-100">Contacto y dirección</h3>
              <p className="mt-2 text-sm text-gray-300">Av. Jiménez #9-43 Of. 403 — Bogotá</p>
              <p className="mt-1 text-sm text-gray-300">Tel: 311 855 1771 · 321 331 0038</p>
              <p className="mt-1 text-sm text-gray-300">Email: isaiasrodriguez@hotmail.com</p>

              <h4 className="mt-4 text-sm font-semibold text-gray-100">Resumen de cláusulas</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-300 space-y-2">
                <li>Asistencia jurídica: representación y defensa en distintas áreas del derecho.</li>
                <li>Servicios exigibles tras el pago mínimo de dos (2) cuotas mensuales.</li>
                <li>Gastos de proceso y costas a cargo del afiliado salvo que se indique lo contrario.</li>
                <li>Exclusiones aplican: hechos previos, actos dolosos y otras limitaciones previstas en el contrato.</li>
              </ul>

              <div className="mt-4">
                <a href="#document-content" className="inline-flex items-center gap-2 rounded bg-gold px-4 py-2 text-sm font-medium text-black shadow-sm hover:opacity-95">
                  Ver texto completo del contrato
                </a>
              </div>
            </div>
          </div>
          {doc && (
            <p className="mt-2 text-xs text-slate">
              Version {doc.version} — Ultima actualizacion: {formatDate(doc.updatedAt)}
            </p>
          )}
        </div>

        <div id="document-content" className="scroll-mt-28 rounded-lg border border-neutral-800 bg-gray-900 px-4 py-6 sm:px-8 sm:py-10 shadow-lg">
          <div className="prose max-w-none space-y-4 text-sm leading-relaxed text-gray-100">
            {(doc?.content ?? 'Este documento aun no ha sido publicado.').split('\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/afiliacion" className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3 text-sm font-medium text-black shadow-sm hover:bg-teal-400">
            Ir al formulario de afiliacion
          </Link>
        </div>
      </main>
    </div>
  );
}
