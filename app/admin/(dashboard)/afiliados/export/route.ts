import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logAudit } from '@/lib/audit';

function escapeCsvValue(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const affiliates = await prisma.affiliate.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
  });

  const headers = [
    'Nombre completo',
    'Tipo documento',
    'Numero documento',
    'Correo',
    'Telefono',
    'Ciudad',
    'Estado',
    'Codigo afiliado',
    'Fecha registro',
  ];

  const rows = affiliates.map((a) =>
    [
      a.fullName,
      a.documentType,
      a.documentNumber,
      a.email,
      a.phone,
      a.city,
      a.status,
      a.affiliateCode ?? '',
      a.createdAt.toISOString(),
    ]
      .map((v) => escapeCsvValue(String(v)))
      .join(','),
  );

  const csv = [headers.join(','), ...rows].join('\n');

  await logAudit({
    actorId: session.user.id,
    action: 'AFFILIATES_EXPORTED',
    entityType: 'Affiliate',
    metadata: { count: affiliates.length },
  });

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="afiliados-litigo-${Date.now()}.csv"`,
    },
  });
}
