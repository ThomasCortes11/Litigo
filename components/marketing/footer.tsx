import Link from 'next/link';
import { ShieldCheck, Lock } from 'lucide-react';

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-paper">
      <div className="container grid gap-12 py-16 lg:grid-cols-[1.5fr,1fr,1fr,1fr]">
        <div>
          <span className="font-display text-xl font-semibold text-ink">LITIGO</span>
          <p className="mt-3 max-w-xs text-[0.8125rem] leading-relaxed text-slate">
            Membresia juridica mensual. Asesoria legal permanente para personas y empresas en Colombia.
          </p>
        </div>

        <div>
          <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate-light">Documentos</p>
          <ul className="space-y-2.5 text-[0.8125rem] text-slate">
            <li><Link href="/terminos-y-condiciones" className="hover:text-ink">Terminos y condiciones</Link></li>
            <li><Link href="/contrato-afiliacion" className="hover:text-ink">Contrato de afiliacion</Link></li>
            <li><Link href="/politica-tratamiento-datos" className="hover:text-ink">Politica de datos</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate-light">Membresia</p>
          <ul className="space-y-2.5 text-[0.8125rem] text-slate">
            <li><Link href="/#beneficios" className="hover:text-ink">Beneficios</Link></li>
            <li><Link href="/#como-funciona" className="hover:text-ink">Como funciona</Link></li>
            <li><Link href="/afiliacion" className="hover:text-ink">Afiliarme</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate-light">Contacto</p>
          <ul className="space-y-2.5 text-[0.8125rem] text-slate">
            <li>
              <a href="mailto:soporte@litigo.com.co" className="hover:text-ink">
                soporte@litigo.com.co
              </a>
            </li>
            <li>+57 300 000 0000</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-start justify-between gap-3 py-5 sm:flex-row sm:items-center">
          <p className="text-[0.75rem] text-slate-light">
            &copy; {new Date().getFullYear()} Litigo. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5 text-[0.75rem] text-slate-light">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3 w-3" />
              Pagos por Wompi
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3" />
              Ley 1581 de 2012
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
