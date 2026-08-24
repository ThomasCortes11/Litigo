import { ShieldCheck, Lock, RotateCcw, Mail } from 'lucide-react';

const items = [
  {
    icon: Lock,
    title: 'Pago seguro',
    description:
      'Realiza tu pago por transferencia bancaria, Nequi o Daviplata. Nosotros confirmamos la transaccion.',
  },
  {
    icon: ShieldCheck,
    title: 'Datos protegidos',
    description:
      'Tratamiento de datos conforme a la Ley 1581 de 2012. Nunca los vendemos ni los compartimos.',
  },
  {
    icon: RotateCcw,
    title: 'Activacion por reglas del contrato',
    description:
      'La prestacion del servicio aplica desde la segunda cuota y con pagos al dia, segun condiciones legales.',
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
      <div className="rounded-lg border border-white/10 bg-[#163A5F]/35 p-6 shadow-[0_18px_44px_-26px_rgba(0,0,0,0.75)]">
        <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-paper/60">
          Por qué confiar en Litigo
        </p>
        <ul className="space-y-5">
          {items.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-light" strokeWidth={1.5} />
              <div>
                <p className="text-[0.9rem] font-semibold text-paper/90">{title}</p>
                <p className="mt-0.5 text-[0.8rem] leading-relaxed text-paper/60">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.05] p-5 shadow-sm">
        <p className="flex items-center gap-2 text-[0.8125rem] font-semibold text-paper/90">
          <Mail className="h-4 w-4 text-gold-light" strokeWidth={1.5} />
          ¿Tienes preguntas?
        </p>
        <p className="mt-2 text-[0.75rem] leading-relaxed text-paper/60">
          Escríbenos antes de afiliarte a{' '}
          <a href="mailto:litigojarvis@gmail.com" className="font-medium text-gold-light underline-offset-2 transition-colors hover:text-white hover:underline">
            litigojarvis@gmail.com
          </a>
        </p>
      </div>
    </aside>
  );
}
