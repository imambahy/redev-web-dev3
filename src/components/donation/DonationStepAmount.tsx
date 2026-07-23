"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CampaignDetail } from "@/types/campaign";
import type { DonationType } from "@/types/campaign";
import { routes } from "@/lib/constants/routes";
import { Button } from "@/components/ui/Button";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
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

const donationTypeTabItems: { id: DonationType; label: ReactNode }[] = [
  {
    id: "bulanan",
    label: (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/donation/penthol-donate-type.svg"
          alt=""
          width={40}
          height={40}
          className="pointer-events-none absolute top-1/2 left-1 z-10 size-8 -translate-y-[calc(50%+8px)] object-contain md:size-9"
        />
        Pendekar Anak
      </>
    ),
  },
  { id: "satu-kali", label: "Donasi satu kali" },
];

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
  const tabItems = donationTypeTabItems.filter((item) =>
    campaign.donationTypes.includes(item.id),
  );

  return (
    <>
      {tabItems.length > 1 ? (
        <SegmentedTabs
          items={tabItems}
          activeId={donationType}
          onChange={onDonationTypeChange}
          ariaLabel="Jenis donasi"
          shape="chip"
          size="compact"
          className="overflow-visible border-border bg-surface-muted"
        />
      ) : (
        <div className="relative overflow-visible rounded-lg border border-border bg-primary px-3 py-2.5 text-center text-xs font-semibold text-white md:text-sm">
          {tabItems[0]?.label ?? "Donasi"}
        </div>
      )}

      {campaign.perk ? (
        <div className="mt-4 overflow-hidden rounded-xl bg-[#246FAD]">
          <div className="grid grid-cols-2 items-stretch gap-2">
            <div className="flex flex-col gap-2.5 p-3 sm:p-4">
              <p className="text-[16px] font-bold text-white">
                {campaign.perk.label}
              </p>
              <div className="rounded-lg bg-white px-3 py-2">
                <p className="text-[12px] text-center">Berakhir dalam</p>
                <p className="text-sm text-center font-bold text-[#F37121] sm:text-base">
                  {campaign.perk.countdown}
                </p>
              </div>
              <div className="rounded-lg bg-white px-3 py-2">
                <p className="text-[10px] text-center font-semibold text-[#F37121]">
                  Tersisa {campaign.perk.remaining} Pcs
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-[#F37121]"
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
            <div className="relative min-h-[140px] self-stretch sm:min-h-[160px]">
              <Image
                src={campaign.perk.imageSrc}
                alt=""
                fill
                className="object-contain object-right-bottom p-1 sm:p-2"
                sizes="180px"
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

      <div className="mt-3 text-center">
        <Link
          href={routes.privacyPolicy}
          className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
        >
          Keamanan dan Privasi
          <span aria-hidden="true">›</span>
        </Link>
      </div>
    </>
  );
}
