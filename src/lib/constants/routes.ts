export const routes = {
  home: "/",
  contactUs: "/contact-us",
  campaigns: "/campaigns",
  campaign: (id: string) => `/campaigns/${id}`,
  donationGuide: "/donation-guide",
  faq: "/faq",
  impact: "/impact",
  donate: "/donate",
  donorWall: "/donor-wall",
  donorZone: "/donor-zone",
  aboutUs: "/about-us",
} as const;

export type PaymentStep =
  | "processing"
  | "success"
  | "failed"
  | "bni"
  | "dana"
  | "shopeepay";

export function campaignPaymentPath(campaignId: string, step: PaymentStep) {
  return `/campaigns/${campaignId}/payment/${step}`;
}
