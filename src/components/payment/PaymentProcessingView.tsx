"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  getPaymentPath,
  getPaymentProcessingContent,
  type DonationPaymentMethodId,
} from "@/lib/constants/payment";
import { useDonationPaymentType } from "@/hooks/useDonationPaymentType";
import { Container } from "@/components/layout/Container";

type PaymentProcessingViewProps = {
  campaignId: string;
  nextStep?: DonationPaymentMethodId | "success" | "failed";
};

export function PaymentProcessingView({
  campaignId,
  nextStep = "bni",
}: PaymentProcessingViewProps) {
  const router = useRouter();
  const donationType = useDonationPaymentType();
  const content = getPaymentProcessingContent(donationType);
  const [resolvedStep, setResolvedStep] = useState(nextStep);

  useEffect(() => {
    const stored = sessionStorage.getItem("donation-next-step");
    if (stored === "bni" || stored === "dana" || stored === "shopeepay") {
      setResolvedStep(stored);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.push(getPaymentPath(campaignId, resolvedStep));
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [campaignId, resolvedStep, router]);

  return (
    <section className="bg-surface py-14 md:py-20">
      <Container className="flex flex-col items-center text-center">
        <h1 className="max-w-xl text-2xl font-bold md:text-4xl">
          {content.emphasizeFullTitle ? (
            <span className="text-primary">
              {content.titleLead} {content.titleRest}
            </span>
          ) : (
            <>
              <span className="text-primary">{content.titleLead}</span>
              <br />
              <span className="text-text">{content.titleRest}</span>
            </>
          )}
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-muted md:text-base">
          {content.description}
        </p>
        <div className="relative mt-10 h-44 w-56 md:mt-12 md:h-56 md:w-72">
          <Image
            src={content.illustrationSrc}
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
