import { PageLayout } from "@/components/layout/PageLayout";
import { DonorWallSection } from "@/components/sections/DonorWallSection";
import { ImpactCtaSection } from "@/components/sections/ImpactCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { donorWallPageContent } from "@/lib/constants/donor-wall";

export default function DonorWallPage() {
  const { hero } = donorWallPageContent;

  return (
    <PageLayout>
      <PageHero
        title={
          <>
            <span className="block text-white">{hero.titleLine1}</span>
            <span className="block text-accent">{hero.titleLine2}</span>
            <span className="block text-accent">{hero.titleLine3}</span>
          </>
        }
        subtitle={hero.subtitle}
        imageSrc={hero.imageSrc}
        aspectRatio="1440 / 640"
        overlayVariant="donor-wall"
      />
      <DonorWallSection />
      <ImpactCtaSection />
    </PageLayout>
  );
}
