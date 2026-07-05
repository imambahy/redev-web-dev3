import type { ImpactFeature, ImpactStat } from "@/types/impact";

export const impactFeatures: ImpactFeature[] = [
  {
    id: "sanitasi",
    title: "12 Juta Jiwa",
    description:
      "Mendukung 16 kabupaten/kota dan memberikan akses sanitasi bagi lebih dari 12 juta orang",
    imageSrc: "/images/impact/babs.png",
    imageAlt: "Program sanitasi UNICEF",
  },
  {
    id: "pendidikan",
    title: "14 Juta Anak",
    description:
      "Mendukung program pendidikan dan nutrisi untuk jutaan anak di seluruh Indonesia",
    imageSrc: "/images/impact/iklim.png",
    imageAlt: "Program pendidikan dan nutrisi",
  },
  {
    id: "kesehatan-jiwa",
    title: "22.622 Anak",
    description:
      "Mendukung layanan kesehatan jiwa dan perlindungan bagi anak-anak yang membutuhkan",
    imageSrc: "/images/impact/babs.png",
    imageAlt: "Program kesehatan jiwa anak",
  },
];

export const impactStats: ImpactStat[] = [
  { id: "anak", value: "12,4 Juta", label: "Anak menerima bantuan" },
  { id: "program", value: "1.250+", label: "Program berjalan" },
  { id: "provinsi", value: "34", label: "Provinsi di Indonesia" },
  {
    id: "pendekar",
    value: "480.000+",
    label: "Pendekar Anak berkontribusi",
  },
];

export const impactIntro = {
  title: "Dampak UNICEF di Indonesia",
  description:
    "UNICEF bekerja sama dengan berbagai mitra pemerintah dan masyarakat sipil untuk menciptakan dunia yang lebih baik bagi anak-anak Indonesia.",
};
