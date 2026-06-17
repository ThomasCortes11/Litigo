import Link from 'next/link';
import { AffiliationForm } from '@/components/afiliacion/affiliation-form';

export const metadata = { title: 'Afiliarme | Litigo' };

export default function AfiliacionPage() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-border bg-white">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-2xl font-semibold text-ink">
            LITIGO
          </Link>
          <Link href="/" className="text-sm text-slate hover:text-ink">
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="container max-w-2xl py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-dark">Formulario de afiliacion</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Completa tus datos</h1>
        <p className="mt-3 text-sm text-slate">
          Este proceso toma menos de tres minutos. Al finalizar seras redirigido a la pasarela de pagos Wompi.
        </p>

        <div className="mt-10 rounded-lg border border-border bg-white p-7 shadow-card sm:p-9">
          <AffiliationForm />
        </div>
      </main>
    </div>
  );
}
