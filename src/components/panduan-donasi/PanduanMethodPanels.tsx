"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { panduanDonasiPageContent } from "@/lib/constants/panduan-donasi";
import type { BankAccount, FieldLocation } from "@/lib/constants/panduan-donasi";

const panduanCtaOverlay =
  "linear-gradient(to left, rgba(30, 171, 225, 0) 0%, rgba(30, 171, 225, 0.5) 35%, rgba(30, 171, 225, 1) 98%)";

export function PanduanOnlinePanel() {
  const { onlineSteps, ctaCard } = panduanDonasiPageContent;

  return (
    <div className="space-y-4">
      {onlineSteps.map((step) => (
        <article
          key={step.step}
          className="rounded-xl border border-border bg-surface p-5 shadow-card md:p-6"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-primary">
            Langkah {step.step}
          </p>
          <h3 className="mt-2 text-lg font-bold text-text">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {step.description}
          </p>
        </article>
      ))}

      <article className="relative overflow-hidden rounded-xl shadow-card">
        <div className="relative min-h-[180px]">
          <Image
            src={ctaCard.imageSrc}
            alt=""
            fill
            className="object-cover object-right"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: panduanCtaOverlay }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col items-start gap-4 p-6">
            <h3 className="max-w-md text-lg font-bold leading-snug text-white">
              {ctaCard.title}
            </h3>
            <Link
              href={ctaCard.href}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              {ctaCard.buttonLabel}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export function PanduanTransferPanel() {
  const { transfer } = panduanDonasiPageContent;

  return (
    <div className="space-y-4">
      <p className="text-base font-bold text-primary md:text-lg">{transfer.intro}</p>

      <div className="space-y-4">
        {transfer.accounts.map((account) => (
          <TransferBankCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
}

function TransferBankCard({ account }: { account: BankAccount }) {
  const isUsd = account.currency === "USD";

  return (
    <article className="overflow-hidden rounded-2xl bg-surface shadow-card">
      <div className="bg-[#3966cc] px-5 py-4 md:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-white/80">Nomor Rekening</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-lg font-bold text-white md:text-xl">
                {account.accountNumber}
              </p>
              <CopyButton
                value={account.accountNumber.replace(/\s/g, "")}
                label={account.bankName}
                variant="on-primary"
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/85 md:text-sm">
              {account.accountName}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
              isUsd ? "bg-accent text-text" : "bg-primary-light text-primary"
            }`}
          >
            {account.currency}
          </span>
        </div>
      </div>

      <div className="px-5 py-4 md:px-6 md:py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="relative h-8 w-24">
            <Image
              src={account.logoSrc}
              alt={account.bankName}
              fill
              className="object-contain object-left"
              sizes="96px"
            />
          </div>
          <p className="text-right text-sm font-medium text-text-muted">
            {account.bankName}
          </p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-text-muted md:text-sm">
          {account.address}
        </p>

        <p className="mt-4 text-xs text-text-muted">Swift Code</p>
        <p className="mt-1 text-sm font-bold text-text md:text-base">
          {account.swiftCode}
        </p>
      </div>
    </article>
  );
}

export function PanduanTeleponPanel() {
  const { telepon } = panduanDonasiPageContent;

  return (
    <div className="space-y-4">
      {/* <article className="rounded-xl border border-border bg-surface p-5 shadow-card md:p-6">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
            <PhoneIcon />
          </span>
          <div>
            <h3 className="text-lg font-bold text-text">Melalui Telepon</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {telepon.intro}
            </p>
          </div>
        </div>
      </article> */}

      <article className="rounded-xl border border-border bg-surface p-5 shadow-card md:p-6">
        <p className="text-sm font-semibold text-text">
          Tentukan jenis donasi yang ingin kamu lakukan, sekali atau rutin setiap
          bulan.
        </p>

        <div className="mt-5 space-y-3">
          {telepon.contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-muted px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
                  <PhoneIcon />
                </span>
                <div>
                  <p className="text-sm font-bold text-text">{contact.label}</p>
                  <p className="text-sm text-text-muted">{contact.number}</p>
                </div>
              </div>

              {contact.actionLabel ? (
                <a
                  href={contact.href}
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-dark"
                >
                  {contact.actionLabel}
                </a>
              ) : (
                <a
                  href={contact.href}
                  className="text-sm font-semibold text-primary underline underline-offset-2"
                >
                  Hubungi
                </a>
              )}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

export function PanduanLapanganPanel() {
  const { lapangan } = panduanDonasiPageContent;
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>(lapangan.defaultRegion);

  const filteredLocations = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return lapangan.locations.filter((location) => {
      const matchesRegion =
        region === "Semua Wilayah" || location.region === region;
      const matchesQuery =
        !normalized ||
        location.city.toLowerCase().includes(normalized) ||
        location.venue.toLowerCase().includes(normalized) ||
        location.address.toLowerCase().includes(normalized);
      return matchesRegion && matchesQuery;
    });
  }, [lapangan.locations, query, region]);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-card">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={lapangan.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-text outline-none placeholder:text-text-muted"
            aria-label={lapangan.searchPlaceholder}
          />
          <button
            type="button"
            className="flex shrink-0 items-center justify-center self-stretch bg-primary px-5 text-white"
            aria-label="Cari"
          >
            <SearchIcon />
          </button>
        </div>

        <div className="relative">
          <select
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="w-full appearance-none rounded-xl border border-border bg-surface px-4 py-3.5 pr-10 text-sm text-text shadow-card outline-none focus:border-primary"
            aria-label="Filter wilayah"
          >
            {lapangan.regionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted" />
        </div>
      </div>

      <div className="space-y-4">
        {filteredLocations.map((location) => (
          <LapanganLocationCard key={location.id} location={location} />
        ))}

        {filteredLocations.length === 0 ? (
          <p className="text-sm text-text-muted">
            Tidak ada lokasi yang sesuai dengan pencarian Anda.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function LapanganLocationCard({ location }: { location: FieldLocation }) {
  const statusLabel =
    location.status === "ongoing" ? "Berlangsung" : "Akan Datang";

  return (
    <article className="overflow-hidden rounded-2xl bg-surface shadow-card">
      <div className="flex items-center justify-between bg-[#3966cc] px-5 py-3 md:px-6">
        <span className="text-sm font-semibold text-white md:text-base">
          {location.city}
        </span>
        <span className="text-sm font-semibold text-white">{statusLabel}</span>
      </div>

      <div className="px-5 py-4 md:px-6 md:py-5">
        <h4 className="text-base font-bold text-text md:text-lg">
          {location.venue}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {location.address}
        </p>

        <div className="my-4 border-t border-border" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-text-muted">Mulai</p>
            <p className="mt-1 text-sm font-bold text-text md:text-base">
              {location.startDate}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-muted">Berakhir</p>
            <p className="mt-1 text-sm font-bold text-primary md:text-base">
              {location.endDate}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function CopyButton({
  value,
  label,
  variant = "default",
}: {
  value: string;
  label: string;
  variant?: "default" | "on-primary";
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
        variant === "on-primary"
          ? "text-white hover:bg-white/15"
          : "bg-primary text-white hover:bg-primary-dark"
      }`}
      aria-label={`Salin nomor rekening ${label}`}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 4H9L10 8.5L7.5 10C8.6 12.4 10.6 14.4 13 15.5L14.5 13L19 14V16.5C19 17.3 18.3 18 17.5 18C10.9 18 6 13.1 6 6.5C6 5.7 6.7 5 7.5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
