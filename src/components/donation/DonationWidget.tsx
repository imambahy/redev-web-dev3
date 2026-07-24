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
  composeDonationAddress,
  normalizePhoneNumber,
  validateDonationDetailsStep,
  validateDonationPaymentStep,
  type DonationFormErrors,
  type DonationFormValues,
} from "@/lib/validation/donation-form";
import { DonationFormOverlay } from "@/components/donation/DonationFormOverlay";
import { DonationFormStepper } from "@/components/donation/DonationFormStepper";
import { DonationStepAmount } from "@/components/donation/DonationStepAmount";
import { DonationStepCommitment } from "@/components/donation/DonationStepCommitment";
import { DonationStepDetails } from "@/components/donation/DonationStepDetails";
import { DonationStepPayment } from "@/components/donation/DonationStepPayment";
import { DonationStepTransition } from "@/components/donation/DonationStepTransition";

type DonationWidgetProps = {
  campaign: CampaignDetail;
};

type DonationStep = 1 | 2 | 3;
type OverlayPhase = "commitment" | "details" | "payment";
type TransitionDirection = "forward" | "backward";

const EXIT_DURATION_MS = 300;
const MONTHLY_OFFER_AMOUNT = 150_000;

const initialFormValues: DonationFormValues = {
  paymentMethod: "",
  name: "",
  email: "",
  phone: "",
  province: "",
  city: "",
  district: "",
  postalCode: "",
  address: "",
};

export function DonationWidget({ campaign }: DonationWidgetProps) {
  const router = useRouter();
  const defaultType = campaign.donationTypes.includes("bulanan")
    ? "bulanan"
    : campaign.donationTypes[0];
  const [step, setStep] = useState<DonationStep>(1);
  const [overlayPhase, setOverlayPhase] = useState<OverlayPhase>("details");
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

  const supportsMonthly = campaign.donationTypes.includes("bulanan");
  const requiresAddress =
    donationType === "bulanan" || Boolean(campaign.perk);

  const activeAmount =
    customAmount.trim() !== ""
      ? Number(customAmount.replace(/\D/g, "")) || selectedAmount
      : selectedAmount;

  const openOverlay = useCallback(
    (phase: OverlayPhase, nextDirection: TransitionDirection = "forward") => {
      setDirection(nextDirection);
      setOverlayPhase(phase);
      setStep(phase === "payment" ? 3 : 2);
      setShowOverlay(true);
      setIsExiting(false);
    },
    [],
  );

  const closeOverlay = useCallback(() => {
    if (isExiting) return;
    setDirection("backward");
    setIsExiting(true);
    window.setTimeout(() => {
      setStep(1);
      setOverlayPhase("details");
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

  const updateFields = (fields: Partial<DonationFormValues>) => {
    setFormValues((prev) => ({ ...prev, ...fields }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(fields).forEach((field) => {
        next[field as keyof DonationFormValues] = undefined;
      });
      return next;
    });
  };

  const handlePaymentMethodChange = (methodId: string, route: string) => {
    setFormValues((prev) => ({ ...prev, paymentMethod: methodId }));
    setPaymentRoute(route as DonationPaymentMethodId);
    setErrors((prev) => ({ ...prev, paymentMethod: undefined }));
  };

  const handleAmountContinue = () => {
    if (donationType === "satu-kali" && supportsMonthly) {
      openOverlay("commitment", "forward");
      return;
    }
    openOverlay("details", "forward");
  };

  const handleAcceptMonthly = () => {
    setDonationType("bulanan");
    setSelectedAmount(MONTHLY_OFFER_AMOUNT);
    setCustomAmount("");
    openOverlay("details", "forward");
  };

  const handleKeepOneTime = () => {
    openOverlay("details", "forward");
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
    openOverlay("payment", "forward");
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
        address: composeDonationAddress(formValues),
        amount: activeAmount,
        donationType,
      }),
    );
    sessionStorage.setItem("donation-next-step", paymentRoute);

    router.push(getPaymentPath(campaign.id, "processing"));
  };

  const showStepper =
    overlayPhase === "details" || overlayPhase === "payment";

  return (
    <>
      <aside className="w-full max-w-[382px] rounded-xl border border-border bg-surface p-5 shadow-card lg:p-[24px]">
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
          onContinue={handleAmountContinue}
        />
      </aside>

      {showOverlay ? (
        <DonationFormOverlay
          campaign={campaign}
          showStepper={showStepper}
          stepper={
            showStepper ? (
              <DonationFormStepper currentStep={step === 3 ? 3 : 2} />
            ) : null
          }
          isExiting={isExiting}
          onClose={closeOverlay}
        >
          <DonationStepTransition
            stepKey={`donation-${overlayPhase}`}
            direction={direction}
          >
            {overlayPhase === "commitment" ? (
              <DonationStepCommitment
                oneTimeAmount={activeAmount}
                monthlyAmount={MONTHLY_OFFER_AMOUNT}
                onAcceptMonthly={handleAcceptMonthly}
                onKeepOneTime={handleKeepOneTime}
                onBack={closeOverlay}
              />
            ) : null}

            {overlayPhase === "details" ? (
              <DonationStepDetails
                values={formValues}
                errors={errors}
                requiresAddress={requiresAddress}
                onFieldChange={updateField}
                onFieldsChange={updateFields}
                onContinue={handleDetailsContinue}
              />
            ) : null}

            {overlayPhase === "payment" ? (
              <DonationStepPayment
                amount={activeAmount}
                donationType={donationType}
                benefit={campaign.impactBenefit}
                selectedMethod={formValues.paymentMethod}
                error={errors.paymentMethod}
                onMethodChange={handlePaymentMethodChange}
                onContinue={handlePaymentContinue}
              />
            ) : null}
          </DonationStepTransition>
        </DonationFormOverlay>
      ) : null}
    </>
  );
}
