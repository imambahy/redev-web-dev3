import type { CampaignDetail } from "@/types/campaign";
import { campaigns } from "./campaigns";

const defaultDetail = {
  heroImageSrc: "/images/campaigns/air-bersih-hero.png",
  eyebrow: "Sharing Hope for the Future",
  heroTitle: "Air Bersih di Sekolah Memantapkan Langkah, Mengalirkan Berkah",
  quote:
    "Providing books and stationery alone does not guarantee that children will get the education they need.",
  quoteDescription:
    "In addition to being registered by local UNICEF partners, Rere was also provided with hearing aids by the local government and community organizations. Your long-term donation is an important part of the stories of children returning to school in the future!",
  impactBenefit: "20 Liter air bersih",
  presetAmounts: [350_000, 600_000, 750_000, 1_500_000],
  perk: {
    label: "Hampers Lebaran",
    remaining: 15,
    total: 50,
    countdown: "20:34:58",
    imageSrc: "/images/campaigns/story-hampers.png",
  },
  stats: {
    donors: 1589,
    raised: 160_869_306,
    goal: 250_000_000,
    daysLeft: 16,
    endDate: "13/11/2022",
    lastReportDate: "1/11/2022",
  },
  stories: [
    {
      title: "With this support system, Rere has now successfully returned to school!",
      paragraphs: [
        "Di balik senyum malu-malu Putri, tersimpan ambisi yang besar. Di usianya yang masih sangat belia, Putri sudah menunjukkan ketertarikan yang luar biasa pada dunia di sekitarnya.",
        "Kampanye ini hadir untuk memastikan Putri mendapatkan bekal yang ia butuhkan. Melalui dukungan kita semua, kita bukan hanya memberikan perlengkapan sekolah atau biaya pendaftaran, melainkan memberikan tiket bagi Putri untuk mengejar cita-citanya tanpa rasa takut.",
      ],
      imageSrc: "/images/campaigns/kembali-sekolah.png",
      imageAlt: "Anak-anak di sekolah",
    },
    {
      title: "Apa yang bisa kita lakukan bersama untuk membantu anak-anak seperti Rere?",
      paragraphs: [
        "Setiap bantuan yang tersalurkan akan dikonversi menjadi jam belajar yang berkualitas, mentor yang membimbing, dan alat peraga yang mampu membuka cakrawala berpikirnya.",
        "Masa depan bangsa dimulai dari pendidikan anak-anak seperti Putri. Mari menjadi bagian dari perjalanan transformatif ini.",
      ],
      imageSrc: "/images/campaigns/story-rere-support.png",
      imageAlt: "Ibu dan anak",
      ctaLabel: "Bantu Mereka Sekarang",
    },
  ],
  commitments: [
    {
      step: 1,
      title: "Donasi Tanpa Beban",
      description:
        "Sistem autodebit yang fleksibel memudahkan Anda untuk berbagi secara konsisten. Anda memegang kendali penuh untuk menyesuaikan atau berhenti kapan saja tanpa prosedur rumit.",
      imageSrc: "/images/campaigns/commitment-donasi-tanpa-beban.png",
      imageAlt: "Donasi tanpa beban",
    },
    {
      step: 2,
      title: "Hasil Nyata Tiap Bulan",
      description:
        "Kami memastikan donasi Anda langsung disalurkan ke program prioritas. Dapatkan laporan transparansi rutin yang menunjukkan perubahan nyata bagi anak-anak Indonesia.",
      imageSrc: "/images/campaigns/commitment-hasil-nyata.png",
      imageAlt: "Hasil nyata tiap bulan",
    },
    {
      step: 3,
      title: "Keamanan Standar Global",
      description:
        "Data dan transaksi Anda dilindungi dengan enkripsi AES-256 dan sertifikasi ISO 27001. Kami menjaga privasi Anda layaknya sistem keamanan perbankan internasional.",
      imageSrc: "/images/campaigns/commitment-keamananStandarGlobal.png",
      imageAlt: "Keamanan standar global",
    },
  ],
} satisfies Omit<CampaignDetail, keyof (typeof campaigns)[number] | "id">;

export function getCampaignDetail(id: string): CampaignDetail | null {
  const campaign = campaigns.find((item) => item.id === id);
  if (!campaign) return null;

  return {
    ...campaign,
    ...defaultDetail,
    heroTitle:
      id === "kembali-sekolah" || id === "kembali-sekolah-2"
        ? campaign.title
        : defaultDetail.heroTitle,
    heroImageSrc: campaign.imageSrc,
  };
}
