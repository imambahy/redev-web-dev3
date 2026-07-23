import { Fragment } from "react";

type DonationFormStepperProps = {
  currentStep: 2 | 3;
};

const steps = [
  { id: 1, label: "Isi Data" },
  { id: 2, label: "Isi Data" },
  { id: 3, label: "Pembayaran" },
] as const;

export function DonationFormStepper({ currentStep }: DonationFormStepperProps) {
  return (
    <ol className="flex w-full items-start" aria-label="Langkah donasi">
      {steps.map((step, index) => {
        const isComplete = step.id < currentStep;
        const isActive = step.id === currentStep;
        const connectorActive = step.id < currentStep;

        return (
          <Fragment key={step.id}>
            <li className="flex shrink-0 flex-col items-center">
              <span
                className={`flex size-9 items-center justify-center rounded-full text-sm font-bold ${
                  isComplete
                    ? "bg-primary text-white"
                    : isActive
                      ? "border-2 border-primary bg-surface text-primary"
                      : "border-2 border-border bg-surface text-text-muted"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {isComplete ? <CheckIcon /> : `0${step.id}`}
              </span>
              <span
                className={`mt-2 whitespace-nowrap text-center text-[11px] font-semibold md:text-xs ${
                  isComplete || isActive ? "text-primary" : "text-text-muted"
                }`}
              >
                {step.label}
              </span>
            </li>

            {index < steps.length - 1 ? (
              <div
                className="flex min-w-8 flex-1 items-start px-2 pt-[18px] sm:px-3"
                aria-hidden="true"
              >
                <div
                  className={`h-0.5 w-full rounded-full ${
                    connectorActive ? "bg-primary" : "bg-border"
                  }`}
                />
              </div>
            ) : null}
          </Fragment>
        );
      })}
    </ol>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
