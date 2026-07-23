"use client";

import { useState } from "react";
import Image from "next/image";
import {
  bniPaymentContent,
  getMockTransaction,
} from "@/lib/constants/payment";
import { useDonationPaymentType } from "@/hooks/useDonationPaymentType";
import { Container } from "@/components/layout/Container";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
import { formatCurrency } from "@/lib/utils/format-currency";

const bniTabItems = bniPaymentContent.tabs.map((tab) => ({
  id: tab,
  label: tab,
}));

export function PaymentBniView() {
  const [activeTab, setActiveTab] = useState<(typeof bniPaymentContent.tabs)[number]>(
    bniPaymentContent.tabs[0],
  );
  const [copied, setCopied] = useState(false);
  const donationType = useDonationPaymentType();
  const transaction = getMockTransaction(donationType);
  const isMonthly = transaction.isMonthly;

  const handleCopy = async () => {
    const va = transaction.virtualAccount;
    if (!va) return;
    try {
      await navigator.clipboard.writeText(va);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section className="bg-surface py-10 md:py-14">
      <Container>
        <div className="mx-auto max-w-xl lg:max-w-6xl">
          <h1 className="text-2xl font-bold text-text md:text-3xl">
            Hi <span className="text-primary">{transaction.donorName}</span>
          </h1>
          <p className="mt-2 text-sm text-text-muted md:text-base">
            Satu langkah lagi untuk menyelesaikan donasi Anda.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <div className="rounded-2xl bg-[#2653ba] p-3 text-white md:p-4">
                <div className="relative flex items-center rounded-full bg-white px-4 py-2.5">
                  <Image
                    src={bniPaymentContent.logoSrc}
                    alt="BNI"
                    width={72}
                    height={28}
                    className="relative z-10 h-4 w-auto object-contain"
                  />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center gap-1.5 px-4 text-xs font-bold text-text-muted md:text-sm">
                    <ClockIcon />
                    Bayar sebelum {bniPaymentContent.deadline}
                  </span>
                </div>

                <div className="grid gap-5 px-2 py-5 sm:grid-cols-2 sm:gap-0 md:px-3 md:py-6">
                  <div className="sm:pr-5">
                    <p className="text-sm text-white/85">Nominal harus dibayar</p>
                    <p className="mt-1 text-2xl font-bold md:text-3xl">
                      {formatCurrency(transaction.amount)}
                      {isMonthly ? "/Bulan" : ""}
                    </p>
                    <p className="mt-3 text-xs text-white/75">{transaction.id}</p>
                    <p className="text-xs text-white/75">
                      {transaction.transactionDate}
                    </p>
                  </div>

                  <div className="border-t border-white/30 pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
                    <p className="text-sm text-white/85">Nomor Rekening Kami:</p>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-base font-bold tracking-wide md:text-lg">
                        {transaction.virtualAccount}
                      </p>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="rounded-md p-1.5 text-white transition-opacity hover:bg-white/10"
                        aria-label={copied ? "Tersalin" : "Salin nomor rekening"}
                      >
                        <CopyIcon />
                      </button>
                    </div>
                    {copied ? (
                      <p className="mt-1 text-xs text-accent">Nomor tersalin</p>
                    ) : null}

                    <p className="mt-4 text-sm text-white/85">Nama Akun Kami:</p>
                    <p className="mt-1 text-base font-bold">
                      {transaction.accountName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#FFF4CC] p-5">
                <h2 className="font-bold text-text">Keamanan Transaksi</h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-text">
                  {bniPaymentContent.securityNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div>
              <SegmentedTabs
                items={bniTabItems}
                activeId={activeTab}
                onChange={setActiveTab}
                ariaLabel="Metode pembayaran BNI"
                shape="chip"
                size="compact"
                className="border-border bg-surface-muted"
              />

              <div className="mt-4 space-y-4">
                <InstructionBlock {...bniPaymentContent.instructions.login} />
                <InstructionBlock
                  {...bniPaymentContent.instructions.payment}
                  highlight
                />
                <InstructionBlock
                  {...bniPaymentContent.instructions.success}
                  outlined
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function InstructionBlock({
  title,
  steps,
  highlight = false,
  outlined = false,
}: {
  title: string;
  steps: string[];
  highlight?: boolean;
  outlined?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-5 ${
        outlined
          ? "border border-primary bg-surface"
          : highlight
            ? "bg-surface-muted"
            : "bg-surface-muted"
      }`}
    >
      <h3 className="font-bold text-text">{title}</h3>
      <ol className="mt-3 space-y-2 text-sm leading-relaxed text-text-muted">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-text-muted"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="9"
        y="9"
        width="11"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 15V7a2 2 0 012-2h8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
