import Link from 'next/link';
import { Button } from '@/components/ui/button';

function SealEmblem() {
  const ticks = Array.from({ length: 40 }, (_, i) => i * 9);

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full max-w-md" aria-hidden="true">
      <circle cx="200" cy="200" r="188" fill="none" stroke="#A9844C" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="160" fill="none" stroke="#A9844C" strokeOpacity="0.5" strokeWidth="1" />
      {ticks.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 200 + 160 * Math.cos(rad);
        const y1 = 200 + 160 * Math.sin(rad);
        const x2 = 200 + 172 * Math.cos(rad);
        const y2 = 200 + 172 * Math.sin(rad);
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#A9844C"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
        );
      })}
      <text
        x="200"
        y="195"
        textAnchor="middle"
        fontSize="64"
        fontFamily="Fraunces, serif"
        fontWeight="600"
        fill="#F7F5F0"
      >
        L
      </text>
      <text
        x="200"
        y="232"
        textAnchor="middle"
        fontSize="13"
        letterSpacing="3"
        fontFamily="IBM Plex Mono, monospace"
        fill="#C7A668"
      >
        MEMBRESIA JURIDICA
      </text>
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="bg-ink text-paper">
      <div className="container grid items-center gap-16 py-20 lg:grid-cols-[1.15fr,1fr] lg:py-28">
        <div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-gold-light">
            Membresia juridica mensual
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Asesoria legal permanente, sin sorpresas en la factura.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg">
            Afiliate a Litigo y obten respaldo juridico continuo para ti o tu empresa, con un proceso de
            ingreso que se completa en linea en menos de tres minutos.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild variant="gold" size="lg">
              <Link href="/afiliacion">Afiliarme ahora</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-paper/30 text-paper hover:bg-paper/10">
              <Link href="#beneficios">Conocer beneficios</Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <SealEmblem />
        </div>
      </div>
    </section>
  );
}
