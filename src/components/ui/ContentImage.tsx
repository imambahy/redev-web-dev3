import Image from "next/image";

type ContentImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  fit?: "cover" | "contain";
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

export function ContentImage({
  src,
  alt,
  className = "",
  fill = false,
  fit = "cover",
  width = 800,
  height = 600,
  sizes,
  priority = false,
}: ContentImageProps) {
  const objectClass = fit === "contain" ? "object-contain" : "object-cover";

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className={`${objectClass} ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
      className={`h-auto w-full ${objectClass} ${className}`}
    />
  );
}
