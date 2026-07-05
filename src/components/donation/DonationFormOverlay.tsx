"use client";

import Image from "next/image";
import { useEffect, type ReactNode } from "react";
import type { CampaignDetail } from "@/types/campaign";
import type { DonationType } from "@/types/campaign";
import { DonationFormStepper } from "@/components/donation/DonationFormStepper";
import { DonationStepTransition } from "@/components/donation/DonationStepTransition";

type DonationFormOverlayProps = {
  campaign: CampaignDetail;
  donationType: DonationType;
  currentStep: 2 | 3;
  direction: "forward" | "backward";
  isExiting: boolean;
  onBack: () => void;
  onClose: () => void;
  children: ReactNode;
};

export function DonationFormOverlay({
  campaign,
  donationType,
  currentStep,
  direction,
  isExiting,
  onBack,
  onClose,
  children,
}: DonationFormOverlayProps) {
  const title =
    donationType === "bulanan" ? "Pendekar Anak" : "Donasi Satu Kali";
  const progress = Math.round((campaign.stats.raised / campaign.stats.goal) * 100);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 ${
        isExiting ? "donation-backdrop-exit bg-black/50" : "donation-backdrop-enter bg-black/50"
      }`}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`grid h-[75vh] w-[75vw] max-w-6xl overflow-hidden rounded-2xl bg-surface shadow-xl lg:grid-cols-2 ${
          isExiting ? "donation-modal-exit" : "donation-modal-enter"
        }`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-modal-title"
      >
        <div className="relative hidden min-h-0 lg:block">
          <Image
            src={campaign.heroImageSrc}
            alt={campaign.imageAlt}
            fill
            className="object-cover"
            sizes="37vw"
          />
          <div className="absolute inset-0 bg-hero-overlay/55" />
          <div className="relative z-10 flex h-full flex-col justify-between p-8">
            <h2 className="max-w-md text-2xl font-bold leading-tight text-white">
              {campaign.heroTitle}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <StatCard
                label="Orang Berdonasi"
                value={campaign.stats.donors.toLocaleString("id-ID")}
              />
              <StatCard label="Dana Terkumpul" value={`${progress}%`} />
              <StatCard
                label="Waktu Tersisa"
                value={`${campaign.stats.daysLeft} Hari`}
              />
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-4 md:px-6">
            <button
              type="button"
              onClick={onBack}
              className="flex size-9 items-center justify-center rounded-full text-primary hover:bg-primary-light"
              aria-label="Kembali"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h2
              id="donation-modal-title"
              className="flex-1 text-center text-base font-bold text-text md:text-lg"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex size-9 items-center justify-center rounded-full text-text-muted hover:bg-surface-muted hover:text-text"
              aria-label="Tutup"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-6 md:px-8">
            <DonationFormStepper currentStep={currentStep} />
            <div className="mt-8 min-h-0 flex-1 overflow-y-auto">
              <DonationStepTransition
                stepKey={`donation-step-${currentStep}`}
                direction={direction}
              >
                {children}
              </DonationStepTransition>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/95 px-3 py-3 text-center shadow-card">
      <p className="text-[10px] font-semibold text-text-muted">{label}</p>
      <p className="mt-1 text-lg font-bold text-primary">{value}</p>
    </div>
  );
}
