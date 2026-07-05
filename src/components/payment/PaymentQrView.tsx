"use client";

import { mockPaymentTransaction, qrPaymentContent } from "@/lib/constants/payment";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format-currency";

type PaymentQrViewProps = {
  method: "dana" | "shopeepay";
};

export function PaymentQrView({ method }: PaymentQrViewProps) {
  const transaction = mockPaymentTransaction;
  const content = qrPaymentContent[method];

  return (
    <section className="bg-surface py-10 md:py-14">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold text-text md:text-3xl">
            Hi <span className="text-primary">{transaction.donorName}</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
            {content.instruction}
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl bg-hero-overlay text-white">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="p-6">
                <p className="text-sm text-white/70">Nominal harus dibayar</p>
                <p className="mt-2 text-3xl font-bold">
                  {formatCurrency(transaction.amount)}
                  {transaction.isMonthly ? "/Bulan" : ""}
                </p>
                <p className="mt-3 text-sm text-white/80">
                  Bayar sebelum {transaction.dueDate}
                </p>

                <div className="mt-8 flex items-center justify-between gap-2">
                  {content.steps.map((step, index) => (
                    <div key={step} className="flex flex-1 flex-col items-center gap-2">
                      <span className="flex size-8 items-center justify-center rounded-full bg-white text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      <span className="text-center text-xs text-white/85">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/15 p-6 md:border-l md:border-t-0">
                <div className="mx-auto flex size-40 items-center justify-center rounded-xl bg-white text-xs font-semibold text-text">
                  QR CODE
                </div>
                {content.showPhoneInput ? (
                  <label className="mt-6 block">
                    <span className="text-sm text-white/85">Nomor Handphone</span>
                    <input
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      className="mt-2 w-full rounded-lg border-0 px-4 py-3 text-sm text-text outline-none"
                    />
                  </label>
                ) : null}
                <Button shape="pill" className="mt-4 w-full">
                  {content.buttonLabel}
                </Button>
              </div>
            </div>
          </div>

          <dl className="mt-6 grid gap-4 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-2">
            <DetailItem label="Tanggal Transaksi" value={transaction.transactionDate} />
            <DetailItem label="Jatuh Tempo" value={transaction.transactionDate} />
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
      <dt className="text-sm font-semibold text-text">{label}</dt>
      <dd className="mt-1 text-sm text-primary">{value}</dd>
    </div>
  );
}
