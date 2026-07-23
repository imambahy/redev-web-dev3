"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CampaignDetail } from "@/types/campaign";
import { Container } from "@/components/layout/Container";
import { useCarousel } from "@/lib/utils/useCarousel";

const MOBILE_SLIDE_RATIO = 0.82;
const MOBILE_GAP = 16;
const SWIPE_THRESHOLD = 40;
const CAROUSEL_TRANSITION =
  "transition-transform duration-500 ease-in-out will-change-transform";

type CampaignCommitmentSectionProps = {
  campaign: CampaignDetail;
};

export function CampaignCommitmentSection({
  campaign,
}: CampaignCommitmentSectionProps) {
  const carousel = useCarousel({
    itemCount: campaign.commitments.length,
    loop: false,
  });
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => setViewportWidth(el.clientWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const slideWidth = viewportWidth * MOBILE_SLIDE_RATIO;
  const offset =
    viewportWidth > 0
      ? (viewportWidth - slideWidth) / 2 -
        carousel.activeIndex * (slideWidth + MOBILE_GAP)
      : 0;

  return (
    <section className="bg-surface py-12 md:py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-text md:text-3xl lg:text-4xl">
            Komitmen Kami untuk{" "}
            <span className="text-primary">Kebaikan</span> Anda
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
            UNICEF memastikan setiap langkah donasi Anda terlindungi,
            transparan, dan berdampak langsung bagi masa depan anak-anak.
          </p>
        </div>

        <div className="mx-auto mt-10 hidden max-w-[1176px] gap-5 md:mt-12 md:grid md:grid-cols-3 md:gap-6">
          {campaign.commitments.map((item) => (
            <CommitmentCard key={item.step} item={item} />
          ))}
        </div>
      </Container>

      <div className="mt-10 md:hidden">
        <div
          ref={viewportRef}
          className="overflow-hidden"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? 0;
          }}
          onTouchEnd={(event) => {
            const endX = event.changedTouches[0]?.clientX ?? 0;
            const delta = endX - touchStartX.current;
            if (delta > SWIPE_THRESHOLD) carousel.goPrev();
            if (delta < -SWIPE_THRESHOLD) carousel.goNext();
          }}
        >
          <div
            className={`flex ${CAROUSEL_TRANSITION}`}
            style={{
              gap: MOBILE_GAP,
              transform: `translateX(${offset}px)`,
            }}
          >
            {campaign.commitments.map((item, index) => {
              const isActive = index === carousel.activeIndex;
              return (
                <div
                  key={item.step}
                  className={`shrink-0 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-45"
                  }`}
                  style={{
                    width:
                      slideWidth > 0
                        ? slideWidth
                        : `${MOBILE_SLIDE_RATIO * 100}%`,
                  }}
                >
                  <CommitmentCard item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CommitmentCard({
  item,
}: {
  item: CampaignDetail["commitments"][number];
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="flex flex-1 flex-col bg-[#2653ba] px-5 py-5 md:px-6 md:py-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-white md:text-lg">
            {item.title}
          </h3>
          <span className="shrink-0 text-4xl font-light leading-none text-white/90 md:text-5xl">
            {item.step}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/90">
          {item.description}
        </p>
      </div>
      <div className="relative aspect-[4/3] w-full bg-[#2653ba]">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 85vw, 33vw"
        />
      </div>
    </article>
  );
}
