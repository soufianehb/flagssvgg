import { isValidPhoneNumber, parsePhoneNumber, type CountryCode } from "libphonenumber-js";

export const validatePhoneNumber = (
  phoneNumber: string,
  country: string,
  t: any
): { isValid: boolean; error?: string } => {
  if (!phoneNumber) {
    return { isValid: true };
  }

  try {
    const isValid = isValidPhoneNumber(phoneNumber, country as CountryCode);
    return {
      isValid,
      error: isValid ? undefined : t.signup.validation.phoneNumber.invalid
    };
  } catch (error) {
    return {
      isValid: false,
      error: t.signup.validation.phoneNumber.invalid
    };
  }
};

export const formatPhoneNumber = (
  phoneNumber: string,
  country: string
): string => {
  try {
    const parsedNumber = parsePhoneNumber(phoneNumber, country as CountryCode);
    return parsedNumber ? parsedNumber.formatInternational() : phoneNumber;
  } catch {
    return phoneNumber;
  }
};