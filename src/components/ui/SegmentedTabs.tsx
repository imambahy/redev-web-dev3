"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type SegmentedTabsProps<T extends string> = {
  items: { id: T; label: ReactNode }[];
  activeId: T;
  onChange: (id: T) => void;
  ariaLabel?: string;
  className?: string;
  equalWidth?: boolean;
  align?: "center" | "start";
  size?: "default" | "compact";
  /** pill = fully round (default); chip = rounded-lg like donation chips */
  shape?: "pill" | "chip";
};

type IndicatorStyle = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export function SegmentedTabs<T extends string>({
  items,
  activeId,
  onChange,
  ariaLabel = "Filter",
  className = "",
  equalWidth = true,
  align = "center",
  size = "default",
  shape = "pill",
}: SegmentedTabsProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const [indicator, setIndicator] = useState<IndicatorStyle>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const container = containerRef.current;
      const activeTab = tabRefs.current.get(activeId);
      if (!container || !activeTab) return;

      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      setIndicator({
        left: tabRect.left - containerRect.left,
        top: tabRect.top - containerRect.top,
        width: tabRect.width,
        height: tabRect.height,
      });
    };

    updateIndicator();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(container);
    items.forEach((item) => {
      const tab = tabRefs.current.get(item.id);
      if (tab) resizeObserver.observe(tab);
    });
    window.addEventListener("resize", updateIndicator);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeId, items]);

  const hasIndicator = indicator.width > 0 && indicator.height > 0;
  const radiusClass = shape === "chip" ? "rounded-lg" : "rounded-full";

  return (
    <div
      ref={containerRef}
      className={`relative flex w-full overflow-visible border border-border bg-surface p-1 ${radiusClass} ${className}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bg-primary transition-[left,top,width,height] duration-300 ease-in-out motion-reduce:transition-none ${radiusClass}`}
        style={{
          left: hasIndicator ? indicator.left : 0,
          top: hasIndicator ? indicator.top : 0,
          width: hasIndicator ? indicator.width : 0,
          height: hasIndicator ? indicator.height : 0,
        }}
      />
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            ref={(element) => {
              if (element) {
                tabRefs.current.set(item.id, element);
              } else {
                tabRefs.current.delete(item.id);
              }
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={`relative z-10 shrink-0 overflow-visible font-semibold whitespace-nowrap transition-colors duration-300 ${radiusClass} ${
              size === "compact"
                ? "px-2 py-2 text-[11px] md:text-xs"
                : "px-4 py-2.5 text-sm"
            } ${equalWidth ? "flex-1" : ""} ${align === "center" ? "text-center" : "text-left"} ${
              isActive
                ? "text-white"
                : "bg-transparent text-text-muted hover:text-primary"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
