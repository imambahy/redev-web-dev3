import type { FaqCategory } from "@/types/faq";
import { routes } from "@/lib/constants/routes";

export const faqCategories: FaqCategory[] = [
  {
    id: "seputar-donasi",
    label: "Seputar Donasi",
    items: [
      {
        id: "payment-options",
        question:
          "Saya ingin berdonasi melalui website, pilihan pembayaran donasi apa saja yang tersedia?",
        answer:
          "Anda dapat berdonasi melalui berbagai metode pembayaran yang tersedia di website, termasuk transfer bank, kartu kredit/debit, dan dompet digital. Pilihan lengkap akan ditampilkan saat proses donasi.",
      },
      {
        id: "donation-success",
        question:
          "Bagaimana saya tahu apakah donasi saya melalui website sudah berhasil diproses?",
        answer:
          "Setelah donasi berhasil, Anda akan menerima konfirmasi melalui email beserta bukti transaksi. Anda juga dapat memeriksa status donasi di akun donor Anda.",
      },
      {
        id: "how-to-donate",
        question: "Saya ingin berdonasi melalui UNICEF, bagaimana caranya?",
        answer:
          "Pilih campaign yang ingin Anda dukung, tentukan nominal donasi, lalu ikuti langkah pembayaran di website. Tim kami siap membantu jika Anda membutuhkan bantuan.",
      },
    ],
  },
  {
    id: "gelang-pendekar",
    label: "Gelang Pendekar Anak",
    items: [
      {
        id: "gelang-what",
        question: "Apa itu Gelang Pendekar Anak?",
        answer:
          "Gelang Pendekar Anak adalah simbol keanggotaan dan apresiasi bagi donatur rutin UNICEF Indonesia yang berkomitmen mendukung anak-anak melalui donasi bulanan.",
      },
      {
        id: "gelang-how",
        question: "Bagaimana cara mendapatkan Gelang Pendekar Anak?",
        answer:
          "Gelang Pendekar Anak diberikan kepada donatur yang telah melakukan donasi rutin sesuai ketentuan program. Informasi detail akan dikirimkan melalui email setelah Anda memenuhi persyaratan.",
      },
      {
        id: "gelang-benefits",
        question: "Apa manfaat menjadi Pendekar Anak?",
        answer:
          "Sebagai Pendekar Anak, Anda akan menerima laporan berkala tentang dampak donasi, undangan acara khusus, dan kesempatan untuk terlibat lebih dekat dengan misi UNICEF.",
      },
    ],
  },
  {
    id: "dampak-positif-donasi",
    label: "Dampak Positif Donasi",
    items: [
      {
        id: "impact-tracking",
        question: "Bagaimana saya bisa melihat dampak donasi saya?",
        answer:
          "UNICEF menyediakan laporan berkala dan update program yang dapat Anda akses melalui email atau halaman dampak di website. Transparansi penggunaan dana adalah prioritas kami.",
      },
      {
        id: "impact-areas",
        question: "Di bidang apa saja donasi saya digunakan?",
        answer:
          "Donasi digunakan untuk program kesehatan, pendidikan, nutrisi, perlindungan anak, dan sanitasi di seluruh Indonesia, bekerja sama dengan pemerintah dan mitra lokal.",
      },
      {
        id: "impact-report",
        question: "Apakah ada laporan tahunan yang bisa saya baca?",
        answer:
          "Ya, UNICEF menerbitkan laporan tahunan yang dapat diunduh dari website resmi. Laporan tersebut merinci pencapaian program dan penggunaan dana donasi.",
      }
    ],
  },
];

export const faqSectionContent = {
  title: "Temukan jawaban untuk pertanyaan umum tentang UNICEF",
  ctaLabel: "Lihat Selengkapnya",
  ctaHref: routes.faq,
};
