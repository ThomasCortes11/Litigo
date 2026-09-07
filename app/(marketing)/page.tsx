import type { Metadata } from 'next';
import { HeroSection } from '@/components/marketing/hero-section';
import { BenefitsSection } from '@/components/marketing/benefits-section';
import { ValueSection } from '@/components/marketing/value-section';
import { HowItWorksSection } from '@/components/marketing/how-it-works-section';
import { TrustSection } from '@/components/marketing/trust-section';
import { FaqSection } from '@/components/marketing/faq-section';
import { CtaSection } from '@/components/marketing/cta-section';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Asesoría jurídica y membresía legal en Colombia',
  description:
    'Conoce Litigo: asesoría jurídica inicial gratuita y membresía legal mensual para personas y empresas. Evalúa tu perfil y afíliate en línea.',
  alternates: { canonical: '/' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': '#organization',
      name: 'Litigo S.A.S.',
      url: APP_URL,
      logo: `${APP_URL}/icon`,
      description: 'Servicios de asesoría jurídica para personas y empresas en Colombia.',
    },
    {
      '@type': 'LegalService',
      '@id': '#legal-service',
      name: 'Litigo',
      url: APP_URL,
      description: 'Asesoría jurídica inicial y membresía legal mensual para personas y empresas.',
      areaServed: { '@type': 'Country', name: 'Colombia' },
      provider: { '@id': '#organization' },
      serviceType: 'Asesoría jurídica',
    },
    {
      '@type': 'WebSite',
      '@id': '#website',
      name: 'Litigo',
      url: APP_URL,
      inLanguage: 'es-CO',
      publisher: { '@id': '#organization' },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <ValueSection />
      <TrustSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
