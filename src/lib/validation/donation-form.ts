export const DONATION_FORM_ERRORS = {
  paymentMethod: "Pilih Metode Pembayaran Donasi",
  nameRequired: "Masukkan Nama Lengkap Anda",
  nameMaxLength: "Input Nama Maksimum 40 Karakter",
  nameInvalid: "Masukkan hanya huruf, titik dan koma",
  email: "Masukkan Alamat Email Anda dengan Benar",
  phone: "Pastikan Nomor Telepon Sudah Benar",
  phoneMaxLength: "Nomor Telepon Maksimal 13 digit",
  addressRequired: "Masukkan Alamat Lengkap Anda",
  addressMaxLength: "Input Alamat Maksimum 255 Karakter",
  addressInvalid: "Masukkan hanya angka, huruf, titik, atau koma",
  addressHouseNumber: "Masukkan Nomor Rumah dan Kode Pos Anda",
} as const;

export type DonationFormValues = {
  paymentMethod: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type DonationFormErrors = Partial<
  Record<keyof DonationFormValues, string>
>;

const NAME_PATTERN = /^[\p{L}\s,.]+$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADDRESS_PATTERN = /^[\p{L}\p{N}\s,.]+$/u;

export function isNameCharAllowed(char: string) {
  return /^[\p{L}\s,.]$/u.test(char);
}

export function isPhoneCharAllowed(char: string, currentValue: string) {
  if (char === "+") {
    return currentValue.length === 0;
  }
  return /^\d$/.test(char);
}

export function isAddressCharAllowed(char: string) {
  return /^[\p{L}\p{N}\s,.]$/u.test(char);
}

export function sanitizeNameInput(value: string) {
  return value.replace(/[^\p{L}\s,.]/gu, "");
}

export function sanitizePhoneInput(value: string) {
  const hasLeadingPlus = value.startsWith("+");
  const digits = value.replace(/\D/g, "").slice(0, 13);
  return hasLeadingPlus ? `+${digits}` : digits;
}

export function sanitizeAddressInput(value: string) {
  return value.replace(/[^\p{L}\p{N}\s,.]/gu, "");
}

export function normalizePhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("62")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  return `62${digits}`;
}

export function validateDonationDetailsStep(
  values: Pick<DonationFormValues, "name" | "email" | "phone" | "address">,
  options: { requiresAddress: boolean },
): DonationFormErrors {
  const errors: DonationFormErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = DONATION_FORM_ERRORS.nameRequired;
  } else if (name.length > 40) {
    errors.name = DONATION_FORM_ERRORS.nameMaxLength;
  } else if (!NAME_PATTERN.test(name)) {
    errors.name = DONATION_FORM_ERRORS.nameInvalid;
  }

  const email = values.email.trim();
  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.email = DONATION_FORM_ERRORS.email;
  }

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (!phoneDigits) {
    errors.phone = DONATION_FORM_ERRORS.phone;
  } else if (phoneDigits.length > 13) {
    errors.phone = DONATION_FORM_ERRORS.phoneMaxLength;
  } else if (phoneDigits.length < 7) {
    errors.phone = DONATION_FORM_ERRORS.phone;
  }

  if (options.requiresAddress) {
    const address = values.address.trim();
    if (!address) {
      errors.address = DONATION_FORM_ERRORS.addressRequired;
    } else if (address.length > 255) {
      errors.address = DONATION_FORM_ERRORS.addressMaxLength;
    } else if (!ADDRESS_PATTERN.test(address)) {
      errors.address = DONATION_FORM_ERRORS.addressInvalid;
    } else if (!/\p{L}/u.test(address)) {
      errors.address = DONATION_FORM_ERRORS.addressRequired;
    } else if (address.length < 10) {
      errors.address = DONATION_FORM_ERRORS.addressRequired;
    } else if (!/\d/.test(address)) {
      errors.address = DONATION_FORM_ERRORS.addressHouseNumber;
    }
  }

  return errors;
}

export function validateDonationPaymentStep(
  paymentMethod: string,
): DonationFormErrors {
  const errors: DonationFormErrors = {};

  if (!paymentMethod) {
    errors.paymentMethod = DONATION_FORM_ERRORS.paymentMethod;
  }

  return errors;
}

export function validateDonationForm(
  values: DonationFormValues,
  options: { requiresAddress: boolean },
): DonationFormErrors {
  return {
    ...validateDonationDetailsStep(values, options),
    ...validateDonationPaymentStep(values.paymentMethod),
  };
}
