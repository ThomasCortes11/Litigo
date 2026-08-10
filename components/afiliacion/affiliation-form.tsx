'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
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
      className="cta-pulse w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_16px_36px_-16px_rgba(38,109,211,0.65)] hover:from-blue-500 hover:to-blue-400"
      disabled={pending}
    >
      {pending ? 'Procesando...' : 'Continuar al pago seguro'}
    </Button>
  );
}

export function AffiliationForm() {
  const [state, formAction] = useActionState(submitAffiliation, initialState);

  React.useEffect(() => {
    if (state.success && state.checkoutUrl) {
      window.location.href = state.checkoutUrl;
    }
  }, [state]);

  const fieldError = (field: string) => state.fieldErrors?.[field as keyof typeof state.fieldErrors];

  return (
    <form action={formAction} className="space-y-8">
      {/* Resumen del plan (valores reales) */}
      <div className="rounded-lg border border-blue-300/25 bg-gradient-to-r from-blue-500/12 to-transparent p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-sm text-gray-100">Valor mensual: <span className="font-semibold text-blue-300">$80.000 COP</span></div>
          <div className="text-sm text-gray-100">Tipo: <span className="font-semibold">Individual</span></div>
          <div className="text-sm text-gray-100">Pago: <span className="font-semibold">Wompi seguro</span></div>
          <div className="text-sm text-gray-100">Formulario: <span className="font-semibold">0194</span></div>
        </div>
      </div>

      {/* Campos ocultos para enviar información del contrato */}
      <input type="hidden" name="planPrice" value="80000" />
      <input type="hidden" name="planType" value="INDIVIDUAL" />
      <input type="hidden" name="formNumber" value="0194" />
      {state.error && (
        <p className="rounded border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{state.error}</p>
      )}

      <div className="rounded-lg border border-white/10 bg-black/15 p-5 sm:p-6">
        <h2 className="font-display text-base font-semibold text-paper">Informacion personal</h2>
        <p className="mt-1 text-xs text-gray-300">Usaremos estos datos para tu codigo de afiliado, contratos y comunicaciones oficiales.</p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="fullName" className="text-gray-100">Nombre completo</Label>
            <Input id="fullName" name="fullName" required error={!!fieldError('fullName')} className="border-neutral-700 bg-neutral-900 text-gray-100 placeholder:text-gray-400 hover:border-blue-400/60 focus-visible:border-blue-500" />
            {fieldError('fullName') && <p className="mt-1 text-xs text-danger">{fieldError('fullName')}</p>}
          </div>

          <div>
            <Label htmlFor="documentType" className="text-gray-100">Tipo de documento</Label>
            <Select id="documentType" name="documentType" required defaultValue="CC" className="border-neutral-700 bg-neutral-900 text-gray-100 hover:border-blue-400/60 focus-visible:border-blue-500">
              <option value="CC">Cedula de ciudadania</option>
              <option value="CE">Cedula de extranjeria</option>
              <option value="PASAPORTE">Pasaporte</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="documentNumber" className="text-gray-100">Numero de documento</Label>
            <Input id="documentNumber" name="documentNumber" required error={!!fieldError('documentNumber')} className="border-neutral-700 bg-neutral-900 text-gray-100 placeholder:text-gray-400 hover:border-blue-400/60 focus-visible:border-blue-500" />
            {fieldError('documentNumber') && (
              <p className="mt-1 text-xs text-danger">{fieldError('documentNumber')}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-100">Correo electronico</Label>
            <Input id="email" name="email" type="email" required error={!!fieldError('email')} className="border-neutral-700 bg-neutral-900 text-gray-100 placeholder:text-gray-400 hover:border-blue-400/60 focus-visible:border-blue-500" />
            {fieldError('email') && <p className="mt-1 text-xs text-danger">{fieldError('email')}</p>}
          </div>

          <div>
            <Label htmlFor="phone" className="text-gray-100">Telefono</Label>
            <Input id="phone" name="phone" placeholder="3001234567" required error={!!fieldError('phone')} className="border-neutral-700 bg-neutral-900 text-gray-100 placeholder:text-gray-400 hover:border-blue-400/60 focus-visible:border-blue-500" />
            {fieldError('phone') && <p className="mt-1 text-xs text-danger">{fieldError('phone')}</p>}
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="city" className="text-gray-100">Ciudad</Label>
            <Input id="city" name="city" required error={!!fieldError('city')} className="border-neutral-700 bg-neutral-900 text-gray-100 placeholder:text-gray-400 hover:border-blue-400/60 focus-visible:border-blue-500" />
            {fieldError('city') && <p className="mt-1 text-xs text-danger">{fieldError('city')}</p>}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-black/15 p-5 pt-6 sm:p-6">
        <h2 className="font-display text-base font-semibold text-paper">Documentos legales</h2>
        <p className="mt-1 text-xs text-gray-300">Revisalos con calma; quedan disponibles para ti en todo momento.</p>

        <div className="mt-5 space-y-3 rounded-lg border border-white/12 bg-white/[0.03] p-5">
          <label className="flex items-start gap-3 text-sm text-gray-100">
            <Checkbox name="acceptedContract" value="on" required className="mt-0.5" />
            <span>
              Acepto el{' '}
              <a href="/contrato-afiliacion" target="_blank" className="font-medium text-blue-300 underline underline-offset-2 transition-colors hover:text-blue-200">
                contrato de afiliacion
              </a>
              .
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm text-gray-100">
            <Checkbox name="acceptedTerms" value="on" required className="mt-0.5" />
            <span>
              Acepto los{' '}
              <a href="/terminos-y-condiciones" target="_blank" className="font-medium text-blue-300 underline underline-offset-2 transition-colors hover:text-blue-200">
                terminos y condiciones
              </a>
              .
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm text-gray-100">
            <Checkbox name="acceptedDataPolicy" value="on" required className="mt-0.5" />
            <span>
              Acepto la{' '}
              <a href="/politica-tratamiento-datos" target="_blank" className="font-medium text-blue-300 underline underline-offset-2 transition-colors hover:text-blue-200">
                politica de tratamiento de datos
              </a>
              .
            </span>
          </label>
        </div>

        <div className="mt-4 rounded-lg border border-blue-300/20 bg-blue-950/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-200">Resumen contractual rapido</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-gray-200">
            <li>Los servicios se prestan con pagos al dia y son exigibles desde la segunda cuota.</li>
            <li>Gastos procesales y expensas judiciales no estan incluidos en la cuota mensual.</li>
            <li>Hechos previos al contrato y actos dolosos tienen exclusiones especificas.</li>
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <SubmitButton />
        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-300">
          <Lock className="h-3.5 w-3.5 text-blue-300" />
          Seras redirigido a Wompi para completar el pago de forma segura.
        </p>
      </div>
    </form>
  );
}
