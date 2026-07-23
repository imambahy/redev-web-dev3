"use client";

import { useRef } from "react";
import type { CampaignDetail } from "@/types/campaign";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useCarousel } from "@/lib/utils/useCarousel";

const SWIPE_THRESHOLD = 40;

type CampaignQuoteSectionProps = {
  campaign: CampaignDetail;
};

export function CampaignQuoteSection({ campaign }: CampaignQuoteSectionProps) {
  return (
    <section className="bg-surface py-12 md:py-16">
      <Container>
        <blockquote className="max-w-[777px]">
          <p className="text-xl font-bold leading-relaxed text-text md:text-2xl lg:text-3xl lg:leading-snug">
            &ldquo;
            <HighlightedQuote
              quote={campaign.quote}
              highlight={campaign.quoteHighlight}
            />
            &rdquo;
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
            {campaign.quoteDescription}
          </p>
        </blockquote>
      </Container>
    </section>
  );
}

function HighlightedQuote({
  quote,
  highlight,
}: {
  quote: string;
  highlight: string;
}) {
  const index = quote.indexOf(highlight);
  if (index === -1) return <>{quote}</>;

  return (
    <>
      {quote.slice(0, index)}
      <span className="text-primary">{highlight}</span>
      {quote.slice(index + highlight.length)}
    </>
  );
}

type StatItem = {
  label: string;
  value: string;
  note: string;
  progress?: number;
  progressGoal?: string;
};

type CampaignProgressSectionProps = {
  campaign: CampaignDetail;
};

export function CampaignProgressSection({
  campaign,
}: CampaignProgressSectionProps) {
  const progress = Math.min(
    100,
    Math.round((campaign.stats.raised / campaign.stats.goal) * 100),
  );

  const stats: StatItem[] = [
    {
      label: "Orang Berdonasi",
      value: campaign.stats.donors.toLocaleString("id-ID"),
      note: `Berdasarkan laporan terakhir ${campaign.stats.lastReportDate}`,
    },
    {
      label: "Dana Terkumpul",
      value: formatCurrency(campaign.stats.raised),
      note: `Berdasarkan laporan terakhir ${campaign.stats.lastReportDate}`,
      progress,
      progressGoal: formatCurrency(campaign.stats.goal),
    },
    {
      label: "Waktu Tersisa",
      value: `${campaign.stats.daysLeft} Hari`,
      note: `Akan berakhir pada ${campaign.stats.endDate}`,
    },
  ];

  const carousel = useCarousel({ itemCount: stats.length, loop: false });
  const touchStartX = useRef(0);

  return (
    <section className="bg-surface pb-12 md:pb-16">
      <Container>
        <div className="max-w-[777px] rounded-2xl bg-[#e6f7fe] p-5 md:p-6 lg:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-lg font-bold text-text md:text-xl lg:text-4xl">
                Perkembangan sampai saat ini
              </h2>
              <p className="mt-2 text-sm font-bold leading-relaxed text-text-muted">
                Setiap bulannya, UNICEF akan mengirimkan laporan terkini lewat
                e-mail Anda tentang program-program yang dapat terlaksana berkat
                donasi Anda.
              </p>
            </div>
            <LinkButton
              href="#donation-widget"
              shape="pill"
              className="shrink-0 self-start !text-black"
            >
              Bantu Sekarang
            </LinkButton>
          </div>

          <div className="mt-6 hidden gap-3 md:grid md:grid-cols-3">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div className="mt-6 md:hidden">
            <div
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
                className="flex gap-3 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(calc(-${carousel.activeIndex} * (85% + 0.75rem)))`,
                }}
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="w-[85%] shrink-0">
                    <StatCard {...stat} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`h-1 w-8 rounded-full transition-colors ${
                      index === carousel.activeIndex
                        ? "bg-accent"
                        : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <ProgressNavButton
                  direction="left"
                  onClick={carousel.goPrev}
                  disabled={!carousel.canGoPrev}
                  label="Statistik sebelumnya"
                />
                <ProgressNavButton
                  direction="right"
                  onClick={carousel.goNext}
                  disabled={!carousel.canGoNext}
                  label="Statistik berikutnya"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProgressNavButton({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full bg-hero-overlay text-white transition-opacity disabled:opacity-40"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d={direction === "left" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function StatCard({
  label,
  value,
  note,
  progress,
  progressGoal,
}: StatItem) {
  return (
    <div className="h-full rounded-xl bg-hero-overlay p-4 text-white md:p-5">
      <p className="text-xs text-white md:text-sm">{label}</p>
      <p
        className={`mt-5 font-bold text-primary ${
          typeof progress === "number"
            ? "text-xl"
            : "text-xl md:text-2xl lg:text-5xl"
        }`}
      >
        {value}
      </p>
      {typeof progress === "number" ? (
        <>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progressGoal ? (
            <p className="mt-2 text-xs text-white md:text-sm">
              <span className="text-primary">{progress}%</span> dari{" "}
              {progressGoal}
            </p>
          ) : null}
        </>
      ) : null}
      <p className="mt-5 text-[11px] leading-relaxed text-white/85 md:text-xs">
        {note}
      </p>
    </div>
  );
}
