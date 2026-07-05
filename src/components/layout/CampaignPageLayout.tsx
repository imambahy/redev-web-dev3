import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type CampaignPageLayoutProps = {
  children: ReactNode;
};

export function CampaignPageLayout({ children }: CampaignPageLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
