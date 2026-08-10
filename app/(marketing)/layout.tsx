import { MarketingHeader } from '@/components/marketing/header';
import { MarketingFooter } from '@/components/marketing/footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      <main className="overflow-hidden bg-[linear-gradient(180deg,#f8f2e8_0%,#efe4d3_100%)]">{children}</main>
      <MarketingFooter />
    </>
  );
}
