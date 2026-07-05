import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  mockPaymentTransaction,
  paymentSuccessContent,
} from "@/lib/constants/payment";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";

type PaymentSuccessViewProps = {
  campaignId: string;
};

export function PaymentSuccessView({ campaignId: _campaignId }: PaymentSuccessViewProps) {
  const donorName = mockPaymentTransaction.donorName;

  return (
    <section className="bg-surface">
      <Container className="grid gap-0 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="relative min-h-[320px] lg:min-h-[720px]">
          <Image
            src={paymentSuccessContent.photoSrc}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 420px"
            priority
          />
        </div>

        <div className="px-4 py-10 md:px-8 lg:py-14">
          <h1 className="text-3xl font-bold text-primary md:text-4xl">
            {paymentSuccessContent.title}
            <br />
            {donorName}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
            <span className="font-semibold text-primary">Donasi berhasil!</span>{" "}
            {paymentSuccessContent.message.replace("Donasi berhasil!, ", "")}
          </p>

          <div className="mt-8 space-y-4">
            <ActionCard
              tone="dark"
              title={paymentSuccessContent.accountCard.title}
              description={paymentSuccessContent.accountCard.description}
              action={
                <LinkButton
                  href={paymentSuccessContent.accountCard.href}
                  shape="pill"
                  className="shrink-0 px-6 py-2 text-sm"
                >
                  {paymentSuccessContent.accountCard.buttonLabel}
                </LinkButton>
              }
            />
            <ActionCard
              tone="medium"
              title={paymentSuccessContent.shareCard.title}
              description={paymentSuccessContent.shareCard.description}
              action={<ShareButtons />}
            />
            <ActionCard
              tone="light"
              title={paymentSuccessContent.feedbackCard.title}
              description={paymentSuccessContent.feedbackCard.description}
              action={<StarRating />}
            />
          </div>

          <p className="mt-6 text-sm text-text-muted">
            Jika mengalami kendala hubungi kami melalui{" "}
            <a
              href={`mailto:${paymentSuccessContent.feedbackCard.supportEmail}`}
              className="font-semibold text-primary hover:underline"
            >
              {paymentSuccessContent.feedbackCard.supportEmail}
            </a>
          </p>
          <p className="mt-4 text-xs leading-relaxed text-text-muted">
            {paymentSuccessContent.taxDisclaimer}
          </p>
        </div>
      </Container>
    </section>
  );
}

function ActionCard({
  title,
  description,
  action,
  tone,
}: {
  title: string;
  description: string;
  action: ReactNode;
  tone: "dark" | "medium" | "light";
}) {
  const toneClasses = {
    dark: "bg-hero-overlay text-white",
    medium: "bg-primary text-white",
    light: "bg-primary-light text-text",
  };

  return (
    <div className={`rounded-xl p-5 md:flex md:items-center md:justify-between md:gap-6 ${toneClasses[tone]}`}>
      <div>
        <h2 className="text-base font-bold md:text-lg">{title}</h2>
        <p className={`mt-2 text-sm ${tone === "light" ? "text-text-muted" : "text-white/85"}`}>
          {description}
        </p>
      </div>
      <div className="mt-4 md:mt-0">{action}</div>
    </div>
  );
}

function ShareButtons() {
  const networks = ["f", "w", "i", "x"];
  return (
    <div className="flex gap-2">
      {networks.map((network) => (
        <span
          key={network}
          className="flex size-9 items-center justify-center rounded-full bg-white/15 text-sm font-bold uppercase"
        >
          {network}
        </span>
      ))}
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex gap-1" aria-label="Beri rating">
      {Array.from({ length: 5 }, (_, index) => (
        <button
          key={index}
          type="button"
          className="text-2xl text-accent"
          aria-label={`${index + 1} bintang`}
        >
          ☆
        </button>
      ))}
    </div>
  );
}
