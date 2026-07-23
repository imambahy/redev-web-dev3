"use client";

import Image from "next/image";
import {
  getMockTransaction,
  getPaymentFailedContent,
  getPaymentPath,
} from "@/lib/constants/payment";
import { useDonationPaymentType } from "@/hooks/useDonationPaymentType";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";

type PaymentFailedViewProps = {
  campaignId: string;
};

export function PaymentFailedView({ campaignId }: PaymentFailedViewProps) {
  const donationType = useDonationPaymentType();
  const content = getPaymentFailedContent(donationType);
  const transaction = getMockTransaction(donationType);

  return (
    <section className="bg-surface py-10 md:py-14">
      <Container>
        <div className="mx-auto max-w-lg text-center md:max-w-3xl">
          <h1 className="text-2xl font-bold text-text md:text-4xl">
            Pembayaran <span className="text-primary">Belum Berhasil</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
            {content.description}
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-border bg-surface p-5 shadow-card md:mt-10 md:max-w-3xl md:p-8">
          <div className="md:grid md:grid-cols-[180px_1fr] md:items-start md:gap-8">
            <div className="relative mx-auto h-40 w-48 md:h-44 md:w-full">
              <Image
                src={content.illustrationSrc}
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>

            <div>
              <dl className="mt-6 space-y-4 text-left md:mt-0">
                <div>
                  <dt className="text-sm font-semibold text-text">Tanggal Transaksi</dt>
                  <dd className="mt-1 text-sm text-primary md:text-base">
                    {content.transactionDate}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-text">Status</dt>
                  <dd className="mt-1 text-sm font-semibold text-red-500 md:text-base">
                    {content.statusLabel}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-text">ID Transaksi</dt>
                  <dd className="mt-1 text-sm break-all text-primary md:text-base">
                    {transaction.id}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <LinkButton
                  href={getPaymentPath(campaignId, "processing")}
                  className="w-full flex-1"
                  shape="pill"
                >
                  Coba Kembali
                </LinkButton>
                <LinkButton
                  href={getPaymentPath(campaignId, "shopeepay")}
                  variant="outline"
                  shape="pill"
                  className="w-full flex-1 border-accent text-accent hover:bg-accent/10"
                >
                  Pilih Metode Pembayaran Lain
                </LinkButton>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-lg rounded-2xl bg-[#2653ba] p-5 text-white md:mt-8 md:flex md:max-w-3xl md:items-center md:justify-between md:gap-6 md:p-7">
          <div className="md:max-w-xl">
            <h2 className="text-lg font-bold">{content.helpTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/90">
              {content.helpDescription}
            </p>
          </div>
          <LinkButton
            href={content.helpHref}
            shape="pill"
            className="mt-5 w-full shrink-0 md:mt-0 md:w-auto"
          >
            {content.helpButtonLabel}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
