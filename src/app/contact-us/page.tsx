import { PageLayout } from "@/components/layout/PageLayout";
import { ContactSection } from "@/components/sections/ContactSection";
import { ImpactCtaSection } from "@/components/sections/ImpactCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { contactPageContent } from "@/lib/constants/contact";

export default function KontakPage() {
  const { hero } = contactPageContent;

  return (
    <PageLayout>
      <PageHero
        title={<span className="text-accent">{hero.title}</span>}
        subtitle={hero.subtitle}
        imageSrc={hero.imageSrc}
        aspectRatio="1440 / 360"
        overlayVariant="kontak"
      />
      <ContactSection />
      <ImpactCtaSection />
    </PageLayout>
  );
}
