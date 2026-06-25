const testimonials = [
  {
    quote: 'Tener un canal directo con un abogado, sin pagar por cada llamada, me dio tranquilidad para manejar varios temas pendientes.',
    name:  'María Fernanda T.',
    role:  'Afiliada independiente',
  },
  {
    quote: 'El proceso fue mucho más rápido de lo que esperaba. En minutos quedé activo y con todo claro por escrito.',
    name:  'Carlos A.',
    role:  'Sector comercio',
  },
  {
    quote: 'La revisión de documentos evitó que firmara un contrato con condiciones que no me convenían.',
    name:  'Laura M.',
    role:  'Pequeña empresa',
  },
];

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();
}

export function TestimonialsSection() {
  return (
    <section className="bg-paper py-32">
      <div className="container">

        <div className="mb-20">
          <span className="section-rule" aria-hidden="true" />
          <h2 className="font-display text-section text-ink">
            Lo que dicen<br />nuestros afiliados.
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="m-0 border-t-[1.5px] border-gold pt-7">
              {/* Cita en italica de display — sin comillas decorativas grandes */}
              <blockquote className="font-display text-lg font-light italic leading-[1.65] text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                {/* Avatar con iniciales */}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-[10px] font-medium tracking-wider text-paper">
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block text-[0.8125rem] font-medium text-ink">{t.name}</span>
                  <span className="block text-[0.75rem] font-light text-slate">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
