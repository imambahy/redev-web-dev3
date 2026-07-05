import { routes } from "@/lib/constants/routes";

export const impactCtaContent = {
  imageSrc: "/images/impact/impact-cta.png",
  title: "Jadilah Bagian dari Perubahan yang Berkelanjutan",
  description:
    "Donasi bulanan Anda memastikan bantuan medis, nutrisi, dan pendidikan tidak pernah terhenti bagi jutaan anak Indonesia. Dengan komitmen kecil setiap bulan, Anda memberikan kepastian masa depan bagi mereka yang paling membutuhkan.",
  ctaLabel: "Donasi Rutin Sekarang",
  ctaHref: routes.donate,
  stats: [
    { value: "12,4 Juta", label: "Anak menerima bantuan" },
    { value: "480.000+", label: "Donatur Rutin" },
    { value: "1.250+", label: "Program berjalan" },
  ],
} as const;
