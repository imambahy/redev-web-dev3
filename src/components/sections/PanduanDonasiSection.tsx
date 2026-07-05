"use client";

import { useState } from "react";
import {
  panduanDonasiPageContent,
  type DonationMethodId,
} from "@/lib/constants/panduan-donasi";
import {
  PanduanLapanganPanel,
  PanduanOnlinePanel,
  PanduanTeleponPanel,
  PanduanTransferPanel,
} from "@/components/panduan-donasi/PanduanMethodPanels";
import { Container } from "@/components/layout/Container";

export function PanduanDonasiSection() {
  const [activeMethod, setActiveMethod] =
    useState<DonationMethodId>("online");
  const { methods } = panduanDonasiPageContent;

  return (
    <section className="bg-surface-muted py-section md:py-section-lg">
      <Container>
        <div className="mx-auto w-full max-w-[1176px]">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-10">
          <div className="space-y-3">
            {methods.map((method) => {
              const isActive = method.id === activeMethod;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setActiveMethod(method.id)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                    isActive
                      ? "border-primary bg-primary-light shadow-card"
                      : "border-border bg-surface hover:border-primary/40"
                  }`}
                >
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                      isActive ? "bg-primary text-white" : "bg-primary-light text-primary"
                    }`}
                  >
                    <MethodIcon type={method.icon} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-text">
                      {method.label}
                    </span>
                    {isActive ? (
                      <span className="mt-2 block text-xs leading-relaxed text-text-muted">
                        {method.description}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>

          <div>
            {activeMethod === "online" ? <PanduanOnlinePanel /> : null}
            {activeMethod === "transfer" ? <PanduanTransferPanel /> : null}
            {activeMethod === "telepon" ? <PanduanTeleponPanel /> : null}
            {activeMethod === "lapangan" ? <PanduanLapanganPanel /> : null}
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function MethodIcon({
  type,
}: {
  type: "laptop" | "bank" | "map" | "phone";
}) {
  if (type === "laptop") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M2 19H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "bank") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 10L12 4L21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M5 10V18H9V14H15V18H19V10" stroke="currentColor" strokeWidth="2" />
        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "map") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 20L3 17V5L9 8M9 20L15 17M9 20V8M15 17L21 20V8L15 5M15 17V5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 4H9L10 8.5L7.5 10C8.6 12.4 10.6 14.4 13 15.5L14.5 13L19 14V16.5C19 17.3 18.3 18 17.5 18C10.9 18 6 13.1 6 6.5C6 5.7 6.7 5 7.5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
