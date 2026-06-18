import { ShieldCheck, Lock, RotateCcw, Mail } from 'lucide-react';

const items = [
  {
    icon: Lock,
    title: 'Pago 100% seguro',
    description: 'Tu pago se procesa directamente en la plataforma de Wompi. Litigo nunca almacena los datos de tu tarjeta.',
  },
  {
    icon: ShieldCheck,
    title: 'Datos protegidos',
    description: 'Tu informacion se trata conforme a la Ley 1581 de 2012 de proteccion de datos personales.',
  },
  {
    icon: RotateCcw,
    title: 'Cancela cuando quieras',
    description: 'Sin permanencia minima forzosa. Las condiciones exactas estan en el contrato de afiliacion.',
  },
];

export function TrustSidebar() {
  return (
    <aside className="space-y-6">
      <div className="rounded-lg border border-border bg-white p-6 shadow-card">
        <h2 className="font-display text-base font-semibold text-ink">Por que confiar en Litigo</h2>
        <ul className="mt-5 space-y-5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Icon className="h-4 w-4 text-gold-dark" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-paper p-6 text-sm">
        <p className="inline-flex items-center gap-2 font-medium text-ink">
          <Mail className="h-4 w-4 text-gold-dark" />
          Tienes dudas antes de afiliarte?
        </p>
        <p className="mt-1.5 text-xs text-slate">
          Escribenos a{' '}
          <a href="mailto:soporte@litigo.com.co" className="text-gold-dark underline underline-offset-2">
            soporte@litigo.com.co
          </a>{' '}
          y te respondemos antes de que pagues.
        </p>
      </div>
    </aside>
  );
}
