import { ArrowRight, Check } from 'lucide-react';

export function ValueSection() {
  return (
    <section className="relative overflow-hidden bg-[#0B0D0F] py-20 text-white sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_25%,rgba(47,93,124,0.35),transparent_45%),radial-gradient(circle_at_86%_62%,rgba(197,164,109,0.22),transparent_42%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.03] to-transparent" aria-hidden="true" />

      <div className="container relative grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-center lg:gap-20">
        <div className="max-w-xl">
          <p className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-gold-light">El valor de una membresía</p>
          <span className="section-rule" aria-hidden="true" />
          <h2 className="max-w-xl font-display text-section font-light text-paper">Tu afiliacion te da un respaldo juridico continuo.</h2>
          <p className="mt-6 max-w-[45ch] text-[0.95rem] leading-[1.85] text-paper/65">Una solucion juridica pensada para que tengas acompanamiento profesional cuando realmente lo necesitas.</p>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-4 py-1.5 text-[0.72rem] font-medium text-gold-light">
            Respaldo legal continuo
          </div>
        </div>

        <div className="grid gap-4">
          <article className="relative overflow-hidden rounded-2xl border border-gold/35 bg-[linear-gradient(135deg,rgba(22,58,95,0.62),rgba(11,13,15,0.82))] p-6 shadow-[0_26px_56px_-32px_rgba(197,164,109,0.5)] sm:p-8">
            <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-gold/18 blur-3xl" aria-hidden="true" />
            <p className="relative font-mono text-[0.68rem] uppercase tracking-[0.18em] text-gold-light">Membresia LITIGO</p>
            <div className="relative mt-7 grid gap-4 text-sm text-white/90 sm:text-[0.92rem]">
              <p className="flex items-center gap-3"><Check className="h-4 w-4 text-gold-light" />Acompanamiento juridico continuo</p>
              <p className="flex items-center gap-3"><Check className="h-4 w-4 text-gold-light" />Comunicacion directa con el equipo legal</p>
              <p className="flex items-center gap-3"><Check className="h-4 w-4 text-gold-light" />Condiciones claras de afiliacion</p>
            </div>

            <div className="relative mt-8 flex items-center justify-between border-t border-white/15 pt-5">
              <span className="text-[0.75rem] tracking-[0.14em] text-white/62">LITIGO S.A.S.</span>
              <ArrowRight className="h-5 w-5 text-gold-light" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
