const steps = [
  { n: '01', title: 'Revisa la información',   desc: 'Lee los beneficios, el contrato y los documentos legales desde el sitio.' },
  { n: '02', title: 'Completa el registro',     desc: 'Ingresa tus datos y acepta los documentos. Todo en línea, sin desplazarte.' },
  { n: '03', title: 'Realiza el pago',          desc: 'Paga de forma segura a través de Wompi, pasarela de pagos certificada.' },
  { n: '04', title: 'Tu membresía inicia',      desc: 'Activación automática al confirmar el pago. Recibes tu código por correo.' },
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
            className="absolute left-6 right-6 top-[1rem] hidden h-px bg-border lg:block"
            aria-hidden="true"
          />

          {steps.map((s) => (
            <div key={s.n} className="relative rounded-xl border border-border/80 bg-paper/35 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card lg:min-h-[220px]">
              {/* Número sobre la línea con fondo que la interrumpe */}
              <span className="relative z-10 inline-flex h-7 items-center rounded-full border border-gold/40 bg-white px-3 font-mono text-[0.67rem] tracking-[0.14em] text-gold-dark">
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
