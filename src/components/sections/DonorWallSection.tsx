"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  donorWallEntries,
  donorWallPageContent,
} from "@/lib/constants/donor-wall";
import { DonorCard } from "@/components/donor-wall/DonorCard";
import { Container } from "@/components/layout/Container";

const donorWallCtaOverlay =
  "linear-gradient(to top, rgba(0, 49, 68, 0.8) 2%, rgba(0, 49, 68, 0.5) 37%, rgba(0, 49, 68, 0) 100%)";

export function DonorWallSection() {
  const [query, setQuery] = useState("");
  const { searchPlaceholder, ctaCard } = donorWallPageContent;

  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return donorWallEntries;
    return donorWallEntries.filter((entry) =>
      entry.name.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <section className="bg-surface-muted py-section md:py-section-lg">
      <Container>
        <div className="mx-auto w-full max-w-[1176px]">
          <div className="flex w-full overflow-hidden rounded-xl bg-[#f5f5f5] shadow-card">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-text outline-none placeholder:text-text-muted md:px-5 md:py-4 md:text-base"
              aria-label={searchPlaceholder}
            />
            <button
              type="button"
              className="flex shrink-0 items-center justify-center self-stretch bg-primary px-5 text-white md:px-6"
              aria-label="Cari"
            >
              <SearchIcon />
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
          {filteredEntries.map((entry) => (
            <DonorCard key={entry.id} entry={entry} />
          ))}

          <article className="relative h-[492px] w-[384px] max-w-full overflow-hidden rounded-3xl shadow-card">
            <Image
              src={ctaCard.imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: donorWallCtaOverlay }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex h-full flex-col justify-end p-6">
              <h3 className="text-lg font-bold leading-snug text-white">
                {ctaCard.title}
              </h3>
              <Link
                href={ctaCard.href}
                className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                {ctaCard.buttonLabel}
              </Link>
            </div>
          </article>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
