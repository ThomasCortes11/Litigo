import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/marketing/fade-in';

export function CtaSection() {
  return (
    <section className="grain-overlay bg-ink py-20">
      <FadeIn className="container flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl font-display text-3xl font-semibold text-paper sm:text-4xl">
          Tu respaldo legal puede estar activo hoy mismo
        </h2>
        <p className="max-w-xl text-paper/70">
          Completa tu afiliacion en linea, sin filas ni papeleo presencial.
        </p>
        <Button asChild variant="gold" size="lg" className="shadow-gold-glow">
          <Link href="/afiliacion">Afiliarme ahora</Link>
        </Button>
        <p className="text-xs text-paper/45">Sin permanencia forzosa - cancela cuando quieras</p>
      </FadeIn>
    </section>
  );
}
