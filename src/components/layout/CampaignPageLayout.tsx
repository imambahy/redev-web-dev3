import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type CampaignPageLayoutProps = {
  children: ReactNode;
};

export function CampaignPageLayout({ children }: CampaignPageLayoutProps) {
  return (
    <div className="min-w-0 overflow-x-clip">
      <SiteHeader />
      <main className="min-w-0">{children}</main>
      <SiteFooter />
    </div>
  );
}
