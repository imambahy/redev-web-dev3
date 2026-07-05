"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  paymentProcessingContent,
  getPaymentPath,
  type DonationPaymentMethodId,
} from "@/lib/constants/payment";
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
  const [resolvedStep, setResolvedStep] = useState(nextStep);

  useEffect(() => {
    const stored = sessionStorage.getItem("donation-next-step");
    if (
      stored === "bni" ||
      stored === "dana" ||
      stored === "shopeepay"
    ) {
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
    <section className="bg-surface py-20 md:py-28">
      <Container className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-text md:text-4xl">
          <span className="text-primary">Menyiapkan</span> Pembayaran Anda...
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-text-muted md:text-base">
          {paymentProcessingContent.description}
        </p>
        <div className="relative mt-10 h-48 w-64 md:h-56 md:w-80">
          <Image
            src={paymentProcessingContent.illustrationSrc}
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
