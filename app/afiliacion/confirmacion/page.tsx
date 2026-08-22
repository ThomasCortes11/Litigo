import Link from 'next/link';
import { MessageCircle, ExternalLink } from 'lucide-react';

export const metadata = { title: 'Contactar equipo de cobranza' };

const WHATSAPP_PHONE = '573118551771';

export default function ConfirmacionPage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola, quiero conocer los medios de pago para activar mi membresia de Litigo.')}`;

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-border bg-ink">
        <div className="container flex h-20 items-center">
          <Link href="/" className="font-display text-2xl font-semibold text-paper">
            LITIGO
          </Link>
        </div>
      </header>

      <main className="container max-w-lg py-16">
        <div className="rounded-lg border border-border bg-white p-8 shadow-card">
          <div className="flex flex-col items-center gap-5 py-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <MessageCircle className="h-10 w-10 text-green-600" />
            </div>

            <div>
              <p className="font-display text-2xl font-semibold text-ink">Contacta a nuestro equipo</p>
              <p className="mt-2 max-w-sm text-sm text-slate">
                Para activar tu membresía, comunícate con nuestro equipo de cobranza por WhatsApp y conoce los medios de pago disponibles.
              </p>
            </div>

            <div className="w-full rounded-lg border border-green-200 bg-green-50 p-5 text-sm">
              <p className="font-medium text-green-800">Medios de pago:</p>
              <ul className="mt-2 space-y-1 text-left text-green-700">
                <li>• Transferencia bancaria</li>
                <li>• Nequi</li>
                <li>• Daviplata</li>
              </ul>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4" />
              Abrir WhatsApp
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <Link href="/" className="text-xs text-slate underline underline-offset-2 hover:text-ink">
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
