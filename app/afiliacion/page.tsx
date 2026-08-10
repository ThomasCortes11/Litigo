import Link from 'next/link';
import { AlertCircle, Lock, Scale, Wallet } from 'lucide-react';
import { AffiliationForm } from '@/components/afiliacion/affiliation-form';
import { TrustSidebar } from '@/components/afiliacion/trust-sidebar';
import { LitigoLogo } from '@/components/ui/logo';

export const metadata = { title: 'Afiliarme' };

export default function AfiliacionPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_18%_12%,#1c3e6a_0%,#0f2745_32%,#060d17_70%)] text-white">
      {/* Header minimalista */}
      <header className="border-b border-white/10 bg-black/72 backdrop-blur-sm">
        <div className="container flex h-[72px] items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <LitigoLogo variant="dark" size="md" />
          </Link>
          <span className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.02] px-3 py-1 text-xs text-white/78">
            <Lock className="h-3 w-3 text-blue-300" />
            Pago procesado por Wompi
          </span>
        </div>
      </header>

      <main className="container max-w-5xl py-10 sm:py-12 lg:py-14">
        {/* Titulo de seccion */}
        <div className="mb-8 sm:mb-10">
          <span className="section-rule" />
          <h1 className="font-display text-[clamp(1.75rem,4vw,2.45rem)] font-semibold text-paper">
            Formulario de afiliacion Litigo
          </h1>
          <p className="mt-2 max-w-[62ch] text-[0.9rem] text-paper/70">
            Completa tus datos personales, revisa el alcance del servicio y acepta los documentos legales. Luego te redirigiremos a Wompi para un pago seguro.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 rounded-2xl border border-blue-400/25 bg-blue-500/12 px-4 py-3 text-sm text-paper/80">
            <Lock className="h-4 w-4 text-blue-300" />
            <span>Pago protegido con Wompi · checkout hospedado · confirmación inmediata</span>
          </div>
        </div>

        {/* Indicador de progreso */}
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:mb-10">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 font-mono text-[10px] text-white">
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

        {/* Alcance resumido del contrato antes de diligenciar */}
        <section className="mb-8 rounded-xl border border-blue-300/20 bg-[linear-gradient(180deg,rgba(31,88,156,0.14),rgba(9,21,37,0.28))] p-5 sm:mb-10 sm:p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
            <div>
              <p className="text-sm font-semibold text-white">Informacion importante antes de afiliarte</p>
              <p className="mt-1 text-xs text-blue-100/75">
                Este resumen no reemplaza el documento completo. Te recomendamos leer el contrato para conocer todas las condiciones.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <article className="rounded-lg border border-blue-300/20 bg-blue-950/35 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-blue-200">
                <Scale className="h-4 w-4" />
                Asistencia juridica
              </p>
              <p className="mt-2 text-xs leading-relaxed text-gray-200">
                Litigo brinda asesoria, representacion y defensa en distintas areas del derecho y hasta segunda instancia, segun condiciones del contrato.
              </p>
            </article>

            <article className="rounded-lg border border-blue-300/20 bg-blue-950/35 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-blue-200">
                <Wallet className="h-4 w-4" />
                Servicios exigibles
              </p>
              <p className="mt-2 text-xs leading-relaxed text-gray-200">
                La asesoria, representacion y defensa se habilitan con pago minimo de dos cuotas y manteniendo tus pagos al dia.
              </p>
            </article>

            <article className="rounded-lg border border-blue-300/20 bg-blue-950/35 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-blue-200">
                <AlertCircle className="h-4 w-4" />
                Gastos y exclusiones
              </p>
              <p className="mt-2 text-xs leading-relaxed text-gray-200">
                Gastos de proceso, costas y expensas judiciales corren por cuenta del afiliado. El contrato detalla exclusiones y hechos no cubiertos.
              </p>
            </article>
          </div>

          <p className="mt-4 text-xs text-blue-100/75">
            Consulta el{' '}
            <Link href="/contrato-afiliacion" target="_blank" className="font-semibold text-blue-200 underline underline-offset-2 hover:text-white">
              contrato completo
            </Link>{' '}
            antes de continuar.
          </p>
        </section>

        {/* Formulario + sidebar */}
        <div className="grid gap-6 lg:grid-cols-[1fr,300px] lg:gap-8">
          <div className="rounded-xl border border-white/12 bg-gradient-to-b from-[#091325]/96 to-[#12203a]/96 p-5 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.65)] sm:p-7 lg:p-8">
            <AffiliationForm />
          </div>
          <TrustSidebar />
        </div>
      </main>
    </div>
  );
}
