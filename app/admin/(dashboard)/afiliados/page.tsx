import { prisma } from '@/lib/prisma';
import { AffiliateFilters } from '@/components/admin/affiliate-filters';
import { AffiliatesTable } from '@/components/admin/affiliates-table';
import { AffiliateStatus, type Prisma } from '@prisma/client';

export const metadata = { title: 'Afiliados | Litigo' };

const PAGE_SIZE = 20;

interface PageProps {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}

export default async function AfiliadosPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1);
  const q = params.q?.trim();
  const status = params.status;

  const where: Prisma.AffiliateWhereInput = { deletedAt: null };

  if (status && status in AffiliateStatus) {
    where.status = status as AffiliateStatus;
  }

  if (q) {
    where.OR = [
      { fullName: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
      { documentNumber: { contains: q, mode: 'insensitive' } },
    ];
  }

  const [affiliates, total] = await Promise.all([
    prisma.affiliate.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.affiliate.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Afiliados</h1>
          <p className="mt-1 text-sm text-slate">{total} registros encontrados</p>
        </div>
      </div>

      <div className="mt-6">
        <AffiliateFilters defaultQuery={q} defaultStatus={status} />
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-white">
        <AffiliatesTable affiliates={affiliates} />
      </div>

      {totalPages > 1 && (
        <div className="mt-5 flex justify-center gap-2 text-sm">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/admin/afiliados?${new URLSearchParams({ ...(q ? { q } : {}), ...(status ? { status } : {}), page: String(p) }).toString()}`}
              className={`rounded px-3 py-1.5 ${p === page ? 'bg-ink text-paper' : 'text-slate hover:bg-ink/5'}`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
