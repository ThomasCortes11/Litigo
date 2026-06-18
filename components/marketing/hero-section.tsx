import Link from 'next/link';
import { ShieldCheck, Lock, Clock3, Phone, MessageCircle } from 'lucide-react';

/**
 * SealEmblem — emblema SVG del bufete.
 * Se renderiza en el servidor (no necesita JS en cliente).
 * La animación CSS de rotación vive dentro del propio SVG para evitar
 * dependencias de Framer Motion o JS de hidratación.
 */
function SealEmblem() {
  const ticks = Array.from({ length: 48 }, (_, i) => i * 7.5);
  return (
    <div className="relative flex items-center justify-center" aria-hidden="true">
      {/* Halo ambiental */}
      <div className="absolute h-72 w-72 rounded-full bg-gold/10 blur-[72px]" />
      <svg
        viewBox="0 0 400 400"
        className="relative w-full max-w-[320px]"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Emblema de Litigo"
      >
        {/* Anillo exterior estático */}
        <circle cx="200" cy="200" r="192"
          fill="none" stroke="#9E7A3F" strokeOpacity="0.12" strokeWidth="1" />

        {/* Anillo giratorio de ticks */}
        <g style={{ transformOrigin: '200px 200px', animation: 'seal-spin 90s linear infinite' }}>
          {ticks.map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const isMajor = angle % 30 === 0;
            const r1 = isMajor ? 156 : 161;
            return (
              <line
                key={angle}
                x1={200 + r1 * Math.cos(rad)}      y1={200 + r1 * Math.sin(rad)}
                x2={200 + 172 * Math.cos(rad)}     y2={200 + 172 * Math.sin(rad)}
                stroke="#9E7A3F"
                strokeOpacity={isMajor ? 0.55 : 0.22}
                strokeWidth={isMajor ? 1.5 : 0.75}
              />
            );
          })}
        </g>

        {/* Anillos interiores */}
        <circle cx="200" cy="200" r="148"
          fill="none" stroke="#9E7A3F" strokeOpacity="0.32" strokeWidth="0.75" />
        <circle cx="200" cy="200" r="130"
          fill="none" stroke="#9E7A3F" strokeOpacity="0.12" strokeWidth="0.5" />

        {/* Monograma */}
        <text x="200" y="200" textAnchor="middle" dominantBaseline="middle"
              fontSize="78" fontFamily="Cormorant Garamond, Georgia, serif"
              fontWeight="600" fill="#F8F6F1">
          L
        </text>
        <line x1="164" y1="228" x2="236" y2="228"
              stroke="#BFA06A" strokeOpacity="0.45" strokeWidth="0.75" />
        <text x="200" y="246" textAnchor="middle"
              fontSize="9" letterSpacing="4.5"
              fontFamily="IBM Plex Mono, monospace"
              fill="#BFA06A" fillOpacity="0.7">
          LITIGO
        </text>

        <style>{`
          @keyframes seal-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            g[style*="seal-spin"] { animation: none; }
          }
        `}</style>
      </svg>
    </div>
  );
}

/* ───────────────────────────────────────────────
   Datos de contacto — un único lugar para cambiar
──────────────────────────────────────────────── */
const PHONE_NUMBER   = '+573000000000';    // ← cambiar al numero real
const WHATSAPP_MSG   = encodeURIComponent('Hola, quiero obtener información sobre la membresía jurídica de Litigo.');
const WHATSAPP_HREF  = `https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MSG}`;
const PHONE_HREF     = `tel:${PHONE_NUMBER}`;

/* ───────────────────────────────────────────────
   Señales de confianza (footer del hero)
──────────────────────────────────────────────── */
const trustItems = [
  { icon: ShieldCheck, label: 'Pago seguro certificado' },
  { icon: Lock,        label: 'Datos bajo Ley 1581' },
  { icon: Clock3,      label: 'Activación inmediata' },
] as const;

/* ───────────────────────────────────────────────
   Hero Section
──────────────────────────────────────────────── */
export function HeroSection() {
  return (
    /**
     * <section> con role implícito "region" y aria-labelledby apuntando
     * al H1 — mejora la navegación por landmarks para lectores de pantalla
     * y ayuda a los crawlers a entender la jerarquía de la página.
     */
    <section
      aria-labelledby="hero-heading"
      className="grain-overlay overflow-hidden bg-ink"
    >
      <div className="container grid min-h-[86vh] items-center gap-20 py-24 lg:grid-cols-[1fr,380px] lg:py-0">

        {/* ── Columna de texto ── */}
        <div style={{ animation: 'fadeUp 0.65s ease-out forwards' }}>

          {/* Regla decorativa dorada — marcador editorial de sección */}
          <span className="section-rule" aria-hidden="true" />

          {/**
           * H1 único en la página.
           * "Asesoría legal permanente" como término de búsqueda primario.
           * La coma y el salto de línea son intencionales: Cormorant Garamond
           * con el adjetivo en itálica crea tensión tipográfica sin necesitar
           * gráficos decorativos adicionales.
           */}
          <h1
            id="hero-heading"
            className="font-display text-5xl font-semibold leading-[1.06] tracking-tight text-paper sm:text-6xl lg:text-display-xl"
          >
            Asesoría legal<br />
            <em className="font-normal italic text-gold-light">permanente,</em><br />
            sin sorpresas.
          </h1>

          {/* Párrafo descriptivo — candidato a meta description */}
          <p className="mt-7 max-w-[42ch] text-[0.9375rem] leading-[1.8] text-paper/60">
            Litigo es una membresía jurídica mensual que te da acceso continuo
            a un equipo de abogados para ti o tu empresa, sin pagar por cada consulta.
          </p>

          {/* ── Grupo de CTAs ─────────────────────────────────────────── */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">

            {/**
             * CTA primario: afiliación (conversión principal).
             * Fondo dorado sólido + glow suave para jerarquía máxima.
             */}
            <Link
              href="/afiliacion"
              className={[
                'inline-flex h-12 items-center justify-center gap-2',
                'rounded px-7 text-[0.875rem] font-semibold tracking-wide text-white',
                'bg-gold shadow-gold-glow',
                'transition-colors duration-200 hover:bg-gold-dark',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
              ].join(' ')}
            >
              Afiliarme ahora
            </Link>

            {/**
             * CTAs secundarios: contacto directo.
             * Misma altura (h-12) para alineación perfecta.
             * Bordes finos (border/20 ≈ 5 % opacidad blanca) — casi invisibles
             * en fondos oscuros pero palpables como elemento interactivo.
             * Hover: fondo blanco al 5 % — sutil, sin competir con el CTA primario.
             */}
            <div className="flex items-center gap-3" role="group" aria-label="Contacto directo">

              {/* Llamar */}
              <a
                href={PHONE_HREF}
                aria-label="Llamar a Litigo"
                title="Llamar a Litigo"
                className={[
                  'inline-flex h-12 items-center justify-center gap-2',
                  'rounded border border-white/[0.14] px-5',
                  'text-[0.8125rem] font-medium text-paper/70',
                  'transition-colors duration-200 hover:border-white/25 hover:bg-white/5 hover:text-paper',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
                ].join(' ')}
              >
                <Phone className="h-[0.9rem] w-[0.9rem] flex-shrink-0 text-gold-light/80" strokeWidth={1.5} />
                <span>Llamar</span>
              </a>

              {/* WhatsApp */}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir a Litigo por WhatsApp"
                title="WhatsApp de Litigo"
                className={[
                  'inline-flex h-12 items-center justify-center gap-2',
                  'rounded border border-white/[0.14] px-5',
                  'text-[0.8125rem] font-medium text-paper/70',
                  'transition-colors duration-200 hover:border-white/25 hover:bg-white/5 hover:text-paper',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
                ].join(' ')}
              >
                <MessageCircle className="h-[0.9rem] w-[0.9rem] flex-shrink-0 text-gold-light/80" strokeWidth={1.5} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
          {/* ── Fin CTAs ────────────────────────────────────────────────── */}

          {/**
           * Señales de confianza — <ul> semántica.
           * No son nav ni lista de beneficios: son microtextos de respaldo
           * que reducen la fricción justo antes de la decisión de afiliación.
           */}
          <ul
            aria-label="Garantías de seguridad"
            className="mt-11 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/[0.07] pt-8"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2 text-[0.75rem] text-paper/40">
                <Icon className="h-3.5 w-3.5 flex-shrink-0 text-gold-light/60" strokeWidth={1.5} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
        {/* ── Fin columna texto ── */}

        {/* ── Emblema decorativo — oculto en móvil ── */}
        <div
          className="hidden lg:flex lg:justify-center"
          style={{ animation: 'fadeUp 0.85s 0.1s ease-out both' }}
        >
          <SealEmblem />
        </div>
      </div>
    </section>
  );
}
