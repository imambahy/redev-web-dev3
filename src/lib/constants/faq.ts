import type { FaqCategory } from "@/types/faq";
import { routes } from "@/lib/constants/routes";

export const faqCategories: FaqCategory[] = [
  {
    id: "gelang-pendekar",
    label: "Gelang Pendekar Anak",
    items: [
      {
        id: "gelang-how",
        question: "Bagaimana cara mendapatkan Gelang Pendekar Anak?",
        answer:
          "Gelang Pendekar Anak UNICEF tersedia secara eksklusif bagi Anda yang telah melakukan pendaftaran donasi rutin melalui situs donasi unicef.id mulai dari Rp150.000/bulan.",
      },
      {
        id: "gelang-when",
        question:
          "Kapan saya bisa menerima Gelang Pendekar Anak setelah donasi berhasil?",
        answer:
          "Gelang Pendekar Anak akan dikirimkan ke alamat yang Anda daftarkan setelah donasi rutin pertama Anda berhasil diproses. Proses pengiriman membutuhkan waktu kurang lebih 2-4 minggu kerja.",
      },
      {
        id: "gelang-delay",
        question:
          "Bagaimana apabila Gelang Pendekar Anak belum saya terima lebih dari 30 hari?",
        answer:
          "Jika Gelang belum diterima lebih dari 30 hari, silakan hubungi Tim Donor Care UNICEF melalui email donorlove@unicef.id atau telepon 021-31111200.",
      },
      {
        id: "gelang-existing",
        question:
          "Saya sudah menjadi donatur rutin (Pendekar Anak) dan ingin mendapatkan Gelang Pendekar Anak, bagaimana caranya?",
        answer:
          "Silakan hubungi Tim Donor Care untuk informasi kelayakan dan cara mendapatkan Gelang Pendekar Anak sebagai donatur rutin yang sudah terdaftar.",
      },
    ],
  },
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
      },
    ],
  },
];

export const faqSectionContent = {
  title: "Temukan jawaban untuk pertanyaan umum tentang UNICEF",
  ctaLabel: "Lihat Selengkapnya",
  ctaHref: routes.faq,
};
