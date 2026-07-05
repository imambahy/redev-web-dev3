import { routes } from "@/lib/constants/routes";

export type DonorWallEntry = {
  id: string;
  name: string;
  badge: string;
  location: string;
  yearsLabel: string;
  imageSrc: string;
};

export const donorWallPageContent = {
  hero: {
    imageSrc: "/images/donor-wall/hero.png",
    titleLine1: "Wajah Wajah",
    titleLine2: "Pelindung Masa",
    titleLine3: "Depan",
    subtitle:
      "Di balik setiap senyum anak Indonesia, ada komitmen tanpa henti dari Anda. Wall of Fame ini kami dedikasikan bagi para Pendekar Anak yang tak pernah lelah mendampingi langkah mereka.",
  },
  searchPlaceholder: "Cari Pendekar Anak",
  cardHeaderImageSrc: "/images/donor-wall/card-header-bg.png",
  ctaCard: {
    title: "Mulai perjalanan Anda sebagai Pendekar Anak sekarang",
    buttonLabel: "Mulai Hari Ini",
    href: routes.donate,
    imageSrc: "/images/donor-wall/cta-card.png",
  },
} as const;

export const donorWallEntries: DonorWallEntry[] = [
  {
    id: "damar-1",
    name: "Damar Kalifa Ababil Prawiraatmadja",
    badge: "Pendekar Anak Sejak 2024",
    location: "Jakarta, DKI Jakarta",
    yearsLabel: "5 Tahun Mendukung",
    imageSrc: "/images/donor-wall/abil.png",
  },
  {
    id: "hanif",
    name: "Muhammad Hanif Fauzi",
    badge: "Pendekar Anak Sejak 2024",
    location: "Jakarta, DKI Jakarta",
    yearsLabel: "5 Tahun Mendukung",
    imageSrc: "/images/donor-wall/hanif.png",
  },
  {
    id: "agung",
    name: "Tuanku Imam Bonjol",
    badge: "Pendekar Anak Sejak 2024",
    location: "Jakarta, DKI Jakarta",
    yearsLabel: "5 Tahun Mendukung",
    imageSrc: "/images/donor-wall/tuanku-imam-bonjol.png",
  },
  {
    id: "damar-2",
    name: "Damar Kalifa Ababil Prawiraatmadja",
    badge: "Pendekar Anak Sejak 2024",
    location: "Jakarta, DKI Jakarta",
    yearsLabel: "5 Tahun Mendukung",
    imageSrc: "/images/donor-wall/abil.png",
  },
  {
    id: "imam",
    name: "Imam Bahy Putra Susetyo",
    badge: "Pendekar Anak Sejak 2024",
    location: "Jakarta, DKI Jakarta",
    yearsLabel: "5 Tahun Mendukung",
    imageSrc: "/images/donor-wall/tuanku-imam-bonjol.png",
  },
];
