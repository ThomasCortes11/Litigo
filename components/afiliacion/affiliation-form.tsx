'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { submitAffiliation, type AffiliationActionState } from '@/lib/actions/affiliate-actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const initialState: AffiliationActionState = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="default"
      size="lg"
      className="cta-pulse w-full bg-[#163A5F] text-white shadow-[0_16px_36px_-16px_rgba(22,58,95,0.7)] hover:bg-[#2F5D7C]"
      disabled={pending}
    >
      {pending ? 'Enviando...' : 'Continuar al perfilamiento'}
    </Button>
  );
}

type LegalLinkProps = {
  href: '/contrato-afiliacion' | '/terminos-y-condiciones' | '/politica-tratamiento-datos';
  children: React.ReactNode;
};

function LegalLink({ href, children }: LegalLinkProps) {
  return (
    <Link
      href={href}
      className="cursor-pointer font-medium text-gold-light underline underline-offset-2 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090B]"
    >
      {children}
    </Link>
  );
}

export function AffiliationForm() {
  const [state, formAction] = useActionState(submitAffiliation, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.success && state.applicationToken) {
      window.localStorage.removeItem('litigo-affiliation-draft');
      window.location.href = `/afiliacion/perfilamiento?token=${state.applicationToken}`;
    }
  }, [state]);

  React.useEffect(() => {
    const savedDraft = window.localStorage.getItem('litigo-affiliation-draft');
    if (!savedDraft || !formRef.current) return;

    try {
      const values = JSON.parse(savedDraft) as Record<string, string | boolean>;
      const form = formRef.current;

      Object.entries(values).forEach(([key, value]) => {
        const field = form.elements.namedItem(key) as HTMLInputElement | HTMLSelectElement | null;
        if (!field) return;

        if (field instanceof HTMLInputElement && field.type === 'checkbox') {
          field.checked = Boolean(value);
        } else if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement) {
          field.value = String(value ?? '');
        }
      });
    } catch {
      window.localStorage.removeItem('litigo-affiliation-draft');
    }
  }, []);

  React.useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const persistDraft = () => {
      const formData = new FormData(form);
      const values: Record<string, string | boolean> = {};

      formData.forEach((value, key) => {
        if (typeof value === 'string') {
          values[key] = value;
        } else if (value instanceof File) {
          values[key] = value.name;
        }
      });

      const checks = form.querySelectorAll('input[type="checkbox"]');
      checks.forEach((checkbox) => {
        const input = checkbox as HTMLInputElement;
        values[input.name] = input.checked;
      });

      window.localStorage.setItem('litigo-affiliation-draft', JSON.stringify(values));
    };

    form.addEventListener('input', persistDraft);
    form.addEventListener('change', persistDraft);

    return () => {
      form.removeEventListener('input', persistDraft);
      form.removeEventListener('change', persistDraft);
    };
  }, []);

  const fieldError = (field: string) => state.fieldErrors?.[field as keyof typeof state.fieldErrors];

  return (
    <form ref={formRef} action={formAction} className="space-y-8">
      {/* La membresía solo se ofrece después de la aprobación administrativa. */}
      <div className="rounded-md border border-gold/25 bg-gold/5 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-sm text-paper/85">Primero revisaremos tu situación y te ofreceremos una asesoría inicial gratuita.</div>
        </div>
      </div>

      {state.error && (
        <p className="rounded border border-red-400/40 bg-red-950/40 px-4 py-3 text-sm font-medium text-red-200">{state.error}</p>
      )}

      <div className="rounded-lg border border-white/10 bg-black/15 p-5 sm:p-6">
        <h2 className="font-display text-xl font-semibold text-paper">Informacion personal</h2>
          <p className="mt-1 text-xs text-paper/60">Usaremos estos datos para contactarte y revisar si tu perfil puede acceder a la membresía.</p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="fullName" className="text-slate-100">Nombre completo</Label>
            <Input id="fullName" name="fullName" required error={!!fieldError('fullName')} className="rounded-xl border border-white/10 bg-[#0b1727]/90 text-slate-50 placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-[#7db7e8]/70 focus-visible:border-[#7db7e8]" />
            {fieldError('fullName') && <p className="mt-1 text-xs font-medium text-red-300">{fieldError('fullName')}</p>}
          </div>

          <div>
            <Label htmlFor="documentType" className="text-slate-100">Tipo de documento</Label>
            <Select id="documentType" name="documentType" required defaultValue="CC" className="rounded-xl border border-white/10 bg-[#0b1727]/90 text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-[#7db7e8]/70 focus-visible:border-[#7db7e8]">
              <option value="CC">Cedula de ciudadania</option>
              <option value="CE">Cedula de extranjeria</option>
              <option value="PASAPORTE">Pasaporte</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="documentNumber" className="text-slate-100">Numero de documento</Label>
            <Input id="documentNumber" name="documentNumber" required error={!!fieldError('documentNumber')} className="rounded-xl border border-white/10 bg-[#0b1727]/90 text-slate-50 placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-[#7db7e8]/70 focus-visible:border-[#7db7e8]" />
            {fieldError('documentNumber') && (
              <p className="mt-1 text-xs font-medium text-red-300">{fieldError('documentNumber')}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-slate-100">Correo electronico</Label>
            <Input id="email" name="email" type="email" required error={!!fieldError('email')} className="rounded-xl border border-white/10 bg-[#0b1727]/90 text-slate-50 placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-[#7db7e8]/70 focus-visible:border-[#7db7e8]" />
            {fieldError('email') && <p className="mt-1 text-xs font-medium text-red-300">{fieldError('email')}</p>}
          </div>

          <div>
            <Label htmlFor="phone" className="text-slate-100">Telefono</Label>
            <Input id="phone" name="phone" placeholder="Ingresa tu numero" required error={!!fieldError('phone')} className="rounded-xl border border-white/10 bg-[#0b1727]/90 text-slate-50 placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-[#7db7e8]/70 focus-visible:border-[#7db7e8]" />
            {fieldError('phone') && <p className="mt-1 text-xs font-medium text-red-300">{fieldError('phone')}</p>}
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="city" className="text-slate-100">Ciudad</Label>
            <Input id="city" name="city" required error={!!fieldError('city')} className="rounded-xl border border-white/10 bg-[#0b1727]/90 text-slate-50 placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-[#7db7e8]/70 focus-visible:border-[#7db7e8]" />
            {fieldError('city') && <p className="mt-1 text-xs font-medium text-red-300">{fieldError('city')}</p>}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-black/15 p-5 pt-6 sm:p-6">
        <h2 className="font-display text-xl font-semibold text-paper">Documentos legales</h2>
        <p className="mt-1 text-xs text-paper/60">Estos documentos explican el marco general de la relación y la política de datos.</p>

        <div className="mt-5 space-y-4 rounded-md border border-white/10 bg-black/15 p-5">
          <div className="flex items-start gap-3 text-sm text-gray-100">
            <Checkbox id="acceptedContract" name="acceptedContract" value="on" required className="mt-0.5" />
            <div>
              <label htmlFor="acceptedContract" className="cursor-pointer">Acepto el </label>
              <LegalLink href="/contrato-afiliacion">contrato de afiliacion</LegalLink>
              <span>.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm text-gray-100">
            <Checkbox id="acceptedTerms" name="acceptedTerms" value="on" required className="mt-0.5" />
            <div>
              <label htmlFor="acceptedTerms" className="cursor-pointer">Acepto los </label>
              <LegalLink href="/terminos-y-condiciones">terminos y condiciones</LegalLink>
              <span>.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm text-gray-100">
            <Checkbox id="acceptedDataPolicy" name="acceptedDataPolicy" value="on" required className="mt-0.5" />
            <div>
              <label htmlFor="acceptedDataPolicy" className="cursor-pointer">Acepto la </label>
              <LegalLink href="/politica-tratamiento-datos">politica de tratamiento de datos</LegalLink>
              <span>.</span>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-md border border-gold/20 bg-gold/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-light">Resumen contractual rapido</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-paper/70">
            <li>Los servicios se prestan con pagos al dia y son exigibles desde la segunda cuota.</li>
            <li>Gastos procesales y expensas judiciales no estan incluidos en la cuota mensual.</li>
            <li>Hechos previos al contrato y actos dolosos tienen exclusiones especificas.</li>
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <SubmitButton />
        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-300">
          <Lock className="h-3.5 w-3.5 text-gold-light" />
          Tus datos serán tratados de forma confidencial. La solicitud no garantiza la aceptación.
        </p>
      </div>
    </form>
  );
}
