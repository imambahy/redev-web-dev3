"use client";

type FilterTabsProps<T extends string> = {
  items: { id: T; label: string }[];
  activeId: T;
  onChange: (id: T) => void;
  ariaLabel?: string;
  className?: string;
};

export function FilterTabs<T extends string>({
  items,
  activeId,
  onChange,
  ariaLabel = "Filter",
  className = "",
}: FilterTabsProps<T>) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-2 md:gap-3 ${className}`}
      role="tablist"
      aria-label={ariaLabel}
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
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors md:px-16 md:py-2.5 md:text-base ${
              isActive
                ? "bg-primary text-white"
                : "bg-surface text-gray-500 hover:bg-primary-light"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
