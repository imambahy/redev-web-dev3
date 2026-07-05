"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { homeHeroContent } from "@/lib/constants/home-hero";
import { footerSecurityBadges } from "@/lib/constants/navigation";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format-currency";

type HomeDonationTab = "bulanan" | "satu-kali";

export function HeroDonationForm() {
  const router = useRouter();
  const { form, featuredCampaignHref } = homeHeroContent;
  const [activeTab, setActiveTab] = useState<HomeDonationTab>("bulanan");
  const [selectedAmount, setSelectedAmount] = useState<number>(form.defaultAmount);
  const [customAmount, setCustomAmount] = useState("");
  const [showSecurity, setShowSecurity] = useState(false);

  const handleContinue = () => {
    const amount =
      customAmount.trim() !== ""
        ? Number(customAmount.replace(/\D/g, "")) || selectedAmount
        : selectedAmount;

    sessionStorage.setItem(
      "donation-draft",
      JSON.stringify({
        amount,
        donationType: activeTab,
        source: "homepage",
      }),
    );

    router.push(featuredCampaignHref);
  };

  return (
    <aside className="w-full max-w-md rounded-2xl bg-surface p-5 shadow-card lg:ml-auto lg:p-6">
      <div className="flex rounded-full border border-border bg-surface-muted p-1">
        <TabButton
          active={activeTab === "bulanan"}
          onClick={() => setActiveTab("bulanan")}
          icon={<HeartIcon />}
          label="Pendekar Anak"
        />
        <TabButton
          active={activeTab === "satu-kali"}
          onClick={() => setActiveTab("satu-kali")}
          icon={<GiftIcon />}
          label="Donasi satu kali"
        />
      </div>

      <div className="mt-4">
        <h2 className="text-base font-bold text-text md:text-lg">{form.title}</h2>
        <p className="mt-1 text-xs text-text-muted md:text-sm">{form.subtitle}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {form.presetAmounts.map((amount) => {
          const isSelected = selectedAmount === amount && customAmount === "";
          return (
            <button
              key={amount}
              type="button"
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount("");
              }}
              className={`rounded-lg border px-3 py-3 text-sm font-semibold transition-colors ${
                isSelected
                  ? "border-primary bg-primary text-white"
                  : "border-primary/30 bg-surface text-primary hover:border-primary"
              }`}
            >
              {formatCurrency(amount)}
            </button>
          );
        })}
      </div>

      <label className="mt-3 block">
        <span className="sr-only">Input manual</span>
        <input
          type="text"
          inputMode="numeric"
          value={customAmount}
          onChange={(event) => setCustomAmount(event.target.value)}
          placeholder="Input manual"
          className="w-full rounded-lg border border-primary/30 px-4 py-3 text-sm text-text outline-none focus:border-primary"
        />
      </label>

      <Button
        type="button"
        shape="pill"
        className="mt-4 w-full"
        onClick={handleContinue}
      >
        {form.ctaLabel}
      </Button>

      <div className="mt-4 border-t border-border pt-3">
        <button
          type="button"
          onClick={() => setShowSecurity((prev) => !prev)}
          className="flex w-full items-center justify-center gap-1 text-sm font-semibold text-primary"
          aria-expanded={showSecurity}
        >
          Keamanan dan Privasi
          <span
            className={`transition-transform ${showSecurity ? "rotate-90" : ""}`}
            aria-hidden="true"
          >
            ›
          </span>
        </button>
        {showSecurity ? (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {footerSecurityBadges.map((badge) => (
              <Image
                key={badge.src}
                src={badge.src}
                alt={badge.alt}
                width={120}
                height={40}
                className="h-7 w-auto object-contain"
              />
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-[11px] font-semibold transition-colors md:gap-2 md:text-xs ${
        active ? "bg-primary text-white" : "text-text-muted hover:text-primary"
      }`}
    >
      <span className={active ? "text-white" : "text-primary"}>{icon}</span>
      {label}
    </button>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="13" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8V21M3 12h18M8.5 8C7 8 5 6.5 5 5c0-1.5 2-2 3.5-.5S12 8 12 8s1.5-3.5 3-3.5S20 3.5 20 5s-2 3-3.5 3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
