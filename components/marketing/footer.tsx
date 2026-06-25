import Link from 'next/link';
import { ShieldCheck, Lock } from 'lucide-react';

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-paper">
      <div className="container grid gap-12 py-20 lg:grid-cols-[1.75fr,1fr,1fr,1fr]">

        <div>
          <span className="font-display text-xl font-semibold text-ink">LITIGO</span>
          <p className="mt-3 max-w-[28ch] text-[0.8125rem] font-light leading-relaxed text-slate">
            Membresía jurídica mensual. Asesoría legal permanente para personas y empresas en Colombia.
          </p>
        </div>

        {[
          {
            label: 'Documentos',
            links: [
              { href: '/terminos-y-condiciones',      label: 'Términos y condiciones' },
              { href: '/contrato-afiliacion',          label: 'Contrato de afiliación' },
              { href: '/politica-tratamiento-datos',   label: 'Política de datos' },
            ],
          },
          {
            label: 'Membresía',
            links: [
              { href: '/#beneficios',    label: 'Beneficios' },
              { href: '/#como-funciona', label: 'Cómo funciona' },
              { href: '/afiliacion',     label: 'Afiliarme' },
            ],
          },
          {
            label: 'Contacto',
            links: [
              { href: 'mailto:soporte@litigo.com.co', label: 'soporte@litigo.com.co' },
            ],
          },
        ].map((col) => (
          <div key={col.label}>
            <p className="mb-4 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-slate-light">
              {col.label}
            </p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.8125rem] font-light text-slate transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-start justify-between gap-3 py-5 sm:flex-row sm:items-center">
          <p className="text-[0.75rem] font-light text-slate-light">
            &copy; {new Date().getFullYear()} Litigo. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5 text-[0.75rem] font-light text-slate-light">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3 w-3" aria-hidden="true" />
              Pagos por Wompi
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              Ley 1581 de 2012
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
