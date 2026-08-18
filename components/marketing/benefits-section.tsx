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
    <section id="beneficios" className="section-shell bg-paper py-20 sm:py-24 lg:py-28">
      <div className="container">

        <div className="mb-12 max-w-2xl sm:mb-16 lg:mb-20">
          <p className="mb-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.22em] text-gold-dark">LITIGO</p>
          <span className="section-rule" aria-hidden="true" />
          <h2 className="font-display text-section text-ink">
            Una membresía,<br />respaldo completo.
          </h2>
        </div>

        {/*
          Cuadrícula editorial con divisores finos — sin tarjetas,
          sin sombras. Limpio como una tabla de una revista de diseño.
        */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
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
                className={`group relative rounded-lg border border-border/90 bg-white px-6 py-8 shadow-[0_8px_24px_-20px_rgba(11,13,15,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2F5D7C]/35 hover:shadow-[0_18px_34px_-24px_rgba(22,58,95,0.35)] sm:px-8 lg:py-10 ${i === 1 || i === 4 ? 'bg-[#F5F3EE]' : ''} ${borderR} ${borderB} ${borderSm} ${borderSmB}`}
              >
                <span className="mb-8 block font-mono text-[0.68rem] tracking-[0.2em] text-gold-dark">0{i + 1}</span>
                <Icon
                  className="mb-5 h-[1.1rem] w-[1.1rem] text-gold transition-all duration-200 group-hover:scale-105 group-hover:opacity-80"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <h3 className="font-sans text-[1.18rem] font-semibold leading-tight tracking-normal text-ink sm:text-[1.28rem]">{b.title}</h3>
                <p className="mt-3 max-w-[30ch] text-[0.92rem] leading-[1.65] text-[#657181]">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
