import { navMenuItems } from "./nav-menu";
import { routes } from "./routes";

export type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  external?: boolean;
};

export const mainNavItems: NavItem[] = navMenuItems.map((item) => ({
  label: item.label,
  href: item.href ?? `/${item.id}`,
  hasDropdown: Boolean(item.children?.length),
}));

export type FooterLinkGroup = {
  title: string;
  links: NavItem[];
};

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Kampanye",
    links: [
      { label: "Home", href: routes.home },
      { label: "Donation Guide", href: routes.donationGuide },
      { label: "About Us", href: routes.aboutUs },
      { label: "FAQ", href: routes.faq },
      { label: "Contact Us", href: routes.contactUs },
    ],
  },
  {
    title: "Dampak & Apresiasi",
    links: [
      { label: "Upaya Kami", href: routes.impact },
      { label: "Dampak Positif Donasi", href: routes.impact },
      { label: "Donor Aktif", href: routes.donorWall },
      { label: "FAQ", href: routes.faq },
      { label: "Contact Us", href: routes.contactUs },
    ],
  },
  {
    title: "Pusat Bantuan",
    links: [
      { label: "Pertanyaan Umum/FAQ", href: routes.faq },
      { label: "Panduan Donasi", href: routes.donationGuide },
      { label: "Hubungi Kami", href: routes.contactUs },
    ],
  },
];

export const footerBottomLinks: NavItem[] = [
  { label: "Tentang UNICEF Indonesia", href: routes.aboutUs },
  { label: "FAQ", href: routes.faq },
  { label: "Legal", href: routes.aboutUs },
  {
    label: "UNICEF Global Site",
    href: "https://www.unicef.org",
    external: true,
  },
];

export const footerSocialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/unicefindonesia",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/unicefindonesia",
  },
  {
    label: "X",
    href: "https://x.com/unicefindonesia",
  },
] as const;

export const footerRegistration =
  "Registrasi No: 05723/D.5/05/2020 BAPPENAS - CPAP GOI - UNICEF 2021-2025";

export const footerSecurityBadges = [
  {
    src: "/images/footer/security-privacy/ssl-encryption.png",
    alt: "SSL Encryption",
  },
  {
    src: "/images/footer/security-privacy/pci-dss.png",
    alt: "PCI DSS",
  },
  {
    src: "/images/footer/security-privacy/iso-27001.png",
    alt: "ISO 27001",
  },
  {
    src: "/images/footer/security-privacy/es-256-encryption.png",
    alt: "AES 256 Encryption",
  },
] as const;

export const footerLogoSrc = "/images/branding/logo-footer.png";
export const headerLogoSrc = "/images/branding/logo-unicef.png";
export const footerDonorCarePhone = "021 3111 1200";

export const footerCopyright =
  "© 2025 UNICEF Indonesia. All rights reserved.";
