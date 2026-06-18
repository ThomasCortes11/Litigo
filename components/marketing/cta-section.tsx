import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="grain-overlay bg-ink py-28">
      <div className="container max-w-2xl">
        <span className="section-rule" />
        <h2 className="font-display text-display-md font-semibold text-paper">
          Tu respaldo legal puede estar activo hoy mismo.
        </h2>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-paper/55">
          Completa tu afiliacion en linea. Sin filas, sin papeleo presencial, sin permanencia forzosa.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Button asChild variant="gold" size="lg" className="shadow-gold-glow">
            <Link href="/afiliacion">Afiliarme ahora</Link>
          </Button>
          <a href="mailto:soporte@litigo.com.co" className="text-sm text-paper/45 underline underline-offset-4 hover:text-paper/70">
            Tengo preguntas
          </a>
        </div>
      </div>
    </section>
  );
}
