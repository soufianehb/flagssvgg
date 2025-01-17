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
    console.log('Validating phone number:', phoneNumber, 'for country:', country);
    
    // Try to parse the phone number first
    const parsedNumber = parsePhoneNumber(phoneNumber, country as CountryCode);
    
    if (!parsedNumber) {
      console.log('Failed to parse phone number');
      return {
        isValid: false,
        error: t.signup.validation.phoneNumber.invalidFormat
      };
    }

    const isValid = isValidPhoneNumber(phoneNumber, country as CountryCode);
    console.log('Phone number validation result:', isValid);
    
    if (!isValid) {
      return {
        isValid: false,
        error: t.signup.validation.phoneNumber.invalidFormat
      };
    }

    return {
      isValid: true
    };
  } catch (error) {
    console.log('Phone validation error:', error);
    return {
      isValid: false,
      error: t.signup.validation.phoneNumber.invalidFormat
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