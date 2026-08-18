import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AffiliateDetailForm } from '@/components/admin/affiliate-detail-form';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { formatCurrencyCOP, formatDateTime } from '@/lib/utils';
import { ApplicationReviewForm } from '@/components/admin/application-review-form';

export const metadata = {
  title: 'Detalle de afiliado',
  robots: { index: false, follow: false },
};

const statusVariant: Record<string, 'success' | 'warning' | 'default' | 'danger'> = {
  ACTIVE: 'success',
  PENDING: 'warning',
  DRAFT: 'default',
  SUBMITTED: 'warning',
  UNDER_REVIEW: 'warning',
  INITIAL_CONSULTATION: 'warning',
  AWAITING_INFORMATION: 'warning',
  APPROVED: 'success',
  REJECTED: 'danger',
  PAYMENT_PENDING: 'warning',
  INACTIVE: 'default',
  SUSPENDED: 'danger',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AffiliateDetailPage({ params }: PageProps) {
  const { id } = await params;

  const affiliate = await prisma.affiliate.findUnique({
    where: { id },
    include: {
      payments: { orderBy: { createdAt: 'desc' } },
      memberships: { orderBy: { createdAt: 'desc' } },
      application: { include: { answers: true, documents: true, evaluations: { orderBy: { createdAt: 'desc' }, include: { reviewer: true } } } },
    },
  });

  if (!affiliate) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">{affiliate.fullName}</h1>
          <p className="mt-1 text-sm text-slate">
            {affiliate.documentType} {affiliate.documentNumber}
            {affiliate.affiliateCode && <span className="ml-2 font-mono text-gold-dark">{affiliate.affiliateCode}</span>}
          </p>
        </div>
        <Badge variant={statusVariant[affiliate.status]}>{affiliate.status}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Datos del afiliado</CardTitle>
        </CardHeader>
        <CardContent>
          <AffiliateDetailForm affiliate={affiliate} />
        </CardContent>
      </Card>

      {affiliate.application && (
        <>
          <Card>
            <CardHeader><CardTitle>Solicitud y perfilamiento jurídico</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate">Estado: <strong>{affiliate.application.status}</strong> · Área: <strong>{affiliate.application.legalArea ?? 'Sin definir'}</strong> · Enviada: {affiliate.application.submittedAt ? formatDateTime(affiliate.application.submittedAt) : 'Borrador'}</p>
              <div className="space-y-3">{affiliate.application.answers.map((answer) => <div key={answer.id} className="rounded border border-slate-200 p-3"><p className="text-xs font-semibold uppercase text-slate-500">{answer.questionKey}</p><p className="mt-1 whitespace-pre-wrap text-sm text-ink">{typeof answer.answer === 'string' ? answer.answer : JSON.stringify(answer.answer)}</p></div>)}</div>
              <ApplicationReviewForm applicationId={affiliate.application.id} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Historial de evaluaciones</CardTitle></CardHeader>
            <CardContent>{affiliate.application.evaluations.length === 0 ? <p className="text-sm text-slate">Sin evaluaciones.</p> : <div className="space-y-3">{affiliate.application.evaluations.map((evaluation) => <div key={evaluation.id} className="border-b border-slate-200 pb-3 text-sm"><p className="font-medium text-ink">{evaluation.recommendation} · {evaluation.complexity ?? 'Sin complejidad'}</p><p className="text-slate">{evaluation.internalNotes ?? 'Sin observaciones'} · {evaluation.reviewer.name} · {formatDateTime(evaluation.createdAt)}</p></div>)}</div>}</CardContent>
          </Card>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Membresias</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {affiliate.memberships.length === 0 ? (
            <p className="text-sm text-slate">Sin membresias registradas.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Inicio</TableHead>
                  <TableHead>Vence</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {affiliate.memberships.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>{m.planName}</TableCell>
                    <TableCell>{formatCurrencyCOP(Number(m.value))}</TableCell>
                    <TableCell>{formatDateTime(m.startDate)}</TableCell>
                    <TableCell>{formatDateTime(m.endDate)}</TableCell>
                    <TableCell>{m.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de pagos</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {affiliate.payments.length === 0 ? (
            <p className="text-sm text-slate">Sin pagos registrados.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Referencia</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Metodo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {affiliate.payments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.reference}</TableCell>
                    <TableCell>{formatCurrencyCOP(Number(p.amount))}</TableCell>
                    <TableCell>{p.paymentMethod ?? '-'}</TableCell>
                    <TableCell>{p.status}</TableCell>
                    <TableCell className="text-xs text-slate">{formatDateTime(p.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
