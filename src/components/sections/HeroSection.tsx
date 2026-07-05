import { ContentImage } from "@/components/ui/ContentImage";
import { Container } from "@/components/layout/Container";
import { homeHeroContent } from "@/lib/constants/home-hero";
import { HeroDonationForm } from "@/components/sections/HeroDonationForm";

export function HeroSection() {
  const {
    eyebrow,
    donorBadge,
    titleLine1,
    titleHighlight,
    titleLine2,
    titleLine3,
  } = homeHeroContent;

  return (
    <section aria-labelledby="hero-heading" className="relative w-full">
      <div className="relative min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-4.5rem)]">
        <ContentImage
          src="/images/hero/hero-bg.png"
          alt="Anak-anak di sekolah dengan tangki air bersih"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-overlay/40" />

        <div className="absolute inset-0 flex items-end py-10 md:items-center md:py-12">
          <Container>
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_360px] lg:items-center lg:gap-10">
              <div className="max-w-2xl">
                <p className="mb-3 inline-flex rounded-full bg-surface/95 px-4 py-1.5 text-xs font-semibold text-primary shadow-card md:text-sm">
                  {donorBadge}
                </p>
                <p className="mb-2 text-sm font-medium text-white/90 md:text-base">
                  {eyebrow}
                </p>
                <h1
                  id="hero-heading"
                  className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl"
                >
                  {titleLine1}{" "}
                  <span className="text-accent">{titleHighlight}</span>
                  <br />
                  {titleLine2}
                  <br />
                  {titleLine3}
                </h1>
              </div>

              <HeroDonationForm />
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
