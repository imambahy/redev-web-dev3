type BadgeProps = {
  children: string;
  variant?: "primary" | "accent" | "campaign" | "neutral";
  className?: string;
};

const variantClasses = {
  primary: "bg-primary text-white",
  accent: "bg-accent text-white",
  campaign: "bg-badge text-white",
  neutral: "bg-surface-muted text-text-muted",
};

export function Badge({
  children,
  variant = "campaign",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-md px-4 py-1 text-xs font-semibold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
