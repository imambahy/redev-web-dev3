"use client";

import { useState } from "react";
import { faqCategories, faqSectionContent } from "@/lib/constants/faq";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { CategoryTabs } from "@/components/ui/CategoryTabs";
import { Accordion } from "@/components/ui/Accordion";

export function FaqSection() {
  const [activeCategoryId, setActiveCategoryId] = useState(
    faqCategories[0].id,
  );

  const activeCategory = faqCategories.find((c) => c.id === activeCategoryId);
  const tabItems = faqCategories.map((c) => ({
    id: c.id,
    label: c.label,
  }));

  return (
    <section aria-labelledby="faq-heading" className="bg-primary py-section md:py-section-lg">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="faq-heading"
              className="text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl"
            >
              {faqSectionContent.title}
            </h2>
            <div className="mt-5 md:mt-6">
              <LinkButton href={faqSectionContent.ctaHref} shape="pill">
                {faqSectionContent.ctaLabel}
              </LinkButton>
            </div>
          </div>

          <div className="min-w-0">
            <CategoryTabs
              items={tabItems}
              activeId={activeCategoryId}
              onChange={setActiveCategoryId}
              variant="chips"
              className="mb-5 lg:hidden"
            />
            <CategoryTabs
              items={tabItems}
              activeId={activeCategoryId}
              onChange={setActiveCategoryId}
              variant="segmented"
              className="mb-6 hidden lg:block"
            />

            {activeCategory ? (
              <Accordion key={activeCategory.id} items={activeCategory.items} />
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
