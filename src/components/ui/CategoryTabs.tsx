"use client";

import { SegmentedTabs } from "@/components/ui/SegmentedTabs";

type CategoryTabsProps = {
  items: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: "light" | "dark" | "segmented";
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
