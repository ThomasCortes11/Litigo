'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { updateAffiliateStatus } from '@/lib/actions/admin-affiliate-actions';
import { formatDate } from '@/lib/utils';
import type { Affiliate } from '@prisma/client';

const statusVariant: Record<string, 'success' | 'warning' | 'default' | 'danger'> = {
  ACTIVE: 'success',
  PENDING: 'warning',
  INACTIVE: 'default',
  SUSPENDED: 'danger',
};

const statusLabel: Record<string, string> = {
  ACTIVE: 'Activo',
  PENDING: 'Pendiente',
  INACTIVE: 'Inactivo',
  SUSPENDED: 'Suspendido',
};

export function AffiliatesTable({ affiliates }: { affiliates: Affiliate[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  async function toggleStatus(affiliate: Affiliate) {
    const nextStatus = affiliate.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setPendingId(affiliate.id);
    await updateAffiliateStatus({ id: affiliate.id, status: nextStatus });
    setPendingId(null);
    router.refresh();
  }

  if (affiliates.length === 0) {
    return <p className="py-12 text-center text-sm text-slate">No se encontraron afiliados con estos filtros.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Documento</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>Ciudad</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Registro</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {affiliates.map((affiliate) => (
          <TableRow key={affiliate.id}>
            <TableCell className="font-medium">{affiliate.fullName}</TableCell>
            <TableCell className="font-mono text-xs">{affiliate.documentNumber}</TableCell>
            <TableCell>{affiliate.email}</TableCell>
            <TableCell>{affiliate.city}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[affiliate.status]}>{statusLabel[affiliate.status]}</Badge>
            </TableCell>
            <TableCell className="text-xs text-slate">{formatDate(affiliate.createdAt)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button asChild size="sm" variant="ghost">
                  <Link href={`/admin/afiliados/${affiliate.id}`}>Ver</Link>
                </Button>
                {affiliate.status !== 'PENDING' && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={pendingId === affiliate.id}
                    onClick={() => toggleStatus(affiliate)}
                  >
                    {affiliate.status === 'ACTIVE' ? 'Desactivar' : 'Activar'}
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
