import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { routes } from "@/lib/constants/routes";

type PageHeroProps = {
  title: ReactNode;
  /** Mobile-only title styling (below image). Falls back to `title` if omitted. */
  mobileTitle?: ReactNode;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  aspectRatio?: string;
  overlayVariant?:
    | "default"
    | "donor-wall"
    | "panduan-donasi"
    | "kontak"
    | "privacy";
  /** Back link label under/on hero. Defaults to "Beranda". */
  backLabel?: string;
};

const featuredHeroOverlay =
  "linear-gradient(to right, rgba(0, 49, 68, 0.75) 6%, rgba(0, 49, 68, 0.65) 24%, rgba(0, 49, 68, 0.55) 33%, rgba(0, 49, 68, 0.45) 45%, rgba(0, 49, 68, 0.30) 65%, rgba(0, 49, 68, 0.20) 97%)";

export function PageHero({
  title,
  mobileTitle,
  subtitle,
  imageSrc,
  imageAlt = "",
  aspectRatio,
  overlayVariant = "default",
  backLabel = "Beranda",
}: PageHeroProps) {
  const isFeaturedLayout =
    overlayVariant === "donor-wall" ||
    overlayVariant === "panduan-donasi" ||
    overlayVariant === "kontak" ||
    overlayVariant === "privacy";

  const backLink = (
    <Link
      href={routes.home}
      className="inline-flex items-center gap-1 text-sm font-semibold"
    >
      <span aria-hidden="true">‹</span>
      {backLabel}
    </Link>
  );

  return (
    <section className="w-full">
      <div
        className={`relative flex w-full overflow-hidden ${
          isFeaturedLayout ? "items-center" : "items-end"
        } ${aspectRatio ? "" : "min-h-[220px] md:min-h-[360px]"}`}
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
            overlayVariant === "default"
              ? "absolute inset-0 bg-hero-overlay/55"
              : "absolute inset-0 hidden md:block"
          }
          style={
            isFeaturedLayout ? { background: featuredHeroOverlay } : undefined
          }
          aria-hidden="true"
        />

        <Container
          className={`relative z-10 w-full ${
            isFeaturedLayout
              ? "hidden min-h-full items-center py-12 md:flex md:py-16"
              : "pb-10 pt-24 md:pb-14 md:pt-28"
          }`}
        >
          <div className={isFeaturedLayout ? "max-w-xl" : ""}>
            {isFeaturedLayout ? (
              <div className="mb-4 text-accent">{backLink}</div>
            ) : null}
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
                  isFeaturedLayout
                    ? "text-sm md:text-base"
                    : "max-w-2xl text-sm text-white/90 md:text-base"
                }`}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
        </Container>
      </div>

      {isFeaturedLayout ? (
        <Container className="py-6 md:hidden">
          <div className="text-primary">{backLink}</div>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-text">
            {mobileTitle ?? title}
          </h1>
          {subtitle ? (
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              {subtitle}
            </p>
          ) : null}
        </Container>
      ) : null}
    </section>
  );
}
