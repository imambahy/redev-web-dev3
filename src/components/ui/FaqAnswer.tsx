import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { FaqItem } from "@/types/faq";

function renderInlineText(text: string): ReactNode[] {
  const pattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
  const parts = text.split(pattern).filter(Boolean);

  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = href.startsWith("http");
      const className = "font-semibold text-primary underline underline-offset-2";

      if (isExternal) {
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {label}
          </a>
        );
      }

      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        return (
          <a key={index} href={href} className={className}>
            {label}
          </a>
        );
      }

      return (
        <Link key={index} href={href} className={className}>
          {label}
        </Link>
      );
    }

    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      const value = boldMatch[1];
      if (value.includes("@")) {
        return (
          <a
            key={index}
            href={`mailto:${value}`}
            className="font-semibold text-primary underline underline-offset-2"
          >
            {value}
          </a>
        );
      }

      return (
        <strong key={index} className="font-semibold text-text">
          {value}
        </strong>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

type FaqAnswerProps = {
  item: FaqItem;
};

export function FaqAnswer({ item }: FaqAnswerProps) {
  const paragraphs = Array.isArray(item.answer) ? item.answer : [item.answer];

  return (
    <div className="space-y-3 text-sm text-text-muted md:text-base">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{renderInlineText(paragraph)}</p>
      ))}

      {item.image ? (
        <div className="pt-2">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={520}
            height={320}
            className="h-auto w-full max-w-md rounded-lg"
          />
        </div>
      ) : null}
    </div>
  );
}
