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

export const footerNavLinks: NavItem[] = [
  {
    label: "Situs UNICEF INDONESIA",
    href: "https://www.unicef.org/indonesia",
    external: true,
  },
  {
    label: "Situs UNICEF GLOBAL",
    href: "https://www.unicef.org",
    external: true,
  },
  { label: "LEGAL", href: routes.aboutUs },
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
  "Registrasi No: 05723/ D.5/05/2020 BAPPENAS - CPAP GOI - UNICEF 2021-2025";

export const footerSecurityBadges = [
  {
    src: "/images/footer/security-privacy/ssl-encryption.png",
    alt: "Secure SSL Encryption",
  },
  {
    src: "/images/footer/security-privacy/es-256-encryption.png",
    alt: "AES-256 Encryption",
  },
  {
    src: "/images/footer/security-privacy/iso-27001.png",
    alt: "ISO 27001",
  },
  {
    src: "/images/footer/security-privacy/pci-dss.png",
    alt: "PCI DSS Compliant",
  },
] as const;

export const footerLogoSrc = "/images/footer/unicef-icon-horizontal.png";
export const headerLogoSrc = "/images/branding/logo-unicef.png";
export const footerDonorCarePhone = "021 3111 1200";
export const footerDonorCareEmail = "donorlove@unicef.id";

export const footerCopyright =
  "© 2025 UNICEF Indonesia. All rights reserved.";
