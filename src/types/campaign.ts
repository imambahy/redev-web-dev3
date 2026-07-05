export type DonationType = "bulanan" | "satu-kali";

export type Campaign = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  donationTypes: DonationType[];
  tag?: string;
  ctaLabel?: string;
};

export type CampaignStory = {
  title: string;
  paragraphs: string[];
  imageSrc?: string;
  imageAlt?: string;
  ctaLabel?: string;
};

export type CampaignCommitment = {
  step: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type CampaignDetail = Campaign & {
  heroImageSrc: string;
  eyebrow?: string;
  heroTitle: string;
  quote: string;
  quoteDescription: string;
  impactBenefit: string;
  presetAmounts: number[];
  perk?: {
    label: string;
    remaining: number;
    total: number;
    countdown: string;
    imageSrc: string;
  };
  stats: {
    donors: number;
    raised: number;
    goal: number;
    daysLeft: number;
    endDate: string;
    lastReportDate: string;
  };
  stories: CampaignStory[];
  commitments: CampaignCommitment[];
};
