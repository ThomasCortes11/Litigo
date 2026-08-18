import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { MembershipOffer } from '@/components/afiliacion/membership-offer';

export const metadata = { title: 'Activar membresía' };

type PageProps = { searchParams: Promise<{ token?: string }> };

export default async function MembershipOfferPage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  if (!token) notFound();
  const application = await prisma.application.findUnique({ where: { accessToken: token }, include: { affiliate: true } });
  if (!application || application.status !== 'APPROVED') notFound();
  const plan = await prisma.membershipPlan.findFirst({ where: { status: 'ACTIVE' }, orderBy: { createdAt: 'asc' } });
  if (!plan) notFound();

  return <main className="min-h-screen bg-[radial-gradient(circle_at_18%_12%,#163A5F_0%,#0B0D0F_38%,#050607_78%)] px-4 py-12 text-white sm:px-6"><div className="mx-auto max-w-xl"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">Solicitud aprobada</p><h1 className="mt-3 font-display text-4xl font-semibold">Ya puedes activar tu membresía</h1><p className="mt-3 text-sm leading-6 text-slate-300">Hola {application.affiliate.fullName}. Revisa las condiciones de la oferta y continúa al checkout seguro de Wompi.</p><div className="mt-8"><MembershipOffer token={application.accessToken} price={Number(plan.monthlyPrice)} planName={plan.name} /></div></div></main>;
}
