import type { Testimonial } from "@/types/testimonial";
import { ContentImage } from "@/components/ui/ContentImage";
import { QuoteIcon } from "@/components/ui/QuoteIcon";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-5 md:p-6">
      <div className="relative size-12 shrink-0 self-start overflow-hidden rounded-full">
        <ContentImage
          src={testimonial.imageSrc}
          alt={testimonial.imageAlt}
          fill
          sizes="48px"
        />
      </div>

      <QuoteIcon size="sm" className="mt-4" />

      <blockquote className="mt-3 flex-1 text-sm leading-relaxed md:text-base">
        {testimonial.quote}
      </blockquote>

      <footer className="mt-5 flex items-stretch gap-3">
        <div className="w-px shrink-0 bg-border" aria-hidden="true" />
        <div>
          <cite className="not-italic text-sm font-bold text-text">
            {testimonial.name}
          </cite>
          <p className="text-xs text-text-muted">{testimonial.role}</p>
        </div>
      </footer>
    </article>
  );
}
