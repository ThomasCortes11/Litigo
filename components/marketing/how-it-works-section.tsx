const steps = [
  { n: '01', title: 'Revisa la información',   desc: 'Lee los beneficios, el contrato y los documentos legales desde el sitio.' },
  { n: '02', title: 'Completa el registro',     desc: 'Ingresa tus datos y acepta los documentos. Todo en línea, sin desplazarte.' },
  { n: '03', title: 'Realiza el pago',          desc: 'Paga de forma segura a través de Wompi, pasarela de pagos certificada.' },
  { n: '04', title: 'Tu membresía inicia',      desc: 'Activación automática al confirmar el pago. Recibes tu código por correo.' },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-white py-32">
      <div className="container">

        <div className="mb-20">
          <span className="section-rule" aria-hidden="true" />
          <h2 className="font-display text-section text-ink">
            El proceso,<br />paso a paso.
          </h2>
        </div>

        <div className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Línea conectora horizontal visible solo en desktop */}
          <div
            className="absolute left-0 right-0 top-[0.65rem] hidden h-px bg-border lg:block"
            aria-hidden="true"
          />

          {steps.map((s) => (
            <div key={s.n} className="relative">
              {/* Número sobre la línea con fondo que la interrumpe */}
              <span className="relative z-10 inline-block bg-white pr-3 font-mono text-[0.6875rem] tracking-[0.14em] text-gold">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-title text-ink">{s.title}</h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
