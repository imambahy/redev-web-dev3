import type { FaqPageGroup } from "@/types/faq";
import { routes } from "@/lib/constants/routes";

export const faqPageContent = {
  hero: {
    imageSrc: "/images/faq/hero.png",
    titleLine1: "Jawaban lengkap",
    titleLine2Prefix: "seputar",
    titleHighlight: "UNICEF",
    subtitle:
      "Di balik setiap senyum anak Indonesia, ada komitmen tanpa henti dari Anda. Wall of Fame ini kami dedikasikan bagi para Pendekar Anak yang tak pernah lelah mendampingi langkah mereka.",
  },
  helpCta: {
    title: "Masih Punya Pertanyaan?",
    description:
      "Jangan ragu untuk menghubungi tim bantuan kami. Kami siap melayani Anda setiap hari kerja.",
    buttonLabel: "Hubungi Donor Care",
    href: routes.contactUs,
  },
} as const;

export const faqPageGroups: FaqPageGroup[] = [
  {
    id: "gelang-pendekar",
    label: "Gelang Pendekar Anak",
    layout: "flat",
    items: [
      {
        id: "gelang-how",
        question: "Bagaimana cara mendapatkan Gelang Pendekar Anak?",
        answer:
          "Gelang Pendekar Anak UNICEF tersedia secara eksklusif bagi Anda yang telah melakukan pendaftaran donasi rutin melalui situs donasi [unicef.id](https://unicef.id) mulai dari Rp150.000/bulan pada periode 23 April-29 Mei 2026.",
      },
      {
        id: "gelang-when",
        question:
          "Kapan saya bisa menerima Gelang Pendekar Anak setelah donasi berhasil?",
        answer:
          "Gelang Pendekar Anak akan dikirimkan ke alamat yang Anda daftarkan setelah donasi rutin pertama Anda berhasil diproses. Proses pengiriman membutuhkan waktu kurang lebih 2-4 minggu kerja, tergantung lokasi pengiriman.",
      },
      {
        id: "gelang-delay",
        question:
          "Bagaimana apabila Gelang Pendekar Anak belum saya terima lebih dari 30 hari?",
        answer: [
          "Jika Gelang Pendekar Anak belum Anda terima lebih dari 30 hari sejak donasi rutin pertama berhasil, silakan hubungi Tim Donor Care UNICEF melalui email **donorlove@unicef.id** atau telepon [021-31111200](tel:02131111200).",
          "Mohon siapkan informasi donasi Anda, seperti nama lengkap, alamat email, dan tanggal donasi, agar tim kami dapat membantu memeriksa status pengiriman.",
        ],
      },
      {
        id: "gelang-existing",
        question:
          "Saya sudah menjadi donatur rutin (Pendekar Anak) dan ingin mendapatkan Gelang Pendekar Anak, bagaimana caranya?",
        answer:
          "Bagi donatur rutin (Pendekar Anak) yang telah terdaftar sebelumnya, silakan hubungi Tim Donor Care UNICEF melalui **donorlove@unicef.id** untuk memverifikasi data donasi Anda dan mengonfirmasi alamat pengiriman Gelang Pendekar Anak.",
      },
    ],
  },
  {
    id: "seputar-donasi",
    label: "Seputar Donasi",
    layout: "nested",
    sections: [
      {
        id: "panduan-donasi",
        title: "Panduan dan Cara Donasi",
        icon: "donation",
        items: [
          {
            id: "payment-options",
            question:
              "Apa saja pilihan metode pembayaran yang tersedia di platform ini?",
            answer: [
              "Setiap donasi Anda akan sangat berarti untuk perkembangan anak-anak di Indonesia. Anda bisa berdonasi secara rutin (setiap bulan) sebagai \"Pendekar Anak\" ataupun melakukan satu kali donasi melalui:",
              "1. Situs [unicef.id](https://unicef.id)",
              "2. Jika ingin bertemu dengan kami secara langsung, silakan kunjungi tim UNICEF di salah satu lokasi ini",
            ],
          },
          {
            id: "monthly-registration",
            question:
              "Bagaimana langkah-langkah untuk mendaftar sebagai donor rutin bulanan?",
            answer: [
              "Untuk mendaftar sebagai donor rutin bulanan (Pendekar Anak), ikuti langkah berikut:",
              "1. Kunjungi situs [unicef.id](https://unicef.id) dan pilih program yang ingin Anda dukung.",
              "2. Pilih opsi donasi rutin bulanan dan tentukan nominal donasi Anda.",
              "3. Isi data pribadi Anda dengan lengkap dan benar.",
              "4. Pilih metode pembayaran dan selesaikan proses donasi.",
              "5. Anda akan menerima konfirmasi melalui email setelah donasi berhasil.",
            ],
          },
          {
            id: "proof-upload",
            question:
              "Apakah saya perlu mengunggah bukti transfer setelah melakukan donasi?",
            answer:
              "Tidak perlu. Jika Anda berdonasi melalui situs [unicef.id](https://unicef.id), sistem kami akan memproses donasi Anda secara otomatis dan mengirimkan konfirmasi melalui email. Anda hanya perlu mengunggah bukti transfer jika diminta secara khusus oleh Tim Donor Care.",
          },
          {
            id: "minimum-donation",
            question: "Berapa batas minimum donasi yang diperbolehkan?",
            answer:
              "Untuk donasi rutin bulanan (Pendekar Anak), minimum donasi adalah Rp150.000 per bulan. Untuk donasi satu kali, minimum donasi dapat berbeda tergantung program yang Anda pilih. Informasi nominal minimum akan ditampilkan pada halaman donasi.",
          },
        ],
      },
      {
        id: "status-akun",
        title: "Status dan Pengelolaan Akun",
        icon: "account",
        items: [
          {
            id: "donation-success",
            question:
              "Bagaimana saya tahu apakah donasi saya melalui website sudah berhasil diproses?",
            answer: [
              "Setelah Anda melakukan donasi melalui website kami, Anda akan menerima email konfirmasi bahwa donasi Anda telah berhasil. Jika Anda belum menerima email tersebut di kotak masuk (inbox), mohon periksa tab promosi atau spam pada email Anda, lalu pindahkan email ke kotak masuk (inbox) utama Anda sehingga Anda dapat menerima email kami di tab utama Anda ke depannya. Untuk donatur rutin (Pendekar Anak), Anda juga akan menerima ucapan selamat datang melalui telepon dari tim UNICEF.",
              "Untuk memastikan informasi terkait donasi serta informasi terbaru dari program UNICEF, pastikan Anda menyimpan alamat email kami **donorlove@unicef.id** agar email kami tidak masuk ke dalam folder spam.",
            ],
          },
          {
            id: "donation-report",
            question:
              "Bagaimana saya mendapatkan laporan atau update mengenai donasi yang diberikan?",
            answer: [
              "UNICEF Indonesia secara berkala mengirimkan update program dan laporan dampak kepada para donatur melalui email. Anda juga dapat mengakses informasi terbaru tentang program UNICEF di Indonesia melalui situs resmi kami.",
              "Untuk pertanyaan lebih lanjut mengenai donasi Anda, silakan hubungi Tim Donor Care melalui **donorlove@unicef.id**.",
            ],
          },
          {
            id: "monthly-payment",
            question:
              "Saya berdonasi rutin, bagaimana cara saya melakukan pembayaran donasi di bulan berikutnya?",
            answer: [
              "Untuk donatur rutin (Pendekar Anak) yang mendaftar melalui kartu kredit/debit, pembayaran donasi bulanan akan diproses secara otomatis setiap bulannya.",
              "Jika Anda menggunakan metode pembayaran lain, Tim Donor Care akan menghubungi Anda untuk menginformasikan cara pembayaran donasi rutin di bulan berikutnya. Pastikan data kontak Anda selalu terbaru.",
            ],
          },
          {
            id: "account-changes",
            question:
              "Saya sudah berdonasi rutin, bagaimana bila saya ingin melakukan perubahan pada donasi ataupun data pribadi?",
            answer:
              "Untuk melakukan perubahan nominal donasi, metode pembayaran, atau data pribadi, silakan hubungi Tim Donor Care UNICEF melalui email **donorlove@unicef.id** atau telepon [021-31111200](tel:02131111200). Tim kami akan membantu memproses perubahan sesuai kebutuhan Anda.",
          },
        ],
      },
      {
        id: "keamanan-teknis",
        title: "Keamanan, Teknis & Inisiatif",
        icon: "security",
        items: [
          {
            id: "data-security",
            question:
              "Apakah data pribadi yang saya berikan untuk donasi aman dan terlindungi?",
            answer: [
              "Proses donasi dan manajemen data di UNICEF Indonesia sudah didukung dengan sistem pembayaran yang tersertifikasi oleh PCI DSS (Payment Card Industry – Data Security Standard) serta menggunakan protokol koneksi https. Kami memastikan bahwa data Anda terlindungi dan aman jika Anda berdonasi baik melalui website, tim UNICEF secara langsung di lapangan, ataupun melalui telepon. Semua proses kami dirancang untuk memberikan standar keamanan tertinggi untuk data pribadi dan donasi Anda.",
              "Berdasarkan peraturan perlindungan data pribadi UNICEF, jika ada perubahan status donasi mohon tidak menginformasikan nomer kartu kredit Anda melalui email. Anda bisa menghubungi Tim Donor Care UNICEF melalui nomer telepon [021-31111200](tel:02131111200) untuk mengubah atau memperbarui nomer kartu kredit Anda.",
            ],
          },
          {
            id: "verify-staff",
            question:
              "Saya didatangi/dihubungi oleh seseorang yang mengaku sebagai staf UNICEF. Bagaimana saya dapat memverifikasi identitasnya?",
            answer: [
              "Staf resmi UNICEF Indonesia selalu dapat diidentifikasi melalui kartu identitas resmi UNICEF. Jika Anda diragukan, jangan memberikan informasi pribadi atau finansial.",
              "Untuk memverifikasi, hubungi Tim Donor Care UNICEF melalui [021-31111200](tel:02131111200) atau email **donorlove@unicef.id** sebelum melakukan transaksi apa pun.",
            ],
          },
          {
            id: "technical-issue",
            question:
              "Saya ingin berdonasi melalui situs UNICEF tetapi tautan (link) tidak bekerja dan/atau saya mendapatkan notifikasi transaksi gagal.",
            answer: [
              "Jika Anda mengalami kendala teknis saat berdonasi, coba langkah berikut: periksa koneksi internet Anda, gunakan browser terbaru, atau coba metode pembayaran lain.",
              "Jika masalah berlanjut, hubungi Tim Donor Care melalui **donorlove@unicef.id** atau [021-31111200](tel:02131111200) dengan menyertakan tangkapan layar error yang Anda alami.",
            ],
          },
          {
            id: "fundraising",
            question: "Dapatkah saya melakukan penggalangan dana tunai untuk UNICEF?",
            answer:
              "Ya, Anda dapat melakukan penggalangan dana untuk mendukung program UNICEF. Namun, penggalangan dana harus mengikuti pedoman dan persetujuan resmi dari UNICEF Indonesia. Silakan hubungi Tim Donor Care untuk informasi lebih lanjut.",
          },
          {
            id: "logo-usage",
            question:
              "Saat melakukan penggalangan dana, dapatkah saya menggunakan logo UNICEF?",
            answer:
              "Penggunaan logo UNICEF memerlukan persetujuan tertulis dari UNICEF Indonesia. Logo tidak boleh digunakan tanpa izin resmi. Hubungi Tim Donor Care melalui **donorlove@unicef.id** untuk mengajukan permohonan penggunaan logo.",
          },
        ],
      },
    ],
  },
  {
    id: "dampak-positif-donasi",
    label: "Dampak Positif Donasi",
    layout: "flat",
    items: [
      {
        id: "allocation",
        question: "Bagaimana UNICEF mengalokasikan donasi yang terkumpul?",
        answer: [
          "UNICEF Indonesia mengalokasikan pendanaan program nya di berbagai sektor program sebagai berikut:",
          "Untuk info lebih lanjut, silahkan cari tahu dampak positif donasi Anda pada tautan [Laporan Tahunan UNICEF Indonesia](https://www.unicef.org/indonesia/laporan-tahunan) berikut.",
        ],
        image: {
          src: "/images/faq/donation-allocation-chart.svg",
          alt: "Diagram pemanfaatan program UNICEF Indonesia",
        },
      },
      {
        id: "monthly-vs-once",
        question:
          "Apakah ada perbedaan donasi rutin bulanan dan donasi satu kali?",
        answer: [
          "Donasi rutin bulanan (Pendekar Anak) memberikan dukungan berkelanjutan yang memungkinkan UNICEF merencanakan program jangka panjang dengan lebih efektif. Donasi satu kali memberikan kontribusi langsung untuk program tertentu yang Anda pilih.",
          "Kedua jenis donasi sama-sama berdampak positif bagi anak-anak di Indonesia. Pilih cara berdonasi yang paling sesuai dengan kemampuan Anda.",
        ],
      },
      {
        id: "tax-deduction",
        question:
          "Apakah setiap donasi yang diberikan melalui UNICEF dapat digunakan sebagai pemotongan pajak?",
        answer:
          "Donasi kepada UNICEF Indonesia dapat digunakan sebagai pengurang penghasilan bruto sesuai peraturan perpajakan yang berlaku di Indonesia. Anda akan menerima bukti donasi resmi yang dapat digunakan untuk keperluan pelaporan pajak. Konsultasikan dengan konsultan pajak Anda untuk detail lebih lanjut.",
      },
    ],
  },
];
