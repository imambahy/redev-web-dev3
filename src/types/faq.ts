export type FaqCategory = {
  id: string;
  label: string;
  items: FaqItem[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string | string[];
  image?: {
    src: string;
    alt: string;
  };
};

export type FaqSectionIcon = "donation" | "account" | "security";

export type FaqPageSection = {
  id: string;
  title: string;
  icon: FaqSectionIcon;
  items: FaqItem[];
};

export type FaqPageGroup = {
  id: string;
  label: string;
  layout: "flat" | "nested";
  items?: FaqItem[];
  sections?: FaqPageSection[];
};
