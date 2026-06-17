import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface AffiliateFiltersProps {
  defaultQuery?: string;
  defaultStatus?: string;
}

export function AffiliateFilters({ defaultQuery, defaultStatus }: AffiliateFiltersProps) {
  return (
    <form method="get" className="flex flex-wrap items-end gap-3">
      <div className="min-w-[220px] flex-1">
        <Input
          name="q"
          defaultValue={defaultQuery}
          placeholder="Buscar por nombre, correo o documento..."
        />
      </div>

      <div className="w-48">
        <Select name="status" defaultValue={defaultStatus ?? ''}>
          <option value="">Todos los estados</option>
          <option value="PENDING">Pendiente</option>
          <option value="ACTIVE">Activo</option>
          <option value="INACTIVE">Inactivo</option>
          <option value="SUSPENDED">Suspendido</option>
        </Select>
      </div>

      <Button type="submit" variant="outline">
        Filtrar
      </Button>

      <Button asChild variant="ghost">
        <a href="/admin/afiliados/export">Exportar CSV</a>
      </Button>
    </form>
  );
}
