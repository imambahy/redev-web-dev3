import Image from "next/image";
import Link from "next/link";
import {
  footerBottomLinks,
  footerDonorCarePhone,
  footerLinkGroups,
  footerLogoSrc,
  footerRegistration,
  footerSecurityBadges,
  footerSocialLinks,
} from "@/lib/constants/navigation";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="bg-footer text-white">
      <Container className="py-10 md:py-12 lg:px-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))_auto] lg:gap-6 xl:gap-10">
          <div>
            <Image
              src={footerLogoSrc}
              alt="UNICEF Indonesia"
              width={180}
              height={56}
              className="h-12 w-auto"
            />
            <div className="mt-4 flex items-center gap-3">
              {footerSocialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-8 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
                >
                  <SocialIcon name={social.label} />
                </a>
              ))}
            </div>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/80">
              {footerRegistration}
            </p>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sm:col-span-2 lg:col-auto lg:justify-self-end">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide">
              Keamanan dan Privasi
            </h3>
            <div className="grid w-max max-w-full grid-cols-2 gap-x-3 gap-y-3">
              {footerSecurityBadges.map((badge) => (
                <Image
                  key={badge.src}
                  src={badge.src}
                  alt={badge.alt}
                  width={140}
                  height={64}
                  className="h-8 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/20 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Image
              src="/images/footer/hubungi-kami.png"
              alt="Hubungi UNICEF Donor Care"
              width={220}
              height={64}
              className="h-12 w-auto object-contain md:h-14"
            />
            <a
              href={`tel:${footerDonorCarePhone.replace(/\s/g, "")}`}
              className="text-lg font-bold text-white hover:underline md:text-xl"
            >
              {footerDonorCarePhone}
            </a>
          </div>

          <nav
            aria-label="Footer bawah"
            className="flex flex-wrap gap-x-4 gap-y-2 lg:justify-end"
          >
            {footerBottomLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-white md:text-sm"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-white md:text-sm"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "Facebook") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    );
  }

  if (name === "Instagram") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
