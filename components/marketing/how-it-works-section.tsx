const steps = [
  {
    number: '01',
    title: 'Revisa la informacion',
    description: 'Conoce los beneficios, lee el contrato y los documentos legales en el sitio.',
  },
  {
    number: '02',
    title: 'Completa el registro',
    description: 'Ingresa tus datos, acepta los documentos legales y envia el formulario.',
  },
  {
    number: '03',
    title: 'Realiza el pago',
    description: 'Paga de forma segura a traves de Wompi, plataforma de pagos certificada.',
  },
  {
    number: '04',
    title: 'Tu membresia inicia',
    description: 'Activacion automatica al confirmar el pago. Recibes tu codigo por correo.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-white py-28">
      <div className="container">
        <div className="mb-14">
          <span className="section-rule" />
          <h2 className="font-display text-display-md font-semibold text-ink">
            El proceso, paso a paso.
          </h2>
        </div>

        <div className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Linea conectora desktop */}
          <div className="absolute left-0 right-0 top-[10px] hidden h-px bg-border lg:block" aria-hidden="true" />

          {steps.map((step) => (
            <div key={step.number} className="relative">
              {/* Numero con fondo que cubre la linea horizontal */}
              <span className="relative z-10 inline-block bg-white pr-4 font-mono text-[0.7rem] tracking-[0.12em] text-gold">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-slate">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
