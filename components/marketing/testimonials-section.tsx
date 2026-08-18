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
    <section className="section-shell bg-paper py-20 sm:py-24 lg:py-28">
      <div className="container">

        <div className="mb-14 sm:mb-16 lg:mb-20">
          <span className="section-rule" aria-hidden="true" />
          <h2 className="font-display text-section text-ink">
            Lo que dicen<br />nuestros afiliados.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="relative m-0 rounded-lg border border-border/85 bg-white p-7 shadow-[0_10px_26px_-22px_rgba(11,13,15,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/35 sm:p-8">
              <span className="absolute right-7 top-5 font-display text-4xl leading-none text-gold/45" aria-hidden="true">“</span>
              {/* Cita en italica de display — sin comillas decorativas grandes */}
              <blockquote className="font-display text-[1.15rem] font-light italic leading-[1.65] text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-border/80 pt-5">
                {/* Avatar con iniciales */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#163A5F] font-mono text-[10px] font-medium tracking-wider text-white ring-2 ring-gold/25">
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
