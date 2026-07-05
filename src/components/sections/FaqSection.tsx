"use client";

import { useState } from "react";
import { faqCategories, faqSectionContent } from "@/lib/constants/faq";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { CategoryTabs } from "@/components/ui/CategoryTabs";
import { Accordion } from "@/components/ui/Accordion";
import { AnimatedHeight } from "@/components/ui/AnimatedHeight";

export function FaqSection() {
  const [activeCategoryId, setActiveCategoryId] = useState(
    faqCategories[0].id,
  );

  const activeCategory = faqCategories.find((c) => c.id === activeCategoryId);

  return (
    <section aria-labelledby="faq-heading" className="bg-primary py-section md:py-section-lg">
      <Container>
        <AnimatedHeight activeKey={activeCategoryId}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                id="faq-heading"
                className="text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl"
              >
                {faqSectionContent.title}
              </h2>
              <div className="mt-6">
                <LinkButton href={faqSectionContent.ctaHref}>
                  {faqSectionContent.ctaLabel}
                </LinkButton>
              </div>
            </div>

            <div>
              <CategoryTabs
                items={faqCategories.map((c) => ({
                  id: c.id,
                  label: c.label,
                }))}
                activeId={activeCategoryId}
                onChange={setActiveCategoryId}
                variant="segmented"
                className="mb-6"
              />

              {activeCategory ? (
                <Accordion key={activeCategory.id} items={activeCategory.items} />
              ) : null}
            </div>
          </div>
        </AnimatedHeight>
      </Container>
    </section>
  );
}
