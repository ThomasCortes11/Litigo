import Link from 'next/link';
import { Lock } from 'lucide-react';
import { AffiliationForm } from '@/components/afiliacion/affiliation-form';
import { TrustSidebar } from '@/components/afiliacion/trust-sidebar';
import { LitigoLogo } from '@/components/ui/logo';

export const metadata = { title: 'Afiliarme' };

export default function AfiliacionPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_12%,#17293f_0%,#0d1b2c_34%,#070707_72%)] text-white">
      {/* Header minimalista */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="container flex h-[72px] items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <LitigoLogo variant="dark" size="md" />
          </Link>
          <span className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.02] px-3 py-1 text-xs text-white/78">
            <Lock className="h-3 w-3 text-gold" />
            Pago procesado por Wompi
          </span>
        </div>
      </header>

      <main className="container max-w-5xl py-10 sm:py-12 lg:py-14">
        {/* Titulo de seccion */}
        <div className="mb-8 sm:mb-10">
          <span className="section-rule" />
          <h1 className="font-display text-[clamp(1.75rem,4vw,2.45rem)] font-semibold text-paper">
            Formulario de afiliacion
          </h1>
          <p className="mt-2 max-w-[62ch] text-[0.9rem] text-paper/70">
            Completa tus datos y acepta los documentos. Luego te redirigiremos a Wompi para el pago seguro.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm text-paper/80">
            <Lock className="h-4 w-4 text-gold" />
            <span>Pago protegido con Wompi · checkout hospedado · confirmación inmediata</span>
          </div>
        </div>

        {/* Indicador de progreso */}
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:mb-10">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold font-mono text-[10px] text-ink">
              1
            </span>
            <span className="text-[0.8125rem] font-medium text-white">Tus datos</span>
          </div>
          <div className="h-px flex-1 bg-white/12" />
          <div className="flex items-center gap-2 opacity-40">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 font-mono text-[10px] text-white/70">
              2
            </span>
            <span className="text-[0.8125rem] font-medium text-white/60">Pago</span>
          </div>
          <div className="h-px flex-1 bg-white/12" />
          <div className="flex items-center gap-2 opacity-40">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 font-mono text-[10px] text-white/70">
              3
            </span>
            <span className="text-[0.8125rem] font-medium text-white/60">Activacion</span>
          </div>
        </div>

        {/* Formulario + sidebar */}
        <div className="grid gap-6 lg:grid-cols-[1fr,300px] lg:gap-8">
          <div className="rounded-xl border border-white/12 bg-gradient-to-b from-neutral-900/96 to-neutral-800/96 p-5 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.65)] sm:p-7 lg:p-8">
            <AffiliationForm />
          </div>
          <TrustSidebar />
        </div>
      </main>
    </div>
  );
}
