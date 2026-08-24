import { Clock3, FileText, MessageCircle, ShieldCheck, Scale } from 'lucide-react';

const trustPoints = [
  { icon: MessageCircle, title: 'Comunicación directa', description: 'Hablas con tu abogado asignado, no con un intermediario.' },
  { icon: Scale, title: 'Asesoría continua', description: 'Acceso permanente a abogados durante tu afiliación activa.' },
  { icon: FileText, title: 'Revisión de documentos', description: 'Revisión profesional antes de que firmes cualquier documento.' },
  { icon: ShieldCheck, title: 'Respaldo en procesos', description: 'Acompañamiento en trámites sin tarifas sorpresa.' },
  { icon: Clock3, title: 'Tiempos claros', description: 'Canales de atención con tiempos de respuesta definidos.' },
];

export function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-[#163A5F] py-20 text-white sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.1),transparent_35%),radial-gradient(circle_at_84%_65%,rgba(197,164,109,0.2),transparent_38%)]" aria-hidden="true" />
      <div className="container relative">
        <div className="mb-12 max-w-xl sm:mb-16">
          <p className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-gold-light">Una diferencia tangible</p>
          <span className="section-rule" aria-hidden="true" />
          <h2 className="font-display text-section font-light text-white">La confianza tambien se construye en los detalles.</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {trustPoints.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className={`group relative overflow-hidden rounded-lg border border-white/18 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 backdrop-blur-[1px] transition-all duration-300 hover:-translate-y-1 hover:border-gold/45 hover:bg-[linear-gradient(160deg,rgba(47,93,124,0.45),rgba(22,58,95,0.55))] hover:shadow-[0_20px_40px_-26px_rgba(0,0,0,0.65)] lg:rounded-none lg:border-l-0 lg:first:rounded-l-lg lg:first:border-l lg:last:rounded-r-lg lg:p-7 ${index === 0 ? 'lg:border-l' : ''}`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold/75 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              <Icon className="h-5 w-5 text-gold-light transition-transform duration-300 group-hover:scale-110" strokeWidth={1.4} />
              <h3 className="mt-7 font-display text-[1.16rem] leading-tight text-white">{title}</h3>
              <p className="mt-3 text-[0.84rem] leading-relaxed text-white/68">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
