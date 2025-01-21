import { UseFormReturn } from "react-hook-form";
import { AddressFields } from "./professional/AddressFields";
import { CompanyField } from "./professional/CompanyField";
import { PhoneField } from "./professional/PhoneField";
import { phoneCodes } from "@/data/phoneCodes";

interface ProfessionalInfoStepProps {
  form: UseFormReturn<any>;
  t: any;
  handleCountryChange: (value: string) => void;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: "businessPhone" | "phoneNumber") => void;
}

const ProfessionalInfoStep = ({ form, t, handleCountryChange, handlePhoneChange }: ProfessionalInfoStepProps) => {
  const handleCountrySelection = (value: string) => {
    handleCountryChange(value);
    const phoneCode = phoneCodes[value];
    if (phoneCode) {
      form.setValue("phoneCode", phoneCode);
      form.setValue("businessPhoneCode", phoneCode);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <AddressFields 
        form={form} 
        t={t} 
        handleCountryChange={handleCountrySelection} 
      />
      
      <CompanyField 
        form={form} 
        t={t} 
      />

      <PhoneField 
        form={form} 
        t={t} 
        fieldName="phoneNumber"
        phoneCodeField="phoneCode"
        handlePhoneChange={handlePhoneChange}
      />

      <PhoneField 
        form={form} 
        t={t} 
        fieldName="businessPhone"
        phoneCodeField="businessPhoneCode"
        handlePhoneChange={handlePhoneChange}
      />
    </div>
  );
};

export default ProfessionalInfoStep;