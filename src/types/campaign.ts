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

export type CampaignContentBlock =
  | {
      type: "image";
      imageSrc: string;
      imageAlt: string;
      caption?: string;
    }
  | {
      type: "copy";
      title?: string;
      paragraphs: string[];
    };

export type CampaignClosingCta = {
  title: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
};

export type CampaignCommitment = {
  step: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type CampaignMediaHighlight = {
  imageSrc: string;
  imageAlt: string;
  caption: string;
};

export type CampaignDetail = Campaign & {
  heroImageSrc: string;
  eyebrow?: string;
  heroTitle: string;
  quote: string;
  quoteHighlight: string;
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
    donorGoal: number;
    raised: number;
    goal: number;
    daysLeft: number;
    endDate: string;
    lastReportDate: string;
  };
  contentBlocks: CampaignContentBlock[];
  mediaHighlight: CampaignMediaHighlight;
  closingCta: CampaignClosingCta;
  commitments: CampaignCommitment[];
};
