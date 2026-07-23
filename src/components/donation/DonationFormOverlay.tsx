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
    <>
      {/* Mobile: full-screen bottom sheet */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col bg-black lg:hidden ${
          isExiting ? "donation-backdrop-exit" : "donation-backdrop-enter"
        }`}
        role="presentation"
      >
        <div className="relative aspect-[390/290] w-full shrink-0">
          <Image
            src={donationPopupContent.heroImageSrc}
            alt=""
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            aria-hidden="true"
          />

          <CloseButton onClose={onClose} className="top-4 right-4" />

          <div className="absolute inset-x-0 bottom-8 z-10 px-5">
            <HeroTitle />
          </div>
        </div>

        <div
          className={`relative -mt-5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-3xl bg-surface shadow-[0_-8px_30px_rgb(0_0_0_/_0.15)] ${
            isExiting ? "donation-modal-exit" : "donation-modal-enter"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="donation-modal-title-mobile"
        >
          <div className="flex shrink-0 justify-center pt-3 pb-1">
            <span
              className="h-1 w-10 rounded-full bg-border"
              aria-hidden="true"
            />
          </div>

          <div className="shrink-0 px-4 pt-3">
            <div className="grid grid-cols-3 gap-2">
              <StatCard
                variant="dark"
                label="Orang Berdonasi"
                value={campaign.stats.donors.toLocaleString("id-ID")}
              />
              <StatCard
                variant="dark"
                label="Dana Terkumpul"
                value={`${progress}%`}
                progress={progress}
              />
              <StatCard
                variant="dark"
                label="Waktu Tersisa"
                value={`${campaign.stats.daysLeft} Hari`}
              />
            </div>
          </div>

          {showStepper && stepper ? (
            <div className="shrink-0 px-4 pt-5">{stepper}</div>
          ) : null}

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
            <h2 id="donation-modal-title-mobile" className="sr-only">
              Formulir Donasi
            </h2>
            {children}
          </div>
        </div>
      </div>

      {/* Desktop: 1000×750 centered modal */}
      <div
        className={`fixed inset-0 z-[100] hidden items-center justify-center bg-black/45 p-6 backdrop-blur-md lg:flex ${
          isExiting ? "donation-backdrop-exit" : "donation-backdrop-enter"
        }`}
        role="presentation"
      >
        <div
          className={`relative flex h-[750px] w-[1000px] max-h-[calc(100vh-3rem)] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl bg-surface shadow-[0_24px_64px_rgb(0_0_0_/_0.35)] ${
            isExiting ? "donation-modal-exit" : "donation-modal-enter"
          }`}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="donation-modal-title-desktop"
        >
          <div className="relative h-full w-[58%] shrink-0">
            <Image
              src={donationPopupContent.heroImageSrc}
              alt=""
              fill
              className="object-cover object-[center_20%]"
              sizes="580px"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25"
              aria-hidden="true"
            />

            <div className="absolute inset-x-0 top-0 z-10 p-8">
              <HeroTitle className="max-w-[420px] text-3xl leading-tight" />
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 p-6">
              <div className="grid grid-cols-3 gap-3">
                <StatCard
                  variant="light"
                  label="Orang Berdonasi"
                  value={campaign.stats.donors.toLocaleString("id-ID")}
                />
                <StatCard
                  variant="light"
                  label="Dana Terkumpul"
                  value={`${progress}%`}
                  progress={progress}
                />
                <StatCard
                  variant="light"
                  label="Waktu Tersisa"
                  value={`${campaign.stats.daysLeft} Hari`}
                />
              </div>
            </div>
          </div>

          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
            <CloseButton
              onClose={onClose}
              className="top-4 right-4"
            />

            {showStepper && stepper ? (
              <div className="shrink-0 px-8 pt-8 pr-14">{stepper}</div>
            ) : null}

            <div className="min-h-0 flex-1 overflow-y-auto px-8 py-8">
              <h2 id="donation-modal-title-desktop" className="sr-only">
                Formulir Donasi
              </h2>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}

function HeroTitle({ className = "" }: { className?: string }) {
  return (
    <h2 className={`font-bold text-white ${className}`}>
      {donationPopupContent.titleBefore}{" "}
      <span className="text-accent">{donationPopupContent.titleHighlight}</span>{" "}
      {donationPopupContent.titleAfter}
    </h2>
  );
}

function CloseButton({
  onClose,
  className = "",
}: {
  onClose: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClose}
      className={`absolute z-20 flex size-9 items-center justify-center rounded-full bg-white text-text shadow-md transition-opacity hover:opacity-90 ${className}`}
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
  );
}

function StatCard({
  label,
  value,
  progress,
  variant,
}: {
  label: string;
  value: string;
  progress?: number;
  variant: "dark" | "light";
}) {
  if (variant === "light") {
    return (
      <div className="rounded-xl bg-white px-3 py-3 shadow-sm">
        <p className="text-[11px] font-medium text-text">{label}</p>
        <p className="mt-1 text-xl font-bold text-primary">{value}</p>
        {typeof progress === "number" ? (
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#003144] px-2 py-3 text-center">
      <p className="text-[9px] font-medium leading-tight text-white/90">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-primary">{value}</p>
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
