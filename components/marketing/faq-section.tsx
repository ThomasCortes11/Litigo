import { Plus } from 'lucide-react';

const faqs = [
  {
    q: '¿Qué incluye la membresía mensual?',
    a: 'Incluye asesoría legal continua, revisión de documentos y acompañamiento en procesos, según el alcance descrito en el contrato de afiliación vigente.',
  },
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí. Las condiciones de cancelación y los plazos aplicables están descritos en el contrato de afiliación que aceptas al registrarte.',
  },
  {
    q: '¿Qué pasa si mi pago no es aprobado?',
    a: 'Tu afiliación queda en estado pendiente y puedes reintentar el pago desde el mismo enlace. No se activa ningún cobro recurrente hasta que el pago sea aprobado.',
  },
  {
    q: '¿Cómo se protegen mis datos personales?',
    a: 'Tus datos se tratan conforme a la política de tratamiento de datos de Litigo y en cumplimiento de la Ley 1581 de 2012.',
  },
  {
    q: '¿Recibo algún comprobante de afiliación?',
    a: 'Sí. Al activarse tu membresía recibes un correo de confirmación con tu código único de afiliado y la vigencia de la membresía.',
  },
];

export function FaqSection() {
  return (
    <section id="preguntas-frecuentes" className="bg-white py-32">
      <div className="container">

        <div className="mb-20">
          <span className="section-rule" aria-hidden="true" />
          <h2 className="font-display text-section text-ink">
            Consultas frecuentes.
          </h2>
        </div>

        {/* Lista limpia de acordeones — sin contenedor de card */}
        <div className="mx-auto max-w-2xl">
          {faqs.map((faq, i) => (
            <details
              key={faq.q}
              className={`group py-5 ${i === 0 ? 'border-t border-border' : ''} border-b border-border`}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[0.9375rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                <span>{faq.q}</span>
                <Plus
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3.5 text-[0.875rem] leading-relaxed text-slate">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
