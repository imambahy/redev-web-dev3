import Image from "next/image";
import type { CampaignDetail } from "@/types/campaign";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";

type CampaignStoriesSectionProps = {
  campaign: CampaignDetail;
};

export function CampaignStoriesSection({ campaign }: CampaignStoriesSectionProps) {
  return (
    <section className="bg-surface pb-12 md:pb-16">
      <Container>
        <div className="max-w-[777px] space-y-10 md:space-y-12">
          {campaign.contentBlocks.map((block, index) => {
            if (block.type === "image") {
              return (
                <figure
                  key={`image-${index}`}
                  className="overflow-hidden"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={block.imageSrc}
                      alt={block.imageAlt}
                      fill
                      className="object-cover"
                      sizes="777px"
                    />
                  </div>
                </figure>
              );
            }

            return (
              <div key={`copy-${index}`} className="space-y-4 md:space-y-5">
                {block.title ? (
                  <h2 className="text-xl font-bold leading-snug text-text md:text-2xl lg:text-4xl">
                    {block.title}
                  </h2>
                ) : null}
                {block.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[18px] leading-relaxed text-text-muted md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            );
          })}
        </div>

        <div className="mt-12 max-w-[777px] space-y-4 md:mt-16 md:space-y-5">
          <div className="relative aspect-[761/404] w-full overflow-hidden">
            <Image
              src={campaign.mediaHighlight.imageSrc}
              alt={campaign.mediaHighlight.imageAlt}
              fill
              className="object-cover"
              sizes="777px"
            />
          </div>
          <p className="rounded-2xl bg-primary-light px-5 py-4 text-sm leading-relaxed text-text md:px-6 md:py-5 md:text-base">
            {campaign.mediaHighlight.caption}
          </p>
        </div>

        <div className="mt-12 max-w-[777px] md:mt-16">
          <CampaignClosingCta campaign={campaign} />
        </div>
      </Container>
    </section>
  );
}

function CampaignClosingCta({ campaign }: { campaign: CampaignDetail }) {
  const { closingCta } = campaign;

  return (
    <div className="rounded-2xl bg-[#e6f7fe] p-5 md:p-6 lg:p-8">
      <div className="relative aspect-[16/9] w-[60%] overflow-hidden">
        <Image
          src={closingCta.imageSrc}
          alt={closingCta.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 777px) 60vw, 466px"
        />
      </div>
      <h2 className="mt-5 text-xl font-bold leading-snug text-text md:mt-6 md:text-2xl lg:text-3xl">
        &ldquo;{closingCta.title}&rdquo;
      </h2>
      {closingCta.paragraphs.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className="mt-4 text-sm leading-relaxed text-text-muted md:text-base"
        >
          {paragraph}
        </p>
      ))}
      <div className="mt-6">
        <LinkButton href="#donation-widget" shape="pill">
          {closingCta.ctaLabel}
        </LinkButton>
      </div>
    </div>
  );
}
