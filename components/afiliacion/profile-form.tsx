'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitApplicationProfile, type ApplicationActionState } from '@/lib/actions/application-actions';
import { legalAreas } from '@/lib/validations/application';
import { Button } from '@/components/ui/button';

const initialState: ApplicationActionState = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" size="lg" className="w-full bg-[#163A5F] text-white hover:bg-[#2F5D7C]" disabled={pending}>{pending ? 'Enviando solicitud...' : 'Enviar solicitud para revisión'}</Button>;
}

export function ProfileForm({ token }: { token: string }) {
  const [state, formAction] = useActionState(submitApplicationProfile, initialState);
  const [legalArea, setLegalArea] = React.useState('');
  const [selectedDocumentName, setSelectedDocumentName] = React.useState('');

  if (state.success) {
    return <div className="rounded-lg border border-gold/25 bg-[#163A5F]/20 p-6 text-center"><h2 className="font-display text-2xl font-semibold text-white">Solicitud enviada</h2><p className="mt-2 text-sm text-paper/70">Nuestro equipo revisará la información y te contactará para la asesoría inicial.</p></div>;
  }

  const error = (field: string) => state.fieldErrors?.[field as keyof typeof state.fieldErrors];
  return (
    <form action={formAction} encType="multipart/form-data" className="profile-form space-y-7">
      <input type="hidden" name="token" value={token} />
      {state.error && <p className="rounded border border-red-400/40 bg-red-950/40 px-4 py-3 text-sm font-medium text-red-200">{state.error}</p>}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-100 sm:col-span-2">Área jurídica
          <select name="legalArea" value={legalArea} onChange={(event) => setLegalArea(event.target.value)} required className="premium-input w-full rounded-xl border border-white/10 bg-[#0c1726]/80 px-3 py-3 text-base text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[#6ea8d5]/70 focus:border-[#7db7e8] focus:outline-none focus:ring-2 focus:ring-[#7db7e8]/30">
            <option value="">Selecciona un área</option>{legalAreas.map((area) => <option key={area} value={area}>{area === 'PENAL' ? 'Derecho penal' : area.charAt(0) + area.slice(1).toLowerCase()}</option>)}
          </select>
          {error('legalArea') && <span className="block text-xs font-medium text-red-300">{error('legalArea')}</span>}
        </label>
        <label className="space-y-2 text-sm text-slate-100 sm:col-span-2">¿Qué tipo de situación necesitas resolver?
          <input name="situationType" required className="premium-input w-full rounded-xl border border-white/10 bg-[#0c1726]/80 px-3 py-3 text-base text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[#6ea8d5]/70 focus:border-[#7db7e8] focus:outline-none focus:ring-2 focus:ring-[#7db7e8]/30" />
        </label>
        <label className="space-y-2 text-sm text-slate-100">¿Existe actualmente un proceso?
          <select name="hasProcess" required className="premium-input w-full rounded-xl border border-white/10 bg-[#0c1726]/80 px-3 py-2.5 text-base text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[#6ea8d5]/70 focus:border-[#7db7e8] focus:outline-none focus:ring-2 focus:ring-[#7db7e8]/30"><option value="">Selecciona</option><option value="YES">Sí</option><option value="NO">No</option><option value="UNKNOWN">No estoy seguro</option></select>
        </label>
        <label className="space-y-2 text-sm text-slate-100">¿Hay audiencia o fecha límite próxima?
          <select name="hasDeadline" required className="premium-input w-full rounded-xl border border-white/10 bg-[#0c1726]/80 px-3 py-2.5 text-base text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[#6ea8d5]/70 focus:border-[#7db7e8] focus:outline-none focus:ring-2 focus:ring-[#7db7e8]/30"><option value="">Selecciona</option><option value="YES">Sí</option><option value="NO">No</option><option value="UNKNOWN">No estoy seguro</option></select>
        </label>
        <label className="space-y-2 text-sm text-slate-100">Fecha más cercana, si existe
          <input name="nearestDate" type="date" className="premium-input w-full rounded-xl border border-white/10 bg-[#0c1726]/80 px-3 py-2.5 text-base text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[#6ea8d5]/70 focus:border-[#7db7e8] focus:outline-none focus:ring-2 focus:ring-[#7db7e8]/30" />
        </label>
        <label className="space-y-2 text-sm text-slate-100">¿Tienes abogado actualmente?
          <select name="hasLawyer" required className="premium-input w-full rounded-xl border border-white/10 bg-[#0c1726]/80 px-3 py-2.5 text-base text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[#6ea8d5]/70 focus:border-[#7db7e8] focus:outline-none focus:ring-2 focus:ring-[#7db7e8]/30"><option value="">Selecciona</option><option value="YES">Sí</option><option value="NO">No</option><option value="PREVIOUSLY">Tuve uno antes</option></select>
        </label>
        <label className="space-y-2 text-sm text-slate-100">Personas o entidades involucradas
          <input name="peopleInvolved" type="number" min="1" max="100" defaultValue="1" required className="premium-input w-full rounded-xl border border-white/10 bg-[#0c1726]/80 px-3 py-2.5 text-base text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[#6ea8d5]/70 focus:border-[#7db7e8] focus:outline-none focus:ring-2 focus:ring-[#7db7e8]/30" />
        </label>
        <label className="space-y-2 text-sm text-slate-100">¿Hay documentos disponibles?
          <select name="availableDocuments" required className="premium-input w-full rounded-xl border border-white/10 bg-[#0c1726]/80 px-3 py-2.5 text-base text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[#6ea8d5]/70 focus:border-[#7db7e8] focus:outline-none focus:ring-2 focus:ring-[#7db7e8]/30"><option value="">Selecciona</option><option value="YES">Sí</option><option value="NO">No</option><option value="UNKNOWN">No estoy seguro</option></select>
        </label>
        {legalArea === 'PENAL' && <>
          <label className="space-y-2 text-sm text-slate-100">Situación penal
            <select name="criminalSituation" required className="premium-input w-full rounded-xl border border-white/10 bg-[#0c1726]/80 px-3 py-2.5 text-base text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[#6ea8d5]/70 focus:border-[#7db7e8] focus:outline-none focus:ring-2 focus:ring-[#7db7e8]/30"><option value="">Selecciona</option><option>Investigación penal</option><option>Denuncia</option><option>Querella</option><option>Captura</option><option>Imputación</option><option>Audiencia</option><option>Medida de aseguramiento</option><option>Otro</option></select>
          </label>
          <label className="space-y-2 text-sm text-slate-100">Tu rol
            <select name="criminalRole" required className="premium-input w-full rounded-xl border border-white/10 bg-[#0c1726]/80 px-3 py-2.5 text-base text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[#6ea8d5]/70 focus:border-[#7db7e8] focus:outline-none focus:ring-2 focus:ring-[#7db7e8]/30"><option value="">Selecciona</option><option>Víctima</option><option>Indiciado</option><option>Imputado</option><option>Acusado</option><option>Otro</option></select>
          </label>
        </>}
        <label className="space-y-2 text-sm text-slate-100 sm:col-span-2">¿Qué necesitas de nuestro equipo?
          <input name="requestedHelp" required className="premium-input w-full rounded-xl border border-white/10 bg-[#0c1726]/80 px-3 py-2.5 text-base text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[#6ea8d5]/70 focus:border-[#7db7e8] focus:outline-none focus:ring-2 focus:ring-[#7db7e8]/30" />
        </label>
        <label className="space-y-2 text-sm text-slate-100 sm:col-span-2">Cuéntanos brevemente qué ocurrió
          <textarea name="description" required rows={5} className="premium-input w-full rounded-xl border border-white/10 bg-[#0c1726]/80 px-3 py-2.5 text-base text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[#6ea8d5]/70 focus:border-[#7db7e8] focus:outline-none focus:ring-2 focus:ring-[#7db7e8]/30" />
        </label>
        <div className="space-y-2 text-sm text-slate-100 sm:col-span-2">
          <span className="block">Documento opcional (PDF, JPG o PNG; máximo 10 MB)</span>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#0c1726]/80 px-3 py-2.5 text-sm text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[#6ea8d5]/70 focus-within:border-[#7db7e8] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#7db7e8]/30">
            <span className="inline-flex rounded-lg bg-[#163A5F] px-3 py-1.5 font-medium text-white">Adjuntar documento</span>
            <span className="text-slate-300">{selectedDocumentName || 'Ningún archivo seleccionado'}</span>
            <input
              name="document"
              type="file"
              accept="application/pdf,image/jpeg,image/png"
              onChange={(event) => setSelectedDocumentName(event.target.files?.[0]?.name ?? '')}
              className="sr-only"
            />
          </label>
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}
