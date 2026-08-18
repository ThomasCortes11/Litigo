import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import justiciaImage from '@/components/img/Justicia.png';

function JusticeVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-full lg:max-w-[520px]" aria-label="Sello visual de justicia de Litigo" role="img">
      <div className="absolute inset-[8%] rounded-full bg-gold/10 blur-[70px]" aria-hidden="true" />
      <Image
        src={justiciaImage}
        alt="Martillo jurídico frente a un tribunal clásico, dentro de un sello dorado"
        fill
        priority
        sizes="(max-width: 1023px) 82vw, 520px"
        className="relative object-contain"
      />
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
    <section aria-labelledby="hero-heading" className="grain-overlay overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#163A5F_0%,#0B0D0F_52%,#050607_100%)]">
      <div className="container grid min-h-[90vh] items-center gap-10 rounded-[32px] border border-white/10 bg-black/15 px-6 py-12 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:px-8 sm:py-16 lg:grid-cols-[1.02fr,0.98fr] lg:gap-12 lg:px-10 lg:py-14">

        {/* ── Texto ───────────────────────────── */}
        <div style={{ animation: 'fadeUp 0.7s ease-out forwards' }}>
            <div className="mb-5 inline-flex items-center rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold-light">
            Asesoría inicial gratuita
          </div>
          <span className="section-rule" aria-hidden="true" />

          <h1 id="hero-heading" className="max-w-[11.5ch] font-display text-[clamp(2.7rem,5vw,4.15rem)] leading-[0.95] tracking-[-0.02em] text-paper">
            Soluciones jurídicas con experiencia
          </h1>
          <p className="mt-4 max-w-[42ch] text-[1rem] font-semibold leading-relaxed text-[#F5F3EE]">Protegemos tus intereses y evaluamos contigo el camino jurídico adecuado.</p>

          <p className="mt-5 max-w-[48ch] text-[0.95rem] font-light leading-[1.8] text-[rgba(245,243,238,0.76)]">
            Litigo comienza con una conversación clara: conocemos tu situación, perfilamos tu necesidad y un equipo jurídico revisa si la membresía es adecuada para ti.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {/* CTA primario */}
            <Link
              href="/afiliacion"
              className="cta-pulse inline-flex h-12 items-center justify-center rounded-lg bg-[#163A5F] px-7 text-[0.93rem] font-semibold tracking-wide text-white shadow-[0_16px_36px_-16px_rgba(22,58,95,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2F5D7C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
            {['Asesoría inicial gratuita', 'Datos bajo Ley 1581', 'Evaluación previa'].map((label) => (
              <li key={label} className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[0.76rem] font-light text-paper/60">
                {label}
              </li>
            ))}
          </ul>

          {/* Informational panel removed as requested */}
        </div>

        {/* ── Sello ───────────────────────────── */}
        <div className="flex justify-center" style={{ animation: 'fadeUp 0.85s 0.12s ease-out both' }}>
          <JusticeVisual />
        </div>
      </div>
    </section>
  );
}
