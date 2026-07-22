"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { routes } from "@/lib/constants/routes";
import { headerLogoSrc } from "@/lib/constants/navigation";
import { Container } from "./Container";
import { DesktopNavDropdown } from "./nav/DesktopNavDropdown";
import { MobileNavMenu } from "./nav/MobileNavMenu";

type SiteHeaderProps = {
  variant?: "primary" | "light";
};

export function SiteHeader({ variant = "primary" }: SiteHeaderProps) {
  const isLight = variant === "light";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className={`sticky top-0 z-40 ${
          isLight ? "border-b border-border bg-surface shadow-header" : "bg-primary"
        }`}
      >
        <Container className="flex h-16 min-w-0 items-center justify-between gap-3 md:h-[72px]">
          <div className="flex min-w-0 shrink-0 items-center gap-3 lg:gap-4">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={`flex size-10 items-center justify-center lg:hidden ${
                isLight ? "text-text" : "text-white"
              }`}
              aria-label="Buka menu"
              aria-expanded={mobileOpen}
            >
              <MenuIcon />
            </button>
            <Logo variant={variant} />
          </div>

          <div className="min-w-0 flex-1 overflow-hidden">
            <DesktopNavDropdown variant={variant} />
          </div>

          <DonorZoneButton />
        </Container>
      </header>

      <MobileNavMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function DonorZoneButton() {
  return (
    <Link
      href={routes.donorZone}
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-6 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-dark lg:min-w-36 lg:px-8 lg:py-2.5 lg:text-sm"
    >
      Donor Zone
    </Link>
  );
}

function Logo({ variant }: { variant: "primary" | "light" }) {
  return (
    <Link href="/" className="flex shrink-0 items-center" aria-label="UNICEF Indonesia">
      <Image
        src={headerLogoSrc}
        alt="UNICEF Indonesia — untuk setiap anak"
        width={220}
        height={48}
        className={`h-8 w-auto md:h-10 ${variant === "primary" ? "brightness-0 invert" : ""}`}
        priority
      />
    </Link>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
