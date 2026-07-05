"use client";

import { useState } from "react";
import type { FaqItem } from "@/types/faq";

type AccordionProps = {
  items: FaqItem[];
  className?: string;
};

export function Accordion({ items, className = "" }: AccordionProps) {
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
            className="overflow-hidden rounded-lg bg-surface shadow-card"
          >
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-primary md:px-6 md:py-5 md:text-base"
            >
              <span>{item.question}</span>
              <span
                className={`flex size-6 shrink-0 items-center justify-center text-xl leading-none transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
                aria-hidden="true"
              >
                +
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
                <div className="px-5 pb-4 text-sm text-text-muted md:px-6 md:pb-5 md:text-base">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
