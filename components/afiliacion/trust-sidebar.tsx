import { ShieldCheck, Lock, RotateCcw, Mail } from 'lucide-react';

const items = [
  {
    icon: Lock,
    title: 'Pago 100% seguro',
    description:
      'Tu pago se procesa en Wompi. Litigo nunca almacena los datos de tu tarjeta.',
  },
  {
    icon: ShieldCheck,
    title: 'Datos protegidos',
    description:
      'Tratamiento de datos conforme a la Ley 1581 de 2012. Nunca los vendemos ni los compartimos.',
  },
  {
    icon: RotateCcw,
    title: 'Sin permanencia',
    description:
      'Puedes cancelar cuando quieras. Las condiciones exactas estan en el contrato de afiliacion.',
  },
];

export function TrustSidebar() {
  return (
    <aside className="space-y-5">
      <div className="rounded-lg border border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-800 p-6 shadow-lg">
        <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gray-300">
          Por qué confiar en Litigo
        </p>
        <ul className="space-y-5">
          {items.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" strokeWidth={1.5} />
              <div>
                <p className="text-[0.9rem] font-semibold text-gray-100">{title}</p>
                <p className="mt-0.5 text-[0.8rem] leading-relaxed text-gray-300">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5 shadow-sm">
        <p className="flex items-center gap-2 text-[0.8125rem] font-semibold text-gray-100">
          <Mail className="h-4 w-4 text-teal-300" strokeWidth={1.5} />
          ¿Tienes preguntas?
        </p>
        <p className="mt-2 text-[0.75rem] leading-relaxed text-gray-300">
          Escríbenos antes de afiliarte a{' '}
          <a href="mailto:soporte@litigo.com.co" className="text-teal-300 underline-offset-2 hover:underline">
            soporte@litigo.com.co
          </a>
        </p>
      </div>
    </aside>
  );
}
