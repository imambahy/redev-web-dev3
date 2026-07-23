import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/PageHero";
import { PrivacyPolicySection } from "@/components/sections/PrivacyPolicySection";
import { privacyPolicyPageContent } from "@/lib/constants/privacy-policy";

export default function KebijakanPrivasiPage() {
  const { hero } = privacyPolicyPageContent;

  return (
    <PageLayout>
      <PageHero
        title={<span className="text-accent">{hero.title}</span>}
        mobileTitle={<span className="text-primary">{hero.title}</span>}
        imageSrc={hero.imageSrc}
        imageAlt="Kebijakan privasi UNICEF Indonesia"
        aspectRatio="1440 / 360"
        overlayVariant="privacy"
        backLabel={hero.backLabel}
      />
      <PrivacyPolicySection />
    </PageLayout>
  );
}
