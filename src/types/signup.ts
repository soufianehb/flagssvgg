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
}

export interface SecurityData {
  password: string;
  confirmPassword: string;
  terms: boolean;
}