"use client";

import {
  impactFeatures,
  impactIntro,
  impactStats,
} from "@/lib/constants/impact";
import { useCarousel } from "@/lib/utils/useCarousel";
import { Container } from "@/components/layout/Container";
import {
  CarouselNav,
  CarouselProgress,
} from "@/components/ui/CarouselControls";
import { ImpactFeatureCard } from "./ImpactFeatureCard";

const DESKTOP_VISIBLE = 2;
const CAROUSEL_TRANSITION =
  "transition-transform duration-500 ease-in-out will-change-transform";

export function ImpactSection() {
  const desktopPageCount = Math.max(
    1,
    impactFeatures.length - DESKTOP_VISIBLE + 1,
  );
  const desktop = useCarousel({
    itemCount: desktopPageCount,
    loop: false,
  });

  const mobile = useCarousel({
    itemCount: impactFeatures.length,
    loop: false,
  });

  return (
    <section
      aria-labelledby="impact-heading"
      className="bg-surface py-section md:py-section-lg"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2
              id="impact-heading"
              className="text-2xl font-bold text-text md:text-3xl lg:text-4xl"
            >
              {impactIntro.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              {impactIntro.description}
            </p>

            <CarouselNav
              onPrev={desktop.goPrev}
              onNext={desktop.goNext}
              canGoPrev={desktop.canGoPrev}
              canGoNext={desktop.canGoNext}
              className="mt-6 hidden lg:flex"
            />
          </div>

          {/* Desktop: 2 visible, move 1 card per click */}
          <div className="hidden lg:block">
            <div className="overflow-hidden [--slide-size:calc((100%-1*1rem)/2)]">
              <div
                className={`flex items-stretch gap-4 ${CAROUSEL_TRANSITION}`}
                style={{
                  transform: `translateX(calc(-${desktop.activeIndex} * (var(--slide-size) + 1rem)))`,
                }}
              >
                {impactFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex w-[var(--slide-size)] shrink-0"
                  >
                    <ImpactFeatureCard feature={feature} />
                  </div>
                ))}
              </div>
            </div>
            <CarouselProgress
              current={desktop.activeIndex}
              total={desktopPageCount}
              className="mt-4"
            />
          </div>

          {/* Mobile: 1 visible, move 1 card per click */}
          <div className="lg:hidden">
            <CarouselNav
              onPrev={mobile.goPrev}
              onNext={mobile.goNext}
              canGoPrev={mobile.canGoPrev}
              canGoNext={mobile.canGoNext}
              className="mb-4"
            />
            <div className="overflow-hidden">
              <div
                className={`flex ${CAROUSEL_TRANSITION}`}
                style={{
                  transform: `translateX(-${mobile.activeIndex * 100}%)`,
                }}
              >
                {impactFeatures.map((feature) => (
                  <div key={feature.id} className="w-full shrink-0">
                    <ImpactFeatureCard feature={feature} />
                  </div>
                ))}
              </div>
            </div>
            <CarouselProgress
              current={mobile.activeIndex}
              total={impactFeatures.length}
              className="mt-4"
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {impactStats.map((stat) => (
            <div
              key={stat.id}
              className="rounded-lg bg-primary-light px-4 py-6 text-center md:px-6 md:py-8"
            >
              <p className="text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-text-muted md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
