import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Pagina no encontrada — Litigo' };

export default function NotFound() {
  return (
    <div className="grain-overlay flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <span className="section-rule" aria-hidden="true" />
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-light">Error 404</p>
      <h1 className="mt-3 font-display text-display-md font-semibold text-paper">
        Esta pagina no existe.
      </h1>
      <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-paper/55">
        Es posible que el enlace este desactualizado o que la pagina haya sido movida.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="gold" size="lg" className="shadow-gold-glow">
          <Link href="/">Volver al inicio</Link>
        </Button>
        <a
          href="mailto:soporte@litigo.com.co"
          className="text-sm text-paper/45 underline underline-offset-4 hover:text-paper/70"
        >
          Contactar soporte
        </a>
      </div>
    </div>
  );
}
