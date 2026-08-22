import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { WhatsAppRedirect } from '@/components/afiliacion/whatsapp-redirect';

export const metadata = { title: 'Activar membresía' };

const WHATSAPP_PHONE = '573118551771';

type PageProps = { searchParams: Promise<{ token?: string }> };

export default async function MembershipOfferPage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  if (!token) notFound();
  const application = await prisma.application.findUnique({ where: { accessToken: token }, include: { affiliate: true } });
  if (!application || application.status !== 'APPROVED') notFound();

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Hola, soy ${application.affiliate.fullName}. Mi solicitud de afiliacion fue aprobada. Quiero conocer los medios de pago para activar mi membresia.`)}`;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_18%_12%,#163A5F_0%,#0B0D0F_38%,#050607_78%)] px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">Solicitud aprobada</p>
        <h1 className="mt-3 font-display text-4xl font-semibold">Ya puedes activar tu membresía</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Hola {application.affiliate.fullName}. Tu solicitud fue aprobada. Para activar tu membresía, contacta a nuestro equipo por WhatsApp para conocer los medios de pago disponibles.
        </p>
        <div className="mt-8">
          <WhatsAppRedirect fullName={application.affiliate.fullName} whatsappUrl={whatsappUrl} />
        </div>
      </div>
    </main>
  );
}
