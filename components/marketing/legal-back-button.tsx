'use client';

import { useRouter } from 'next/navigation';

type LegalBackButtonProps = {
  fallbackHref?: string;
};

export function LegalBackButton({ fallbackHref = '/afiliacion' }: LegalBackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex cursor-pointer items-center rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-gold/45 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090B]"
    >
      ← Volver a la afiliacion
    </button>
  );
}