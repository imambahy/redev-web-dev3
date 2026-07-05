import type { PaymentTransaction } from "@/types/payment";
import { campaignPaymentPath, routes, type PaymentStep } from "@/lib/constants/routes";

export const mockPaymentTransaction: PaymentTransaction = {
  id: "TRX_20250516153839N1163047Q",
  amount: 500_000,
  isMonthly: true,
  donorName: "Freyza Kusuma",
  transactionDate: "20 Sep 2025",
  dueDate: "26 September 2025 pukul 14:38",
  status: "pending",
  virtualAccount: "8808015813616175",
  accountName: "XDT-UNICEF Indonesia",
};

export const paymentProcessingContent = {
  title: "Menyiapkan Pembayaran Anda...",
  description:
    "Mohon tunggu sebentar, kami sedang menghubungkan Anda ke halaman pembayaran. Mohon tidak menutup halaman ini.",
  illustrationSrc: "/images/payment/processing-character.png",
};

export const paymentSuccessContent = {
  photoSrc: "/images/payment/success-photo.png",
  title: "Terima Kasih,",
  message:
    "Donasi berhasil!, Terima kasih telah membantu anak-anak Indonesia. Dukungan Anda membantu memberikan gizi, pendidikan, dan perlindungan bagi anak.",
  accountCard: {
    title: "Pantau dampak donasi anda",
    description:
      "Buat akun untuk melihat riwayat donasi, perkembangan program, dan dampak bantuan yang Anda berikan",
    buttonLabel: "Buat Akun",
    href: routes.donorZone,
  },
  shareCard: {
    title: "Bagikan Donasi Mu",
    description:
      "Teruslah menjadi bagian dari perubahan dan mari sebarkan semangat berbagi, ajak keluarga & teman untuk ikut berdonasi",
  },
  feedbackCard: {
    title: "Feedback Anda",
    description:
      "Beritahu kami pengalaman Anda mencoba menyalurkan donasi melalui website donasi UNICEF Indonesia dengan memberi bintang di bawah",
    supportEmail: "donorlove@unicef.id",
  },
  taxDisclaimer:
    "Sesuai dengan regulasi pemerintah serta badan perpajakan negara Indonesia, donasi kepada UNICEF Indonesia tidak bisa digunakan untuk pemotongan pajak.",
};

export const paymentFailedContent = {
  title: "Pembayaran Belum Berhasil",
  description:
    "Silakan coba lagi atau gunakan metode pembayaran lain untuk melanjutkan donasi Anda.",
  illustrationSrc: "/images/payment/failed-illustration.png",
  transactionDate: "15 Jun 2026, 13:12 WIB",
  statusLabel: "Belum Berhasil",
  helpTitle: "Butuh Bantuan?",
  helpDescription:
    "Jika Anda mengalami kendala pembayaran atau saldo sudah terpotong, silakan hubungi Donor Care UNICEF. Kami siap membantu menyelesaikan donasi Anda.",
  helpButtonLabel: "Hubungi Donor Care",
  helpHref: routes.contactUs,
};

export const bniPaymentContent = {
  deadline: "23 Mei 2025 pukul 14:38",
  tabs: ["Perbankan Seluler", "ATM", "iPerbankan"] as const,
  securityNotes: [
    "Pastikan nama akun tujuan adalah UNICEF Indonesia.",
    "Masukkan nominal hingga digit terakhir agar verifikasi otomatis.",
  ],
  instructions: {
    login: {
      title: "Masuk ke Akun Anda :",
      steps: [
        "Langkah 1. Buka BNI Mobile Banking dari ponsel Anda",
        "Langkah 2. Masukkan ID Pengguna dan Kata Sandi Anda",
        "Langkah 3. Pilih menu \"Transfer\"",
      ],
    },
    payment: {
      title: "Rincian Pembayaran :",
      steps: [
        "Langkah 1. Pilih menu \"Penyelesaian Tagihan Akun Virtual\" dan kemudian pilih akun debit.",
        "Langkah 2. Masukkan Nomor Akun Virtual Anda 8808015205362336 pada menu 'Input New'",
        "Langkah 3. Jumlah yang ditagih akan ditampilkan di layar",
        "Langkah 4. Konfirmasi transaksi dan masukkan kata sandi Anda",
      ],
    },
    success: {
      title: "Transaksi Berhasil :",
      steps: [
        "Langkah 1. Transaksi Anda telah selesai",
        "Langkah 2. Setelah transaksi pembayaran selesai, faktur ini akan diperbarui secara otomatis. Ini mungkin memerlukan waktu hingga 5 menit.",
      ],
    },
  },
};

export const qrPaymentContent = {
  dana: {
    methodLabel: "Dana",
    instruction:
      "Silahkan lengkapi donasi Anda sebesar Rp. 500.000 dengan cara scan QR Code di bawah ini melalui aplikasi Dana anda",
    steps: ["Buka Dana", "Scan QR", "Selesaikan Pembayaran"],
    showPhoneInput: true,
    buttonLabel: "Mulai Hari Ini",
  },
  shopeepay: {
    methodLabel: "ShopeePay",
    instruction:
      "Silahkan lengkapi donasi Anda sebesar Rp. 500.000 dengan cara scan QR Code di bawah ini melalui aplikasi ShopeePay anda",
    steps: ["Buka ShopeePay", "Scan QR", "Selesaikan Pembayaran"],
    showPhoneInput: false,
    buttonLabel: "Mulai Hari Ini",
  },
} as const;

export const donationPaymentMethods = [
  { id: "bni", label: "Virtual Account BNI" },
  { id: "dana", label: "DANA" },
  { id: "shopeepay", label: "ShopeePay" },
] as const;

export type DonationPaymentMethodId =
  (typeof donationPaymentMethods)[number]["id"];

export const donationPaymentCategories = [
  { id: "credit-card", label: "Credit Card" },
  { id: "debit-card", label: "Debit Card" },
  { id: "ewallet", label: "eWallet" },
] as const;

export type DonationPaymentCategoryId =
  (typeof donationPaymentCategories)[number]["id"];

export const donationPaymentOptions: Record<
  DonationPaymentCategoryId,
  { id: string; label: string; route: DonationPaymentMethodId }[]
> = {
  "credit-card": [
    { id: "visa", label: "Visa", route: "bni" },
    { id: "mastercard", label: "Mastercard", route: "bni" },
  ],
  "debit-card": [
    { id: "mandiri", label: "Bank Mandiri", route: "bni" },
    { id: "bri", label: "Bank BRI", route: "bni" },
    { id: "jenius", label: "Jenius", route: "bni" },
  ],
  ewallet: [
    { id: "dana", label: "DANA", route: "dana" },
    { id: "shopeepay", label: "ShopeePay", route: "shopeepay" },
  ],
};

export function getPaymentPath(campaignId: string, step: PaymentStep) {
  return campaignPaymentPath(campaignId, step);
}
