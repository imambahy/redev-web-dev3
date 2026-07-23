import type { CampaignDetail } from "@/types/campaign";
import { campaigns } from "./campaigns";

const storyImage = {
  imageSrc: "/images/campaigns/campaign-content.png",
  imageAlt: "Anak-anak sekolah tersenyum di kelas",
};

const defaultDetail = {
  heroImageSrc: "/images/campaigns/campaign-hero.png",
  eyebrow: "Sharing Hope for the Future",
  heroTitle: "Air Bersih di Sekolah Memantapkan Langkah, Mengalirkan Berkah",
  quote:
    "Providing books and stationery alone does not guarantee that children will get the education they need.",
  quoteHighlight: "does not guarantee",
  quoteDescription:
    "In addition to being registered by local UNICEF partners, Rere was also provided with hearing aids by the local government and community organizations. Your long-term donation is an important part of the stories of children returning to school in the future!",
  impactBenefit: "20 Liter air bersih",
  presetAmounts: [350_000, 500_000, 750_000, 1_500_000],
  perk: {
    label: "Hampers Lebaran",
    remaining: 15,
    total: 50,
    countdown: "20:34:58",
    imageSrc: "/images/campaigns/hampers.png",
  },
  stats: {
    donors: 1589,
    donorGoal: 2500,
    raised: 160_869_306,
    goal: 250_000_000,
    daysLeft: 16,
    endDate: "12/11/2022",
    lastReportDate: "11/11/2022",
  },
  contentBlocks: [
    {
      type: "image" as const,
      ...storyImage,
    },
    {
      type: "copy" as const,
      title:
        "With this support system, Rere has now successfully returned to school!",
      paragraphs: [
        "Di balik senyum malu-malu Rere, tersimpan ambisi yang besar. Di usianya yang masih sangat belia, ia sudah menunjukkan ketertarikan yang luar biasa pada dunia di sekitarnya. Namun tanpa dukungan yang tepat, langkah kecil menuju bangku sekolah bisa terhenti di tengah jalan.",
      ],
    },
    {
      type: "image" as const,
      ...storyImage,
    },
    {
      type: "copy" as const,
      paragraphs: [
        "Banyak anak di Indonesia masih menghadapi hambatan untuk tetap bersekolah. Akses air bersih yang terbatas di sekolah, biaya yang memberatkan keluarga, hingga kurangnya dukungan lingkungan membuat mereka rentan putus sekolah. Ketika kebutuhan dasar tidak terpenuhi, fokus belajar ikut tergerus.",
        "Melalui program ini, UNICEF bersama mitra setempat memperkuat sistem dukungan di sekitar anak: dari fasilitas sekolah yang lebih layak, pendampingan keluarga, hingga bantuan yang membuat anak merasa aman untuk kembali ke kelas. Setiap kontribusi Anda menjadi bagian dari jaring pengaman itu.",
        "Cerita Rere adalah salah satu wajah dari ribuan anak yang sedang berjuang. Dengan dukungan jangka panjang dari para Orang Baik, peluang mereka untuk tumbuh, belajar, dan bermimpi jadi jauh lebih nyata. Perubahan tidak terjadi dalam semalam, tetapi setiap donasi mendekatkan kita pada masa depan yang lebih adil bagi anak-anak.",
      ],
    },
    {
      type: "copy" as const,
      title:
        "With this support system, Rere has now successfully returned to school!",
      paragraphs: [
        "Setelah mendapatkan pendampingan dan dukungan yang tepat, Rere kini kembali duduk di bangku sekolah. Ia bisa belajar bersama teman-temannya, mengikuti kegiatan kelas, dan perlahan membangun kembali rasa percaya dirinya. Langkah ini sederhana, namun maknanya besar bagi masa depannya.",
        "Keberhasilan ini bukan hasil satu pihak saja. Orangtua, komunitas, mitra lokal, dan para donatur saling bersinergi agar anak seperti Rere tidak lagi menghadapi perjalanan sendirian. Dukungan Anda hari ini membantu memastikan cerita serupa bisa berlanjut untuk anak-anak lain di seluruh Indonesia.",
      ],
    },
  ],
  mediaHighlight: {
    imageSrc: "/images/campaigns/campaign-content.png",
    imageAlt: "Anak-anak sekolah tersenyum di kelas",
    caption:
      "In addition to being registered by local UNICEF partners, Rere was also provided with hearing aids by the local government and community organizations.",
  },
  closingCta: {
    title:
      "Apa yang bisa kita lakukan bersama untuk membantu anak-anak seperti Rere?",
    paragraphs: [
      "Di bawah ini adalah upaya yang sedang dilakukan UNICEF untuk mengembalikan anak-anak putus sekolah di Indonesia ke bangku pendidikan. Tentu saja, hal ini membutuhkan waktu dan kolaborasi dari berbagai pihak. Karena itu, dukungan jangka panjang Anda sangat berarti bagi mereka.",
    ],
    imageSrc: "/images/campaigns/rere.png",
    imageAlt: "Ibu dan anak tersenyum",
    ctaLabel: "Dukung Pendidikan Rere",
  },
  commitments: [
    {
      step: 1,
      title: "Donasi Tanpa Beban",
      description:
        "Sistem autodebit yang fleksibel memudahkan Anda untuk berbagi secara konsisten. Anda memegang kendali penuh untuk menyesuaikan atau berhenti kapan saja tanpa prosedur rumit",
      imageSrc: "/images/campaigns/commitment-1.png",
      imageAlt: "Donasi tanpa beban",
    },
    {
      step: 2,
      title: "Hasil Nyata Tiap Bulan",
      description:
        "Kami memastikan donasi Anda langsung disalurkan ke program prioritas. Dapatkan laporan transparansi rutin yang menunjukkan perubahan nyata bagi anak-anak Indonesia.",
      imageSrc: "/images/campaigns/commitment-2.png",
      imageAlt: "Hasil nyata tiap bulan",
    },
    {
      step: 3,
      title: "Keamanan Standar Global",
      description:
        "Data dan transaksi Anda dilindungi dengan enkripsi AES-256 dan sertifikasi ISO 27001. Kami menjaga privasi Anda layaknya sistem keamanan perbankan internasional.",
      imageSrc: "/images/campaigns/commitment-3.png",
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
    heroTitle: defaultDetail.heroTitle,
    heroImageSrc: defaultDetail.heroImageSrc,
  };
}
