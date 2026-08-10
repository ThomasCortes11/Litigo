import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="grain-overlay bg-[radial-gradient(circle_at_15%_15%,#17293f_0%,#0d1b2c_40%,#080f1a_72%)] py-20 sm:py-24 lg:py-28">
      <div className="container max-w-2xl">
        <span className="section-rule" aria-hidden="true" />
        <h2 className="font-display text-section font-light text-paper">
          Tu respaldo legal puede estar activo hoy mismo.
        </h2>
        <p className="mt-5 max-w-[44ch] text-[0.95rem] font-light leading-[1.85] text-paper/65">
          Completa tu afiliación en línea. Sin filas, sin papeleo presencial, sin permanencia forzosa.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link
            href="/afiliacion"
            className="cta-pulse inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-gold to-gold-light px-7 text-[0.89rem] font-semibold tracking-wide text-ink shadow-gold-glow transition-all duration-200 hover:-translate-y-0.5 hover:from-gold-light hover:to-[#d8b887] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Afiliarme ahora
          </Link>
          <a
            href="mailto:soporte@litigo.com.co"
            className="text-[0.84rem] font-medium text-paper/55 underline underline-offset-4 transition-colors hover:text-paper/82"
          >
            Tengo preguntas
          </a>
        </div>
      </div>
    </section>
  );
}
