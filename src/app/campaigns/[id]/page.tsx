import { notFound } from "next/navigation";
import { CampaignPageLayout } from "@/components/layout/CampaignPageLayout";
import { CampaignHeroSection } from "@/components/donation/CampaignHeroSection";
import {
  CampaignProgressSection,
  CampaignQuoteSection,
} from "@/components/donation/CampaignContentSections";
import {
  CampaignCommitmentSection,
  CampaignStoriesSection,
} from "@/components/donation/CampaignStoriesSection";
import { ImpactCtaSection } from "@/components/sections/ImpactCtaSection";
import { getCampaignDetail } from "@/lib/constants/campaign-details";

type CampaignDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { id } = await params;
  const campaign = getCampaignDetail(id);

  if (!campaign) notFound();

  return (
    <CampaignPageLayout>
      <CampaignHeroSection campaign={campaign} />
      <CampaignProgressSection campaign={campaign} />
      <CampaignQuoteSection campaign={campaign} />
      <CampaignStoriesSection campaign={campaign} />
      <CampaignCommitmentSection campaign={campaign} />
      <ImpactCtaSection />
    </CampaignPageLayout>
  );
}
