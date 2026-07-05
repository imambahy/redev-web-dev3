import Image from "next/image";
import type { CampaignDetail } from "@/types/campaign";
import { Container } from "@/components/layout/Container";
import { DonationWidget } from "@/components/donation/DonationWidget";

type CampaignHeroSectionProps = {
  campaign: CampaignDetail;
};

export function CampaignHeroSection({ campaign }: CampaignHeroSectionProps) {
  return (
    <section className="relative bg-surface-muted">
      <div className="relative min-h-[360px] md:min-h-[420px]">
        <Image
          src={campaign.heroImageSrc}
          alt={campaign.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-overlay/45" aria-hidden="true" />
        <Container className="relative z-10 flex min-h-[360px] items-end pb-10 pt-24 md:min-h-[420px] md:pb-14">
          <div className="max-w-2xl">
            {campaign.eyebrow ? (
              <p className="text-sm font-semibold text-primary md:text-base">
                {campaign.eyebrow}
              </p>
            ) : null}
            <h1 className="mt-2 text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {campaign.heroTitle}
            </h1>
          </div>
        </Container>
      </div>

      <Container className="relative z-20 -mt-16 pb-8 md:-mt-20 lg:-mt-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="hidden lg:block" />
          <DonationWidget campaign={campaign} />
        </div>
      </Container>
    </section>
  );
}
