'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { updateAffiliateDetails, updateAffiliateStatus } from '@/lib/actions/admin-affiliate-actions';
import type { Affiliate } from '@prisma/client';

export function AffiliateDetailForm({ affiliate }: { affiliate: Affiliate }) {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const status = formData.get('status') as string;

    const [detailsResult, statusResult] = await Promise.all([
      updateAffiliateDetails({
        id: affiliate.id,
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        city: formData.get('city'),
      }),
      status !== affiliate.status ? updateAffiliateStatus({ id: affiliate.id, status }) : Promise.resolve({ success: true }),
    ]);

    setSaving(false);

    if (!detailsResult.success || !statusResult.success) {
      setMessage('No se pudieron guardar todos los cambios. Revisa los datos.');
      return;
    }

    setMessage('Cambios guardados correctamente.');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {message && <p className="rounded border border-border bg-paper px-4 py-3 text-sm text-ink">{message}</p>}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Nombre completo</Label>
          <Input id="fullName" name="fullName" defaultValue={affiliate.fullName} required />
        </div>
        <div>
          <Label htmlFor="email">Correo</Label>
          <Input id="email" name="email" type="email" defaultValue={affiliate.email} required />
        </div>
        <div>
          <Label htmlFor="phone">Telefono</Label>
          <Input id="phone" name="phone" defaultValue={affiliate.phone} required />
        </div>
        <div>
          <Label htmlFor="city">Ciudad</Label>
          <Input id="city" name="city" defaultValue={affiliate.city} required />
        </div>
        <div>
          <Label htmlFor="status">Estado</Label>
          <Select id="status" name="status" defaultValue={affiliate.status}>
            <option value="PENDING">Pendiente</option>
            <option value="ACTIVE">Activo</option>
            <option value="INACTIVE">Inactivo</option>
            <option value="SUSPENDED">Suspendido</option>
          </Select>
        </div>
      </div>

      <Button type="submit" variant="gold" disabled={saving}>
        {saving ? 'Guardando...' : 'Guardar cambios'}
      </Button>
    </form>
  );
}
