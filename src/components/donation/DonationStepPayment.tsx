"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { DonationType } from "@/types/campaign";
import {
  donationPaymentCategories,
  donationPaymentOptions,
  type DonationPaymentCategoryId,
} from "@/lib/constants/payment";
import { Button } from "@/components/ui/Button";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
import { formatCurrency } from "@/lib/utils/format-currency";
import { DonationImpactMessage } from "@/components/donation/DonationImpactMessage";

type DonationStepPaymentProps = {
  amount: number;
  donationType: DonationType;
  benefit: string;
  selectedMethod: string;
  error?: string;
  onMethodChange: (methodId: string, route: string) => void;
  onContinue: () => void;
};

export function DonationStepPayment({
  amount,
  donationType,
  benefit,
  selectedMethod,
  error,
  onMethodChange,
  onContinue,
}: DonationStepPaymentProps) {
  const [activeCategory, setActiveCategory] =
    useState<DonationPaymentCategoryId>("credit-card");

  const methods = useMemo(
    () => donationPaymentOptions[activeCategory],
    [activeCategory],
  );

  const period = donationType === "bulanan" ? "/Bulan" : "";

  return (
    <div className="space-y-5 pb-2">
      <div className="text-center">
        <p className="text-2xl font-bold text-[#003144] md:text-3xl">
          {formatCurrency(amount)}
          {period}
        </p>
        <div className="mt-2">
          <DonationImpactMessage
            amount={amount}
            donationType={donationType}
            benefit={benefit}
          />
        </div>
      </div>

      <SegmentedTabs
        items={donationPaymentCategories.map((category) => ({
          id: category.id,
          label: category.label,
        }))}
        activeId={activeCategory}
        onChange={setActiveCategory}
        ariaLabel="Kategori pembayaran"
        size="compact"
        className="border-border bg-surface-muted"
      />

      <div className="space-y-3">
        {methods.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onMethodChange(method.id, method.route)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-4 text-left transition-colors ${
                isSelected
                  ? "border-accent bg-[#FFF8E8]"
                  : "border-border bg-surface hover:border-primary/40"
              }`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                  <Image
                    src={method.logoSrc}
                    alt=""
                    width={40}
                    height={40}
                    className="h-7 w-auto max-w-[36px] object-contain"
                  />
                </span>
                <span className="text-sm font-semibold text-text">
                  {method.label}
                </span>
              </span>
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-accent" : "border-border bg-surface"
                }`}
                aria-hidden="true"
              >
                {isSelected ? (
                  <span className="size-2.5 rounded-full bg-accent" />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="button" shape="pill" className="w-full" onClick={onContinue}>
        Mulai Berdonasi
      </Button>
    </div>
  );
}
