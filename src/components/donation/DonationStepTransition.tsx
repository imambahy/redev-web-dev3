import type { ReactNode } from "react";

type DonationStepTransitionProps = {
  stepKey: string;
  direction: "forward" | "backward";
  children: ReactNode;
};

export function DonationStepTransition({
  stepKey,
  direction,
  children,
}: DonationStepTransitionProps) {
  return (
    <div
      key={stepKey}
      className={
        direction === "forward"
          ? "donation-step-enter-forward"
          : "donation-step-enter-backward"
      }
    >
      {children}
    </div>
  );
}
