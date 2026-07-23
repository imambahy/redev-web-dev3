"use client";

import Image from "next/image";
import {
  getMockTransaction,
  qrCodeSrc,
  qrPaymentContent,
} from "@/lib/constants/payment";
import { useDonationPaymentType } from "@/hooks/useDonationPaymentType";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format-currency";

type PaymentQrViewProps = {
  method: "dana" | "shopeepay";
};

export function PaymentQrView({ method }: PaymentQrViewProps) {
  const donationType = useDonationPaymentType();
  const isMonthly = donationType === "bulanan";
  const transaction = getMockTransaction(donationType);
  const content = qrPaymentContent[method];
  const amountLabel = formatCurrency(transaction.amount);
  const showPhoneInput = isMonthly;

  return (
    <section className="bg-surface py-10 md:py-14">
      <Container>
        <div className="mx-auto max-w-xl">
          <h1 className="text-2xl font-bold text-text md:text-3xl">
            Hi <span className="text-primary">{transaction.donorName}</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-text md:text-base">
            Silahkan lengkapi donasi Anda sebesar{" "}
            <span className="font-semibold text-primary">{amountLabel}</span>{" "}
            dengan cara scanQR Code di bawah ini melalui aplikasi{" "}
            <span className="font-semibold text-primary">{content.methodLabel}</span>{" "}
            anda
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl bg-[#2653ba] px-5 py-6 text-white md:px-8 md:py-8">
            <div className="text-center">
              <p className="text-sm text-white/80">Nominal harus dibayar</p>
              <p className="mt-1 text-3xl font-bold md:text-4xl">
                {amountLabel}
                {isMonthly ? "/Bulan" : ""}
              </p>
              <p className="mt-2 text-sm text-white/85">
                Bayar sebelum {transaction.dueDate}
              </p>
            </div>

            <div className="relative mx-auto mt-8 max-w-sm">
              <div
                className="absolute top-4 right-8 left-8 h-px bg-white/50"
                aria-hidden="true"
              />
              <ol className="relative grid grid-cols-3 gap-2">
                {content.steps.map((step, index) => (
                  <li key={step} className="flex flex-col items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-full bg-white text-xs font-bold text-[#2653ba]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-center text-[11px] leading-tight text-white md:text-xs">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mx-auto mt-8 flex max-w-[200px] items-center justify-center rounded-xl bg-white p-3">
              <Image
                src={qrCodeSrc}
                alt={`QR Code ${content.methodLabel}`}
                width={176}
                height={176}
                className="h-auto w-full"
              />
            </div>

            {showPhoneInput ? (
              <label className="mt-6 block">
                <span className="text-sm text-white">Nomor Handphone</span>
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="08xxxxxxxxxx"
                  className="mt-2 w-full rounded-lg border-0 px-4 py-3 text-sm text-text outline-none"
                />
              </label>
            ) : null}

            {showPhoneInput ? (
              <Button shape="pill" className="mt-4 w-full">
                {content.buttonLabel}
              </Button>
            ) : null}
          </div>

          <dl className="mt-6 space-y-4 rounded-2xl border border-border bg-surface p-5 md:p-6">
            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="Tanggal Transaksi" value={transaction.transactionDate} />
              <DetailItem label="Jatuh Tempo" value={transaction.transactionDate} />
            </div>
            <DetailItem label="ID Transaksi" value={transaction.id} />
            <DetailItem label="Metode Pembayaran" value={content.methodLabel} />
          </dl>
        </div>
      </Container>
    </section>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-text-muted md:text-sm">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-primary break-all md:text-base">
        {value}
      </dd>
    </div>
  );
}
