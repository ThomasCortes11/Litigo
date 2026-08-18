import { ArrowRight, Check, Minus } from 'lucide-react';

export function ValueSection() {
  return (
    <section className="relative overflow-hidden bg-[#0B0D0F] py-20 text-white sm:py-24 lg:py-28">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_40%,rgba(22,58,95,0.35),transparent_68%)]" aria-hidden="true" />
      <div className="container relative grid gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:items-center lg:gap-20">
        <div>
          <p className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-gold-light">El valor de una membresía</p>
          <span className="section-rule" aria-hidden="true" />
          <h2 className="max-w-xl font-display text-section font-light text-paper">No pagas por cada consulta.<br />Tienes un respaldo jurídico continuo.</h2>
          <p className="mt-6 max-w-[45ch] text-[0.95rem] leading-[1.85] text-paper/60">Una solución jurídica pensada para que tengas acompañamiento profesional cuando realmente lo necesitas.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-7">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/40">Consulta jurídica tradicional</p>
            <div className="mt-8 space-y-4 text-sm text-white/65"><p className="flex items-center gap-3"><Minus className="h-4 w-4 text-white/35" />Pagas por cada consulta</p><p className="flex items-center gap-3"><Minus className="h-4 w-4 text-white/35" />Atención puntual</p></div>
          </article>
          <article className="rounded-lg border border-gold/30 bg-[#163A5F]/45 p-6 shadow-[0_18px_40px_-28px_rgba(197,164,109,0.45)] sm:p-7"><p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-gold-light">Membresía LITIGO</p><div className="mt-8 space-y-4 text-sm text-white/85"><p className="flex items-center gap-3"><Check className="h-4 w-4 text-gold-light" />Acceso permanente a abogados</p><p className="flex items-center gap-3"><Check className="h-4 w-4 text-gold-light" />Comunicación directa</p></div><ArrowRight className="mt-8 h-5 w-5 text-gold-light" /></article>
        </div>
      </div>
    </section>
  );
}
