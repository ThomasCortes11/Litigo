import type { ReactNode } from 'react';
import { LegalBackButton } from '@/components/marketing/legal-back-button';

type LegalDocumentShellProps = {
  title: string;
  children: ReactNode;
};

export function LegalDocumentShell({ title, children }: LegalDocumentShellProps) {
  return (
    <section
      className="min-h-screen bg-[radial-gradient(circle_at_12%_2%,rgba(47,93,124,0.35)_0%,rgba(11,13,15,1)_36%,rgba(7,9,11,1)_100%)] py-8 text-paper sm:py-12"
      style={{
        paddingLeft: 'max(1rem, env(safe-area-inset-left))',
        paddingRight: 'max(1rem, env(safe-area-inset-right))',
      }}
    >
      <div className="mx-auto w-full max-w-[1000px]">
        <header className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-6 shadow-[0_24px_55px_-35px_rgba(0,0,0,0.85)] sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">Documentos legales</p>
              <p className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">LITIGO S.A.S.</p>
            </div>
            <LegalBackButton fallbackHref="/afiliacion" />
          </div>

          <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-paper/72 sm:text-base">
            Consulta la informacion legal que regula tu afiliacion, el uso de la plataforma y el tratamiento de tus datos personales.
          </p>

          <h1 className="mt-6 text-balance font-display text-[clamp(1.45rem,3.2vw,2.4rem)] font-semibold leading-tight text-white">
            {title}
          </h1>
        </header>

        <article className="mt-6 rounded-2xl border border-white/12 bg-[#0E1114] px-5 py-7 shadow-[0_32px_70px_-42px_rgba(0,0,0,0.95)] sm:mt-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="space-y-6 text-[0.97rem] leading-7 text-paper/85 sm:text-base">
            {children}
          </div>
        </article>
      </div>
    </section>
  );
}