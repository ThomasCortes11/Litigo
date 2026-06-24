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
    <section id="como-funciona" className="relative bg-gradient-to-b from-white via-white to-slate/5 py-32">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 h-80 w-80 rounded-full bg-gold/8 blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-gold/5 blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <div className="mb-16 text-center">
          <span className="section-rule mx-auto" />
          <h2 className="mt-4 font-display text-display-md font-semibold text-ink">
            El proceso,<br />
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">paso a paso.</span>
          </h2>
        </div>

        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Premium timeline line */}
          <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent lg:block" aria-hidden="true" />

          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative"
              style={{
                animation: `slideInUp 0.7s ease-out forwards`,
                animationDelay: `${idx * 0.15}s`,
              }}
            >
              <div className="relative z-20 mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 border border-gold/30 shadow-lg shadow-gold/10">
                <span className="font-display text-2xl font-bold text-gold">{step.number}</span>
              </div>
              <div className="rounded-lg bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border border-white/40 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-slate/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
