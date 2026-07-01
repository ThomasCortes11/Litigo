import Link from 'next/link';
import { Lock } from 'lucide-react';
import { AffiliationForm } from '@/components/afiliacion/affiliation-form';
import { TrustSidebar } from '@/components/afiliacion/trust-sidebar';
import { LitigoLogo } from '@/components/ui/logo';

export const metadata = { title: 'Afiliarme' };

export default function AfiliacionPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header minimalista */}
      <header className="border-b border-neutral-800 bg-black">
        <div className="container flex h-[72px] items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <LitigoLogo variant="dark" size="md" />
          </Link>
          <span className="flex items-center gap-1.5 text-xs text-white/70">
            <Lock className="h-3 w-3 text-teal-400" />
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
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white font-mono text-[10px] text-black">
              1
            </span>
            <span className="text-[0.8125rem] font-medium text-white">Tus datos</span>
          </div>
          <div className="h-px flex-1 bg-neutral-800" />
          <div className="flex items-center gap-2 opacity-40">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-700 font-mono text-[10px] text-white/60">
              2
            </span>
            <span className="text-[0.8125rem] font-medium text-white/60">Pago</span>
          </div>
          <div className="h-px flex-1 bg-neutral-800" />
          <div className="flex items-center gap-2 opacity-40">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-700 font-mono text-[10px] text-white/60">
              3
            </span>
            <span className="text-[0.8125rem] font-medium text-white/60">Activacion</span>
          </div>
        </div>

        {/* Formulario + sidebar */}
        <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
          <div className="rounded-lg border border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-800 p-8 shadow-sm">
            <AffiliationForm />
          </div>
          <TrustSidebar />
        </div>
      </main>
    </div>
  );
}
