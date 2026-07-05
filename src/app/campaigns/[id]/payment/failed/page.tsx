import { notFound } from "next/navigation";
import { CampaignPageLayout } from "@/components/layout/CampaignPageLayout";
import { PaymentFailedView } from "@/components/payment/PaymentFailedView";
import { getCampaignDetail } from "@/lib/constants/campaign-details";

type PaymentFailedPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PaymentFailedPage({ params }: PaymentFailedPageProps) {
  const { id } = await params;
  const campaign = getCampaignDetail(id);

  if (!campaign) notFound();

  return (
    <CampaignPageLayout>
      <PaymentFailedView campaignId={campaign.id} />
    </CampaignPageLayout>
  );
}
