import Link from 'next/link';
import { ConfirmationStatus } from '@/components/afiliacion/confirmation-status';

export const metadata = { title: 'Confirmacion de pago | Litigo' };

interface PageProps {
  searchParams: { ref?: string };
}

export default function ConfirmacionPage({ searchParams }: PageProps) {
  const reference = searchParams.ref;

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-border bg-white">
        <div className="container flex h-20 items-center">
          <Link href="/" className="font-display text-2xl font-semibold text-ink">
            LITIGO
          </Link>
        </div>
      </header>

      <main className="container max-w-lg py-16">
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
