import Image from "next/image";
import {
  mockPaymentTransaction,
  paymentFailedContent,
  getPaymentPath,
} from "@/lib/constants/payment";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";

type PaymentFailedViewProps = {
  campaignId: string;
};

export function PaymentFailedView({ campaignId }: PaymentFailedViewProps) {
  return (
    <section className="bg-surface py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-text md:text-4xl">
            Pembayaran <span className="text-primary">Belum Berhasil</span>
          </h1>
          <p className="mt-3 text-sm text-text-muted md:text-base">
            {paymentFailedContent.description}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-border bg-surface p-6 shadow-card md:p-8">
          <div className="grid gap-6 md:grid-cols-[180px_1fr] md:items-center">
            <div className="relative mx-auto h-36 w-36">
              <Image
                src={paymentFailedContent.illustrationSrc}
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-semibold text-text">Tanggal Transaksi</dt>
                  <dd className="mt-1 text-sm text-text-muted">
                    {paymentFailedContent.transactionDate}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-text">Status</dt>
                  <dd className="mt-1 text-sm font-semibold text-red-500">
                    {paymentFailedContent.statusLabel}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-semibold text-text">ID Transaksi</dt>
                  <dd className="mt-1 text-sm text-text-muted">
                    {mockPaymentTransaction.id}
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
                  href={getPaymentPath(campaignId, "dana")}
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

        <div className="mx-auto mt-8 flex max-w-4xl flex-col items-start justify-between gap-4 rounded-2xl bg-hero-overlay p-6 text-white md:flex-row md:items-center md:p-8">
          <div>
            <h2 className="text-lg font-bold">{paymentFailedContent.helpTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/85">
              {paymentFailedContent.helpDescription}
            </p>
          </div>
          <LinkButton
            href={paymentFailedContent.helpHref}
            shape="pill"
            className="shrink-0"
          >
            {paymentFailedContent.helpButtonLabel}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
