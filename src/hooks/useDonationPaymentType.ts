"use client";

import { useEffect, useState } from "react";
import type { DonationType } from "@/types/campaign";

function readDonationType(): DonationType | null {
  try {
    for (const key of ["donation-form", "donation-draft"] as const) {
      const raw = sessionStorage.getItem(key);
      if (!raw) continue;
      const draft = JSON.parse(raw) as { donationType?: DonationType };
      if (draft.donationType === "bulanan" || draft.donationType === "satu-kali") {
        return draft.donationType;
      }
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Resolves monthly vs one-time from donation session data.
 * Defaults to monthly (Pendekar Anak) when unset.
 */
export function useDonationPaymentType(
  fallback: DonationType = "bulanan",
): DonationType {
  const [donationType, setDonationType] = useState<DonationType>(fallback);

  useEffect(() => {
    const stored = readDonationType();
    if (stored) setDonationType(stored);
  }, []);

  return donationType;
}
