import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
};

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-landing px-4 md:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
