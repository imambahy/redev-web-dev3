"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { headerLogoSrc } from "@/lib/constants/navigation";
import { navMenuItems } from "@/lib/constants/nav-menu";
import { NavMenuLink } from "./NavMenuLink";

type MobileNavMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavMenu({ open, onClose }: MobileNavMenuProps) {
  const [activePanel, setActivePanel] = useState<"root" | string>("root");

  useEffect(() => {
    if (!open) {
      setActivePanel("root");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  const activeItem = navMenuItems.find((item) => item.id === activePanel);

  const handleClose = () => {
    setActivePanel("root");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-hero-overlay/40"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col bg-surface">
        <div className="flex h-16 items-center justify-between bg-primary px-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex size-10 items-center justify-center text-white"
            aria-label="Tutup menu"
          >
            <CloseIcon />
          </button>

          <Link href="/" onClick={handleClose} className="flex shrink-0 items-center">
            <Image
              src={headerLogoSrc}
              alt="UNICEF Indonesia"
              width={180}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
          </Link>

          <div className="relative size-9 overflow-hidden rounded-full bg-white/20">
            <Image
              src="/images/testimonials/testimonial.png"
              alt="Profil donor"
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {activePanel === "root" ? (
            <ul>
              {navMenuItems.map((item) => (
                <li key={item.id} className="border-b border-primary/20">
                  {item.children ? (
                    <button
                      type="button"
                      onClick={() => setActivePanel(item.id)}
                      className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-primary"
                    >
                      <span className="flex items-center gap-2">
                        {item.showProgramIcon ? <ProgramIcon /> : null}
                        {item.label}
                      </span>
                      <ChevronRightIcon />
                    </button>
                  ) : (
                    <Link
                      href={item.href ?? "/"}
                      onClick={handleClose}
                      className="block py-4 text-base font-semibold text-primary underline decoration-primary/50 underline-offset-4"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : activeItem?.children ? (
            <div>
              <button
                type="button"
                onClick={() => setActivePanel("root")}
                className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <ChevronLeftIcon />
                Kembali
              </button>

              <h2 className="flex items-center gap-2 border-b border-primary/20 pb-4 text-xl font-bold text-primary">
                {activeItem.label}
                {activeItem.showProgramIcon ? <ProgramIcon /> : null}
              </h2>

              <div className="mt-2">
                {activeItem.children.map((child) => (
                  <NavMenuLink
                    key={child.id}
                    item={child}
                    onNavigate={handleClose}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ProgramIcon() {
  return <span className="text-lg" aria-hidden="true">🧒</span>;
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
