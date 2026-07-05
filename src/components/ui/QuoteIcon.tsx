import Image from "next/image";

type QuoteIconProps = {
  className?: string;
  size?: "sm" | "lg";
};

const quoteAssets = {
  sm: {
    src: "/images/ui/colorful-quote.svg",
    width: 36,
    height: 31,
    display: "h-8 w-auto self-start",
  },
  lg: {
    src: "/images/ui/blue-quote.svg",
    width: 68,
    height: 61,
    display: "h-16 w-auto self-start md:h-[4.5rem]",
  },
} as const;

export function QuoteIcon({ className = "", size = "sm" }: QuoteIconProps) {
  const asset = quoteAssets[size];

  return (
    <Image
      src={asset.src}
      alt=""
      width={asset.width}
      height={asset.height}
      aria-hidden="true"
      className={`${asset.display} ${className}`}
    />
  );
}
