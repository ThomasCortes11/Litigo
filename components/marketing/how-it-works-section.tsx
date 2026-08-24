const steps = [
  { n: '01', title: 'Cuéntanos tu situación', desc: 'Registra tus datos básicos y completa un perfilamiento jurídico sencillo.' },
  { n: '02', title: 'Recibe una asesoría inicial', desc: 'Nuestro equipo revisa la información y te contacta para entender mejor tu necesidad.' },
  { n: '03', title: 'Evaluamos tu perfil', desc: 'La solicitud pasa por una revisión interna. La aprobación no es automática ni está garantizada.' },
  { n: '04', title: 'Activa tu membresía', desc: 'Si tu perfil es aprobado, podrás revisar la oferta y pagar de forma segura con Wompi.' },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="section-shell relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#2F5D7C]/8 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-12 h-64 w-64 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
      <div className="container">

        <div className="mb-14 sm:mb-16 lg:mb-20">
          <span className="section-rule" aria-hidden="true" />
          <h2 className="font-display text-section text-ink">
            El proceso,<br />paso a paso.
          </h2>
        </div>

        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Línea conectora horizontal visible solo en desktop */}
          <div
            className="absolute left-8 right-8 top-[1.15rem] hidden h-px bg-gradient-to-r from-gold/55 via-[#C8D2DE] to-gold/55 lg:block"
            aria-hidden="true"
          />

          {steps.map((s) => (
            <div key={s.n} className="group relative rounded-xl border border-border/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,243,238,0.7))] p-6 shadow-[0_14px_28px_-24px_rgba(11,13,15,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2F5D7C]/35 hover:shadow-[0_22px_44px_-26px_rgba(22,58,95,0.35)] lg:min-h-[248px]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              {/* Número sobre la línea con fondo que la interrumpe */}
              <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/55 bg-white font-mono text-[0.67rem] tracking-[0.14em] text-gold-dark shadow-sm transition-transform duration-300 group-hover:scale-105">
                {s.n}
              </span>
              <h3 className="mt-4 max-w-[18ch] font-display text-title text-ink">{s.title}</h3>
              <p className="mt-2 text-[0.835rem] leading-relaxed text-slate">{s.desc}</p>

              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[#C7D2DE] to-transparent" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
