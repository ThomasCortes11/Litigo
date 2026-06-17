'use client';

import * as React from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkPaymentStatus, retryPayment, type PaymentStatusResult } from '@/lib/actions/payment-actions';

const POLL_INTERVAL_MS = 3500;
const MAX_POLLS = 12;

export function ConfirmationStatus({ reference }: { reference: string }) {
  const [result, setResult] = React.useState<PaymentStatusResult | null>(null);
  const [pollCount, setPollCount] = React.useState(0);
  const [retrying, setRetrying] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    async function poll() {
      const res = await checkPaymentStatus(reference);
      if (cancelled) return;
      setResult(res);
    }

    poll();

    const interval = setInterval(() => {
      setPollCount((c) => c + 1);
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [reference]);

  React.useEffect(() => {
    if (pollCount === 0) return;
    if (pollCount > MAX_POLLS) return;
    if (result && result.status !== 'PENDING') return;

    checkPaymentStatus(reference).then(setResult);
  }, [pollCount, reference, result]);

  async function handleRetry() {
    setRetrying(true);
    const res = await retryPayment(reference);
    setRetrying(false);
    if (res.checkoutUrl) {
      window.location.href = res.checkoutUrl;
    }
  }

  if (!result || (result.status === 'PENDING' && pollCount <= MAX_POLLS)) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-gold-dark" />
        <p className="font-display text-lg text-ink">Verificando tu pago...</p>
        <p className="max-w-sm text-sm text-slate">
          Esto puede tardar unos segundos mientras Wompi confirma la transaccion. No cierres esta pagina.
        </p>
      </div>
    );
  }

  if (result.status === 'APPROVED') {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-success" />
        <p className="font-display text-2xl text-ink">Tu afiliacion fue activada</p>
        {result.affiliateCode && (
          <p className="rounded border border-border bg-paper px-5 py-3 font-mono text-lg font-semibold text-gold-dark">
            {result.affiliateCode}
          </p>
        )}
        <p className="max-w-sm text-sm text-slate">
          Te enviamos un correo de confirmacion con tu codigo de afiliado y la vigencia de tu membresia.
        </p>
        <Button asChild variant="default" className="mt-2">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <XCircle className="h-12 w-12 text-danger" />
      <p className="font-display text-2xl text-ink">No pudimos confirmar tu pago</p>
      <p className="max-w-sm text-sm text-slate">
        {result.status === 'NOT_FOUND'
          ? 'No encontramos esta orden de pago. Si el cobro se realizo, contacta a soporte.'
          : 'El pago fue rechazado o no se completo. Puedes intentarlo nuevamente.'}
      </p>
      {result.status !== 'NOT_FOUND' && (
        <Button onClick={handleRetry} variant="gold" disabled={retrying}>
          {retrying ? 'Generando enlace...' : 'Reintentar pago'}
        </Button>
      )}
    </div>
  );
}
