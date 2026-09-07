import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function InformativeVideo() {
  return (
    <div className="w-full max-w-[560px]">
      <div className="mb-4 text-center lg:text-left">
        <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-light">Guía rápida</p>
        <h2 className="mt-2 font-display text-3xl leading-tight text-paper sm:text-4xl">Afíliate en un minuto</h2>
        <p className="mt-2 text-sm leading-relaxed text-paper/70">Mira el paso a paso y descubre cómo iniciar tu solicitud.</p>
      </div>
      <div className="mx-auto flex h-[min(55vh,620px)] min-h-[390px] w-fit max-w-full justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#102B43]/75 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.65)] ring-1 ring-gold/10 sm:h-[min(62vh,680px)]">
        <video
          className="h-full w-auto max-w-full object-contain"
          controls
          playsInline
          preload="metadata"
          aria-label="Video informativo sobre cómo afiliarse a Litigo"
        >
          <source src="/videos/video-informativo.mp4" type="video/mp4" />
          Tu navegador no puede reproducir este video. Puedes iniciar tu afiliación desde el botón Afiliarme ahora.
        </video>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────── */
export async function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="grain-overlay overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#163A5F_0%,#0B0D0F_52%,#050607_100%)]">
      <div className="container grid min-h-[auto] items-center gap-6 rounded-[24px] border border-white/10 bg-black/15 px-5 py-8 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:gap-10 sm:rounded-[32px] sm:px-8 sm:py-14 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[1.02fr,0.98fr] lg:items-start lg:gap-12 lg:px-10 lg:py-10">

        {/* ── Texto ───────────────────────────── */}
        <div className="order-last lg:order-first" style={{ animation: 'fadeUp 0.7s ease-out forwards' }}>
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
              className="cta-pulse inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-[#8CC4EF]/60 bg-[#1D4E7A] px-8 text-[1.05rem] font-bold tracking-wide text-white shadow-[0_18px_40px_-14px_rgba(111,166,209,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2F6A96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Afiliarme ahora
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
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

        {/* ── Video informativo ────────────────── */}
        <div className="order-first flex justify-center lg:order-last lg:-translate-y-2" style={{ animation: 'fadeUp 0.85s 0.12s ease-out both' }}>
          <InformativeVideo />
        </div>
      </div>
    </section>
  );
}
