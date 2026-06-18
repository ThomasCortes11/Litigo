import { Scale, ShieldCheck, Clock3, FileText, Users, MessageCircle } from 'lucide-react';

const benefits = [
  {
    icon: Scale,
    title: 'Asesoria legal continua',
    description:
      'Acceso permanente a un equipo de abogados para consultas sobre tu situacion particular, sin costo adicional por llamada.',
  },
  {
    icon: ShieldCheck,
    title: 'Respaldo en procesos',
    description:
      'Acompanamiento en tramites y procesos legales sin tarifas sorpresa ni cobros ocultos por consulta.',
  },
  {
    icon: Clock3,
    title: 'Tiempos de respuesta claros',
    description:
      'Canales directos de atencion con tiempos de respuesta definidos y comprometidos para cada tipo de caso.',
  },
  {
    icon: FileText,
    title: 'Revision de documentos',
    description:
      'Revision profesional de contratos, acuerdos y documentos antes de que los firmes o aceptes.',
  },
  {
    icon: Users,
    title: 'Cobertura familiar',
    description:
      'Extiende los beneficios seleccionados de tu membresia a los miembros de tu nucleo familiar.',
  },
  {
    icon: MessageCircle,
    title: 'Comunicacion directa',
    description:
      'Habla con tu abogado asignado, no con un intermediario automatizado ni un sistema de tickets.',
  },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="bg-paper py-28">
      <div className="container">
        <div className="mb-14">
          <span className="section-rule" />
          <h2 className="font-display text-display-md font-semibold text-ink">
            Una sola membresia,<br />respaldo legal completo.
          </h2>
        </div>

        {/* Grid de 6 beneficios en disposicion 3×2 */}
        <div className="grid gap-0 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            const isRightBorder = idx % 3 !== 2;
            const isBottomRow = idx >= 3;
            return (
              <div
                key={benefit.title}
                className={cn(
                  'group px-0 py-8 sm:px-8',
                  isRightBorder && 'lg:border-r lg:border-border',
                  !isBottomRow && 'lg:border-b lg:border-border',
                  idx % 2 === 0 && 'sm:border-r sm:border-border',
                )}
              >
                <Icon className="mb-4 h-5 w-5 text-gold" strokeWidth={1.25} />
                <h3 className="font-display text-xl font-semibold text-ink">{benefit.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-slate">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
