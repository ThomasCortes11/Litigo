const steps = [
  { n: '01', title: 'Cuéntanos tu situación', desc: 'Registra tus datos básicos y completa un perfilamiento jurídico sencillo.' },
  { n: '02', title: 'Recibe una asesoría inicial', desc: 'Nuestro equipo revisa la información y te contacta para entender mejor tu necesidad.' },
  { n: '03', title: 'Evaluamos tu perfil', desc: 'La solicitud pasa por una revisión interna. La aprobación no es automática ni está garantizada.' },
  { n: '04', title: 'Activa tu membresía', desc: 'Si tu perfil es aprobado, podrás revisar la oferta y pagar de forma segura con Wompi.' },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="section-shell bg-white py-20 sm:py-24 lg:py-28">
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
            className="absolute left-6 right-6 top-[1rem] hidden h-px bg-gradient-to-r from-gold/60 via-border to-gold/60 lg:block"
            aria-hidden="true"
          />

          {steps.map((s) => (
            <div key={s.n} className="relative rounded-lg border border-border/80 bg-paper/35 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#2F5D7C]/30 hover:bg-white hover:shadow-card lg:min-h-[238px]">
              {/* Número sobre la línea con fondo que la interrumpe */}
              <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-white font-mono text-[0.67rem] tracking-[0.14em] text-gold-dark shadow-sm">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-title text-ink">{s.title}</h3>
              <p className="mt-2 text-[0.835rem] leading-relaxed text-slate">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
