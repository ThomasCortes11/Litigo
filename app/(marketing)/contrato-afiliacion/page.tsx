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
    <div className="min-h-screen bg-[#0B0D0F] text-white">
      <header className="border-b border-white/10 bg-[#0B0D0F]">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <LitigoLogo variant="dark" size="md" />
          </Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white">
            <ChevronLeft className="h-4 w-4" /> Inicio
          </Link>
        </div>
      </header>

      <main className="container max-w-4xl py-14 sm:py-20">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-dark">Documento legal</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {doc?.title ?? 'Contrato de Afiliacion'}
          </h1>
          {/* Resumen destacado del contrato */}
          <div className="mt-6 grid gap-6 rounded-lg border border-white/10 bg-white/[0.05] p-4 shadow-sm sm:p-6 lg:grid-cols-[1fr,2fr]">
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-sm text-paper/60">Valor mensual</p>
                <div className="mt-2 text-3xl font-semibold text-gold-light">$80.000</div>

                <p className="mt-4 text-sm text-paper/60">Tipo de afiliación</p>
                <div className="mt-1 font-medium text-white">Individual</div>

                <p className="mt-4 text-sm text-paper/60">Formulario Nº</p>
                <div className="mt-1 font-medium text-white">0194</div>
              </div>

              <div className="mt-6 text-xs text-paper/50">
                Fecha de actualización: {doc ? formatDate(doc.updatedAt) : '—'}
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-white">Contacto y dirección</h3>
              <p className="mt-2 text-sm text-paper/70">Av. Jiménez #9-43 Of. 403 — Bogotá</p>
              <p className="mt-1 text-sm text-paper/70">Tel: 311 855 1771 · 321 331 0038</p>
              <p className="mt-1 text-sm text-paper/70">Email: isaiasrodriguez@hotmail.com</p>

              <h4 className="mt-4 text-sm font-semibold text-white">Resumen de cláusulas</h4>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-paper/70">
                <li>Asistencia jurídica: representación y defensa en distintas áreas del derecho.</li>
                <li>Servicios exigibles tras el pago mínimo de dos (2) cuotas mensuales.</li>
                <li>Gastos de proceso y costas a cargo del afiliado salvo que se indique lo contrario.</li>
                <li>Exclusiones aplican: hechos previos, actos dolosos y otras limitaciones previstas en el contrato.</li>
              </ul>

              <div className="mt-4">
                <a href="#document-content" className="inline-flex items-center gap-2 rounded-md bg-[#163A5F] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#2F5D7C]">
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

        <div id="document-content" className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-6 shadow-lg sm:px-8 sm:py-10">
          <div className="prose prose-invert max-w-none space-y-4 text-sm leading-relaxed text-paper/80">
            {(doc?.content ?? 'Este documento aun no ha sido publicado.').split('\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/afiliacion" className="inline-flex items-center gap-2 rounded-md bg-[#163A5F] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#2F5D7C]">
            Ir al formulario de afiliacion
          </Link>
        </div>
      </main>
    </div>
  );
}
