"use client";

import type { KeyboardEvent, SelectHTMLAttributes } from "react";
import type { DonationFormErrors, DonationFormValues } from "@/lib/validation/donation-form";
import {
  isAddressCharAllowed,
  isNameCharAllowed,
  isPhoneCharAllowed,
  sanitizeAddressInput,
  sanitizeNameInput,
  sanitizePhoneInput,
} from "@/lib/validation/donation-form";
import {
  getCityOptions,
  getDistrictOptions,
  getPostalCodeOptions,
  getProvinceOptions,
} from "@/lib/constants/address-regions";
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
  onFieldsChange?: (fields: Partial<DonationFormValues>) => void;
  onContinue: () => void;
};

function donationSelectClassName(hasError: boolean, disabled = false) {
  return `${donationInputClassName(hasError)} appearance-none bg-surface pr-10 ${
    disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
  }`;
}

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DonationSelect({
  hasError,
  children,
  className,
  disabled,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean }) {
  return (
    <div className="relative">
      <select
        {...props}
        disabled={disabled}
        className={`${donationSelectClassName(Boolean(hasError), Boolean(disabled))} ${className ?? ""}`}
      >
        {children}
      </select>
      <ChevronDownIcon
        className={`pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 ${
          disabled ? "text-text-muted/50" : "text-text-muted"
        }`}
      />
    </div>
  );
}

export function DonationStepDetails({
  values,
  errors,
  requiresAddress,
  onFieldChange,
  onFieldsChange,
  onContinue,
}: DonationStepDetailsProps) {
  const provinceOptions = getProvinceOptions();
  const cityOptions = getCityOptions(values.province);
  const districtOptions = getDistrictOptions(values.province, values.city);
  const postalCodeOptions = getPostalCodeOptions(
    values.province,
    values.city,
    values.district,
  );

  const updateFields = (fields: Partial<DonationFormValues>) => {
    if (onFieldsChange) {
      onFieldsChange(fields);
      return;
    }
    Object.entries(fields).forEach(([field, value]) => {
      onFieldChange(field as keyof DonationFormValues, value ?? "");
    });
  };

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
    <div className="space-y-4 pb-2">
      <h3 className="text-center text-lg font-bold text-[#003144] md:text-xl">
        Kenalan lebih dekat, yuk
      </h3>

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
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <DonationFormField
              id="donate_province"
              label="Provinsi"
              error={errors.province}
            >
              <DonationSelect
                id="donate_province"
                name="donate_province"
                value={values.province}
                hasError={Boolean(errors.province)}
                onChange={(event) =>
                  updateFields({
                    province: event.target.value,
                    city: "",
                    district: "",
                    postalCode: "",
                  })
                }
              >
                <option value="">Pilih Provinsi</option>
                {provinceOptions.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </DonationSelect>
            </DonationFormField>

            <DonationFormField
              id="donate_city"
              label="Kota/Kabupaten"
              error={errors.city}
            >
              <DonationSelect
                id="donate_city"
                name="donate_city"
                value={values.city}
                disabled={!values.province}
                hasError={Boolean(errors.city)}
                onChange={(event) =>
                  updateFields({
                    city: event.target.value,
                    district: "",
                    postalCode: "",
                  })
                }
              >
                <option value="">
                  {values.province ? "Pilih Kota/Kabupaten" : "Pilih Provinsi terlebih dahulu"}
                </option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </DonationSelect>
            </DonationFormField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <DonationFormField
              id="donate_district"
              label="Kecamatan"
              error={errors.district}
            >
              <DonationSelect
                id="donate_district"
                name="donate_district"
                value={values.district}
                disabled={!values.city}
                hasError={Boolean(errors.district)}
                onChange={(event) =>
                  updateFields({
                    district: event.target.value,
                    postalCode: "",
                  })
                }
              >
                <option value="">
                  {values.city ? "Pilih Kecamatan" : "Pilih Kota/Kabupaten terlebih dahulu"}
                </option>
                {districtOptions.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </DonationSelect>
            </DonationFormField>

            <DonationFormField
              id="donate_postal_code"
              label="Kode Pos"
              error={errors.postalCode}
            >
              <DonationSelect
                id="donate_postal_code"
                name="donate_postal_code"
                value={values.postalCode}
                disabled={!values.district}
                hasError={Boolean(errors.postalCode)}
                onChange={(event) =>
                  onFieldChange("postalCode", event.target.value)
                }
              >
                <option value="">
                  {values.district ? "Pilih Kode Pos" : "Pilih Kecamatan terlebih dahulu"}
                </option>
                {postalCodeOptions.map((postalCode) => (
                  <option key={postalCode} value={postalCode}>
                    {postalCode}
                  </option>
                ))}
              </DonationSelect>
            </DonationFormField>
          </div>

          <DonationFormField
            id="donate_address"
            label="Alamat Lengkap"
            error={errors.address}
          >
            <textarea
              id="donate_address"
              name="donate_address"
              rows={3}
              maxLength={255}
              value={values.address}
              onChange={(event) =>
                onFieldChange("address", sanitizeAddressInput(event.target.value))
              }
              onKeyDown={handleAddressKeyDown}
              placeholder="Contoh: Jl. Melawai Raya No. 12"
              className={`${donationInputClassName(Boolean(errors.address))} resize-none`}
            />
          </DonationFormField>
        </>
      ) : null}

      <Button type="button" shape="pill" className="w-full" onClick={onContinue}>
        Pilih Metode Pembayaran
      </Button>
    </div>
  );
}
