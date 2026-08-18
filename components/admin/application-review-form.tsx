'use client';

import * as React from 'react';
import { reviewApplication } from '@/lib/actions/application-admin-actions';
import { Button } from '@/components/ui/button';

export function ApplicationReviewForm({ applicationId }: { applicationId: string }) {
  const [pending, startTransition] = React.useTransition();
  const [message, setMessage] = React.useState<string>();
  const [nextStatus, setNextStatus] = React.useState('APPROVED');

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await reviewApplication({
        applicationId,
        nextStatus,
        informationRequested: String(form.get('informationRequested') ?? '') || undefined,
        rejectionReason: String(form.get('rejectionReason') ?? '') || undefined,
        complexity: String(form.get('complexity') ?? '') || undefined,
        internalNotes: String(form.get('internalNotes') ?? '') || undefined,
      });
      setMessage(result.success ? 'Decisión guardada.' : result.error);
    });
  }

  return <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-[#F5F3EE] p-5"><h3 className="font-display text-xl font-semibold text-ink">Evaluación interna</h3><div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-slate-700">Decisión<select value={nextStatus} onChange={(event) => setNextStatus(event.target.value)} className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-3 text-charcoal focus:border-[#2F5D7C] focus:outline-none"><option value="UNDER_REVIEW">Marcar en revisión</option><option value="INITIAL_CONSULTATION">Programar asesoría inicial</option><option value="AWAITING_INFORMATION">Solicitar información</option><option value="APPROVED">Aprobar</option><option value="REJECTED">No aprobar</option></select></label><label className="text-sm text-slate-700">Complejidad<select name="complexity" defaultValue="" className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-3 text-charcoal focus:border-[#2F5D7C] focus:outline-none"><option value="">Sin clasificar</option><option>LOW</option><option>MEDIUM</option><option>HIGH</option><option>CRITICAL</option></select></label></div><label className="block text-sm text-slate-700">Información solicitada<textarea name="informationRequested" rows={2} className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-3 text-charcoal focus:border-[#2F5D7C] focus:outline-none" /></label><label className="block text-sm text-slate-700">Motivo de no aprobación<textarea name="rejectionReason" rows={2} className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-3 text-charcoal focus:border-[#2F5D7C] focus:outline-none" /></label><label className="block text-sm text-slate-700">Observaciones internas<textarea name="internalNotes" rows={3} className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-3 text-charcoal focus:border-[#2F5D7C] focus:outline-none" /></label><Button type="submit" disabled={pending}>{pending ? 'Guardando...' : 'Guardar decisión'}</Button>{message && <p className="text-sm text-slate-600">{message}</p>}</form>;
}
