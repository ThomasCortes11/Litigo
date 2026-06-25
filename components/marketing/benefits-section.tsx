import { Scale, ShieldCheck, Clock3, FileText, Users, MessageCircle } from 'lucide-react';

const benefits = [
  { icon: Scale,         title: 'Asesoría continua',      desc: 'Acceso permanente a abogados sin costo adicional por consulta.' },
  { icon: ShieldCheck,   title: 'Respaldo en procesos',   desc: 'Acompañamiento en trámites sin tarifas sorpresa.' },
  { icon: Clock3,        title: 'Tiempos claros',         desc: 'Canales de atención con tiempos de respuesta definidos.' },
  { icon: FileText,      title: 'Revisión de documentos', desc: 'Revisión profesional antes de que firmes cualquier documento.' },
  { icon: Users,         title: 'Cobertura familiar',     desc: 'Extiende los beneficios a tu núcleo familiar.' },
  { icon: MessageCircle, title: 'Comunicación directa',   desc: 'Hablas con tu abogado asignado, no con un intermediario.' },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="bg-paper py-32">
      <div className="container">

        <div className="mb-20">
          <span className="section-rule" aria-hidden="true" />
          <h2 className="font-display text-section text-ink">
            Una membresía,<br />respaldo completo.
          </h2>
        </div>

        {/*
          Cuadrícula editorial con divisores finos — sin tarjetas,
          sin sombras. Limpio como una tabla de una revista de diseño.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            /* Bordes: derecho en cols 1 y 2 del desktop, inferior en fila superior */
            const borderR = i % 3 !== 2 ? 'lg:border-r lg:border-border' : '';
            const borderB = i < 3       ? 'lg:border-b lg:border-border' : '';
            const borderSm = i % 2 === 0 ? 'sm:border-r sm:border-border' : '';
            const borderSmB = i < 4 ? 'sm:border-b sm:border-border' : '';
            return (
              <div
                key={b.title}
                className={`group border-b border-border py-8 last:border-b-0 sm:px-8 sm:last:border-b-0 lg:py-10 ${borderR} ${borderB} ${borderSm} ${borderSmB}`}
              >
                <Icon
                  className="mb-5 h-[1.1rem] w-[1.1rem] text-gold transition-opacity duration-200 group-hover:opacity-70"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <h3 className="font-display text-title text-ink">{b.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
