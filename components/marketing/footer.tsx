import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function MarketingFooter() {
  return (
    <footer className="bg-ink text-paper/70">
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

      <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-paper/50 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Litigo. Todos los derechos reservados.</p>
        <p>Plataforma de afiliacion juridica</p>
      </div>
    </footer>
  );
}
