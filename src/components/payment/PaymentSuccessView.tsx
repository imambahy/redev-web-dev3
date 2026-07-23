"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import {
  getMockTransaction,
  getPaymentSuccessContent,
} from "@/lib/constants/payment";
import { useDonationPaymentType } from "@/hooks/useDonationPaymentType";
import { Container } from "@/components/layout/Container";
import { Button, LinkButton } from "@/components/ui/Button";

type PaymentSuccessViewProps = {
  campaignId: string;
};

export function PaymentSuccessView({
  campaignId: _campaignId,
}: PaymentSuccessViewProps) {
  const donationType = useDonationPaymentType();
  const content = getPaymentSuccessContent(donationType);
  const donorName = getMockTransaction(donationType).donorName;

  if (content.isMonthly) {
    return (
      <section className="bg-surface py-10 md:py-14">
        <Container>
          <div className="mx-auto max-w-lg">
            <SuccessHeader
              illustrationSrc={content.illustrationSrc}
              title={content.title}
              donorName={donorName}
              message={content.message}
            />
            <SuccessActions content={content} centered />
            <SuccessFooter content={content} />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-surface">
      <div className="relative h-56 w-full md:hidden">
        <Image
          src={content.photoSrc}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <Container className="grid gap-0 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="relative hidden min-h-[720px] lg:block">
          <Image
            src={content.photoSrc}
            alt=""
            fill
            className="object-cover"
            sizes="420px"
            priority
          />
        </div>

        <div className="px-4 py-8 md:px-8 md:py-12">
          <div className="mx-auto max-w-xl">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="relative h-24 w-24 shrink-0 md:h-28 md:w-28">
                <Image
                  src={content.illustrationSrc}
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="mt-4 text-2xl font-bold text-text md:text-3xl">
                {content.title}{" "}
                <span className="text-primary">{donorName}</span>
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
                <span className="font-semibold text-primary">Donasi berhasil!</span>{" "}
                {content.message}
              </p>
              {content.showCertificateButton ? (
                <Button shape="pill" className="mt-5 px-8">
                  {content.certificateLabel}
                </Button>
              ) : null}
            </div>

            <SuccessActions content={content} centered={false} />
            <SuccessFooter content={content} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function SuccessHeader({
  illustrationSrc,
  title,
  donorName,
  message,
}: {
  illustrationSrc: string;
  title: string;
  donorName: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28 shrink-0 md:h-32 md:w-32">
        <Image
          src={illustrationSrc}
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-text md:text-3xl">
        {title} <span className="text-primary">{donorName}</span>
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
        <span className="font-semibold text-primary">Donasi berhasil!</span> {message}
      </p>
    </div>
  );
}

function SuccessActions({
  content,
  centered,
}: {
  content: ReturnType<typeof getPaymentSuccessContent>;
  centered: boolean;
}) {
  return (
    <div className="mt-8 space-y-4">
      <ActionCard
        tone="dark"
        title={content.primaryAction.title}
        description={content.primaryAction.description}
        centered={centered}
        action={
          <LinkButton
            href={content.primaryAction.href}
            shape="pill"
            className={`px-6 py-2.5 text-sm ${centered ? "w-full max-w-xs" : "shrink-0"}`}
          >
            {content.primaryAction.buttonLabel}
          </LinkButton>
        }
      />
      <ActionCard
        tone="medium"
        title={content.shareCard.title}
        description={content.shareCard.description}
        centered={centered}
        action={<ShareButtons />}
      />
      <ActionCard
        tone="light"
        title={content.feedbackCard.title}
        description={content.feedbackCard.description}
        centered={centered}
        action={<StarRating />}
      />
    </div>
  );
}

function SuccessFooter({
  content,
}: {
  content: ReturnType<typeof getPaymentSuccessContent>;
}) {
  return (
    <>
      <p className="mt-6 text-center text-sm text-text-muted md:text-left">
        Jika mengalami kendala hubungi kami melalui{" "}
        <a
          href={`mailto:${content.feedbackCard.supportEmail}`}
          className="font-semibold text-primary hover:underline"
        >
          {content.feedbackCard.supportEmail}
        </a>
      </p>
      <p className="mt-3 text-center text-xs leading-relaxed text-text-muted md:text-left">
        {content.taxDisclaimer}
      </p>
    </>
  );
}

function ActionCard({
  title,
  description,
  action,
  tone,
  centered,
}: {
  title: string;
  description: string;
  action: ReactNode;
  tone: "dark" | "medium" | "light";
  centered: boolean;
}) {
  const toneClasses = {
    dark: "bg-[#003144] text-white",
    medium: "bg-primary text-white",
    light: "bg-primary-light text-text",
  };

  return (
    <div
      className={`rounded-2xl p-5 md:p-6 ${toneClasses[tone]} ${
        centered
          ? "text-center"
          : "md:flex md:items-center md:justify-between md:gap-6 md:text-left"
      }`}
    >
      <div>
        <h2 className="text-base font-bold md:text-lg">{title}</h2>
        <p
          className={`mt-2 text-sm leading-relaxed ${
            tone === "light" ? "text-text-muted" : "text-white/90"
          }`}
        >
          {description}
        </p>
      </div>
      <div className={`mt-4 flex ${centered ? "justify-center" : "md:mt-0 md:justify-end"}`}>
        {action}
      </div>
    </div>
  );
}

function ShareButtons() {
  const networks = [
    { id: "facebook", label: "Facebook", glyph: "f" },
    { id: "whatsapp", label: "WhatsApp", glyph: "w" },
    { id: "instagram", label: "Instagram", glyph: "i" },
    { id: "x", label: "X", glyph: "x" },
  ] as const;

  return (
    <div className="flex items-center justify-center gap-3">
      {networks.map((network) => (
        <button
          key={network.id}
          type="button"
          aria-label={network.label}
          className="flex size-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold uppercase transition-opacity hover:opacity-80"
        >
          {network.glyph}
        </button>
      ))}
    </div>
  );
}

function StarRating() {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex gap-1" aria-label="Beri rating">
      {Array.from({ length: 5 }, (_, index) => {
        const value = index + 1;
        const filled = value <= rating;
        return (
          <button
            key={value}
            type="button"
            className={`text-2xl transition-colors ${
              filled ? "text-primary" : "text-primary/40"
            }`}
            aria-label={`${value} bintang`}
            aria-pressed={filled}
            onClick={() => setRating(value)}
          >
            {filled ? "★" : "☆"}
          </button>
        );
      })}
    </div>
  );
}
