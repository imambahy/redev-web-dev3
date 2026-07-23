import { PageLayout } from "@/components/layout/PageLayout";
import { FaqPageSection } from "@/components/sections/FaqPageSection";
import { ImpactCtaSection } from "@/components/sections/ImpactCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { faqPageContent } from "@/lib/constants/faq-page";

export default function FaqPage() {
  const { hero } = faqPageContent;

  return (
    <PageLayout>
      <PageHero
        title={
          <>
            <span className="block text-white">{hero.titleLine1}</span>
            <span className="block text-white">
              {hero.titleLine2Prefix}{" "}
              <span className="text-accent">{hero.titleHighlight}</span>
            </span>
          </>
        }
        mobileTitle={
          <>
            <span className="text-[#003144]">{hero.titleLine1} </span>
            <span className="text-[#003144]">{hero.titleLine2Prefix} </span>
            <span className="text-primary">{hero.titleHighlight}</span>
          </>
        }
        subtitle={hero.subtitle}
        imageSrc={hero.imageSrc}
        aspectRatio="1440 / 360"
        overlayVariant="kontak"
      />
      <FaqPageSection />
      <ImpactCtaSection />
    </PageLayout>
  );
}
