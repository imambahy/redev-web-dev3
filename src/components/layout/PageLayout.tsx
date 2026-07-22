import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type PageLayoutProps = {
  children: ReactNode;
};

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-w-0 overflow-x-clip">
      <SiteHeader />
      <main className="min-w-0">{children}</main>
      <SiteFooter />
    </div>
  );
}
