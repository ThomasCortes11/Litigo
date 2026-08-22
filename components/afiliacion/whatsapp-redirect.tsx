'use client';

import * as React from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WhatsAppRedirect({ fullName, whatsappUrl }: { fullName: string; whatsappUrl: string }) {
  const [redirecting, setRedirecting] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setRedirecting(true);
      window.location.href = whatsappUrl;
    }, 3000);
    return () => clearTimeout(timer);
  }, [whatsappUrl]);

  return (
    <div className="rounded-lg border border-green-500/25 bg-green-950/20 p-6 shadow-[0_20px_44px_-30px_rgba(34,197,94,0.3)]">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
          <MessageCircle className="h-6 w-6 text-green-400" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-300">Contacto directo</p>
          <h2 className="text-lg font-semibold text-white">WhatsApp - Medios de pago</h2>
        </div>
      </div>
      
      <p className="mt-4 text-sm leading-6 text-slate-300">
        Serás redirigido a WhatsApp en unos segundos para contactar a nuestro equipo de cobranza.
      </p>

      <div className="mt-4 rounded-md bg-green-500/10 p-3 text-sm text-green-200">
        <p className="font-medium">Medios de pago disponibles:</p>
        <ul className="mt-2 space-y-1 text-xs text-green-300/80">
          <li>• Transferencia bancaria</li>
          <li>• Nequi</li>
          <li>• Daviplata</li>
        </ul>
      </div>

      <Button 
        asChild 
        className="mt-6 w-full bg-green-600 text-white hover:bg-green-700"
      >
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Abrir WhatsApp ahora
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </Button>

      {redirecting && (
        <p className="mt-3 text-center text-xs text-slate-400">
          Redirigiendo a WhatsApp...
        </p>
      )}
    </div>
  );
}
