"use client";

import { useEffect, useRef, useState } from "react";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";

type CategoryTabsProps = {
  items: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: "light" | "dark" | "segmented" | "chips";
  className?: string;
};

export function CategoryTabs({
  items,
  activeId,
  onChange,
  variant = "dark",
  className = "",
}: CategoryTabsProps) {
  if (variant === "segmented") {
    return (
      <SegmentedTabs
        items={items}
        activeId={activeId}
        onChange={onChange}
        ariaLabel="Kategori FAQ"
        className={`border-white/30 bg-surface-muted ${className}`}
      />
    );
  }

  if (variant === "chips") {
    return (
      <ChipsTabs
        items={items}
        activeId={activeId}
        onChange={onChange}
        className={className}
      />
    );
  }

  const isDark = variant === "dark";

  return (
    <div
      className={`flex flex-wrap gap-4 md:gap-6 ${className}`}
      role="tablist"
      aria-label="Kategori FAQ"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={`text-sm font-semibold transition-colors md:text-base ${
              isDark
                ? isActive
                  ? "text-white underline decoration-accent decoration-2 underline-offset-4"
                  : "text-white/70 hover:text-white"
                : isActive
                  ? "text-primary underline decoration-primary decoration-2 underline-offset-4"
                  : "text-text-muted hover:text-primary"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function ChipsTabs({
  items,
  activeId,
  onChange,
  className = "",
}: Omit<CategoryTabsProps, "variant">) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const overflow = scrollWidth > clientWidth + 1;
      setCanScroll(overflow);

      if (!overflow) {
        setThumb({ left: 0, width: 0 });
        return;
      }

      const ratio = clientWidth / scrollWidth;
      const width = Math.max(ratio * clientWidth, 48);
      const maxLeft = clientWidth - width;
      const left =
        scrollWidth - clientWidth > 0
          ? (scrollLeft / (scrollWidth - clientWidth)) * maxLeft
          : 0;

      setThumb({ left, width });
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [items]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>(`[data-tab-id="${activeId}"]`);
    if (!active) return;

    const elRect = el.getBoundingClientRect();
    const tabRect = active.getBoundingClientRect();
    if (tabRect.left < elRect.left) {
      el.scrollBy({ left: tabRect.left - elRect.left - 8, behavior: "smooth" });
    } else if (tabRect.right > elRect.right) {
      el.scrollBy({ left: tabRect.right - elRect.right + 8, behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <div className={`min-w-0 ${className}`}>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Kategori FAQ"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              data-tab-id={item.id}
              aria-selected={isActive}
              onClick={() => onChange(item.id)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-footer text-white"
                  : "bg-surface text-text hover:bg-surface/90"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {canScroll ? (
        <div
          className="relative mt-3 h-1 w-full overflow-hidden rounded-full bg-white/35"
          aria-hidden="true"
        >
          <span
            className="absolute inset-y-0 rounded-full bg-white"
            style={{ left: thumb.left, width: thumb.width }}
          />
        </div>
      ) : null}
    </div>
  );
}
