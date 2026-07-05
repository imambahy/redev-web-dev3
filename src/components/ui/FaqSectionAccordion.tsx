"use client";

import { useState } from "react";
import type { FaqPageSection } from "@/types/faq";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

function SectionIcon({ icon }: { icon: FaqPageSection["icon"] }) {
  if (icon === "donation") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    );
  }

  if (icon === "account") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
      />
    </svg>
  );
}

type FaqSectionAccordionProps = {
  section: FaqPageSection;
  defaultOpen?: boolean;
};

export function FaqSectionAccordion({
  section,
  defaultOpen = false,
}: FaqSectionAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = `faq-section-panel-${section.id}`;
  const triggerId = `faq-section-trigger-${section.id}`;

  return (
    <div className="overflow-hidden rounded-xl bg-primary-light">
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left md:px-6 md:py-5"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <SectionIcon icon={section.icon} />
        </span>
        <span className="flex-1 text-base font-bold text-primary md:text-lg">
          {section.title}
        </span>
        <span
          className={`flex size-6 shrink-0 items-center justify-center text-primary transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 px-3 pb-3 md:px-4 md:pb-4">
            <FaqAccordion items={section.items} />
          </div>
        </div>
      </div>
    </div>
  );
}
