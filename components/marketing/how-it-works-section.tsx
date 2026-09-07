 'use client';

import * as React from 'react';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    n: '01',
    title: 'Cuéntanos tu situación',
    desc: 'Registra tus datos básicos y completa un perfilamiento jurídico sencillo.',
    detail: 'Comenzamos con información esencial sobre ti y tu necesidad para entender cómo orientarte.',
    next: 'Completar tu perfil toma solo unos minutos.',
  },
  {
    n: '02',
    title: 'Recibe una asesoría inicial',
    desc: 'Nuestro equipo revisa la información y te contacta para entender mejor tu necesidad.',
    detail: 'Un integrante de nuestro equipo conversa contigo y aclara el contexto de tu caso.',
    next: 'Con esa conversación podemos valorar mejor tu solicitud.',
  },
  {
    n: '03',
    title: 'Evaluamos tu perfil',
    desc: 'La solicitud pasa por una revisión interna. La aprobación no es automática ni está garantizada.',
    detail: 'Revisamos si la membresía y nuestros servicios son adecuados para tu perfil y situación.',
    next: 'Te informamos el resultado de la evaluación.',
  },
  {
    n: '04',
    title: 'Activa tu membresía',
    desc: 'Si tu perfil es aprobado, podrás revisar la oferta y pagar de forma segura con Wompi.',
    detail: 'Con tu aprobación, conoces la oferta disponible y decides si quieres activar tu membresía.',
    next: 'Tu pago se procesa de forma segura a través de Wompi.',
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = React.useState(0);
  const selectedStep = steps[activeStep] ?? steps[0]!;

  return (
    <section id="como-funciona" className="section-shell relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#2F5D7C]/8 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-12 h-64 w-64 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
      <div className="container">

        <div className="mb-10 max-w-2xl sm:mb-12 lg:mb-14">
          <span className="section-rule" aria-hidden="true" />
          <h2 className="font-display text-section text-ink">
            El proceso,<br />paso a paso.
          </h2>
          <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-slate">
            Conoce qué sucede en cada etapa antes de solicitar tu afiliación.
          </p>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Línea conectora horizontal visible solo en desktop */}
          <div
            className="absolute left-8 right-8 top-[1.15rem] hidden h-px bg-gradient-to-r from-gold/55 via-[#C8D2DE] to-gold/55 lg:block"
            aria-hidden="true"
          />

          {steps.map((s, index) => {
            const isActive = activeStep === index;

            return (
              <button
                key={s.n}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveStep(index)}
                className={`group relative min-h-[218px] rounded-xl border p-6 text-left shadow-[0_14px_28px_-24px_rgba(11,13,15,0.5)] transition-all duration-300 lg:min-h-[248px] ${
                  isActive
                    ? 'border-[#2F5D7C]/60 bg-[#F4F8FC] shadow-[0_22px_44px_-26px_rgba(22,58,95,0.45)] ring-1 ring-[#2F5D7C]/20'
                    : 'border-border/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,243,238,0.7))] hover:-translate-y-1.5 hover:border-[#2F5D7C]/35 hover:shadow-[0_22px_44px_-26px_rgba(22,58,95,0.35)]'
                }`}
              >
                <span className={`pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-transparent via-[#2F5D7C] to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} aria-hidden="true" />
                <span className={`relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[0.67rem] tracking-[0.14em] shadow-sm transition-all duration-300 ${isActive ? 'border-[#2F5D7C] bg-[#1D4E7A] text-white' : 'border-gold/55 bg-white text-gold-dark group-hover:scale-105'}`}>
                  {isActive ? <Check className="h-4 w-4" aria-hidden="true" /> : s.n}
                </span>
                <span className="mt-4 flex items-start justify-between gap-3">
                  <span className="font-display text-title leading-tight text-ink">{s.title}</span>
                  <ChevronRight className={`mt-1 h-4 w-4 shrink-0 transition-transform ${isActive ? 'translate-x-0.5 text-[#2F5D7C]' : 'text-slate/50'}`} aria-hidden="true" />
                </span>
                <span className="mt-2 block text-[0.835rem] leading-relaxed text-slate">{s.desc}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 rounded-2xl border border-[#2F5D7C]/20 bg-[#0B243A] p-6 text-white shadow-[0_24px_50px_-28px_rgba(11,36,58,0.7)] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-9">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#9CC8E8]">Paso {selectedStep.n}</p>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl">{selectedStep.title}</h3>
            <p className="mt-3 max-w-[58ch] text-[0.95rem] leading-relaxed text-white/75">{selectedStep.detail}</p>
            <p className="mt-4 flex items-start gap-2 text-[0.85rem] font-semibold text-[#D5EAF8]"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{selectedStep.next}</p>
          </div>
          <Link href="/afiliacion" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-[0.9rem] font-bold text-[#0B243A] transition-colors hover:bg-[#D5EAF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B243A]">
            Comenzar afiliación
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
