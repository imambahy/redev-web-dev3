"use client";

const variantClasses = {
  primary: {
    enabled: "bg-primary text-white hover:bg-primary-dark",
    disabled: "border-2 border-primary bg-surface text-primary",
  },
  accent: {
    enabled: "bg-accent text-white hover:bg-accent-dark",
    disabled: "border-2 border-accent bg-surface text-accent",
  },
};

const arrowButtonBaseClasses =
  "flex items-center justify-center rounded-full transition-colors";

const arrowButtonSizeClasses = {
  pill: {
    default: "h-10 w-14 md:h-11 md:w-16",
    lg: "h-12 w-[4.5rem] md:h-14 md:w-24",
  },
  circle: {
    default: "size-10 md:size-11",
    lg: "size-12 md:size-14",
  },
};

type ArrowButtonShape = "pill" | "circle";
type ArrowButtonSize = "default" | "lg";

type PillArrowButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
  disabled?: boolean;
  variant?: "primary" | "accent";
  shape?: ArrowButtonShape;
  buttonSize?: ArrowButtonSize;
  className?: string;
};

function PillArrowButton({
  direction,
  onClick,
  label,
  disabled = false,
  variant = "primary",
  shape = "pill",
  buttonSize = "default",
  className = "",
}: PillArrowButtonProps) {
  const stateClasses = disabled
    ? variantClasses[variant].disabled
    : variantClasses[variant].enabled;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-disabled={disabled}
      className={`${arrowButtonBaseClasses} ${arrowButtonSizeClasses[shape][buttonSize]} ${stateClasses} disabled:cursor-default ${className}`}
    >
      <ChevronIcon direction={direction} size={buttonSize} />
    </button>
  );
}

type CarouselArrowProps = {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
  disabled?: boolean;
  variant?: "primary" | "accent";
  shape?: ArrowButtonShape;
  buttonSize?: ArrowButtonSize;
  className?: string;
};

export function CarouselArrow({
  direction,
  onClick,
  label,
  disabled = false,
  variant = "primary",
  shape = "pill",
  buttonSize = "default",
  className = "",
}: CarouselArrowProps) {
  return (
    <PillArrowButton
      direction={direction}
      onClick={onClick}
      label={label}
      disabled={disabled}
      variant={variant}
      shape={shape}
      buttonSize={buttonSize}
      className={className}
    />
  );
}

type CarouselNavProps = {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev?: boolean;
  canGoNext?: boolean;
  prevLabel?: string;
  nextLabel?: string;
  variant?: "primary" | "accent";
  shape?: ArrowButtonShape;
  buttonSize?: ArrowButtonSize;
  className?: string;
};

export function CarouselNav({
  onPrev,
  onNext,
  canGoPrev = true,
  canGoNext = true,
  prevLabel = "Slide sebelumnya",
  nextLabel = "Slide berikutnya",
  variant = "primary",
  shape = "pill",
  buttonSize = "default",
  className = "",
}: CarouselNavProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <PillArrowButton
        direction="left"
        onClick={onPrev}
        label={prevLabel}
        disabled={!canGoPrev}
        variant={variant}
        shape={shape}
        buttonSize={buttonSize}
      />
      <PillArrowButton
        direction="right"
        onClick={onNext}
        label={nextLabel}
        disabled={!canGoNext}
        variant={variant}
        shape={shape}
        buttonSize={buttonSize}
      />
    </div>
  );
}

function ChevronIcon({
  direction,
  size = "default",
}: {
  direction: "left" | "right";
  size?: ArrowButtonSize;
}) {
  const dimension = size === "lg" ? 20 : 16;

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={direction === "left" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CarouselDotsProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  label?: string;
  className?: string;
};

export function CarouselDots({
  count,
  activeIndex,
  onSelect,
  label = "Navigasi slide",
  className = "",
}: CarouselDotsProps) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      role="tablist"
      aria-label={label}
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={`Slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`size-2.5 rounded-full transition-colors ${
            i === activeIndex ? "bg-primary" : "bg-primary/30"
          }`}
        />
      ))}
    </div>
  );
}

type CarouselProgressProps = {
  current: number;
  total: number;
  className?: string;
};

export function CarouselProgress({
  current,
  total,
  className = "",
}: CarouselProgressProps) {
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div
      className={`h-1 w-full overflow-hidden rounded-full bg-primary-light ${className}`}
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      <div
        className="h-full rounded-full bg-primary transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function CarouselSegmentProgress({
  current,
  total,
  className = "",
}: CarouselProgressProps) {
  if (total <= 0) return null;

  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label="Progress carousel"
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 w-28 rounded-full transition-colors duration-300 ${
            i === current ? "bg-primary" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}
