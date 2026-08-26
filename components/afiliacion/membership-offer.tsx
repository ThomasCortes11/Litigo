'use client';

import * as React from 'react';
import { initiateMembershipCheckout } from '@/lib/actions/payment-actions';
import { Button } from '@/components/ui/button';
import { formatCurrencyCOP } from '@/lib/utils';

export function MembershipOffer({ token, price, planName }: { token: string; price: number; planName: string }) {
  const [pending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string>();

  function startCheckout() {
    setError(undefined);
    startTransition(async () => {
      const result = await initiateMembershipCheckout(token);
      if (result.checkoutUrl) window.location.href = result.checkoutUrl;
      else setError(result.error ?? 'No fue posible iniciar el checkout.');
    });
  }

  return <div className="rounded-lg border border-gold/25 bg-[#163A5F]/25 p-6 shadow-[0_20px_44px_-30px_rgba(197,164,109,0.4)]">
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">Oferta de membresía</p>
    <h2 className="mt-2 text-2xl font-semibold text-white">{planName}</h2>
    <p className="mt-3 text-3xl font-semibold text-white">{formatCurrencyCOP(price)} <span className="text-sm font-normal text-slate-300">/ mes</span></p>
    <p className="mt-3 text-sm leading-6 text-slate-300">La membresía se activa únicamente cuando Wompi confirme el pago mediante su webhook firmado.</p>
    {error && <p className="mt-4 rounded border border-red-400/40 bg-red-950/40 px-3 py-2 text-sm font-medium text-red-200">{error}</p>}
    <Button type="button" onClick={startCheckout} disabled={pending} className="mt-6 w-full bg-[#163A5F] text-white hover:bg-[#2F5D7C]">{pending ? 'Preparando checkout...' : 'Activar membresía'}</Button>
  </div>;
}
