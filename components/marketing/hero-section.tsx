import Link from 'next/link';
import { ShieldCheck, Lock, Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function SealEmblem() {
  const ticks = Array.from({ length: 40 }, (_, i) => i * 9);

  return (
    <div className="relative flex h-full w-full max-w-md items-center justify-center">
      {/* Resplandor suave detras del sello */}
      <div
        className="absolute h-72 w-72 rounded-full bg-gold/20 blur-3xl"
        aria-hidden="true"
      />
      <svg viewBox="0 0 400 400" className="relative h-full w-full" aria-hidden="true">
        <circle cx="200" cy="200" r="196" fill="none" stroke="#A9844C" strokeOpacity="0.18" strokeWidth="1" />
        <g className="origin-center animate-[spin_70s_linear_infinite]" style={{ transformOrigin: '200px 200px' }}>
          <circle cx="200" cy="200" r="180" fill="none" stroke="#A9844C" strokeOpacity="0.4" strokeWidth="1.25" />
          {ticks.map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 200 + 165 * Math.cos(rad);
            const y1 = 200 + 165 * Math.sin(rad);
            const x2 = 200 + 178 * Math.cos(rad);
            const y2 = 200 + 178 * Math.sin(rad);
            return (
              <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#A9844C" strokeOpacity="0.5" strokeWidth="1.5" />
            );
          })}
        </g>
        <circle cx="200" cy="200" r="148" fill="none" stroke="#A9844C" strokeOpacity="0.55" strokeWidth="1" />
        <text x="200" y="194" textAnchor="middle" fontSize="62" fontFamily="Fraunces, serif" fontWeight="600" fill="#F7F5F0">
          L
        </text>
        <line x1="160" y1="218" x2="240" y2="218" stroke="#C7A668" strokeOpacity="0.6" strokeWidth="1" />
        <text x="200" y="240" textAnchor="middle" fontSize="12" letterSpacing="3" fontFamily="IBM Plex Mono, monospace" fill="#C7A668">
          MEMBRESIA JURIDICA
        </text>
      </svg>
    </div>
  );
}

const trustItems = [
  { icon: ShieldCheck, label: 'Pago seguro con Wompi' },
  { icon: Lock, label: 'Datos protegidos' },
  { icon: Clock3, label: 'Activacion inmediata' },
];

export function HeroSection() {
  return (
    <section className="grain-overlay overflow-hidden bg-ink text-paper">
      <div className="container grid items-center gap-16 py-20 lg:grid-cols-[1.15fr,1fr] lg:py-28">
        <div className="animate-[fadeUp_0.8s_ease-out_forwards] [animation-delay:80ms] [opacity:0]">
          <p className="mb-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold-light">
            <span className="h-px w-5 bg-gold-light/70" />
            Membresia juridica mensual
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
            Asesoria legal permanente, sin sorpresas en la factura.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg">
            Afiliate a Litigo y obten respaldo juridico continuo para ti o tu empresa, con un proceso de
            ingreso que se completa en linea en menos de tres minutos.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild variant="gold" size="lg" className="shadow-gold-glow">
              <Link href="/afiliacion">Afiliarme ahora</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-paper/30 text-paper hover:bg-paper/10">
              <Link href="#beneficios">Conocer beneficios</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <span key={item.label} className="inline-flex items-center gap-2 text-xs text-paper/65">
                  <Icon className="h-4 w-4 text-gold-light" strokeWidth={1.75} />
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center [animation-delay:200ms] [opacity:0] animate-[fadeUp_0.9s_ease-out_forwards] lg:justify-end">
          <SealEmblem />
        </div>
      </div>
    </section>
  );
}
