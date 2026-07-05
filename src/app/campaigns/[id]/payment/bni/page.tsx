import { notFound } from "next/navigation";
import { CampaignPageLayout } from "@/components/layout/CampaignPageLayout";
import { PaymentBniView } from "@/components/payment/PaymentBniView";
import { getCampaignDetail } from "@/lib/constants/campaign-details";

type PaymentBniPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PaymentBniPage({ params }: PaymentBniPageProps) {
  const { id } = await params;
  const campaign = getCampaignDetail(id);

  if (!campaign) notFound();

  return (
    <CampaignPageLayout>
      <PaymentBniView />
    </CampaignPageLayout>
  );
}
