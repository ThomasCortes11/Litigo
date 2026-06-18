import { Star } from 'lucide-react';
import { FadeIn } from '@/components/marketing/fade-in';

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

function initialsOf(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function TestimonialsSection() {
  return (
    <section className="bg-white py-24">
      <div className="container">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-dark">Testimonios</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Afiliados que ya confian en Litigo
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex h-full flex-col rounded-lg border border-border bg-paper p-7 transition-shadow hover:shadow-card"
            >
              <div className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 font-display text-base leading-relaxed text-ink">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs font-medium text-paper">
                  {initialsOf(testimonial.name)}
                </span>
                <span className="text-sm">
                  <span className="block font-semibold text-ink">{testimonial.name}</span>
                  <span className="block text-xs text-slate">{testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
