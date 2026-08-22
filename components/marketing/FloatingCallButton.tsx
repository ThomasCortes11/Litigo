'use client';

import { Phone } from 'lucide-react';

const CALL_NUMBER = '3118551771';
const CALL_HREF = `tel:${CALL_NUMBER}`;

export function FloatingCallButton() {
  return (
    <a
      href={CALL_HREF}
      aria-label={`Llamar al ${CALL_NUMBER}`}
      title={`Llamar: ${CALL_NUMBER}`}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.14] bg-[#163A5F] text-white shadow-[0_8px_30px_-4px_rgba(22,58,95,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-4px_rgba(22,58,95,0.8)] hover:bg-[#2F5D7C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
    >
      <Phone className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#B8956A' }} strokeWidth={1.5} />
    </a>
  );
}
