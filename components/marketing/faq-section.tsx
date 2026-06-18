import { Plus } from 'lucide-react';

const faqs = [
  {
    question: '¿Que incluye la membresia mensual?',
    answer:
      'Incluye asesoria legal continua, revision de documentos y acompanamiento en procesos, segun el alcance descrito en el contrato de afiliacion vigente.',
  },
  {
    question: '¿Puedo cancelar mi membresia en cualquier momento?',
    answer:
      'Si. Las condiciones de cancelacion y los plazos aplicables estan descritos en el contrato de afiliacion que aceptas al registrarte.',
  },
  {
    question: '¿Que pasa si mi pago no es aprobado?',
    answer:
      'Tu afiliacion queda en estado pendiente y puedes reintentar el pago desde el mismo enlace. No se activa ningun cobro recurrente hasta que el pago sea aprobado.',
  },
  {
    question: '¿Como se protegen mis datos personales?',
    answer:
      'Tus datos se tratan conforme a la politica de tratamiento de datos personales de Litigo, disponible para consulta antes de completar tu afiliacion, y en cumplimiento de la Ley 1581 de 2012.',
  },
  {
    question: '¿Recibo algun comprobante de mi afiliacion?',
    answer:
      'Si. Al activarse tu membresia recibes un correo de confirmacion con tu codigo unico de afiliado y la vigencia de la membresia.',
  },
];

export function FaqSection() {
  return (
    <section id="preguntas-frecuentes" className="bg-white py-28">
      <div className="container">
        <div className="mb-14">
          <span className="section-rule" />
          <h2 className="font-display text-display-md font-semibold text-ink">
            Consultas frecuentes.
          </h2>
        </div>

        <div className="mx-auto max-w-2xl">
          {faqs.map((faq, idx) => (
            <details
              key={faq.question}
              className={`group border-t border-border py-5 ${idx === faqs.length - 1 ? 'border-b' : ''}`}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[0.9375rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <Plus
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-slate">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
