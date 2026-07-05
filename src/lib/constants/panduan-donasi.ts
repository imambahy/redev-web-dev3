import { routes } from "@/lib/constants/routes";

export type DonationMethodId =
  | "online"
  | "transfer"
  | "lapangan"
  | "telepon";

export type DonationMethod = {
  id: DonationMethodId;
  label: string;
  description: string;
  icon: "laptop" | "bank" | "map" | "phone";
};

export type DonationStep = {
  step: number;
  title: string;
  description: string;
};

export type BankAccount = {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  currency: "IDR" | "USD";
  address: string;
  swiftCode: string;
  logoSrc: string;
};

export type PhoneContact = {
  id: string;
  label: string;
  number: string;
  href: string;
  type: "donor-care" | "whatsapp" | "phone";
  actionLabel?: string;
};

export type FieldLocation = {
  id: string;
  city: string;
  venue: string;
  address: string;
  startDate: string;
  endDate: string;
  region: string;
  status: "ongoing" | "upcoming";
};

export const panduanDonasiPageContent = {
  hero: {
    imageSrc: "/images/donation-guide/hero.png",
    titleLine1: "Panduan",
    titleLine2: "Donasi",
    subtitle:
      "Donasi Anda akan membantu meningkatkan taraf hidup anak-anak di Indonesia. Anda dapat menyalurkan bantuan UNICEF melalui cara-cara berikut.",
  },
  methods: [
    {
      id: "online",
      label: "Donasi Online",
      description:
        "Berdonasi secara daring adalah cara paling cepat untuk mewujudkan kepedulian Anda. Ikuti empat langkah berikut untuk menyelesaikan proses donasi.",
      icon: "laptop",
    },
    {
      id: "transfer",
      label: "Transfer ke Rekening UNICEF",
      description:
        "Donasi Anda akan langsung masuk ke rekening resmi UNICEF Indonesia dan dikelola secara transparan untuk mendukung program-program anak di seluruh negeri.",
      icon: "bank",
    },
    {
      id: "lapangan",
      label: "Bertemu langsung dengan tim UNICEF di lapangan",
      description:
        "Anda dapat bertemu perwakilan UNICEF di berbagai lokasi publik untuk mengetahui lebih lanjut tentang program kami dan menyalurkan donasi secara langsung.",
      icon: "map",
    },
    {
      id: "telepon",
      label: "Melalui Telepon",
      description:
        "Hubungi tim UNICEF untuk mendapatkan panduan lengkap dalam menyelesaikan proses donasi, baik donasi satu kali maupun donasi rutin bulanan.",
      icon: "phone",
    },
  ] satisfies DonationMethod[],
  onlineSteps: [
    {
      step: 1,
      title: "Pilih Donasi",
      description:
        "Tentukan jenis donasi yang ingin kamu lakukan, sekali atau rutin setiap bulan.",
    },
    {
      step: 2,
      title: "Isi Data Diri",
      description:
        "Masukkan informasi dasar untuk melanjutkan proses donasi dengan aman.",
    },
    {
      step: 3,
      title: "Pembayaran",
      description:
        "Pilih metode pembayaran yang paling nyaman dan selesaikan donasi kamu.",
    },
    {
      step: 4,
      title: "Zona Donor",
      description:
        "Lihat riwayat donasi dan ikuti perkembangan kontribusi kamu.",
    },
  ] satisfies DonationStep[],
  transfer: {
    intro: "Silahkan transfer ke rekening bank kami di bawah ini",
    accounts: [
      {
        id: "bca",
        bankName: "Bank Central Asia",
        accountNumber: "035 311 2888",
        accountName: "UNICEF",
        currency: "IDR",
        address:
          "KCU Sudirman Chase Plaza - 1st Floor Jl. Jend. Sudirman Kav 21 Jakarta 12920",
        swiftCode: "SCBLIDJXXXX",
        logoSrc: "/images/donation-guide/banks/bca.png",
      },
      {
        id: "mandiri",
        bankName: "Bank Mandiri",
        accountNumber: "1020001230678",
        accountName: "UNICEF (United Nations Children's Fund)",
        currency: "IDR",
        address:
          "WTC Cash Office WTC Building I - 1st Floor Jl. Jend. Sudirman Kav.31 Jakarta 12920",
        swiftCode: "SCBLIDJXXXX",
        logoSrc: "/images/donation-guide/banks/mandiri.png",
      },
      {
        id: "bni",
        bankName: "Bank BNI",
        accountNumber: "304494278",
        accountName: "UNICEF",
        currency: "IDR",
        address:
          "WTC Cash Office WTC Building I - 1st Floor Jl. Jend. Sudirman Kav.31 Jakarta 12920",
        swiftCode: "SCBLIDJXXXX",
        logoSrc: "/images/donation-guide/banks/bni.png",
      },
      {
        id: "standard-chartered-idr",
        bankName: "Standard Chartered",
        accountNumber: "306 0882788 3",
        accountName: "United Nations Children's Fund",
        currency: "IDR",
        address:
          "Standard Chartered Bank Tower Jl. Prof. Dr. Satrio No.164 Jakarta 12930, Indonesia",
        swiftCode: "SCBLIDJXXXX",
        logoSrc: "/images/donation-guide/banks/standard-chartered.png",
      },
      {
        id: "standard-chartered-usd",
        bankName: "Standard Chartered",
        accountNumber: "306 0882790 5",
        accountName: "United Nations Children's Fund",
        currency: "USD",
        address:
          "Standard Chartered Bank Tower Jl. Prof. Dr. Satrio No.164 Jakarta 12930, Indonesia",
        swiftCode: "SCBLIDJXXXX",
        logoSrc: "/images/donation-guide/banks/standard-chartered.png",
      },
    ] satisfies BankAccount[],
  },
  telepon: {
    intro:
      "Tim Donor Care UNICEF siap membantu Anda menyelesaikan proses donasi melalui telepon atau WhatsApp pada jam operasional Senin–Jumat, 09.00–16.00 WIB.",
    contacts: [
      {
        id: "donor-care",
        label: "Donor Care",
        number: "021-3111 1200",
        href: "tel:02131111200",
        type: "donor-care",
        actionLabel: "Hubungi",
      },
      {
        id: "whatsapp-1",
        label: "WhatsApp",
        number: "0811-8888-999",
        href: "https://wa.me/628118888999",
        type: "whatsapp",
      },
      {
        id: "whatsapp-2",
        label: "WhatsApp",
        number: "0812-3456-7890",
        href: "https://wa.me/6281234567890",
        type: "whatsapp",
      },
      {
        id: "outbound-1",
        label: "Nomor Sambungan Keluar",
        number: "021-3111 1201",
        href: "tel:02131111201",
        type: "phone",
      },
      {
        id: "outbound-2",
        label: "Nomor Sambungan Keluar",
        number: "021-3111 1202",
        href: "tel:02131111202",
        type: "phone",
      },
    ] satisfies PhoneContact[],
  },
  lapangan: {
    searchPlaceholder: "Cari lokasi",
    defaultRegion: "Semua Wilayah",
    regionOptions: [
      "Semua Wilayah",
      "Jawa Barat",
      "DKI Jakarta",
      "Jawa Tengah",
      "Jawa Timur",
      "Bali",
    ],
    locations: [
      {
        id: "surabaya-superindo-1",
        city: "Surabaya",
        venue: "Superindo AR Hakim",
        address:
          "Jl. Arief Rahman Hakim No.169-171, Keputih, Kec. Sukolilo, Kota SBY, Jawa Timur 60111",
        startDate: "6 Apr 2026",
        endDate: "12 Apr 2026",
        region: "Jawa Timur",
        status: "ongoing",
      },
      {
        id: "surabaya-superindo-2",
        city: "Surabaya",
        venue: "Superindo AR Hakim",
        address:
          "Jl. Arief Rahman Hakim No.169-171, Keputih, Kec. Sukolilo, Kota SBY, Jawa Timur 60111",
        startDate: "6 Apr 2026",
        endDate: "12 Apr 2026",
        region: "Jawa Timur",
        status: "ongoing",
      },
      {
        id: "surabaya-superindo-3",
        city: "Surabaya",
        venue: "Superindo AR Hakim",
        address:
          "Jl. Arief Rahman Hakim No.169-171, Keputih, Kec. Sukolilo, Kota SBY, Jawa Timur 60111",
        startDate: "6 Apr 2026",
        endDate: "12 Apr 2026",
        region: "Jawa Timur",
        status: "ongoing",
      },
      {
        id: "bandung-superindo",
        city: "Bandung",
        venue: "Superindo Pasteur",
        address: "Jl. Dr. Djunjunan No. 143, Bandung, Jawa Barat",
        startDate: "10 Jun 2026",
        endDate: "10 Jul 2026",
        region: "Jawa Barat",
        status: "upcoming",
      },
      {
        id: "jakarta-matahari",
        city: "Jakarta",
        venue: "Matahari Department Store Senayan City",
        address: "Jl. Asia Afrika Lot 19, Jakarta Pusat",
        startDate: "5 Jun 2026",
        endDate: "5 Jul 2026",
        region: "DKI Jakarta",
        status: "ongoing",
      },
    ] satisfies FieldLocation[],
    partners: {
      title: "Lokasi Penggalangan Dana Tetap Maka Didukung Oleh:",
      names: ["Super Indo", "Matahari"],
    },
  },
  ctaCard: {
    title: "Mulai perjalanan Anda sebagai Pendekar Anak sekarang",
    buttonLabel: "Mulai Hari Ini",
    href: routes.donate,
    imageSrc: "/images/donation-guide/cta-card.png",
  },
} as const;
