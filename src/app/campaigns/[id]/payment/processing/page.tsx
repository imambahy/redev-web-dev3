import { notFound } from "next/navigation";
import { CampaignPageLayout } from "@/components/layout/CampaignPageLayout";
import { PaymentProcessingView } from "@/components/payment/PaymentProcessingView";
import { getCampaignDetail } from "@/lib/constants/campaign-details";

type PaymentProcessingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PaymentProcessingPage({ params }: PaymentProcessingPageProps) {
  const { id } = await params;
  const campaign = getCampaignDetail(id);

  if (!campaign) notFound();

  return (
    <CampaignPageLayout>
      <PaymentProcessingView campaignId={campaign.id} />
    </CampaignPageLayout>
  );
}
