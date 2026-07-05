"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type AnimatedHeightProps = {
  children: ReactNode;
  activeKey: string;
  className?: string;
};

export function AnimatedHeight({
  children,
  activeKey,
  className = "",
}: AnimatedHeightProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const updateHeight = () => {
      setHeight(element.getBoundingClientRect().height);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [activeKey]);

  return (
    <div
      className={`overflow-hidden transition-[height] duration-300 ease-in-out motion-reduce:transition-none ${className}`}
      style={{ height: height ?? "auto" }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
