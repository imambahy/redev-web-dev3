import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonShape = "default" | "pill";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  children: ReactNode;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-dark font-semibold shadow-sm",
  outline:
    "border-2 border-primary bg-surface text-primary hover:bg-primary-light font-semibold",
  ghost: "bg-transparent text-primary hover:bg-primary-light font-semibold",
};

const shapeClasses: Record<ButtonShape, string> = {
  default: "rounded-lg",
  pill: "rounded-full",
};

export function Button({
  variant = "primary",
  shape = "default",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center px-6 py-3 text-sm transition-colors disabled:opacity-50 md:text-base ${shapeClasses[shape]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  className?: string;
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  shape = "default",
  className = "",
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-12 py-2 text-sm transition-colors md:text-base ${shapeClasses[shape]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
