"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  campaignFilters,
  campaigns,
  filterCampaigns,
  type CampaignFilter,
} from "@/lib/constants/campaigns";
import { getCarouselSnapOffsets } from "@/lib/utils/carouselSnaps";
import { useCarousel } from "@/lib/utils/useCarousel";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FilterTabs } from "@/components/ui/FilterTabs";
import {
  CarouselArrow,
  CarouselSegmentProgress,
} from "@/components/ui/CarouselControls";
import { CampaignCard } from "./CampaignCard";

const DESKTOP_VISIBLE = 4;
const MOBILE_SLIDE_RATIO = 0.78;
const MOBILE_GAP = 12;
const CAROUSEL_TRANSITION =
  "transition-transform duration-500 ease-in-out will-change-transform";

export function CampaignSection() {
  const [filter, setFilter] = useState<CampaignFilter>("semua");
  const filtered = useMemo(
    () => filterCampaigns(campaigns, filter),
    [filter],
  );

  const desktopSnapOffsets = useMemo(
    () => getCarouselSnapOffsets(filtered.length, DESKTOP_VISIBLE),
    [filtered.length],
  );

  const desktop = useCarousel({
    itemCount: desktopSnapOffsets.length,
    loop: false,
  });

  const desktopOffset = desktopSnapOffsets[desktop.activeIndex] ?? 0;

  const mobile = useCarousel({ itemCount: filtered.length, loop: false });
  const mobileViewportRef = useRef<HTMLDivElement>(null);
  const [mobileViewportWidth, setMobileViewportWidth] = useState(0);

  useLayoutEffect(() => {
    const el = mobileViewportRef.current;
    if (!el) return;

    const update = () => setMobileViewportWidth(el.clientWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mobileSlideWidth = mobileViewportWidth * MOBILE_SLIDE_RATIO;
  const mobileOffset =
    mobileViewportWidth > 0
      ? (mobileViewportWidth - mobileSlideWidth) / 2 -
        mobile.activeIndex * (mobileSlideWidth + MOBILE_GAP)
      : 0;

  const handleFilterChange = (id: CampaignFilter) => {
    setFilter(id);
    desktop.goTo(0);
    mobile.goTo(0);
  };

  return (
    <section
      aria-labelledby="campaign-heading"
      className="bg-surface-muted py-section md:py-section-lg"
    >
      <Container>
        <SectionHeader
          id="campaign-heading"
          title="Pilih Campaign yang Ingin Anda Dukung"
          highlight="Dukung"
          description="Temukan berbagai campaign UNICEF dan pilih dukungan yang paling berarti bagi Anda."
          className="mb-8"
        />

        <FilterTabs
          items={campaignFilters}
          activeId={filter}
          onChange={handleFilterChange}
          className="mb-10"
        />

        {/* Desktop: 4 visible, arrows snap without empty trailing space */}
        <div className="hidden lg:block">
          <div className="flex items-stretch gap-4">
            <CarouselArrow
              direction="left"
              onClick={desktop.goPrev}
              disabled={!desktop.canGoPrev}
              label="Campaign sebelumnya"
              className="shrink-0 self-center"
            />
            <div className="min-w-0 flex-1 overflow-hidden [--slide-size:calc((100%-3*1rem)/4)]">
              <div
                className={`flex gap-4 ${CAROUSEL_TRANSITION}`}
                style={{
                  transform: `translateX(calc(-${desktopOffset} * (var(--slide-size) + 1rem)))`,
                }}
              >
                {filtered.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="w-[var(--slide-size)] shrink-0"
                  >
                    <CampaignCard campaign={campaign} />
                  </div>
                ))}
              </div>
            </div>
            <CarouselArrow
              direction="right"
              onClick={desktop.goNext}
              disabled={!desktop.canGoNext}
              label="Campaign berikutnya"
              className="shrink-0 self-center"
            />
          </div>
          <CarouselSegmentProgress
            current={desktop.activeIndex}
            total={desktopSnapOffsets.length}
            className="mt-6"
          />
        </div>
      </Container>

      {/* Mobile: full-bleed faded primary band behind slider + progress */}
      <div className="bg-[#e6f7fe] py-8 lg:hidden">
        <div className="relative">
          <div ref={mobileViewportRef} className="overflow-hidden">
            <div
              className={`flex ${CAROUSEL_TRANSITION}`}
              style={{
                gap: MOBILE_GAP,
                transform: `translateX(${mobileOffset}px)`,
              }}
            >
              {filtered.map((campaign, index) => {
                const isActive = index === mobile.activeIndex;
                return (
                  <div
                    key={campaign.id}
                    className={`shrink-0 transition-opacity duration-500 ease-in-out ${
                      isActive ? "opacity-100" : "opacity-40"
                    }`}
                    style={{
                      width:
                        mobileSlideWidth > 0
                          ? mobileSlideWidth
                          : `${MOBILE_SLIDE_RATIO * 100}%`,
                    }}
                  >
                    <CampaignCard campaign={campaign} />
                  </div>
                );
              })}
            </div>
          </div>

          <CarouselArrow
            direction="left"
            onClick={mobile.goPrev}
            disabled={!mobile.canGoPrev}
            label="Campaign sebelumnya"
            shape="circle"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2"
          />
          <CarouselArrow
            direction="right"
            onClick={mobile.goNext}
            disabled={!mobile.canGoNext}
            label="Campaign berikutnya"
            shape="circle"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2"
          />
        </div>

        <CarouselSegmentProgress
          current={mobile.activeIndex}
          total={filtered.length}
          tone="default"
          className="mt-6"
        />
      </div>
    </section>
  );
}
