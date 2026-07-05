"use client";

import { useState } from "react";
import type { FaqItem } from "@/types/faq";
import { FaqAnswer } from "@/components/ui/FaqAnswer";

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

export function FaqAccordion({ items, className = "" }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const triggerId = `faq-trigger-${item.id}`;

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl border-l-4 border-primary/50 bg-surface shadow-card"
          >
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
            >
              <span className="text-sm font-bold text-primary md:text-base">
                {item.question}
              </span>
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-lg leading-none text-white"
                aria-hidden="true"
              >
                {isOpen ? "−" : "+"}
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
                <div className="px-5 pb-4 md:px-6 md:pb-5">
                  <FaqAnswer item={item} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
