import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UNICEF Indonesia — Donasi",
  description:
    "Dukung anak-anak Indonesia melalui donasi UNICEF. Pilih campaign, lihat dampak, dan jadilah Pendekar Anak.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${notoSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
