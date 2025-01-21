import { SignupState } from "@/types/signupState";

export const initialState: SignupState = {
  personal: {
    firstName: "",
    lastName: "",
    email: "",
  },
  professional: {
    address: "",
    zipCode: "",
    city: "",
    country: "",
    companyName: "",
    phoneNumber: "",
    businessPhone: "",
    phoneCode: "",
    businessPhoneCode: "",
  },
  security: {
    password: "",
    confirmPassword: "",
    terms: false,
  },
  ui: {
    isLoading: false,
    showPassword: false,
    showConfirmPassword: false,
    passwordStrength: 0,
  },
};