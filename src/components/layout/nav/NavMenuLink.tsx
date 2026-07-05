import Image from "next/image";
import Link from "next/link";
import type { NavMenuChild } from "@/lib/constants/nav-menu";

type NavMenuLinkProps = {
  item: NavMenuChild;
  onNavigate?: () => void;
  variant?: "default" | "dropdown";
};

export function NavMenuLink({ item, onNavigate, variant = "default" }: NavMenuLinkProps) {
  if (variant === "dropdown") {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className="group flex h-full flex-col transition-opacity hover:opacity-90"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 50vw"
          />
        </div>
        <p className="mt-4 text-base font-semibold text-primary">{item.label}</p>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {item.description}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group flex gap-4 border-b border-primary/15 py-5 transition-colors last:border-b-0 hover:bg-primary-light/40"
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg md:size-24">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 group-hover:decoration-primary md:text-base">
          {item.label}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-text-muted md:text-sm">
          {item.description}
        </p>
      </div>
    </Link>
  );
}
