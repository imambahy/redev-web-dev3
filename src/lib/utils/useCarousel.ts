"use client";

import { useCallback, useState } from "react";

type UseCarouselOptions = {
  itemCount: number;
  loop?: boolean;
};

export function useCarousel({ itemCount, loop = false }: UseCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (itemCount === 0) return;
      if (loop) {
        setActiveIndex(((index % itemCount) + itemCount) % itemCount);
        return;
      }
      setActiveIndex(Math.max(0, Math.min(index, itemCount - 1)));
    },
    [itemCount, loop],
  );

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const canGoPrev = loop || activeIndex > 0;
  const canGoNext = loop || activeIndex < itemCount - 1;

  return {
    activeIndex,
    goTo,
    goPrev,
    goNext,
    canGoPrev,
    canGoNext,
  };
}
