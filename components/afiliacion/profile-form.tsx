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

  if (state.success) {
    return <div className="rounded-lg border border-gold/25 bg-[#163A5F]/20 p-6 text-center"><h2 className="font-display text-2xl font-semibold text-white">Solicitud enviada</h2><p className="mt-2 text-sm text-paper/70">Nuestro equipo revisará la información y te contactará para la asesoría inicial.</p></div>;
  }

  const error = (field: string) => state.fieldErrors?.[field as keyof typeof state.fieldErrors];
  return (
    <form action={formAction} encType="multipart/form-data" className="profile-form space-y-7">
      <input type="hidden" name="token" value={token} />
      {state.error && <p className="rounded border border-red-300/30 bg-red-950/20 px-4 py-3 text-sm text-red-100">{state.error}</p>}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-white sm:col-span-2">Área jurídica
          <select name="legalArea" value={legalArea} onChange={(event) => setLegalArea(event.target.value)} required className="w-full rounded-md border border-white/15 bg-black/25 px-3 py-3 text-white transition-colors hover:border-gold/50 focus:border-[#2F5D7C] focus:outline-none">
            <option value="">Selecciona un área</option>{legalAreas.map((area) => <option key={area} value={area}>{area === 'PENAL' ? 'Derecho penal' : area.charAt(0) + area.slice(1).toLowerCase()}</option>)}
          </select>
          {error('legalArea') && <span className="block text-xs text-red-300">{error('legalArea')}</span>}
        </label>
        <label className="space-y-2 text-sm text-white sm:col-span-2">¿Qué tipo de situación necesitas resolver?
          <input name="situationType" required className="w-full rounded-md border border-white/15 bg-black/25 px-3 py-3 text-white transition-colors hover:border-gold/50 focus:border-[#2F5D7C] focus:outline-none" />
        </label>
        <label className="space-y-2 text-sm text-white">¿Existe actualmente un proceso?
          <select name="hasProcess" required className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"><option value="">Selecciona</option><option value="YES">Sí</option><option value="NO">No</option><option value="UNKNOWN">No estoy seguro</option></select>
        </label>
        <label className="space-y-2 text-sm text-white">¿Hay audiencia o fecha límite próxima?
          <select name="hasDeadline" required className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"><option value="">Selecciona</option><option value="YES">Sí</option><option value="NO">No</option><option value="UNKNOWN">No estoy seguro</option></select>
        </label>
        <label className="space-y-2 text-sm text-white">Fecha más cercana, si existe
          <input name="nearestDate" type="date" className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
        </label>
        <label className="space-y-2 text-sm text-white">¿Tienes abogado actualmente?
          <select name="hasLawyer" required className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"><option value="">Selecciona</option><option value="YES">Sí</option><option value="NO">No</option><option value="PREVIOUSLY">Tuve uno antes</option></select>
        </label>
        <label className="space-y-2 text-sm text-white">Personas o entidades involucradas
          <input name="peopleInvolved" type="number" min="1" max="100" defaultValue="1" required className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
        </label>
        <label className="space-y-2 text-sm text-white">¿Hay documentos disponibles?
          <select name="availableDocuments" required className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"><option value="">Selecciona</option><option value="YES">Sí</option><option value="NO">No</option><option value="UNKNOWN">No estoy seguro</option></select>
        </label>
        {legalArea === 'PENAL' && <>
          <label className="space-y-2 text-sm text-white">Situación penal
            <select name="criminalSituation" required className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"><option value="">Selecciona</option><option>Investigación penal</option><option>Denuncia</option><option>Querella</option><option>Captura</option><option>Imputación</option><option>Audiencia</option><option>Medida de aseguramiento</option><option>Otro</option></select>
          </label>
          <label className="space-y-2 text-sm text-white">Tu rol
            <select name="criminalRole" required className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"><option value="">Selecciona</option><option>Víctima</option><option>Indiciado</option><option>Imputado</option><option>Acusado</option><option>Otro</option></select>
          </label>
        </>}
        <label className="space-y-2 text-sm text-white sm:col-span-2">¿Qué necesitas de nuestro equipo?
          <input name="requestedHelp" required className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
        </label>
        <label className="space-y-2 text-sm text-white sm:col-span-2">Cuéntanos brevemente qué ocurrió
          <textarea name="description" required minLength={20} rows={5} className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
        </label>
        <label className="space-y-2 text-sm text-white sm:col-span-2">Documento opcional (PDF, JPG o PNG; máximo 10 MB)
          <input name="document" type="file" accept="application/pdf,image/jpeg,image/png" className="block w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200" />
        </label>
      </div>
      <SubmitButton />
    </form>
  );
}
