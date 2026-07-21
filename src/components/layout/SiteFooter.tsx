import Image from "next/image";
import Link from "next/link";
import {
  footerDonorCareEmail,
  footerDonorCarePhone,
  footerNavLinks,
  footerRegistration,
  footerSecurityBadges,
  footerSocialLinks,
  footerLogoSrc,
} from "@/lib/constants/navigation";

export function SiteFooter() {
  return (
    <footer className="bg-footer text-white">
      {/* Desktop: Figma auto-layout — pad 120×40, gap 40 */}
      <div className="mx-auto w-full max-w-landing px-7 py-10 lg:px-[120px]">
        {/* Mobile layout */}
        <div className="flex flex-col items-center text-center lg:hidden">
          <FooterBrand />
          <div className="mt-6 h-px w-full bg-white/40" />

          <FooterNavLinks className="mt-6 flex-col items-center gap-3" />

          <FooterContactCard className="mt-6 w-full max-w-sm" />

          <div className="mt-6 h-px w-full bg-white/40" />

          <p className="mt-6 max-w-sm text-xs leading-relaxed text-white/90">
            {footerRegistration}
          </p>

          <FooterSecurity className="mt-5 items-center" />
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_2.5fr_1fr] lg:items-start lg:gap-10">
          <div className="flex flex-col pr-0">
            <FooterBrand />
          </div>

          <div className="flex flex-col gap-10 border-x border-white/35 px-8 py-10 xl:px-10">
            <FooterNavLinks className="flex-row flex-wrap justify-center gap-x-8 gap-y-2" />
            <FooterContactCard />
          </div>

          <div className="flex flex-col gap-10 pl-0">
            <p className="text-sm leading-relaxed text-white/90">
              {footerRegistration}
            </p>
            <FooterSecurity />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterBrand() {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <Image
        src={footerLogoSrc}
        alt="UNICEF Indonesia — untuk setiap anak"
        width={129}
        height={65}
        className="h-16 w-auto brightness-0 invert md:h-20"
      />
      <div className="mt-5 flex items-center gap-4">
        {footerSocialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-white transition-opacity hover:opacity-80"
          >
            <SocialIcon name={social.label} />
          </a>
        ))}
      </div>
    </div>
  );
}

function FooterNavLinks({ className = "" }: { className?: string }) {
  return (
    <nav aria-label="Footer" className={`flex ${className}`}>
      {footerNavLinks.map((link) =>
        link.external ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-80 md:text-sm"
          >
            {link.label}
          </a>
        ) : (
          <Link
            key={link.label}
            href={link.href}
            className="text-xs font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-80 md:text-sm"
          >
            {link.label}
          </Link>
        ),
      )}
    </nav>
  );
}

function FooterContactCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-stretch gap-3 rounded-xl bg-white px-4 py-3 text-footer shadow-sm sm:gap-4 sm:px-5 sm:py-4 lg:gap-5 lg:rounded-2xl lg:px-6 lg:py-4 ${className}`}
    >
      <div className="flex shrink-0 flex-col justify-center text-left text-[10px] leading-[1.15] font-semibold tracking-wide uppercase sm:text-[11px]">
        <p>Hubungi</p>
        <p className="text-xs font-bold sm:text-sm">UNICEF</p>
        <p>Donor Care</p>
      </div>

      <div className="w-[2px] shrink-0 bg-footer/40" aria-hidden="true" />

      <div className="flex min-w-0 flex-col justify-center gap-1.5 text-left text-xs font-semibold sm:text-sm lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-6 lg:gap-y-1">
        <a
          href={`tel:${footerDonorCarePhone.replace(/\s/g, "")}`}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <PhoneIcon />
          <span>{footerDonorCarePhone}</span>
        </a>
        <a
          href={`mailto:${footerDonorCareEmail}`}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <MailIcon />
          <span className="truncate">{footerDonorCareEmail}</span>
        </a>
      </div>
    </div>
  );
}

function FooterSecurity({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <h3 className="text-center text-sm font-semibold text-white lg:text-left">
        Keamanan dan Privasi
      </h3>
      <div className="mt-3 flex flex-nowrap items-center justify-center gap-2 sm:gap-3 lg:justify-start lg:gap-4">
        {footerSecurityBadges.map((badge) => (
          <Image
            key={badge.src}
            src={badge.src}
            alt={badge.alt}
            width={140}
            height={64}
            className="h-5 w-auto shrink-0 object-contain brightness-0 invert sm:h-6 md:h-7 lg:h-8"
          />
        ))}
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.4 21 3 13.6 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "Facebook") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    );
  }

  if (name === "Instagram") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
