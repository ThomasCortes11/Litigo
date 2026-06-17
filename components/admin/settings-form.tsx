'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateSettingsAction, type SettingsActionState } from '@/lib/actions/settings-actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const initialState: SettingsActionState = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="gold" disabled={pending}>
      {pending ? 'Guardando...' : 'Guardar configuracion'}
    </Button>
  );
}

interface SettingsFormProps {
  defaults: Record<string, string>;
}

export function SettingsForm({ defaults }: SettingsFormProps) {
  const [state, formAction] = useActionState(updateSettingsAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.success && (
        <p className="rounded border border-success/30 bg-success/5 px-4 py-3 text-sm text-success">
          Configuracion actualizada correctamente.
        </p>
      )}
      {state.error && (
        <p className="rounded border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{state.error}</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="company_name">Nombre comercial</Label>
          <Input id="company_name" name="company_name" defaultValue={defaults.company_name} required />
        </div>
        <div>
          <Label htmlFor="company_nit">NIT</Label>
          <Input id="company_nit" name="company_nit" defaultValue={defaults.company_nit} required />
        </div>
        <div>
          <Label htmlFor="membership_price">Valor membresia (COP, sin puntos)</Label>
          <Input id="membership_price" name="membership_price" defaultValue={defaults.membership_price} required />
        </div>
        <div>
          <Label htmlFor="support_email">Correo de soporte</Label>
          <Input id="support_email" name="support_email" type="email" defaultValue={defaults.support_email} required />
        </div>
        <div>
          <Label htmlFor="support_phone">Telefono de soporte</Label>
          <Input id="support_phone" name="support_phone" defaultValue={defaults.support_phone} required />
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
