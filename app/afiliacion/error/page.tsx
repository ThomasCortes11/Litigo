import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Error en la afiliacion | Litigo' };

export default function AfiliacionErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-paper px-6 text-center">
      <p className="font-display text-2xl font-semibold text-ink">Algo salio mal</p>
      <p className="max-w-sm text-sm text-slate">
        No pudimos completar tu solicitud de afiliacion. Intenta nuevamente o contacta a soporte si el problema persiste.
      </p>
      <div className="flex gap-3">
        <Button asChild variant="gold">
          <Link href="/afiliacion">Intentar de nuevo</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
