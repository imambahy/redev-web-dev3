import type { ReactNode } from "react";

export function DonationFormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-text">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function donationInputClassName(hasError: boolean) {
  return `w-full rounded-lg border px-4 py-3 text-sm text-text outline-none focus:border-primary ${
    hasError ? "border-red-500" : "border-border"
  }`;
}
