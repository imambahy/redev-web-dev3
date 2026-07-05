"use client";

import {
  testimonials,
  testimonialsSectionContent,
} from "@/lib/constants/testimonials";
import { useCarousel } from "@/lib/utils/useCarousel";
import { Container } from "@/components/layout/Container";
import { CarouselNav } from "@/components/ui/CarouselControls";
import { QuoteIcon } from "@/components/ui/QuoteIcon";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection() {
  const desktop = useCarousel({
    itemCount: testimonials.length,
    loop: false,
  });
  const mobile = useCarousel({
    itemCount: testimonials.length,
    loop: false,
  });

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-surface py-section md:py-section-lg"
    >
      <Container>
        <div className="mb-8 grid gap-8 lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <QuoteIcon size="lg" />
            <h2
              id="testimonials-heading"
              className="mt-4 text-3xl font-bold leading-tight md:text-4xl lg:text-6xl"
            >
              <span className="block text-text">
                {testimonialsSectionContent.titleLine1}
              </span>
              <span className="block text-primary">
                {testimonialsSectionContent.titleLine2}
              </span>
            </h2>
          </div>

          <div className="max-w-xs sm:max-w-sm">
            <p className="text-sm leading-relaxed text-text-muted md:text-base">
              {testimonialsSectionContent.description}
            </p>
            <CarouselNav
              onPrev={desktop.goPrev}
              onNext={desktop.goNext}
              canGoPrev={desktop.canGoPrev}
              canGoNext={desktop.canGoNext}
              variant="accent"
              shape="pill"
              buttonSize="lg"
              className="mt-6 hidden md:flex"
            />
            <CarouselNav
              onPrev={mobile.goPrev}
              onNext={mobile.goNext}
              canGoPrev={mobile.canGoPrev}
              canGoNext={mobile.canGoNext}
              variant="accent"
              shape="pill"
              buttonSize="lg"
              className="mt-6 md:hidden"
            />
          </div>
        </div>

        {/* Desktop: 3 cards peek */}
        <div className="hidden overflow-hidden md:block">
          <div
            className="flex gap-4 transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(-${desktop.activeIndex * (100 / 3)}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[calc(33.333%-0.67rem)] shrink-0"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: single card */}
        <div className="overflow-hidden md:hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(-${mobile.activeIndex * 100}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full shrink-0">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
