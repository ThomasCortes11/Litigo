import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

/**
 * Cormorant Garamond: tipografía con historia editorial y legal —
 * transmite autoridad sin caer en lo corporativo genérico.
 * DM Sans: sin serifas humanista, muy legible en cuerpo de texto.
 * IBM Plex Mono: referencias numéricas, códigos y etiquetas.
 */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Litigo — Membresia juridica mensual',
    template: '%s | Litigo',
  },
  description:
    'Acceso permanente a asesoria legal para personas y empresas. Afiliate en linea en menos de tres minutos.',
  keywords: ['asesoria legal', 'membresia juridica', 'abogados Colombia', 'afiliacion juridica'],
  authors: [{ name: 'Litigo' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Litigo — Membresia juridica mensual',
    description: 'Acceso permanente a asesoria legal para personas y empresas.',
    url: APP_URL,
    siteName: 'Litigo',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Litigo — Membresia juridica mensual',
    description: 'Acceso permanente a asesoria legal para personas y empresas.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0B1520',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable} ${plexMono.variable}`}>
      <body className="font-sans text-charcoal antialiased selection:bg-gold/20 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
