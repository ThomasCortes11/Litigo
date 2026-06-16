const steps = [
  {
    number: '01',
    title: 'Conoce la membresia',
    description: 'Revisa beneficios, terminos, contrato y politica de datos antes de afiliarte.',
  },
  {
    number: '02',
    title: 'Completa el formulario',
    description: 'Ingresa tus datos y acepta los documentos legales requeridos.',
  },
  {
    number: '03',
    title: 'Realiza el pago',
    description: 'Paga de forma segura a traves de la pasarela Wompi.',
  },
  {
    number: '04',
    title: 'Activacion automatica',
    description: 'Tu membresia se activa al instante y recibes tu codigo de afiliado por correo.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-white py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-dark">Proceso de afiliacion</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Listo en menos de tres minutos
          </h2>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <span className="font-mono text-4xl font-medium text-gold/40">{step.number}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="mt-6 hidden h-px w-full bg-border lg:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
