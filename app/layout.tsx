import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

/**
 * Cormorant Garamond: serif editorial para autoridad jurídica.
 * Inter: sans serif limpia para lectura, formularios y acciones.
 * IBM Plex Mono: referencias numéricas, códigos y etiquetas.
 */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const dynamic = 'force-dynamic';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Litigo | Asesoría jurídica para personas y empresas',
    template: '%s | Litigo',
  },
  description:
    'Asesoría jurídica inicial y membresía legal mensual para personas y empresas en Colombia. Conoce tu situación, recibe orientación y afíliate en línea.',
  keywords: [
    'asesoría jurídica en Colombia',
    'membresía jurídica',
    'abogados para personas y empresas',
    'asesoría legal mensual',
    'afiliación jurídica',
  ],
  authors: [{ name: 'Litigo' }],
  creator: 'Litigo S.A.S.',
  publisher: 'Litigo S.A.S.',
  category: 'Legal services',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Litigo | Asesoría jurídica para personas y empresas',
    description: 'Asesoría jurídica inicial y membresía legal mensual en Colombia.',
    url: APP_URL,
    siteName: 'Litigo',
    locale: 'es_CO',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Litigo, asesoría jurídica para personas y empresas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Litigo | Asesoría jurídica para personas y empresas',
    description: 'Asesoría jurídica inicial y membresía legal mensual en Colombia.',
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#0B1520',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="font-sans text-charcoal antialiased selection:bg-gold/20 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
