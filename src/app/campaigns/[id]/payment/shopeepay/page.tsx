import { notFound } from "next/navigation";
import { CampaignPageLayout } from "@/components/layout/CampaignPageLayout";
import { PaymentQrView } from "@/components/payment/PaymentQrView";
import { getCampaignDetail } from "@/lib/constants/campaign-details";

type PaymentShopeepayPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PaymentShopeepayPage({ params }: PaymentShopeepayPageProps) {
  const { id } = await params;
  const campaign = getCampaignDetail(id);

  if (!campaign) notFound();

  return (
    <CampaignPageLayout>
      <PaymentQrView method="shopeepay" />
    </CampaignPageLayout>
  );
}
