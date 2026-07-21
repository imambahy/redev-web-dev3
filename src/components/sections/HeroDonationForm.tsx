"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { homeHeroContent } from "@/lib/constants/home-hero";
import { footerSecurityBadges } from "@/lib/constants/navigation";
import { Button } from "@/components/ui/Button";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
import { formatCurrency } from "@/lib/utils/format-currency";

type HomeDonationTab = "bulanan" | "satu-kali";

const donationTabItems: { id: HomeDonationTab; label: ReactNode }[] = [
  {
    id: "bulanan",
    label: (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/donation/penthol-donate-type.svg"
          alt=""
          width={44}
          height={44}
          className="pointer-events-none absolute top-1/2 left-2 z-10 size-9 -translate-y-[calc(50%+10px)] object-contain"
        />
        Pendekar Anak
      </>
    ),
  },
  { id: "satu-kali", label: "Donasi satu kali" },
];

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
      <SegmentedTabs
        items={donationTabItems}
        activeId={activeTab}
        onChange={setActiveTab}
        ariaLabel="Jenis donasi"
        shape="chip"
        size="compact"
        className="border-border bg-surface-muted"
      />

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
