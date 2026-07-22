import Image from "next/image";
import type { CampaignDetail } from "@/types/campaign";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { routes } from "@/lib/constants/routes";

type CampaignStoriesSectionProps = {
  campaign: CampaignDetail;
};

export function CampaignStoriesSection({ campaign }: CampaignStoriesSectionProps) {
  return (
    <section className="bg-surface py-12 md:py-16">
      <Container className="space-y-16">
        {campaign.stories.map((story) => (
          <article key={story.title} className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {story.imageSrc ? (
              <div className="relative min-h-[240px] overflow-hidden rounded-xl md:min-h-[320px]">
                <Image
                  src={story.imageSrc}
                  alt={story.imageAlt ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : null}
            <div>
              <h2 className="text-xl font-bold leading-snug text-text md:text-2xl">
                {story.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-text-muted md:text-base">
                {story.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              {story.ctaLabel ? (
                <div className="mt-6">
                  <LinkButton href={routes.campaign(campaign.id)} shape="pill">
                    {story.ctaLabel}
                  </LinkButton>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
}

type CampaignCommitmentSectionProps = {
  campaign: CampaignDetail;
};

export function CampaignCommitmentSection({
  campaign,
}: CampaignCommitmentSectionProps) {
  return (
    <section className="overflow-x-hidden bg-surface py-12 md:py-16">
      <Container>
        <div className="mx-auto w-full max-w-[1200px] px-0 text-center">
          <h2 className="text-[28px] font-bold leading-9 text-[#002c43] md:text-[32px] md:leading-10">
            Komitmen Kami untuk{" "}
            <span className="text-primary">Kebaikan</span> Anda
          </h2>
          <p className="mx-auto mt-3 max-w-full text-sm leading-6 text-text-muted md:text-base md:leading-7">
            UNICEF memastikan setiap langkah donasi Anda terlindungi, transparan, dan berdampak langsung bagi masa depan anak-anak.
          </p>
        </div>

        {/*
          Figma cards row: 1200 × 494, gap 24
          Each card ≈ 384 wide ( (1200 - 48) / 3 )
          Blue: pad L32 T24 R32 B32, gap 16 title→desc
          Number: 36/40 SemiBold, top-right with title
          Desc: 14/21 Regular
        */}
        <div className="mx-auto mt-10 grid w-full max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
          {campaign.commitments.map((item) => (
            <article
              key={item.step}
              className="mx-auto flex w-full min-w-0 max-w-[384px] flex-col overflow-hidden rounded-xl md:mx-0 md:h-[494px] md:max-w-none"
            >
              <div className="flex shrink-0 flex-col gap-4 bg-[#2653B9] px-8 pt-6 pb-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="min-w-0 flex-1 pr-2 text-[20px] font-semibold leading-7 text-white">
                    {item.title}
                  </h3>
                  <span
                    className="shrink-0 text-[36px] font-semibold leading-[40px] text-white"
                    aria-hidden="true"
                  >
                    {item.step}
                  </span>
                </div>
                <p className="text-[14px] font-normal leading-[21px] text-white">
                  {item.description}
                </p>
              </div>
              <div className="relative aspect-[384/240] w-full md:aspect-auto md:min-h-0 md:flex-1">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
