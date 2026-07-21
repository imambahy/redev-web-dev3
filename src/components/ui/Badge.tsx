type BadgeProps = {
  children: string;
  variant?: "primary" | "accent" | "campaign" | "neutral";
  className?: string;
};

const variantClasses = {
  primary: "bg-primary text-white",
  accent: "bg-accent text-white",
  campaign: "bg-[#e6f7fe] text-[#00AEEF]",
  neutral: "bg-surface-muted text-text-muted",
};

export function Badge({
  children,
  variant = "campaign",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-md px-2.5 py-0.5 text-[10px] font-semibold md:px-4 md:py-1 md:text-xs ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
