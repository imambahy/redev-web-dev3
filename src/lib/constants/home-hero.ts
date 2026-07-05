import { routes } from "@/lib/constants/routes";

export const homeHeroContent = {
  eyebrow: "Sharing Hope for the Future",
  donorBadge: "100% Didanai Donatur",
  titleLine1: "Air Bersih di",
  titleHighlight: "Sekolah",
  titleLine2: "Memantapkan Langkah,",
  titleLine3: "Mengalirkan Berkah",
  featuredCampaignHref: routes.campaign("kembali-sekolah"),
  form: {
    title: "Bantu anak kekurangan air bersih",
    subtitle: "Galang pendekar anak untuk kalian yang bantu sekarang",
    presetAmounts: [300_000, 450_000, 750_000, 1_500_000],
    defaultAmount: 750_000,
    ctaLabel: "Bantu Sekarang",
  },
} as const;
