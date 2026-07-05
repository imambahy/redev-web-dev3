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
    <section className="bg-surface-muted py-12 md:py-16">
      <Container>
        <h2 className="text-center text-2xl font-bold text-text md:text-3xl">
          Komitmen Kami untuk Kebaikan Anda
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {campaign.commitments.map((item) => (
            <article
              key={item.step}
              className="overflow-hidden rounded-xl border border-border bg-surface"
            >
              <div className="bg-primary px-5 py-4">
                <p className="text-sm font-bold text-white">
                  {item.step}. {item.title}
                </p>
                <p className="mt-2 text-sm text-white/85">{item.description}</p>
              </div>
              <div className="relative h-44">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
