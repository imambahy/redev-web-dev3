"use client";

import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format-currency";

type DonationStepCommitmentProps = {
  oneTimeAmount: number;
  monthlyAmount?: number;
  onAcceptMonthly: () => void;
  onKeepOneTime: () => void;
  onBack?: () => void;
};

export function DonationStepCommitment({
  oneTimeAmount,
  monthlyAmount = 150_000,
  onAcceptMonthly,
  onKeepOneTime,
  onBack,
}: DonationStepCommitmentProps) {
  return (
    <div className="flex h-full flex-col gap-5 pb-2 lg:justify-between lg:gap-6 lg:pb-0">
      <div>
        <div className="relative mb-6 flex items-center justify-center lg:mb-8">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="absolute left-0 flex size-9 items-center justify-center rounded-full text-text hover:bg-surface-muted"
              aria-label="Kembali"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : null}
          <p className="text-sm font-medium text-text">Donasi satu kali</p>
        </div>

        <h3 className="text-center text-xl font-bold leading-snug text-[#003144] md:text-2xl lg:text-left lg:text-[28px] lg:leading-snug">
          Bantu mereka hari ini, lindungi mereka{" "}
          <span className="text-primary">selamanya</span>
        </h3>
        <p className="mt-3 text-center text-sm leading-relaxed text-text-muted lg:text-left">
          Donasi {formatCurrency(oneTimeAmount)} Anda sangat berarti. Jadilah{" "}
          <span className="font-semibold text-primary">Pendekar Anak</span>{" "}
          dengan komitmen bulanan agar bantuan untuk anak-anak tidak pernah
          terhenti.
        </p>
      </div>

      <div className="rounded-2xl bg-badge px-5 py-6 text-center text-white lg:px-6 lg:py-8">
        <p className="text-2xl font-bold md:text-3xl lg:text-4xl">
          {formatCurrency(monthlyAmount)} / bulan
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/95 lg:mt-3">
          Dapatkan Gelang Pendekar Anak eksklusif sebagai apresiasi atas
          komitmen Anda melindungi masa depan anak Indonesia.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          shape="pill"
          className="w-full"
          onClick={onAcceptMonthly}
        >
          Ya, Jadi Pendekar Anak
        </Button>
        <Button
          type="button"
          shape="pill"
          variant="outline"
          className="w-full !border-accent !text-accent hover:!bg-accent/10"
          onClick={onKeepOneTime}
        >
          Tetap Donasi {formatCurrency(oneTimeAmount)}
        </Button>
      </div>
    </div>
  );
}
