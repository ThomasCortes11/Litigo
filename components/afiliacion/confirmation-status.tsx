'use client';

import * as React from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, Loader2, Clock, ArrowRight } from 'lucide-react';
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
      if (!cancelled) setResult(res);
    }
    poll();
    const interval = setInterval(() => setPollCount((c) => c + 1), POLL_INTERVAL_MS);
    return () => { cancelled = true; clearInterval(interval); };
  }, [reference]);

  React.useEffect(() => {
    if (pollCount === 0 || pollCount > MAX_POLLS) return;
    if (result && result.status !== 'PENDING') return;
    checkPaymentStatus(reference).then(setResult);
  }, [pollCount, reference, result]);

  async function handleRetry() {
    setRetrying(true);
    const res = await retryPayment(reference);
    setRetrying(false);
    if (res.checkoutUrl) window.location.href = res.checkoutUrl;
  }

  /* ---- Verificando ---- */
  if (!result || (result.status === 'PENDING' && pollCount <= MAX_POLLS)) {
    return (
      <div className="flex flex-col items-center gap-5 py-12 text-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
            <Loader2 className="h-7 w-7 animate-spin text-gold-dark" />
          </span>
        </div>
        <div>
          <p className="font-display text-xl font-semibold text-ink">Verificando tu pago</p>
          <p className="mt-2 max-w-xs text-sm text-slate">
            Wompi esta confirmando la transaccion. Esto puede tardar unos segundos — no cierres esta pagina.
          </p>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-full border border-border bg-paper px-4 py-2 font-mono text-xs text-slate">
          <Clock className="h-3.5 w-3.5" />
          Ref: {reference}
        </div>
      </div>
    );
  }

  /* ---- Aprobado ---- */
  if (result.status === 'APPROVED') {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>

        <div>
          <p className="font-display text-2xl font-semibold text-ink">Afiliacion activada</p>
          <p className="mt-2 max-w-sm text-sm text-slate">
            Bienvenido a Litigo. Tu membresia juridica esta activa desde ahora.
          </p>
        </div>

        {result.affiliateCode && (
          <div className="w-full rounded-lg border border-border bg-paper px-6 py-5 text-center">
            <p className="text-xs uppercase tracking-widest text-slate">Tu codigo de afiliado</p>
            <p className="mt-2 font-mono text-2xl font-semibold tracking-wider text-gold-dark">
              {result.affiliateCode}
            </p>
            <p className="mt-2 text-xs text-slate">
              Guardalo — lo necesitaras para comunicarte con tu abogado asignado.
            </p>
          </div>
        )}

        <div className="rounded-lg border border-border bg-white px-5 py-4 text-sm text-slate">
          Te enviamos un correo de confirmacion con todos los detalles de tu membresia.
        </div>

        <Button asChild variant="default" className="mt-2">
          <Link href="/" className="inline-flex items-center gap-2">
            Volver al inicio <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  /* ---- Fallido / No encontrado ---- */
  return (
    <div className="flex flex-col items-center gap-5 py-10 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-danger/10">
        <XCircle className="h-10 w-10 text-danger" />
      </div>

      <div>
        <p className="font-display text-2xl font-semibold text-ink">No pudimos confirmar tu pago</p>
        <p className="mt-2 max-w-sm text-sm text-slate">
          {result.status === 'NOT_FOUND'
            ? 'No encontramos esta orden de pago. Si el cobro se realizo, contacta a soporte.'
            : 'El pago fue rechazado o no se completo. Puedes intentarlo nuevamente sin ningun costo adicional.'}
        </p>
      </div>

      {result.status !== 'NOT_FOUND' && (
        <Button onClick={handleRetry} variant="gold" disabled={retrying} className="shadow-gold-glow">
          {retrying ? 'Generando enlace...' : 'Reintentar pago'}
        </Button>
      )}

      <a href="mailto:soporte@litigo.com.co" className="text-xs text-slate underline underline-offset-2 hover:text-ink">
        Necesitas ayuda? Escribe a soporte@litigo.com.co
      </a>
    </div>
  );
}
