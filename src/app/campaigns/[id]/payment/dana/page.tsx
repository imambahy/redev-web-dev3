import { notFound } from "next/navigation";
import { CampaignPageLayout } from "@/components/layout/CampaignPageLayout";
import { PaymentQrView } from "@/components/payment/PaymentQrView";
import { getCampaignDetail } from "@/lib/constants/campaign-details";

type PaymentDanaPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PaymentDanaPage({ params }: PaymentDanaPageProps) {
  const { id } = await params;
  const campaign = getCampaignDetail(id);

  if (!campaign) notFound();

  return (
    <CampaignPageLayout>
      <PaymentQrView method="dana" />
    </CampaignPageLayout>
  );
}
