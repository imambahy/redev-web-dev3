"use client";

import { useState } from "react";
import Image from "next/image";
import type { CampaignDetail } from "@/types/campaign";
import type { DonationType } from "@/types/campaign";
import { footerSecurityBadges } from "@/lib/constants/navigation";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format-currency";
import { DonationImpactMessage } from "@/components/donation/DonationImpactMessage";

type DonationStepAmountProps = {
  campaign: CampaignDetail;
  donationType: DonationType;
  selectedAmount: number;
  customAmount: string;
  activeAmount: number;
  onDonationTypeChange: (type: DonationType) => void;
  onAmountSelect: (amount: number) => void;
  onCustomAmountChange: (value: string) => void;
  onContinue: () => void;
};

export function DonationStepAmount({
  campaign,
  donationType,
  selectedAmount,
  customAmount,
  activeAmount,
  onDonationTypeChange,
  onAmountSelect,
  onCustomAmountChange,
  onContinue,
}: DonationStepAmountProps) {
  const [showSecurity, setShowSecurity] = useState(false);

  return (
    <>
      <div className="flex rounded-full border border-border bg-surface-muted p-1">
        {campaign.donationTypes.map((type) => {
          const isActive = donationType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onDonationTypeChange(type)}
              className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors md:text-sm ${
                isActive
                  ? "bg-primary text-white"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              {type === "bulanan" ? "Donasi Bulanan" : "Donasi satu kali"}
            </button>
          );
        })}
      </div>

      {campaign.perk ? (
        <div className="mt-4 overflow-hidden rounded-xl bg-primary p-4">
          <p className="text-center text-sm font-bold text-white">
            {campaign.perk.label}
          </p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div className="space-y-2">
              <div className="rounded-lg bg-white px-3 py-2">
                <p className="text-[10px] text-text-muted">Berakhir dalam</p>
                <p className="text-sm font-bold text-accent">
                  {campaign.perk.countdown}
                </p>
              </div>
              <div className="rounded-lg bg-white px-3 py-2">
                <p className="text-sm font-bold text-accent">
                  Tersisa {campaign.perk.remaining} Pcs
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{
                      width: `${Math.max(
                        8,
                        (campaign.perk.remaining / campaign.perk.total) * 100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="relative h-20 w-24 shrink-0">
              <Image
                src={campaign.perk.imageSrc}
                alt=""
                fill
                className="object-contain object-bottom"
                sizes="96px"
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-2 gap-2">
        {campaign.presetAmounts.map((amount) => {
          const isSelected = selectedAmount === amount && customAmount === "";
          return (
            <button
              key={amount}
              type="button"
              onClick={() => onAmountSelect(amount)}
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
          onChange={(event) => onCustomAmountChange(event.target.value)}
          placeholder="Input manual"
          className="w-full rounded-lg border border-primary/30 px-4 py-3 text-sm text-text outline-none focus:border-primary"
        />
      </label>

      <div className="mt-4">
        <DonationImpactMessage
          amount={activeAmount}
          donationType={donationType}
          benefit={campaign.impactBenefit}
        />
      </div>

      <Button type="button" shape="pill" className="mt-4 w-full" onClick={onContinue}>
        {campaign.ctaLabel ?? "Bantu Sekarang"}
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
    </>
  );
}
