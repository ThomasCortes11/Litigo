import Link from 'next/link';
import { ShieldCheck, Lock } from 'lucide-react';

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0D0F] text-white">
      <div className="container grid gap-12 py-16 sm:py-18 lg:grid-cols-[1.75fr,1fr,1fr,1fr] lg:py-20">

        <div>
          <span className="font-display text-xl font-semibold text-white">LITIGO</span>
          <p className="mt-3 max-w-[28ch] text-[0.84rem] font-light leading-relaxed text-white/55">
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
              { href: 'mailto:litigojarvis@gmail.com', label: 'litigojarvis@gmail.com' },
            ],
          },
        ].map((col) => (
          <div key={col.label}>
            <p className="mb-4 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-gold-light/80">
              {col.label}
            </p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.84rem] font-light text-white/55 transition-colors duration-200 hover:text-white focus-visible:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-start justify-between gap-3 py-5 sm:flex-row sm:items-center">
          <p className="text-[0.75rem] font-light text-white/40">
            &copy; {new Date().getFullYear()} Litigo. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-5 text-[0.75rem] font-light text-white/40">
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
