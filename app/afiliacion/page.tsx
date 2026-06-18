import Link from 'next/link';
import { Lock } from 'lucide-react';
import { AffiliationForm } from '@/components/afiliacion/affiliation-form';
import { TrustSidebar } from '@/components/afiliacion/trust-sidebar';

export const metadata = { title: 'Afiliarme — Litigo' };

export default function AfiliacionPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header minimalista */}
      <header className="border-b border-border bg-white">
        <div className="container flex h-[72px] items-center justify-between">
          <Link href="/" className="font-display text-[1.35rem] font-semibold text-ink">
            LITIGO
          </Link>
          <span className="flex items-center gap-1.5 text-xs text-slate">
            <Lock className="h-3 w-3 text-gold" />
            Pago procesado por Wompi
          </span>
        </div>
      </header>

      <main className="container max-w-5xl py-14">
        {/* Titulo de seccion */}
        <div className="mb-10">
          <span className="section-rule" />
          <h1 className="font-display text-display-sm font-semibold text-ink">
            Formulario de afiliacion
          </h1>
          <p className="mt-2 text-[0.875rem] text-slate">
            Completa tus datos y acepta los documentos. Luego te redirigiremos a Wompi para el pago seguro.
          </p>
        </div>

        {/* Indicador de progreso */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink font-mono text-[10px] text-paper">
              1
            </span>
            <span className="text-[0.8125rem] font-medium text-ink">Tus datos</span>
          </div>
          <div className="h-px flex-1 bg-border" />
          <div className="flex items-center gap-2 opacity-40">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border font-mono text-[10px] text-slate">
              2
            </span>
            <span className="text-[0.8125rem] font-medium text-slate">Pago</span>
          </div>
          <div className="h-px flex-1 bg-border" />
          <div className="flex items-center gap-2 opacity-40">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border font-mono text-[10px] text-slate">
              3
            </span>
            <span className="text-[0.8125rem] font-medium text-slate">Activacion</span>
          </div>
        </div>

        {/* Formulario + sidebar */}
        <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
          <div className="rounded border border-border bg-white p-8">
            <AffiliationForm />
          </div>
          <TrustSidebar />
        </div>
      </main>
    </div>
  );
}
