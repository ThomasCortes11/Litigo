import Link from 'next/link';
import { ShieldCheck, Lock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function MarketingFooter() {
  return (
    <footer className="grain-overlay bg-ink text-paper/70">
      <div className="container grid gap-10 py-16 lg:grid-cols-4">
        <div>
          <span className="font-display text-xl font-semibold text-paper">LITIGO</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Membresia juridica mensual con acceso permanente a asesoria legal, sin sorpresas en la facturacion.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-light">Documentos legales</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terminos-y-condiciones" className="hover:text-paper">Terminos y condiciones</Link></li>
            <li><Link href="/contrato-afiliacion" className="hover:text-paper">Contrato de afiliacion</Link></li>
            <li><Link href="/politica-tratamiento-datos" className="hover:text-paper">Politica de tratamiento de datos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-light">Membresia</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#beneficios" className="hover:text-paper">Beneficios</Link></li>
            <li><Link href="/#como-funciona" className="hover:text-paper">Como funciona</Link></li>
            <li><Link href="/afiliacion" className="hover:text-paper">Afiliarme</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-light">Contacto</h4>
          <ul className="space-y-2 text-sm font-mono">
            <li>soporte@litigo.com.co</li>
            <li>+57 300 000 0000</li>
          </ul>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="container flex flex-col items-center gap-4 py-6 text-xs text-paper/45 sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Litigo. Todos los derechos reservados.</p>
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-gold-light/80" />
            Pagos procesados por Wompi
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-light/80" />
            Tratamiento de datos Ley 1581
          </span>
        </div>
      </div>
    </footer>
  );
}
