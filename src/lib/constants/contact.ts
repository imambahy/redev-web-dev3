export const contactPageContent = {
  hero: {
    imageSrc: "/images/contact-us/hero.png",
    title: "Hubungi Kami",
    subtitle:
      "Ada pertanyaan atau ingin tahu lebih lanjut? Kami siap membantu",
  },
  info: {
    title: "Hubungi Donor Love UNICEF Indonesia",
    description:
      "Sampaikan pesan Anda dan tim kami akan merespons dalam 2x24 jam.",
    items: [
      {
        id: "email",
        label: "Email",
        value: "donorlove@unicef.id",
        href: "mailto:donorlove@unicef.id",
      },
      {
        id: "donor-care",
        label: "Donor Care",
        value: "021-3111 1200",
        href: "tel:02131111200",
      },
      {
        id: "whatsapp",
        label: "Nomor Whatsapp 2",
        value: "0821 2312 1602",
        href: "https://wa.me/6282123121602",
      },
      {
        id: "address",
        label: "Alamat",
        value:
          "World Trade Center 6, Lantai 10\nJl. Jenderal Sudirman Kav. 31\nJakarta 12920 Indonesia",
      },
    ],
    hours: {
      title: "Jam Operasional",
      schedule:
        "Senin - Jumat pukul 09.00 - 16.00 (Kecuali hari libur nasional)",
    },
  },
  form: {
    title: "Kirim Pesan",
    submitLabel: "Kirim Pesan",
  },
} as const;
