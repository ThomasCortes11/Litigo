import { MarketingHeader } from '@/components/marketing/header';
import { MarketingFooter } from '@/components/marketing/footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      <main className="overflow-hidden bg-[linear-gradient(180deg,#eef4ff_0%,#dce8fb_100%)]">{children}</main>
      <MarketingFooter />
    </>
  );
}
