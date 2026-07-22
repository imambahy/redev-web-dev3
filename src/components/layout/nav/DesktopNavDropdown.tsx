"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavMenuItem } from "@/lib/constants/nav-menu";
import { navMenuItems } from "@/lib/constants/nav-menu";
import { Container } from "@/components/layout/Container";
import { NavMenuLink } from "./NavMenuLink";

const DROPDOWN_DURATION_MS = 700;

type DesktopNavDropdownProps = {
  variant?: "primary" | "light";
};

export function DesktopNavDropdown({ variant = "primary" }: DesktopNavDropdownProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [visibleId, setVisibleId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prevVisibleIdRef = useRef<string | null>(null);
  const isLight = variant === "light";

  const activeItem = navMenuItems.find((item) => item.id === visibleId);

  useEffect(() => {
    if (openId) {
      setVisibleId(openId);
      return;
    }

    if (!visibleId) return;

    setIsExpanded(false);
    const timeout = window.setTimeout(() => {
      setVisibleId(null);
    }, DROPDOWN_DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, [openId, visibleId]);

  useEffect(() => {
    if (!visibleId) {
      setIsExpanded(false);
      prevVisibleIdRef.current = null;
      return;
    }

    const isMenuSwitch =
      prevVisibleIdRef.current !== null && prevVisibleIdRef.current !== visibleId;
    prevVisibleIdRef.current = visibleId;

    if (isMenuSwitch) {
      setIsExpanded(true);
      return;
    }

    setIsExpanded(false);
    let cancelled = false;

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (!cancelled) setIsExpanded(true);
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [visibleId]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (navRef.current?.contains(target) || panelRef.current?.contains(target)) {
        return;
      }
      setOpenId(null);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <div ref={navRef} className="relative hidden w-full min-w-0 lg:block">
        <nav
          className="flex items-center justify-center gap-4 overflow-x-auto xl:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Navigasi utama"
        >
          {navMenuItems.map((item) => (
            <DesktopNavTrigger
              key={item.id}
              item={item}
              isLight={isLight}
              isOpen={openId === item.id}
              onToggle={() =>
                setOpenId((current) => (current === item.id ? null : item.id))
              }
            />
          ))}
        </nav>
      </div>

      {activeItem?.children ? (
        <>
          <div
            className={`fixed inset-x-0 top-16 bottom-0 z-40 bg-hero-overlay/10 transition-opacity duration-700 ease-out md:top-[72px] ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
            onClick={() => setOpenId(null)}
          />
          <div
            className={`fixed inset-x-0 top-16 z-50 grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:top-[72px] ${
              isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div
                ref={panelRef}
                className={`border-t border-primary/15 bg-surface shadow-[0_12px_32px_rgb(0_0_0_/_0.12)] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isExpanded
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-3 opacity-0"
                }`}
              >
                <Container className="py-6 md:py-8">
                  <div key={activeItem.id}>
                    <h2 className="flex items-center gap-2 border-b border-primary/20 pb-4 text-xl font-bold text-primary md:text-2xl">
                      {activeItem.label}
                    </h2>

                    <div className="mt-6 grid grid-cols-3 divide-x divide-border">
                      {activeItem.children.map((child, index) => (
                        <div key={child.id} className={`min-w-0 ${getDropdownColumnClass(index)}`}>
                          <NavMenuLink
                            item={child}
                            variant="dropdown"
                            onNavigate={() => setOpenId(null)}
                          />
                        </div>
                      ))}
                      {activeItem.children.length === 2 ? (
                        <div className={`min-w-0 ${getDropdownColumnClass(2)}`} aria-hidden="true" />
                      ) : null}
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

function getDropdownColumnClass(columnIndex: number) {
  if (columnIndex === 0) return "pr-6 lg:pr-8";
  if (columnIndex === 2) return "pl-6 lg:pl-8";
  return "px-6 lg:px-8";
}

function DesktopNavTrigger({
  item,
  isLight,
  isOpen,
  onToggle,
}: {
  item: NavMenuItem;
  isLight: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const textClass = isLight ? "text-text" : "text-white";

  if (!item.children) {
    return (
      <Link
        href={item.href ?? "/"}
        className={`text-sm font-semibold underline decoration-transparent underline-offset-4 transition-colors hover:opacity-80 hover:decoration-current ${textClass}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={onToggle}
      className={`flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-80 ${textClass} ${
        isOpen ? "opacity-100" : ""
      }`}
    >
      {item.label}
      <ChevronDownIcon className={`transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`} />
    </button>
  );
}

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
