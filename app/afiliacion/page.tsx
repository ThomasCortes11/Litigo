import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { AffiliationForm } from '@/components/afiliacion/affiliation-form';
import { TrustSidebar } from '@/components/afiliacion/trust-sidebar';

export const metadata = { title: 'Afiliarme | Litigo' };

export default function AfiliacionPage() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-border bg-ink">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-2xl font-semibold text-paper">
            LITIGO
          </Link>
          <Link href="/" className="text-sm text-paper/70 hover:text-paper">
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="container max-w-5xl py-16">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold-dark">
            <ShieldCheck className="h-3.5 w-3.5" />
            Paso 1 de 2 - tus datos
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Completa tu afiliacion</h1>
          <p className="mt-3 text-sm text-slate">
            Este proceso toma menos de tres minutos. Al finalizar seras redirigido a la pasarela de pagos Wompi.
          </p>
        </div>

        <div className="mx-auto mt-4 h-1.5 max-w-2xl overflow-hidden rounded-full bg-border lg:mx-0">
          <div className="h-full w-1/2 rounded-full bg-gold" />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr,320px]">
          <div className="rounded-lg border border-border bg-white p-7 shadow-card sm:p-9">
            <AffiliationForm />
          </div>

          <TrustSidebar />
        </div>
      </main>
    </div>
  );
}
