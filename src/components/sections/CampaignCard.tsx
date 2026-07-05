import type { Campaign } from "@/types/campaign";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ContentImage } from "@/components/ui/ContentImage";
import { routes } from "@/lib/constants/routes";

type CampaignCardProps = {
  campaign: Campaign;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg bg-surface shadow-card">
      <div className="relative aspect-4/3 w-full">
        <ContentImage
          src={campaign.imageSrc}
          alt={campaign.imageAlt}
          fill
          sizes="(max-width: 1024px) 85vw, 25vw"
        />
        <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-1.5">
          {campaign.tag ? <Badge>{campaign.tag}</Badge> : null}
          {campaign.donationTypes.map((type) => (
            <Badge key={type}>
              {type === "bulanan" ? "Bulanan" : "Satu Kali"}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="text-base font-bold leading-snug text-text md:text-lg">
          {campaign.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted line-clamp-3">
          {campaign.description}
        </p>
        <div className="mt-4">
          <LinkButton
            href={routes.campaign(campaign.id)}
            className="w-full py-2.5 text-sm"
          >
            {campaign.ctaLabel ?? "Bantu Sekarang"}
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
