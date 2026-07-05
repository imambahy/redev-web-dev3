import type { DonationType } from "@/types/campaign";
import { formatCurrency } from "@/lib/utils/format-currency";

type DonationImpactMessageProps = {
  amount: number;
  donationType: DonationType;
  benefit: string;
};

export function DonationImpactMessage({
  amount,
  donationType,
  benefit,
}: DonationImpactMessageProps) {
  const period = donationType === "bulanan" ? "/Bulan" : "";

  return (
    <p className="text-center text-xs leading-relaxed text-text-muted md:text-sm">
      Dengan{" "}
      <span className="font-bold text-primary">
        {formatCurrency(amount)}
        {period}
      </span>
      , Anda menghadirkan{" "}
      <span className="font-bold text-primary">{benefit}</span> untuk anak
      Indonesia
    </p>
  );
}
