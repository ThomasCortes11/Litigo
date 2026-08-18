import { Clock3, FileText, MessageCircle, ShieldCheck, Scale } from 'lucide-react';

const trustPoints = [
  { icon: MessageCircle, title: 'Comunicación directa', description: 'Hablas con tu abogado asignado, no con un intermediario.' },
  { icon: Scale, title: 'Asesoría continua', description: 'Acceso permanente a abogados sin costo adicional por consulta.' },
  { icon: FileText, title: 'Revisión de documentos', description: 'Revisión profesional antes de que firmes cualquier documento.' },
  { icon: ShieldCheck, title: 'Respaldo en procesos', description: 'Acompañamiento en trámites sin tarifas sorpresa.' },
  { icon: Clock3, title: 'Tiempos claros', description: 'Canales de atención con tiempos de respuesta definidos.' },
];

export function TrustSection() {
  return (
    <section className="bg-[#163A5F] py-20 text-white sm:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-xl sm:mb-16"><p className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-gold-light">Una diferencia tangible</p><span className="section-rule" aria-hidden="true" /><h2 className="font-display text-section font-light text-white">La confianza también se construye en los detalles.</h2></div>
        <div className="grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
          {trustPoints.map(({ icon: Icon, title, description }) => <article key={title} className="bg-[#163A5F] p-6 transition-colors duration-300 hover:bg-[#2F5D7C] lg:p-7"><Icon className="h-5 w-5 text-gold-light" strokeWidth={1.4} /><h3 className="mt-8 font-display text-xl text-white">{title}</h3><p className="mt-3 text-sm leading-relaxed text-white/60">{description}</p></article>)}
        </div>
      </div>
    </section>
  );
}
