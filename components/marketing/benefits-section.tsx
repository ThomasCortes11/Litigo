'use client';

import * as React from 'react';
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
    <section id="beneficios" className="relative bg-gradient-to-br from-paper via-paper to-white py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-gold/3 blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <div className="mb-16 text-center lg:text-left">
          <span className="section-rule" />
          <h2 className="mt-4 font-display text-display-md font-semibold text-ink">
            Una sola membresía,<br />
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">respaldo legal completo.</span>
          </h2>
        </div>

        {/* Premium glassmorphic cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group relative overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-xl p-8 transition-all duration-500 hover:border-gold/40 hover:shadow-[0_20px_60px_rgba(158,122,63,0.1)] hover:-translate-y-1"
                style={{
                  animation: `fadeInUp 0.6s ease-out forwards`,
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 mb-6 inline-block rounded-lg bg-gold/10 p-3 transition-all duration-300 group-hover:bg-gold/20 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-gold transition-colors duration-300 group-hover:text-gold-dark" strokeWidth={1.25} />
                </div>
                <h3 className="relative z-10 font-display text-lg font-semibold text-ink">{benefit.title}</h3>
                <p className="relative z-10 mt-3 text-[0.875rem] leading-relaxed text-slate/70 group-hover:text-slate transition-colors">{benefit.description}</p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-gold to-gold-light transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
