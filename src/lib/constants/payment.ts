import type { PaymentTransaction } from "@/types/payment";
import type { DonationType } from "@/types/campaign";
import { campaignPaymentPath, routes, type PaymentStep } from "@/lib/constants/routes";

export const mockPaymentTransaction: PaymentTransaction = {
  id: "TRX_20250516153839N1163047Q",
  amount: 500_000,
  isMonthly: true,
  donorName: "Freyza Kusuma",
  transactionDate: "20 Sep 2026",
  dueDate: "26 September 2025 pukul 14:38",
  status: "pending",
  virtualAccount: "8808015813616175",
  accountName: "XDT-UNICEF Indonesia",
};

const sharedPaymentCopy = {
  processingDescription:
    "Mohon tunggu sebentar, kami sedang menghubungkan Anda ke halaman pembayaran. Mohon tidak menutup halaman ini.",
  failedDescription:
    "Silakan coba lagi atau gunakan metode pembayaran lain untuk melanjutkan donasi Anda.",
  failedTransactionDate: "15 Jun 2026, 13:12 WIB",
  statusLabel: "Belum Berhasil",
  helpTitle: "Butuh Bantuan?",
  helpDescription:
    "Jika Anda mengalami kendala pembayaran atau saldo sudah terpotong, silakan hubungi Donor Care UNICEF. Kami siap membantu menyelesaikan donasi Anda.",
  helpButtonLabel: "Hubungi Donor Care",
  helpHref: routes.contactUs,
  successMessage:
    "Terima kasih telah membantu anak-anak Indonesia. Dukungan Anda membantu memberikan gizi, pendidikan, dan perlindungan bagi anak.",
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

export function getPaymentProcessingContent(donationType: DonationType) {
  const isMonthly = donationType === "bulanan";
  return {
    titleLead: "Menyiapkan",
    titleRest: "Pembayaran Anda...",
    description: sharedPaymentCopy.processingDescription,
    illustrationSrc: isMonthly
      ? "/images/payment/monthly-waiting.svg"
      : "/images/payment/onetime-waiting.svg",
    /** Monthly uses full-title primary; one-time splits lead/rest colors */
    emphasizeFullTitle: isMonthly,
  };
}

export function getPaymentFailedContent(donationType: DonationType) {
  return {
    title: "Pembayaran Belum Berhasil",
    description: sharedPaymentCopy.failedDescription,
    illustrationSrc:
      donationType === "bulanan"
        ? "/images/payment/monthly-failed.svg"
        : "/images/payment/onetime-failed.svg",
    transactionDate: sharedPaymentCopy.failedTransactionDate,
    statusLabel: sharedPaymentCopy.statusLabel,
    helpTitle: sharedPaymentCopy.helpTitle,
    helpDescription: sharedPaymentCopy.helpDescription,
    helpButtonLabel: sharedPaymentCopy.helpButtonLabel,
    helpHref: sharedPaymentCopy.helpHref,
  };
}

export function getPaymentSuccessContent(donationType: DonationType) {
  const isMonthly = donationType === "bulanan";
  return {
    isMonthly,
    photoSrc: "/images/campaigns/story-mother-child.png",
    illustrationSrc: isMonthly
      ? "/images/payment/success-thankyou.svg"
      : "/images/payment/onetime-success.svg",
    title: "Terima Kasih,",
    message: sharedPaymentCopy.successMessage,
    primaryAction: isMonthly
      ? {
          title: "Pantau dampak donasi anda",
          description:
            "Buat akun untuk melihat riwayat donasi, perkembangan program, dan dampak bantuan yang Anda berikan",
          buttonLabel: "Daftar Akun",
          href: routes.donorZone,
        }
      : {
          title: "Lanjutkan dampak donasi Anda",
          description:
            "Ubah donasi sekali menjadi donasi rutin dan bantu lebih banyak penerima manfaat secara berkelanjutan.",
          buttonLabel: "Jadi Pendekar Anak",
          href: routes.home,
        },
    showCertificateButton: !isMonthly,
    certificateLabel: "Download E-sertifikat",
    shareCard: sharedPaymentCopy.shareCard,
    feedbackCard: sharedPaymentCopy.feedbackCard,
    taxDisclaimer: sharedPaymentCopy.taxDisclaimer,
  };
}

/** @deprecated Prefer getPayment* helpers with donation type */
export const paymentProcessingContent = getPaymentProcessingContent("bulanan");
export const paymentFailedContent = getPaymentFailedContent("bulanan");
export const paymentSuccessContent = getPaymentSuccessContent("bulanan");

export const bniPaymentContent = {
  deadline: "23 Mei 2025 pukul 14:38",
  logoSrc: "/images/donation-guide/banks/bni.png",
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
    steps: ["Buka Dana", "Scan QR", "Selesaikan Pembayaran"],
    buttonLabel: "Mulai Hari Ini",
  },
  shopeepay: {
    methodLabel: "ShopeePay",
    steps: ["Buka ShopeePay", "Scan QR", "Selesaikan Pembayaran"],
    buttonLabel: "Mulai Hari Ini",
  },
} as const;

export const qrCodeSrc = "/images/payment/qrcode-dummy.svg";

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
  {
    id: string;
    label: string;
    route: DonationPaymentMethodId;
    logoSrc: string;
  }[]
> = {
  "credit-card": [
    {
      id: "visa",
      label: "Visa",
      route: "bni",
      logoSrc: "/images/payment/logos/visa.svg",
    },
    {
      id: "mastercard",
      label: "Mastercard",
      route: "bni",
      logoSrc: "/images/payment/logos/mastercard.svg",
    },
  ],
  "debit-card": [
    {
      id: "mandiri",
      label: "Bank Mandiri",
      route: "bni",
      logoSrc: "/images/payment/logos/mandiri.svg",
    },
    {
      id: "bri",
      label: "Bank BRI",
      route: "bni",
      logoSrc: "/images/payment/logos/bri.svg",
    },
    {
      id: "jenius",
      label: "Jenius",
      route: "bni",
      logoSrc: "/images/payment/logos/jenius.svg",
    },
  ],
  ewallet: [
    {
      id: "dana",
      label: "DANA",
      route: "dana",
      logoSrc: "/images/payment/logos/dana.svg",
    },
    {
      id: "gopay",
      label: "GOPAY",
      route: "dana",
      logoSrc: "/images/payment/logos/gopay.svg",
    },
    {
      id: "ovo",
      label: "OVO",
      route: "dana",
      logoSrc: "/images/payment/logos/ovo.svg",
    },
    {
      id: "shopeepay",
      label: "ShopeePay",
      route: "shopeepay",
      logoSrc: "/images/payment/logos/shopeepay.svg",
    },
  ],
};

export function getPaymentPath(campaignId: string, step: PaymentStep) {
  return campaignPaymentPath(campaignId, step);
}

export function getMockTransaction(donationType: DonationType): PaymentTransaction {
  return {
    ...mockPaymentTransaction,
    isMonthly: donationType === "bulanan",
  };
}
