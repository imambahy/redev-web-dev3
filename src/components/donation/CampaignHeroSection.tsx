import Image from "next/image";
import type { CampaignDetail } from "@/types/campaign";
import { Container } from "@/components/layout/Container";
import { DonationWidget } from "@/components/donation/DonationWidget";

type CampaignHeroSectionProps = {
  campaign: CampaignDetail;
};

const campaignHeroOverlay =
  "linear-gradient(to right, rgba(0, 49, 68, 0.75) 7%, rgba(0, 49, 68, 0.65) 16%, rgba(0, 49, 68, 0.55) 26%, rgba(0, 49, 68, 0.45) 38%, rgba(0, 49, 68, 0.30) 53%, rgba(0, 49, 68, 0.20) 73%)";

export function CampaignHeroSection({ campaign }: CampaignHeroSectionProps) {
  return (
    <section id="donation-widget" className="relative scroll-mt-24 bg-surface-muted">
      <div className="relative min-h-[360px] md:min-h-[520px] lg:min-h-[580px]">
        <Image
          src={campaign.heroImageSrc}
          alt={campaign.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: campaignHeroOverlay }}
          aria-hidden="true"
        />
        <Container className="relative z-10 flex min-h-[360px] items-end pb-10 pt-24 md:min-h-[520px] md:items-center md:pb-14 lg:min-h-[580px]">
          <div className="grid w-full gap-8 lg:grid-cols-[1fr_382px] lg:items-start">
            <div className="max-w-[777px] pb-24 lg:pb-0">
              {campaign.eyebrow ? (
                <p className="text-sm font-semibold text-primary md:text-base">
                  {campaign.eyebrow}
                </p>
              ) : null}
              <h1 className="mt-2 text-2xl font-bold leading-tight text-white md:text-4xl">
                <HeroTitle title={campaign.heroTitle} />
              </h1>
            </div>
            <div className="hidden lg:block">
              <DonationWidget campaign={campaign} />
            </div>
          </div>
        </Container>
      </div>

      <Container className="relative z-20 -mt-20 pb-8 lg:hidden">
        <div className="mx-auto max-w-[382px]">
          <DonationWidget campaign={campaign} />
        </div>
      </Container>
    </section>
  );
}

function HeroTitle({ title }: { title: string }) {
  const highlight = "Sekolah";
  const index = title.indexOf(highlight);
  if (index === -1) return <>{title}</>;

  return (
    <>
      {title.slice(0, index)}
      <span className="text-accent">{highlight}</span>
      {title.slice(index + highlight.length)}
    </>
  );
}
