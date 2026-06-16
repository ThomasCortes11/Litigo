import { HeroSection } from '@/components/marketing/hero-section';
import { BenefitsSection } from '@/components/marketing/benefits-section';
import { HowItWorksSection } from '@/components/marketing/how-it-works-section';
import { FaqSection } from '@/components/marketing/faq-section';
import { TestimonialsSection } from '@/components/marketing/testimonials-section';
import { CtaSection } from '@/components/marketing/cta-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
