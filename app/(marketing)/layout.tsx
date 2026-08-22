import { MarketingHeader } from '@/components/marketing/header';
import { MarketingFooter } from '@/components/marketing/footer';
import { FloatingCallButton } from '@/components/marketing/FloatingCallButton';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      <main className="overflow-hidden bg-[#F5F5F3]">{children}</main>
      <MarketingFooter />
      <FloatingCallButton />
    </>
  );
}
