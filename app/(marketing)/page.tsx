import { HeroSection } from '@/components/marketing/hero-section';
import { BenefitsSection } from '@/components/marketing/benefits-section';
import { ValueSection } from '@/components/marketing/value-section';
import { HowItWorksSection } from '@/components/marketing/how-it-works-section';
import { TrustSection } from '@/components/marketing/trust-section';
import { FaqSection } from '@/components/marketing/faq-section';
import { CtaSection } from '@/components/marketing/cta-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ValueSection />
      <HowItWorksSection />
      <TrustSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
