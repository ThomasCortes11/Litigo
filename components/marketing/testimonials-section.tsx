const testimonials = [
  {
    quote:
      'Tener un canal directo con un abogado, sin pagar por cada llamada, me dio tranquilidad para manejar varios temas pendientes.',
    name: 'Maria Fernanda T.',
    role: 'Afiliada independiente',
  },
  {
    quote:
      'El proceso de afiliacion fue mucho mas rapido de lo que esperaba. En minutos quede activa y con todo claro por escrito.',
    name: 'Carlos A.',
    role: 'Afiliado, sector comercio',
  },
  {
    quote:
      'Valoro que la revision de documentos sea parte de la membresia. Evite firmar un contrato con condiciones desfavorables.',
    name: 'Laura M.',
    role: 'Afiliada, pequena empresa',
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-dark">Testimonios</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Afiliados que ya confian en Litigo
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="rounded-lg border border-border bg-paper p-7">
              <blockquote className="font-display text-base leading-relaxed text-ink">
                "{testimonial.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4 text-sm">
                <span className="font-semibold text-ink">{testimonial.name}</span>
                <span className="block text-slate">{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
