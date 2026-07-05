import type { ImpactFeature } from "@/types/impact";
import { ContentImage } from "@/components/ui/ContentImage";

type ImpactFeatureCardProps = {
  feature: ImpactFeature;
};

export function ImpactFeatureCard({ feature }: ImpactFeatureCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg bg-primary text-white shadow-card">
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-xl font-bold leading-snug md:text-2xl">{feature.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/90 md:text-base">
          {feature.description}
        </p>
      </div>
      <div className="relative aspect-video w-full shrink-0">
        <ContentImage
          src={feature.imageSrc}
          alt={feature.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </article>
  );
}
