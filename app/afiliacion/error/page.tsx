import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Error en la afiliacion' };

export default function AfiliacionErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-paper px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
        <AlertCircle className="h-8 w-8 text-danger" />
      </div>
      <div>
        <p className="font-display text-2xl font-semibold text-ink">Algo salio mal</p>
        <p className="mt-2 max-w-sm text-sm text-slate">
          No pudimos completar tu solicitud. Intenta nuevamente o escribe a soporte@litigo.com.co si el problema persiste.
        </p>
      </div>
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
