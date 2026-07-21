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
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold text-text md:gap-4 md:px-6 md:py-5 md:text-base"
            >
              <span>{item.question}</span>
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-footer text-white md:size-9"
                aria-hidden="true"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 22 22"
                  fill="none"
                  className="md:h-6 md:w-6"
                >
                  <path
                    d="M3 11H19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <g
                    className={`transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                    style={{ transformOrigin: "11px 11px" }}
                  >
                    <path
                      d="M11 3V19"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
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
