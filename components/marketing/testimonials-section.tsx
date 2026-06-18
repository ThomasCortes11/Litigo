const testimonials = [
  {
    quote:
      'Tener un canal directo con un abogado, sin pagar por cada llamada, me dio tranquilidad para manejar varios temas pendientes.',
    name: 'Maria Fernanda T.',
    role: 'Afiliada — servicio independiente',
  },
  {
    quote:
      'El proceso de afiliacion fue mucho mas rapido de lo que esperaba. En minutos quede activa y con todo claro por escrito.',
    name: 'Carlos A.',
    role: 'Afiliado — sector comercio',
  },
  {
    quote:
      'Valoro que la revision de documentos este incluida. Evite firmar un contrato con condiciones que no me convenian.',
    name: 'Laura M.',
    role: 'Afiliada — pequena empresa',
  },
];

function initialsOf(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();
}

export function TestimonialsSection() {
  return (
    <section className="bg-paper py-28">
      <div className="container">
        <div className="mb-14">
          <span className="section-rule" />
          <h2 className="font-display text-display-md font-semibold text-ink">
            Lo que dicen nuestros afiliados.
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="border-t-2 border-gold pt-7">
              <blockquote className="font-display text-xl font-normal italic leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-[10px] font-medium tracking-wider text-paper">
                  {initialsOf(t.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{t.name}</span>
                  <span className="block text-xs text-slate">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
