import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';
import { prisma } from '@/lib/prisma';

/* ─────────────────────────────────────────────
   Sello SVG — renderizado en servidor (sin JS)
───────────────────────────────────────────── */
function SealEmblem() {
  const ticks = Array.from({ length: 48 }, (_, i) => i * 7.5);
  return (
    <div className="relative flex items-center justify-center" aria-hidden="true">
      <div className="absolute h-72 w-72 rounded-full bg-gold/[0.08] blur-[80px]" />
      <svg viewBox="0 0 400 400" className="relative w-full max-w-[300px]" role="img" aria-label="Emblema Litigo">
        <circle cx="200" cy="200" r="192" fill="none" stroke="#9A7540" strokeOpacity="0.1" strokeWidth="1" />
        <g style={{ transformOrigin: '200px 200px', animation: 'seal 90s linear infinite' }}>
          {ticks.map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const major = angle % 30 === 0;
            const r1    = major ? 156 : 162;
            return (
              <line key={angle}
                x1={200 + r1        * Math.cos(rad)} y1={200 + r1        * Math.sin(rad)}
                x2={200 + 172       * Math.cos(rad)} y2={200 + 172       * Math.sin(rad)}
                stroke="#9A7540"
                strokeOpacity={major ? 0.5 : 0.18}
                strokeWidth={major ? 1.5 : 0.75}
              />
            );
          })}
        </g>
        <circle cx="200" cy="200" r="148" fill="none" stroke="#9A7540" strokeOpacity="0.28" strokeWidth="0.75" />
        <circle cx="200" cy="200" r="130" fill="none" stroke="#9A7540" strokeOpacity="0.10" strokeWidth="0.5" />
        <text x="200" y="207" textAnchor="middle" dominantBaseline="middle"
              fontSize="80" fontFamily="Cormorant Garamond, Georgia, serif"
              fontWeight="300" fill="#F5F3EE">L</text>
        <line x1="166" y1="230" x2="234" y2="230" stroke="#B8956A" strokeOpacity="0.4" strokeWidth="0.75" />
        <text x="200" y="248" textAnchor="middle" fontSize="9" letterSpacing="4.5"
              fontFamily="IBM Plex Mono, monospace" fill="#B8956A" fillOpacity="0.65">LITIGO</text>
        <style>{`@keyframes seal { to { transform: rotate(360deg); } }`}</style>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Teléfono desde base de datos (SSR)
───────────────────────────────────────────── */
const PHONE_FALLBACK = '+57 300 000 0000';

async function getSupportPhone(): Promise<string> {
  try {
    const s = await prisma.setting.findUnique({ where: { key: 'support_phone' } });
    return s?.value?.trim() || PHONE_FALLBACK;
  } catch {
    return PHONE_FALLBACK;
  }
}

function toWaDigits(phone: string) {
  return phone.replace(/[^\d]/g, '');
}

/* ─────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────── */
export async function HeroSection() {
  const phone        = await getSupportPhone();
  const phoneHref    = `tel:${phone.replace(/\s/g, '')}`;
  const waHref       = `https://wa.me/${toWaDigits(phone)}?text=${encodeURIComponent('Hola, quiero información sobre la membresía jurídica de Litigo.')}`;

  return (
    <section aria-labelledby="hero-heading" className="grain-overlay overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(23,41,63,0.95)_0%,rgba(12,24,40,0.97)_45%,#06090d_100%)]">
      <div className="container grid min-h-[90vh] items-center gap-16 rounded-[32px] border border-white/10 bg-black/15 px-6 py-16 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:px-8 sm:py-20 lg:grid-cols-[1.02fr,340px] lg:px-10 lg:py-16">

        {/* ── Texto ───────────────────────────── */}
        <div style={{ animation: 'fadeUp 0.7s ease-out forwards' }}>
          <div className="mb-5 inline-flex items-center rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold-light">
            Membresía jurídica mensual
          </div>
          <span className="section-rule" aria-hidden="true" />

          <h1 id="hero-heading" className="max-w-[11.5ch] font-display text-[clamp(2.7rem,5vw,4.15rem)] leading-[0.95] tracking-[-0.02em] text-paper">
            Asesoría jurídica permanente y preventiva
          </h1>
          <p className="mt-4 max-w-[42ch] text-[1rem] font-semibold leading-relaxed text-paper/88">Protección legal continua, representación experta y gestión efectiva de tus reclamaciones.</p>

          <p className="mt-5 max-w-[48ch] text-[0.95rem] font-light leading-[1.8] text-paper/76">
            Litigo es una membresía jurídica mensual que te da acceso continuo a un equipo
            de abogados para ti o tu empresa, sin pagar por cada consulta.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {/* CTA primario */}
            <Link
              href="/afiliacion"
              className="cta-pulse inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-gold to-gold-light px-7 text-[0.93rem] font-semibold tracking-wide text-black shadow-gold-glow transition-all duration-200 hover:-translate-y-0.5 hover:from-gold-light hover:to-[#d8b887] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Afiliarme ahora
            </Link>

            {/* CTAs secundarios de contacto */}
            <div className="flex items-center gap-2.5" role="group" aria-label="Contacto directo">
              <a
                href={phoneHref}
                aria-label={`Llamar a Litigo — ${phone}`}
                title={`Llamar: ${phone}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/[0.14] bg-white/[0.02] px-5 text-[0.825rem] font-medium text-paper/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/55 hover:bg-white/[0.06] hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/35"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: '#B8956A' }} strokeWidth={1.5} />
                Llamar
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir a Litigo por WhatsApp"
                title="WhatsApp de Litigo"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/[0.14] bg-white/[0.02] px-5 text-[0.825rem] font-medium text-paper/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/55 hover:bg-white/[0.06] hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/35"
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0" style={{ color: '#B8956A' }} strokeWidth={1.5} />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Señales de confianza */}
          <ul
            aria-label="Garantías de seguridad"
            className="mt-10 flex flex-wrap gap-x-7 gap-y-2.5"
          >
            {['Pago seguro con Wompi', 'Datos bajo Ley 1581', 'Activación inmediata'].map((label) => (
              <li key={label} className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[0.76rem] font-light text-paper/60">
                {label}
              </li>
            ))}
          </ul>

          {/* Informational panel removed as requested */}
        </div>

        {/* ── Sello ───────────────────────────── */}
        <div className="hidden lg:flex lg:justify-center" style={{ animation: 'fadeUp 0.85s 0.12s ease-out both' }}>
          <SealEmblem />
        </div>
      </div>
    </section>
  );
}
