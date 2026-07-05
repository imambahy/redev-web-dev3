"use client";

import type { KeyboardEvent } from "react";
import type { DonationFormErrors, DonationFormValues } from "@/lib/validation/donation-form";
import {
  isAddressCharAllowed,
  isNameCharAllowed,
  isPhoneCharAllowed,
  sanitizeAddressInput,
  sanitizeNameInput,
  sanitizePhoneInput,
} from "@/lib/validation/donation-form";
import { Button } from "@/components/ui/Button";
import {
  DonationFormField,
  donationInputClassName,
} from "@/components/donation/DonationFormField";

type DonationStepDetailsProps = {
  values: DonationFormValues;
  errors: DonationFormErrors;
  requiresAddress: boolean;
  onFieldChange: (field: keyof DonationFormValues, value: string) => void;
  onContinue: () => void;
};

export function DonationStepDetails({
  values,
  errors,
  requiresAddress,
  onFieldChange,
  onContinue,
}: DonationStepDetailsProps) {
  const handleNameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey || event.metaKey || event.key.length > 1) return;
    if (!isNameCharAllowed(event.key)) event.preventDefault();
  };

  const handlePhoneKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey || event.metaKey || event.key.length > 1) return;
    if (!isPhoneCharAllowed(event.key, values.phone)) event.preventDefault();
  };

  const handleAddressKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey || event.metaKey || event.key.length > 1) return;
    if (!isAddressCharAllowed(event.key)) event.preventDefault();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-primary">Kenalan lebih dekat, yuk</h3>

      <DonationFormField id="donate_name" label="Nama" error={errors.name}>
        <input
          id="donate_name"
          name="donate_name"
          type="text"
          maxLength={40}
          value={values.name}
          onChange={(event) =>
            onFieldChange("name", sanitizeNameInput(event.target.value))
          }
          onKeyDown={handleNameKeyDown}
          placeholder="Nama lengkap sesuai KTP"
          className={donationInputClassName(Boolean(errors.name))}
          autoComplete="name"
        />
      </DonationFormField>

      <DonationFormField
        id="donate_phone"
        label="Nomor Handphone"
        error={errors.phone}
      >
        <input
          id="donate_phone"
          name="donate_phone"
          type="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(event) =>
            onFieldChange("phone", sanitizePhoneInput(event.target.value))
          }
          onKeyDown={handlePhoneKeyDown}
          placeholder="Contoh: 0812xxxx"
          className={donationInputClassName(Boolean(errors.phone))}
          autoComplete="tel"
        />
      </DonationFormField>

      <DonationFormField id="donate_email" label="Email" error={errors.email}>
        <input
          id="donate_email"
          name="donate_email"
          type="email"
          value={values.email}
          onChange={(event) => onFieldChange("email", event.target.value)}
          placeholder="Contoh: nama@email.com"
          className={donationInputClassName(Boolean(errors.email))}
          autoComplete="email"
        />
      </DonationFormField>

      {requiresAddress ? (
        <DonationFormField id="donate_address" label="Alamat" error={errors.address}>
          <textarea
            id="donate_address"
            name="donate_address"
            rows={4}
            maxLength={255}
            value={values.address}
            onChange={(event) =>
              onFieldChange("address", sanitizeAddressInput(event.target.value))
            }
            onKeyDown={handleAddressKeyDown}
            placeholder="Tuliskan alamat lengkap pengiriman sertifikat/merchandise"
            className={`${donationInputClassName(Boolean(errors.address))} resize-none`}
          />
        </DonationFormField>
      ) : null}

      <Button type="button" shape="pill" className="w-full" onClick={onContinue}>
        Mulai Berdonasi
      </Button>
    </div>
  );
}
