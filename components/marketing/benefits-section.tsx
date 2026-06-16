import { Scale, ShieldCheck, Clock3, FileText, Users, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: Scale,
    title: 'Asesoria legal continua',
    description: 'Acceso permanente a un equipo de abogados para consultas sobre tu situacion particular.',
  },
  {
    icon: ShieldCheck,
    title: 'Respaldo en procesos',
    description: 'Acompanamiento en tramites y procesos legales sin tarifas sorpresa por cada consulta.',
  },
  {
    icon: Clock3,
    title: 'Tiempos de respuesta claros',
    description: 'Canales directos de atencion con tiempos de respuesta definidos para cada caso.',
  },
  {
    icon: FileText,
    title: 'Revision de documentos',
    description: 'Revision profesional de contratos y documentos antes de que los firmes.',
  },
  {
    icon: Users,
    title: 'Cobertura familiar',
    description: 'Extiende beneficios seleccionados de tu membresia a miembros de tu nucleo familiar.',
  },
  {
    icon: MessageCircle,
    title: 'Comunicacion directa',
    description: 'Habla con tu abogado asignado, no con un sistema automatizado de tickets.',
  },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="bg-paper py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-dark">Beneficios de la membresia</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Una sola membresia, respaldo legal completo
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card key={benefit.title} className="border-t-2 border-t-gold">
                <CardContent className="pt-6">
                  <Icon className="h-8 w-8 text-gold-dark" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
