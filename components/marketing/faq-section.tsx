const faqs = [
  {
    question: 'Que incluye exactamente la membresia mensual?',
    answer:
      'Incluye asesoria legal continua, revision de documentos y acompanamiento en procesos, segun el alcance descrito en el contrato de afiliacion vigente.',
  },
  {
    question: 'Puedo cancelar mi membresia en cualquier momento?',
    answer:
      'Si. Las condiciones de cancelacion y los plazos aplicables estan descritos en el contrato de afiliacion que aceptas al registrarte.',
  },
  {
    question: 'Que pasa si mi pago no es aprobado?',
    answer:
      'Tu afiliacion queda en estado pendiente y puedes reintentar el pago desde el mismo enlace. No se activa ningun cobro recurrente hasta que el pago sea aprobado.',
  },
  {
    question: 'Como se protegen mis datos personales?',
    answer:
      'Tus datos se tratan conforme a la politica de tratamiento de datos personales de Litigo, disponible para consulta antes de completar tu afiliacion.',
  },
  {
    question: 'Recibo algun comprobante de mi afiliacion?',
    answer:
      'Si. Al activarse tu membresia recibes un correo de confirmacion con tu codigo unico de afiliado.',
  },
];

export function FaqSection() {
  return (
    <section id="preguntas-frecuentes" className="bg-paper py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-dark">Preguntas frecuentes</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Lo que necesitas saber antes de afiliarte
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl divide-y divide-border">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base font-medium text-ink">
                {faq.question}
                <span className="ml-4 text-gold-dark transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
