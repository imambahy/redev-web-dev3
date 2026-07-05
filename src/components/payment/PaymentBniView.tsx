"use client";

import { useState } from "react";
import {
  bniPaymentContent,
  mockPaymentTransaction,
} from "@/lib/constants/payment";
import { Container } from "@/components/layout/Container";
import { formatCurrency } from "@/lib/utils/format-currency";

export function PaymentBniView() {
  const [activeTab, setActiveTab] = useState(0);
  const transaction = mockPaymentTransaction;

  return (
    <section className="bg-surface py-10 md:py-14">
      <Container>
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold text-text md:text-3xl">
            Hi <span className="text-primary">{transaction.donorName}</span>
          </h1>
          <p className="mt-2 text-sm text-text-muted md:text-base">
            Satu langkah lagi untuk menyelesaikan donasi Anda.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl bg-hero-overlay text-white">
                <div className="flex items-center justify-between gap-3 bg-white px-4 py-3 text-text">
                  <span className="text-sm font-bold text-primary">BNI</span>
                  <span className="text-xs text-text-muted">
                    Bayar sebelum {bniPaymentContent.deadline}
                  </span>
                </div>
                <div className="grid gap-4 p-5 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-white/70">Nominal harus dibayar</p>
                    <p className="mt-2 text-2xl font-bold">
                      {formatCurrency(transaction.amount)}
                      {transaction.isMonthly ? "/Bulan" : ""}
                    </p>
                    <p className="mt-3 text-xs text-white/70">{transaction.id}</p>
                    <p className="text-xs text-white/70">{transaction.transactionDate}</p>
                  </div>
                  <div className="border-t border-white/15 pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
                    <p className="text-xs text-white/70">Nomor Rekening Kami:</p>
                    <p className="mt-2 text-lg font-bold">{transaction.virtualAccount}</p>
                    <p className="mt-4 text-xs text-white/70">Nama Akun Kami:</p>
                    <p className="text-sm font-semibold">{transaction.accountName}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-accent/20 p-5">
                <h2 className="font-bold text-text">Keamanan Transaksi</h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-text-muted">
                  {bniPaymentContent.securityNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div>
              <div className="flex gap-2 border-b border-border">
                {bniPaymentContent.tabs.map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-3 text-sm font-semibold ${
                      activeTab === index
                        ? "border-b-2 border-primary text-primary"
                        : "text-text-muted"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-4 space-y-4">
                <InstructionBlock {...bniPaymentContent.instructions.login} />
                <InstructionBlock {...bniPaymentContent.instructions.payment} highlight />
                <InstructionBlock {...bniPaymentContent.instructions.success} outlined />
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
          ? "border-2 border-primary bg-primary-light"
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
