import type { Campaign } from "@/types/campaign";

export const campaigns: Campaign[] = [
  {
    id: "pemain-ke-12",
    title: "Jadilah Pemain ke-12 untuk Antar Indonesia Menuju Laga Dunia",
    description:
      "PSSI dan UNICEF kini membuka jalan untuk mewujudkan mimpi ini, mimpi yang hanya dapat tercapai melalui dukungan kita semua. Bersama-sama, kita bisa",
    imageSrc: "/images/campaigns/pemain-ke-12.png",
    imageAlt: "Anak-anak bermain sepak bola",
    donationTypes: ["bulanan", "satu-kali"],
    ctaLabel: "Bantu Sekarang",
  },
  {
    id: "stop-kekerasan",
    title: "Bantu #stopkekerasan pada 49 Juta Anak Indonesia",
    description:
      "Ada berbagai alasan kenapa mereka terpaksa tidak melanjutkan sekolah mereka: Kesulitan ekonomi, akses sekolah yang sulit dijangkau...",
    imageSrc: "/images/campaigns/stop-kekerasan.png",
    imageAlt: "Anak-anak Indonesia",
    donationTypes: ["satu-kali"],
    ctaLabel: "Bantu Sekarang",
  },
  {
    id: "kembali-sekolah",
    title: "Tentukan Langkah: Membantu Anak-Anak Kembali ke Sekolah",
    description:
      "Ada berbagai alasan kenapa mereka terpaksa tidak melanjutkan sekolah mereka: Kesulitan ekonomi, akses sekolah yang sulit dijangkau...",
    imageSrc: "/images/campaigns/kembali-sekolah.png",
    imageAlt: "Anak-anak di sekolah",
    donationTypes: ["bulanan", "satu-kali"],
    ctaLabel: "Bantu Sekarang",
  },
  {
    id: "pemain-ke-12-2",
    title: "Jadilah Pemain ke-12 untuk Antar Indonesia Menuju Laga Dunia",
    description:
      "PSSI dan UNICEF kini membuka jalan untuk mewujudkan mimpi ini, mimpi yang hanya dapat tercapai melalui dukungan kita semua. Bersama-sama, kita bisa",
    imageSrc: "/images/campaigns/pemain-ke-12.png",
    imageAlt: "Anak-anak bermain sepak bola",
    donationTypes: ["bulanan", "satu-kali"],
    ctaLabel: "Bantu Sekarang",
  },
  {
    id: "stop-kekerasan-2",
    title: "Bantu #stopkekerasan pada 49 Juta Anak Indonesia",
    description:
      "Ada berbagai alasan kenapa mereka terpaksa tidak melanjutkan sekolah mereka: Kesulitan ekonomi, akses sekolah yang sulit dijangkau...",
    imageSrc: "/images/campaigns/stop-kekerasan.png",
    imageAlt: "Anak-anak Indonesia",
    donationTypes: ["satu-kali"],
    ctaLabel: "Bantu Sekarang",
  },
  {
    id: "kembali-sekolah-2",
    title: "Tentukan Langkah: Membantu Anak-Anak Kembali ke Sekolah",
    description:
      "Ada berbagai alasan kenapa mereka terpaksa tidak melanjutkan sekolah mereka: Kesulitan ekonomi, akses sekolah yang sulit dijangkau...",
    imageSrc: "/images/campaigns/kembali-sekolah.png",
    imageAlt: "Anak-anak di sekolah",
    donationTypes: ["bulanan", "satu-kali"],
    ctaLabel: "Bantu Sekarang",
  },
  // {
  //   id: "air-bersih",
  //   title: "Air Bersih di Sekolah: Memantapkan Langkah, Mengalirkan Berkah",
  //   description:
  //     "Bantu anak-anak Indonesia mendapatkan akses air bersih di sekolah untuk kehidupan yang lebih sehat dan masa depan yang cerah.",
  //   imageSrc: "/images/campaigns/air-bersih.jpg",
  //   imageAlt: "Tangki air bersih di sekolah",
  //   donationTypes: ["bulanan"],
  //   ctaLabel: "Bantu Sekarang",
  // },
];

export type CampaignFilter = "semua" | "bulanan" | "satu-kali";

export const campaignFilters: { id: CampaignFilter; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "bulanan", label: "Bulanan" },
  { id: "satu-kali", label: "Satu Kali" },
];

export function filterCampaigns(
  items: Campaign[],
  filter: CampaignFilter,
): Campaign[] {
  if (filter === "semua") return items;
  return items.filter((c) => c.donationTypes.includes(filter));
}
