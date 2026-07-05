export function getCarouselSnapOffsets(
  itemCount: number,
  visibleCount: number,
): number[] {
  if (itemCount <= 0) return [0];
  if (itemCount <= visibleCount) return [0];

  const maxOffset = itemCount - visibleCount;
  const offsets: number[] = [0];
  let current = 0;

  while (current < maxOffset) {
    const step = Math.min(visibleCount, maxOffset - current);
    current += step;
    offsets.push(current);
  }

  return offsets;
}
