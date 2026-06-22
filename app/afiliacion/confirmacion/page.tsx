import Link from 'next/link';
import { ConfirmationStatus } from '@/components/afiliacion/confirmation-status';

export const metadata = { title: 'Confirmacion de pago' };

interface PageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function ConfirmacionPage({ searchParams }: PageProps) {
  const { ref: reference } = await searchParams;

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-border bg-ink">
        <div className="container flex h-20 items-center">
          <Link href="/" className="font-display text-2xl font-semibold text-paper">
            LITIGO
          </Link>
        </div>
      </header>

      <main className="container max-w-lg py-16">
        <div className="mx-auto mb-6 max-w-xs">
          <div className="h-1.5 overflow-hidden rounded-full bg-border">
            <div className="h-full w-full rounded-full bg-gold" />
          </div>
          <p className="mt-2 text-center font-mono text-xs text-slate">Paso 2 de 2 — confirmacion</p>
        </div>

        <div className="rounded-lg border border-border bg-white p-8 shadow-card">
          {reference ? (
            <ConfirmationStatus reference={reference} />
          ) : (
            <p className="py-10 text-center text-sm text-slate">
              No se encontro una referencia de pago valida en la URL.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
