import { PageLayout } from "@/components/layout/PageLayout";
import { ImpactCtaSection } from "@/components/sections/ImpactCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { PanduanDonasiSection } from "@/components/sections/PanduanDonasiSection";
import { panduanDonasiPageContent } from "@/lib/constants/panduan-donasi";

export default function PanduanDonasiPage() {
  const { hero } = panduanDonasiPageContent;

  return (
    <PageLayout>
      <PageHero
        title={
          <>
            <span className="text-accent">{hero.titleLine1}</span>{" "}
            <span className="text-white">{hero.titleLine2}</span>
          </>
        }
        mobileTitle={
          <>
            <span className="text-primary">{hero.titleLine1}</span>{" "}
            <span className="text-[#003144]">{hero.titleLine2}</span>
          </>
        }
        subtitle={hero.subtitle}
        imageSrc={hero.imageSrc}
        aspectRatio="1440 / 360"
        overlayVariant="panduan-donasi"
      />
      <PanduanDonasiSection />
      <ImpactCtaSection />
    </PageLayout>
  );
}
