import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="grain-overlay bg-ink py-32">
      <div className="container max-w-2xl">
        <span className="section-rule" aria-hidden="true" />
        <h2 className="font-display text-section font-light text-paper">
          Tu respaldo legal puede estar activo hoy mismo.
        </h2>
        <p className="mt-5 max-w-[44ch] text-[0.9375rem] font-light leading-[1.85] text-paper/45">
          Completa tu afiliación en línea. Sin filas, sin papeleo presencial, sin permanencia forzosa.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link
            href="/afiliacion"
            className="inline-flex h-12 items-center justify-center rounded px-7 text-[0.875rem] font-medium tracking-wide text-white bg-gold shadow-gold-glow transition-colors duration-200 hover:bg-gold-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Afiliarme ahora
          </Link>
          <a
            href="mailto:soporte@litigo.com.co"
            className="text-[0.8125rem] font-light text-paper/40 underline underline-offset-4 hover:text-paper/65 transition-colors"
          >
            Tengo preguntas
          </a>
        </div>
      </div>
    </section>
  );
}
