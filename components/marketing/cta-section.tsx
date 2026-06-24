import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink via-ink/95 to-black py-32">
      {/* Premium gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-20 h-96 w-96 rounded-full bg-gold/20 blur-[120px] opacity-20" />
        <div className="absolute -bottom-40 left-40 h-96 w-96 rounded-full bg-gold/15 blur-[120px] opacity-15" />
      </div>

      <div className="grain-overlay" />

      <div className="container relative z-10 max-w-3xl">
        <div className="text-center">
          <span className="section-rule mx-auto" />

          <h2 className="mt-6 font-display text-4xl sm:text-5xl font-bold text-paper leading-tight">
            Tu respaldo legal puede estar
            <span className="block mt-2 bg-gradient-to-r from-gold via-gold to-gold-light bg-clip-text text-transparent">activo hoy mismo.</span>
          </h2>

          <p className="mt-6 text-[0.9375rem] leading-relaxed text-paper/65 max-w-2xl mx-auto">
            Completa tu afiliación en línea en menos de 5 minutos. Sin filas, sin papeleo presencial, sin permanencia forzosa.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/afiliacion"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-gold to-gold-light text-white font-semibold tracking-wide shadow-[0_20px_60px_rgba(158,122,63,0.3)] transition-all duration-300 hover:shadow-[0_30px_80px_rgba(158,122,63,0.4)] hover:scale-105"
            >
              Afiliarme ahora
              <ArrowRight className="h-5 w-5" />
            </Link>

            <a
              href="mailto:soporte@litigo.com.co"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm text-paper/80 font-medium transition-all duration-300 hover:border-gold/50 hover:bg-white/10 hover:text-paper"
            >
              Tengo preguntas
              <span className="text-xs">→</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-[0.8125rem] text-paper/50">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Pago seguro 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Activación inmediata</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Sin permanencia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
