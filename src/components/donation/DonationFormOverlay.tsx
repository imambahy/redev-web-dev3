"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { CampaignDetail } from "@/types/campaign";
import { donationPopupContent } from "@/lib/constants/donation-popup";

type DonationFormOverlayProps = {
  campaign: CampaignDetail;
  showStepper?: boolean;
  stepper?: ReactNode;
  isExiting: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function DonationFormOverlay({
  campaign,
  showStepper = true,
  stepper,
  isExiting,
  onClose,
  children,
}: DonationFormOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const progress = Math.round(
    (campaign.stats.raised / campaign.stats.goal) * 100,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex flex-col bg-black ${
        isExiting ? "donation-backdrop-exit" : "donation-backdrop-enter"
      }`}
      role="presentation"
    >
      {/* Dedicated popup hero — not campaign page image */}
      <div className="relative h-[28vh] min-h-[160px] w-full shrink-0 sm:h-[30vh]">
        <Image
          src={donationPopupContent.heroImageSrc}
          alt=""
          fill
          className="object-cover object-[center_30%]"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-white text-text shadow-md transition-opacity hover:opacity-90 md:top-5 md:right-5 md:size-10"
          aria-label="Tutup"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M2 2l10 10M12 2L2 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="absolute inset-x-0 bottom-8 z-10 px-5 md:bottom-10 md:px-8">
          <h2 className="max-w-md text-lg font-bold leading-snug text-white md:text-2xl">
            {donationPopupContent.titleBefore}{" "}
            <span className="text-accent">{donationPopupContent.titleHighlight}</span>{" "}
            {donationPopupContent.titleAfter}
          </h2>
        </div>
      </div>

      {/* Sheet panel */}
      <div
        className={`relative -mt-5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-3xl bg-surface shadow-[0_-8px_30px_rgb(0_0_0_/_0.15)] md:mx-auto md:w-full md:max-w-lg ${
          isExiting ? "donation-modal-exit" : "donation-modal-enter"
        }`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-modal-title"
      >
        <div className="flex shrink-0 justify-center pt-3 pb-1">
          <span className="h-1 w-10 rounded-full bg-border" aria-hidden="true" />
        </div>

        <div className="shrink-0 px-4 pt-3 md:px-6">
          <div className="grid grid-cols-3 gap-2">
            <StatCard
              label="Orang Berdonasi"
              value={campaign.stats.donors.toLocaleString("id-ID")}
            />
            <StatCard
              label="Dana Terkumpul"
              value={`${progress}%`}
              progress={progress}
            />
            <StatCard
              label="Waktu Tersisa"
              value={`${campaign.stats.daysLeft} Hari`}
            />
          </div>
        </div>

        {showStepper && stepper ? (
          <div className="shrink-0 px-4 pt-5 md:px-6">{stepper}</div>
        ) : null}

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
          <h2 id="donation-modal-title" className="sr-only">
            Formulir Donasi
          </h2>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function StatCard({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress?: number;
}) {
  return (
    <div className="rounded-xl bg-[#003144] px-2 py-3 text-center md:px-3 md:py-3.5">
      <p className="text-[9px] font-medium leading-tight text-white/90 md:text-[10px]">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-primary md:text-base">{value}</p>
      {typeof progress === "number" ? (
        <div className="mx-auto mt-1.5 h-1 w-full max-w-[72px] overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}
