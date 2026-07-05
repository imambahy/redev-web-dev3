import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CampaignSection } from "@/components/sections/CampaignSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ImpactSection />
        <CampaignSection />
        <FaqSection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </>
  );
}
