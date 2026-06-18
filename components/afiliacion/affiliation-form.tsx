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
    <Button type="submit" variant="gold" size="lg" className="w-full shadow-gold-glow" disabled={pending}>
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
      {state.error && (
        <p className="rounded border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{state.error}</p>
      )}

      <div>
        <h2 className="font-display text-base font-semibold text-ink">Informacion personal</h2>
        <p className="mt-1 text-xs text-slate">Usaremos estos datos para tu codigo de afiliado y tus comunicaciones.</p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input id="fullName" name="fullName" required error={!!fieldError('fullName')} />
            {fieldError('fullName') && <p className="mt-1 text-xs text-danger">{fieldError('fullName')}</p>}
          </div>

          <div>
            <Label htmlFor="documentType">Tipo de documento</Label>
            <Select id="documentType" name="documentType" required defaultValue="CC">
              <option value="CC">Cedula de ciudadania</option>
              <option value="CE">Cedula de extranjeria</option>
              <option value="PASAPORTE">Pasaporte</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="documentNumber">Numero de documento</Label>
            <Input id="documentNumber" name="documentNumber" required error={!!fieldError('documentNumber')} />
            {fieldError('documentNumber') && (
              <p className="mt-1 text-xs text-danger">{fieldError('documentNumber')}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Correo electronico</Label>
            <Input id="email" name="email" type="email" required error={!!fieldError('email')} />
            {fieldError('email') && <p className="mt-1 text-xs text-danger">{fieldError('email')}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Telefono</Label>
            <Input id="phone" name="phone" placeholder="3001234567" required error={!!fieldError('phone')} />
            {fieldError('phone') && <p className="mt-1 text-xs text-danger">{fieldError('phone')}</p>}
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input id="city" name="city" required error={!!fieldError('city')} />
            {fieldError('city') && <p className="mt-1 text-xs text-danger">{fieldError('city')}</p>}
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-7">
        <h2 className="font-display text-base font-semibold text-ink">Documentos legales</h2>
        <p className="mt-1 text-xs text-slate">Revisalos con calma; quedan disponibles para ti en todo momento.</p>

        <div className="mt-5 space-y-3 rounded border border-border bg-paper p-5">
          <label className="flex items-start gap-3 text-sm text-charcoal">
            <Checkbox name="acceptedContract" value="on" required className="mt-0.5" />
            <span>
              Acepto el{' '}
              <a href="/contrato-afiliacion" target="_blank" className="text-gold-dark underline underline-offset-2">
                contrato de afiliacion
              </a>
              .
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm text-charcoal">
            <Checkbox name="acceptedTerms" value="on" required className="mt-0.5" />
            <span>
              Acepto los{' '}
              <a href="/terminos-y-condiciones" target="_blank" className="text-gold-dark underline underline-offset-2">
                terminos y condiciones
              </a>
              .
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm text-charcoal">
            <Checkbox name="acceptedDataPolicy" value="on" required className="mt-0.5" />
            <span>
              Acepto la{' '}
              <a href="/politica-tratamiento-datos" target="_blank" className="text-gold-dark underline underline-offset-2">
                politica de tratamiento de datos
              </a>
              .
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-3 border-t border-border pt-7">
        <SubmitButton />
        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate">
          <Lock className="h-3.5 w-3.5 text-gold-dark" />
          Seras redirigido a Wompi para completar el pago de forma segura.
        </p>
      </div>
    </form>
  );
}
