import { notFound } from "next/navigation";
import { CampaignPageLayout } from "@/components/layout/CampaignPageLayout";
import { PaymentSuccessView } from "@/components/payment/PaymentSuccessView";
import { getCampaignDetail } from "@/lib/constants/campaign-details";

type PaymentSuccessPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PaymentSuccessPage({ params }: PaymentSuccessPageProps) {
  const { id } = await params;
  const campaign = getCampaignDetail(id);

  if (!campaign) notFound();

  return (
    <CampaignPageLayout>
      <PaymentSuccessView campaignId={campaign.id} />
    </CampaignPageLayout>
  );
}
