import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";

type PageHeroProps = {
  title: ReactNode;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  aspectRatio?: string;
  overlayVariant?: "default" | "donor-wall" | "panduan-donasi" | "kontak";
};

const featuredHeroOverlay =
  "linear-gradient(to right, rgba(0, 49, 68, 0.75) 6%, rgba(0, 49, 68, 0.65) 24%, rgba(0, 49, 68, 0.55) 33%, rgba(0, 49, 68, 0.45) 45%, rgba(0, 49, 68, 0.30) 65%, rgba(0, 49, 68, 0.20) 97%)";

export function PageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt = "",
  aspectRatio,
  overlayVariant = "default",
}: PageHeroProps) {
  const isFeaturedLayout =
    overlayVariant === "donor-wall" ||
    overlayVariant === "panduan-donasi" ||
    overlayVariant === "kontak";

  return (
    <section
      className={`relative flex w-full overflow-hidden ${
        isFeaturedLayout ? "items-center" : "items-end"
      } ${aspectRatio ? "" : "min-h-[280px] md:min-h-[360px]"}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className={`object-cover ${isFeaturedLayout ? "object-right" : ""}`}
        sizes="100vw"
      />
      <div
        className={
          overlayVariant === "default" ? "absolute inset-0 bg-hero-overlay/55" : "absolute inset-0"
        }
        style={
          isFeaturedLayout ? { background: featuredHeroOverlay } : undefined
        }
        aria-hidden="true"
      />
      <Container
        className={`relative z-10 w-full ${
          isFeaturedLayout
            ? "flex min-h-full items-center py-12 md:py-16"
            : "pb-10 pt-24 md:pb-14 md:pt-28"
        }`}
      >
        <div className={isFeaturedLayout ? "max-w-xl" : ""}>
          <h1
            className={`font-bold leading-tight ${
              isFeaturedLayout
                ? "text-4xl md:text-5xl lg:text-[56px] lg:leading-[1.1]"
                : "max-w-3xl text-3xl text-white md:text-4xl lg:text-5xl"
            }`}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className={`mt-4 max-w-xl leading-relaxed text-white md:mt-5 ${
                isFeaturedLayout ? "text-sm md:text-base" : "max-w-2xl text-sm text-white/90 md:text-base"
              }`}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
