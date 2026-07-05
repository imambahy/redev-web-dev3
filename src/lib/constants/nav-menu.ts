import { routes } from "@/lib/constants/routes";

export type NavMenuChild = {
  id: string;
  label: string;
  href: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type NavMenuItem = {
  id: string;
  label: string;
  href?: string;
  showProgramIcon?: boolean;
  children?: NavMenuChild[];
};

const programDescription =
  "Seluruh kerja UNICEF untuk anak-anak berjalan sepenuhnya dari donasi sukarela";

export const navMenuItems: NavMenuItem[] = [
  {
    id: "kampanye",
    label: "Kampanye",
    children: [
      {
        id: "kembali-sekolah",
        label: "Tentukan Langkah: Membantu Anak-Anak Kembali ke Sekolah",
        href: routes.campaign("kembali-sekolah"),
        description: programDescription,
        imageSrc: "/images/campaigns/kembali-sekolah.png",
        imageAlt: "Anak-anak di sekolah",
      },
      {
        id: "pemain-ke-12",
        label: "Jadilah Pemain ke-12 untuk Antar Indonesia Menuju Laga Dunia",
        href: routes.campaign("pemain-ke-12"),
        description: programDescription,
        imageSrc: "/images/campaigns/pemain-ke-12.png",
        imageAlt: "Anak-anak bermain sepak bola",
      },
      {
        id: "stop-kekerasan",
        label: "Bantu Anak Indonesia Menyelesaikan Pendidikannya",
        href: routes.campaign("stop-kekerasan"),
        description: programDescription,
        imageSrc: "/images/campaigns/stop-kekerasan.png",
        imageAlt: "Anak-anak Indonesia",
      },
    ],
  },
  {
    id: "dampak",
    label: "Dampak & Apresiasi",
    children: [
      {
        id: "upaya-kami",
        label: "Upaya Kami",
        href: routes.impact,
        description:
          "Program nyata UNICEF dalam melindungi hak anak-anak Indonesia.",
        imageSrc: "/images/impact/upaya-kami.png",
        imageAlt: "Upaya UNICEF",
      },
      {
        id: "dampak-positif",
        label: "Dampak Positif Donasi",
        href: routes.impact,
        description:
          "Cerita perubahan hidup anak-anak berkat kebaikan Anda.",
        imageSrc: "/images/impact/dampak-positif.png",
        imageAlt: "Dampak positif donasi",
      },
      {
        id: "donor-wall",
        label: "Donor Wall",
        href: routes.donorWall,
        description:
          "Apresiasi dan ruang penghargaan bagi para donor setia.",
        imageSrc: "/images/donor-wall/hero.png",
        imageAlt: "Donor wall",
      },
    ],
  },
  {
    id: "panduan-donasi",
    label: "Panduan Donasi",
    href: routes.donationGuide,
  },
  {
    id: "faq",
    label: "Pusat Bantuan",
    children: [
      {
        id: "faq-list",
        label: "FAQ",
        href: routes.faq,
        description:
          "Jawaban cepat untuk berbagai pertanyaan umum seputar Donasi",
        imageSrc: "/images/faq/nav-faq.png",
        imageAlt: "FAQ",
      },
      {
        id: "hubungi-kami",
        label: "Hubungi Kami",
        href: routes.contactUs,
        description:
          "Hubungi tim kami untuk bantuan, saran, atau kendala donasi.",
        imageSrc: "/images/faq/nav-contact.png",
        imageAlt: "Hubungi kami",
      },
    ],
  },
];
