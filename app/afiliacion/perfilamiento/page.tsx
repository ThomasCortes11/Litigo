import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProfileForm } from '@/components/afiliacion/profile-form';

export const metadata = { title: 'Perfilamiento jurídico' };

type PageProps = { searchParams: Promise<{ token?: string }> };

export default async function ProfilePage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  if (!token) notFound();
  const application = await prisma.application.findUnique({ where: { accessToken: token }, include: { affiliate: true } });
  if (!application) notFound();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_18%_12%,#163A5F_0%,#0B0D0F_38%,#050607_78%)] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-gold-light hover:text-white">Litigo</Link>
        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/80 p-5 shadow-2xl sm:p-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">Paso 2 de 2</p>
            <h1 className="mt-2 text-3xl font-semibold">Cuéntanos qué necesitas</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Esta información permite que el equipo prepare la asesoría inicial. La solicitud será revisada por una persona del equipo jurídico.</p>
          </div>
          <ProfileForm token={application.accessToken} />
        </div>
      </div>
    </main>
  );
}
