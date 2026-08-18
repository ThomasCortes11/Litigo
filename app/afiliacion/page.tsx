import Link from 'next/link';
import { AlertCircle, Lock, Scale, Wallet } from 'lucide-react';
import { AffiliationForm } from '@/components/afiliacion/affiliation-form';
import { TrustSidebar } from '@/components/afiliacion/trust-sidebar';
import { LitigoLogo } from '@/components/ui/logo';

export const metadata = { title: 'Afiliarme' };

export default function AfiliacionPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_18%_12%,#163A5F_0%,#0B0D0F_38%,#050607_78%)] text-white">
      {/* Header minimalista */}
      <header className="border-b border-white/10 bg-black/72 backdrop-blur-sm">
        <div className="container flex h-[72px] items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <LitigoLogo variant="dark" size="md" />
          </Link>
          <span className="flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/5 px-3 py-1 text-xs text-white/78">
            <Lock className="h-3 w-3 text-gold-light" />
            Asesoría inicial gratuita
          </span>
        </div>
      </header>

      <main className="container max-w-5xl py-10 sm:py-12 lg:py-14">
        {/* Titulo de seccion */}
        <div className="mb-8 sm:mb-10">
          <span className="section-rule" />
          <h1 className="font-display text-[clamp(1.75rem,4vw,2.45rem)] font-semibold text-paper">
            Solicita una asesoría inicial gratuita
          </h1>
          <p className="mt-2 max-w-[62ch] text-[0.9rem] text-paper/70">
            Cuéntanos qué necesitas. El equipo revisará tu perfil, te contactará para una asesoría inicial y, si tu solicitud es aprobada, podrás activar una membresía mensual.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 rounded-lg border border-[#2F5D7C]/50 bg-[#163A5F]/35 px-4 py-3 text-sm text-paper/80">
            <Lock className="h-4 w-4 text-gold-light" />
            <span>La solicitud no garantiza aceptación ni implica un pago inmediato.</span>
          </div>
        </div>

        {/* Indicador de progreso */}
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:mb-10">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#163A5F] font-mono text-[10px] text-white ring-1 ring-gold/40">
              1
            </span>
            <span className="text-[0.8125rem] font-medium text-white">Datos básicos</span>
          </div>
          <div className="h-px flex-1 bg-white/12" />
          <div className="flex items-center gap-2 opacity-40">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 font-mono text-[10px] text-white/70">
              2
            </span>
            <span className="text-[0.8125rem] font-medium text-white/60">Perfilamiento</span>
          </div>
          <div className="h-px flex-1 bg-white/12" />
          <div className="flex items-center gap-2 opacity-40">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 font-mono text-[10px] text-white/70">
              3
            </span>
            <span className="text-[0.8125rem] font-medium text-white/60">Revisión y oferta</span>
          </div>
        </div>

        {/* Alcance resumido del contrato antes de diligenciar */}
        <section className="mb-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:mb-10 sm:p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-light" />
            <div>
              <p className="text-sm font-semibold text-white">Informacion importante antes de afiliarte</p>
              <p className="mt-1 text-xs text-paper/60">
                Este resumen no reemplaza el documento completo. Te recomendamos leer el contrato para conocer todas las condiciones.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <article className="rounded-md border border-white/10 bg-[#163A5F]/30 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-gold-light">
                <Scale className="h-4 w-4" />
                Asistencia juridica
              </p>
              <p className="mt-2 text-xs leading-relaxed text-paper/70">
                Litigo brinda asesoria, representacion y defensa en distintas areas del derecho y hasta segunda instancia, segun condiciones del contrato.
              </p>
            </article>

            <article className="rounded-md border border-white/10 bg-[#163A5F]/30 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-gold-light">
                <Wallet className="h-4 w-4" />
                Servicios exigibles
              </p>
              <p className="mt-2 text-xs leading-relaxed text-paper/70">
                La asesoria, representacion y defensa se habilitan con pago minimo de dos cuotas y manteniendo tus pagos al dia.
              </p>
            </article>

            <article className="rounded-md border border-white/10 bg-[#163A5F]/30 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-gold-light">
                <AlertCircle className="h-4 w-4" />
                Gastos y exclusiones
              </p>
              <p className="mt-2 text-xs leading-relaxed text-paper/70">
                Gastos de proceso, costas y expensas judiciales corren por cuenta del afiliado. El contrato detalla exclusiones y hechos no cubiertos.
              </p>
            </article>
          </div>

          <p className="mt-4 text-xs text-paper/60">
            Consulta el{' '}
            <Link href="/contrato-afiliacion" target="_blank" className="font-semibold text-gold-light underline underline-offset-2 hover:text-white">
              contrato completo
            </Link>{' '}
            antes de continuar.
          </p>
        </section>

        {/* Formulario + sidebar */}
        <div className="grid gap-6 lg:grid-cols-[1fr,300px] lg:gap-8">
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.75)] sm:p-7 lg:p-8">
            <AffiliationForm />
          </div>
          <TrustSidebar />
        </div>
      </main>
    </div>
  );
}
