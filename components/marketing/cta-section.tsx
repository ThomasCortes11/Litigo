import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="bg-ink py-20">
      <div className="container flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl font-display text-3xl font-semibold text-paper sm:text-4xl">
          Tu respaldo legal puede estar activo hoy mismo
        </h2>
        <p className="max-w-xl text-paper/70">
          Completa tu afiliacion en linea, sin filas ni papeleo presencial.
        </p>
        <Button asChild variant="gold" size="lg">
          <Link href="/afiliacion">Afiliarme ahora</Link>
        </Button>
      </div>
    </section>
  );
}
