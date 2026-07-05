"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CampaignDetail } from "@/types/campaign";
import type { DonationType } from "@/types/campaign";
import {
  getPaymentPath,
  type DonationPaymentMethodId,
} from "@/lib/constants/payment";
import {
  normalizePhoneNumber,
  validateDonationDetailsStep,
  validateDonationPaymentStep,
  type DonationFormErrors,
  type DonationFormValues,
} from "@/lib/validation/donation-form";
import { DonationFormOverlay } from "@/components/donation/DonationFormOverlay";
import { DonationStepAmount } from "@/components/donation/DonationStepAmount";
import { DonationStepDetails } from "@/components/donation/DonationStepDetails";
import { DonationStepPayment } from "@/components/donation/DonationStepPayment";

type DonationWidgetProps = {
  campaign: CampaignDetail;
};

type DonationStep = 1 | 2 | 3;
type TransitionDirection = "forward" | "backward";

const EXIT_DURATION_MS = 300;

const initialFormValues: DonationFormValues = {
  paymentMethod: "",
  name: "",
  email: "",
  phone: "",
  address: "",
};

export function DonationWidget({ campaign }: DonationWidgetProps) {
  const router = useRouter();
  const defaultType = campaign.donationTypes.includes("bulanan")
    ? "bulanan"
    : campaign.donationTypes[0];
  const [step, setStep] = useState<DonationStep>(1);
  const [direction, setDirection] = useState<TransitionDirection>("forward");
  const [isExiting, setIsExiting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [donationType, setDonationType] =
    useState<DonationType>(defaultType ?? "bulanan");
  const [selectedAmount, setSelectedAmount] = useState(
    campaign.presetAmounts[2] ?? campaign.presetAmounts[0],
  );
  const [customAmount, setCustomAmount] = useState("");
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState<DonationFormErrors>({});
  const [paymentRoute, setPaymentRoute] =
    useState<DonationPaymentMethodId>("bni");

  const requiresAddress =
    donationType === "bulanan" || Boolean(campaign.perk);

  const activeAmount =
    customAmount.trim() !== ""
      ? Number(customAmount.replace(/\D/g, "")) || selectedAmount
      : selectedAmount;

  const goToStep = useCallback(
    (next: DonationStep, nextDirection: TransitionDirection) => {
      setDirection(nextDirection);
      setStep(next);
      if (next >= 2) {
        setShowOverlay(true);
        setIsExiting(false);
      }
    },
    [],
  );

  const closeOverlay = useCallback(() => {
    if (isExiting) return;
    setDirection("backward");
    setIsExiting(true);
    window.setTimeout(() => {
      setStep(1);
      setShowOverlay(false);
      setIsExiting(false);
    }, EXIT_DURATION_MS);
  }, [isExiting]);

  useEffect(() => {
    if (!showOverlay) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showOverlay]);

  const updateField = (field: keyof DonationFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePaymentMethodChange = (methodId: string, route: string) => {
    setFormValues((prev) => ({ ...prev, paymentMethod: methodId }));
    setPaymentRoute(route as DonationPaymentMethodId);
    setErrors((prev) => ({ ...prev, paymentMethod: undefined }));
  };

  const handleBack = () => {
    if (step === 2) {
      closeOverlay();
      return;
    }
    if (step === 3) {
      goToStep(2, "backward");
    }
  };

  const handleDetailsContinue = () => {
    const validationErrors = validateDonationDetailsStep(formValues, {
      requiresAddress,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    goToStep(3, "forward");
  };

  const handlePaymentContinue = () => {
    const validationErrors = validateDonationPaymentStep(formValues.paymentMethod);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    sessionStorage.setItem(
      "donation-form",
      JSON.stringify({
        ...formValues,
        phone: normalizePhoneNumber(formValues.phone),
        amount: activeAmount,
        donationType,
      }),
    );
    sessionStorage.setItem("donation-next-step", paymentRoute);

    router.push(getPaymentPath(campaign.id, "processing"));
  };

  return (
    <>
      <aside className="rounded-xl border border-border bg-surface p-5 shadow-card lg:p-6">
        <DonationStepAmount
          campaign={campaign}
          donationType={donationType}
          selectedAmount={selectedAmount}
          customAmount={customAmount}
          activeAmount={activeAmount}
          onDonationTypeChange={setDonationType}
          onAmountSelect={(amount) => {
            setSelectedAmount(amount);
            setCustomAmount("");
          }}
          onCustomAmountChange={setCustomAmount}
          onContinue={() => goToStep(2, "forward")}
        />
      </aside>

      {showOverlay ? (
        <DonationFormOverlay
          campaign={campaign}
          donationType={donationType}
          currentStep={step === 2 ? 2 : 3}
          direction={direction}
          isExiting={isExiting}
          onBack={handleBack}
          onClose={closeOverlay}
        >
          {step === 2 ? (
            <DonationStepDetails
              values={formValues}
              errors={errors}
              requiresAddress={requiresAddress}
              onFieldChange={updateField}
              onContinue={handleDetailsContinue}
            />
          ) : (
            <DonationStepPayment
              amount={activeAmount}
              donationType={donationType}
              benefit={campaign.impactBenefit}
              selectedMethod={formValues.paymentMethod}
              error={errors.paymentMethod}
              onMethodChange={handlePaymentMethodChange}
              onContinue={handlePaymentContinue}
            />
          )}
        </DonationFormOverlay>
      ) : null}
    </>
  );
}
