"use client";

import { useState } from "react";
import { faqPageContent, faqPageGroups } from "@/lib/constants/faq-page";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { FaqSectionAccordion } from "@/components/ui/FaqSectionAccordion";

export function FaqPageSection() {
  const [activeGroupId, setActiveGroupId] = useState(faqPageGroups[0].id);
  const activeGroup = faqPageGroups.find((group) => group.id === activeGroupId);

  return (
    <section className="bg-primary-light py-section md:py-section-lg">
      <Container>
        <div className="mx-auto w-full max-w-[1176px]">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
          <div
            className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
            role="tablist"
            aria-label="Kategori FAQ"
          >
            {faqPageGroups.map((group) => {
              const isActive = group.id === activeGroupId;
              return (
                <button
                  key={group.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveGroupId(group.id)}
                  className={`shrink-0 rounded-full border px-5 py-3 text-left text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-surface text-text hover:bg-surface/80"
                  }`}
                >
                  {group.label}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            className={
              activeGroup?.layout === "nested" ? "space-y-4" : "space-y-3"
            }
          >
            {activeGroup?.layout === "flat" && activeGroup.items ? (
              <FaqAccordion items={activeGroup.items} />
            ) : null}

            {activeGroup?.layout === "nested" && activeGroup.sections
              ? activeGroup.sections.map((section, index) => (
                  <FaqSectionAccordion
                    key={section.id}
                    section={section}
                    defaultOpen={index === 0}
                  />
                ))
              : null}
          </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/20 bg-surface p-6 md:flex-row md:items-center md:p-8">
            <div>
              <h2 className="text-lg font-bold text-text md:text-xl">
                {faqPageContent.helpCta.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-text-muted md:text-base">
                {faqPageContent.helpCta.description}
              </p>
            </div>
            <LinkButton href={faqPageContent.helpCta.href} shape="pill" className="shrink-0">
              {faqPageContent.helpCta.buttonLabel}
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
