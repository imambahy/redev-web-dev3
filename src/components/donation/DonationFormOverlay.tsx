"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { CampaignDetail, DonationType } from "@/types/campaign";
import { donationPopupContent } from "@/lib/constants/donation-popup";

type DonationFormOverlayProps = {
  campaign: CampaignDetail;
  donationType: DonationType;
  showStepper?: boolean;
  stepper?: ReactNode;
  isExiting: boolean;
  onBack: () => void;
  onClose: () => void;
  children: ReactNode;
};

export function DonationFormOverlay({
  campaign,
  donationType,
  showStepper = true,
  stepper,
  isExiting,
  onBack,
  onClose,
  children,
}: DonationFormOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const progress = Math.round(
    (campaign.stats.raised / campaign.stats.goal) * 100,
  );
  const title =
    donationType === "bulanan" ? "Pendekar Anak" : "Donasi Satu Kali";

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
            className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-white text-text shadow-md transition-opacity hover:opacity-90"
            aria-label="Tutup"
          >
            <CloseIcon />
          </button>

          <div className="absolute inset-x-0 bottom-8 z-10 px-5">
            <h2 className="max-w-md text-lg font-bold leading-snug text-white">
              {donationPopupContent.titleBefore}{" "}
              <span className="text-accent">
                {donationPopupContent.titleHighlight}
              </span>{" "}
              {donationPopupContent.titleAfter}
            </h2>
          </div>
        </div>

        <div
          className={`relative -mt-5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-3xl bg-surface shadow-[0_-8px_30px_rgb(0_0_0_/_0.15)] ${
            isExiting ? "donation-modal-exit" : "donation-modal-enter"
          }`}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="donation-modal-title-mobile"
        >
          <div className="flex shrink-0 justify-center pt-3 pb-1">
            <span className="h-1 w-10 rounded-full bg-border" aria-hidden="true" />
          </div>

          <div className="shrink-0 px-4 pt-3">
            <div className="grid grid-cols-3 gap-2">
              <MobileStatCard
                label="Orang Berdonasi"
                value={campaign.stats.donors.toLocaleString("id-ID")}
              />
              <MobileStatCard
                label="Dana Terkumpul"
                value={`${progress}%`}
                progress={progress}
              />
              <MobileStatCard
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

      {/* Desktop: centered 2-column modal */}
      <div
        className={`fixed inset-0 z-[100] hidden items-center justify-center p-6 md:p-8 lg:flex ${
          isExiting
            ? "donation-backdrop-exit bg-black/50"
            : "donation-backdrop-enter bg-black/50"
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
          aria-labelledby="donation-modal-title-desktop"
        >
          <div className="relative min-h-0">
            <Image
              src={campaign.heroImageSrc}
              alt={campaign.imageAlt}
              fill
              className="object-cover"
              sizes="37vw"
              priority
            />
            <div className="absolute inset-0 bg-hero-overlay/55" aria-hidden="true" />
            <div className="relative z-10 flex h-full flex-col justify-between p-8">
              <h2 className="max-w-md text-2xl font-bold leading-tight text-white">
                {campaign.heroTitle}
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <DesktopStatCard
                  label="Orang Berdonasi"
                  value={campaign.stats.donors.toLocaleString("id-ID")}
                />
                <DesktopStatCard label="Dana Terkumpul" value={`${progress}%`} />
                <DesktopStatCard
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
                <BackIcon />
              </button>
              <h2
                id="donation-modal-title-desktop"
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
                <CloseIcon size={18} />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-6 md:px-8">
              {showStepper && stepper ? (
                <div className="shrink-0">{stepper}</div>
              ) : null}
              <div
                className={`min-h-0 flex-1 overflow-y-auto ${
                  showStepper && stepper ? "mt-8" : ""
                }`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}

function MobileStatCard({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress?: number;
}) {
  return (
    <div className="rounded-xl bg-[#003144] px-2 py-3 text-center">
      <p className="text-[9px] font-medium leading-tight text-white/90">{label}</p>
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

function DesktopStatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/95 px-3 py-3 text-center shadow-card">
      <p className="text-[10px] font-semibold text-text-muted">{label}</p>
      <p className="mt-1 text-lg font-bold text-primary">{value}</p>
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 2l10 10M12 2L2 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
