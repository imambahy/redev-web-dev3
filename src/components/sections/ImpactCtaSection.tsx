import Image from "next/image";
import { impactCtaContent } from "@/lib/constants/impact-cta";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";

const impactCtaOverlay =
  "linear-gradient(to left, rgba(0, 49, 68, 0.8) 17%, rgba(0, 49, 68, 0.65) 44%, rgba(0, 49, 68, 0) 100%)";

export function ImpactCtaSection() {
  return (
    <section
      aria-labelledby="impact-cta-heading"
      className="bg-surface-muted py-section md:py-section-lg"
    >
      <Container>
        <div className="mx-auto w-full max-w-[1176px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
          <div className="relative h-[412px] w-full max-w-[481px] shrink-0 overflow-hidden rounded-xl">
            <Image
              src={impactCtaContent.imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes="481px"
            />
            <div
              className="absolute inset-0"
              style={{ background: impactCtaOverlay }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex h-full flex-col items-end justify-center gap-5 p-6 text-right md:gap-6 md:p-8">
              {impactCtaContent.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/90 md:text-base">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-h-[412px] flex-1 flex-col justify-center rounded-xl bg-primary p-6 md:p-10">
            <h2
              id="impact-cta-heading"
              className="text-2xl font-bold leading-tight text-white md:text-3xl"
            >
              {impactCtaContent.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-base">
              {impactCtaContent.description}
            </p>
            <div className="mt-6">
              <LinkButton href={impactCtaContent.ctaHref} shape="pill">
                {impactCtaContent.ctaLabel}
              </LinkButton>
            </div>
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
