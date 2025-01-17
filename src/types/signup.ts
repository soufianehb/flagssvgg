export interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ProfessionalData {
  address: string;
  zipCode: string;
  city: string;
  country: string;
  companyName: string;
  phoneNumber: string;
  businessPhone: string;
  phoneCode: string;
  businessPhoneCode: string;
}

export interface SecurityData {
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export type SignupFormData = {
  personal: PersonalData;
  professional: ProfessionalData;
  security: SecurityData;
}