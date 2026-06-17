'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction, type LoginActionState } from '@/lib/actions/auth-actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const initialState: LoginActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Verificando...' : 'Ingresar'}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <p className="rounded border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{state.error}</p>
      )}

      <div>
        <Label htmlFor="email">Correo</Label>
        <Input id="email" name="email" type="email" required autoComplete="username" />
      </div>

      <div>
        <Label htmlFor="password">Contrasena</Label>
        <Input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>

      <SubmitButton />
    </form>
  );
}
