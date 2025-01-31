import React from 'react';
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { CountrySelect } from "@/components/filters/selects/CountrySelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCountryCodes } from "@/hooks/useCountryCodes";

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  address: z.string().min(1, "Address is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  businessPhone: z.string().min(1, "Business phone is required"),
  phoneCode: z.string().min(1, "Phone code is required"),
  businessPhoneCode: z.string().min(1, "Business phone code is required"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 20;
  if (password.match(/[A-Z]/)) strength += 20;
  if (password.match(/[a-z]/)) strength += 20;
  if (password.match(/[0-9]/)) strength += 20;
  if (password.match(/[^A-Za-z0-9]/)) strength += 20;
  return strength;
};

const getPasswordStrengthColor = (strength: number): string => {
  if (strength <= 20) return "bg-red-500";
  if (strength <= 40) return "bg-orange-500";
  if (strength <= 60) return "bg-yellow-500";
  if (strength <= 80) return "bg-blue-500";
  return "bg-green-500";
};

const Signup = () => {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const [passwordStrength, setPasswordStrength] = React.useState(0);
  const { data: countries, isLoading } = useCountryCodes();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
      phoneNumber: "",
      businessPhone: "",
      phoneCode: "",
      businessPhoneCode: "",
      companyName: "",
    },
  });

  // Watch for country changes
  const selectedCountry = form.watch("country");
  
  React.useEffect(() => {
    if (selectedCountry && countries) {
      const countryData = countries.find(c => c.name === selectedCountry);
      if (countryData) {
        form.setValue("phoneCode", countryData.dial_code);
        form.setValue("businessPhoneCode", countryData.dial_code);
      }
    }
  }, [selectedCountry, countries, form.setValue]);

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const personalData = {
        firstName: data.firstName,
        lastName: data.lastName,
      };

      const professionalData = {
        address: data.address,
        zipCode: data.zipCode,
        city: data.city,
        country: data.country,
        companyName: data.companyName,
        phoneNumber: data.phoneNumber,
        businessPhone: data.businessPhone,
        phoneCode: data.phoneCode,
        businessPhoneCode: data.businessPhoneCode,
      };

      await signup(data.email, data.password, personalData, professionalData);
      
      toast({
        title: t.signup.messages.success.title,
        description: t.signup.messages.success.description,
      });
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: t.signup.messages.error.title,
        description: error.message || t.signup.messages.error.description,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t.signup.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t.signup.buttons.login}{' '}
            <Link to="/login" className="font-medium text-accent hover:text-accent/90">
              {t.nav.login}
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.signup.labels.firstName}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.signup.placeholders.firstName} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.signup.labels.lastName}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.signup.placeholders.lastName} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email and Password */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.signup.labels.email}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t.signup.placeholders.email} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.signup.labels.password}</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder={t.signup.placeholders.password} 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setPasswordStrength(calculatePasswordStrength(e.target.value));
                        }}
                      />
                    </FormControl>
                    <Progress 
                      value={passwordStrength} 
                      className={`h-1 mt-2 ${getPasswordStrengthColor(passwordStrength)}`}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Information */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.signup.labels.address}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.signup.placeholders.address} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.signup.labels.zipCode}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.signup.placeholders.zipCode} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.signup.labels.city}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.signup.placeholders.city} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.signup.labels.country}</FormLabel>
                    <FormControl>
                      <CountrySelect
                        value={field.value}
                        onChange={field.onChange}
                        onCountryCodeChange={(dialCode) => {
                          form.setValue("phoneCode", dialCode);
                          form.setValue("businessPhoneCode", dialCode);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Numbers with auto-filling codes but editable */}
              <div className="space-y-4">
                <FormItem>
                  <FormLabel>Personal Phone</FormLabel>
                  <div className="flex gap-2">
                    <div className="w-27">
                      <FormField
                        control={form.control}
                        name="phoneCode"
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Code" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries?.map((country) => (
                                <SelectItem key={country.code} value={country.dial_code}>
                                  <span className="flex items-center">
                                    <img
                                      src={`/flags/4x3/${country.code.toLowerCase()}.svg`}
                                      alt={`${country.code} flag`}
                                      className="w-4 h-3 mr-2 inline-block object-cover"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                    {country.dial_code}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormControl>
                            <Input placeholder="Phone number" {...field} />
                          </FormControl>
                        )}
                      />
                    </div>
                  </div>
                  <FormMessage>{form.formState.errors.phoneNumber?.message}</FormMessage>
                </FormItem>

                <FormItem>
                  <FormLabel>Business Phone</FormLabel>
                  <div className="flex gap-2">
                    <div className="w-27">
                      <FormField
                        control={form.control}
                        name="businessPhoneCode"
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Code" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries?.map((country) => (
                                <SelectItem key={country.code} value={country.dial_code}>
                                  <span className="flex items-center">
                                    <img
                                      src={`/flags/4x3/${country.code.toLowerCase()}.svg`}
                                      alt={`${country.code} flag`}
                                      className="w-4 h-3 mr-2 inline-block object-cover"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                    {country.dial_code}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="businessPhone"
                        render={({ field }) => (
                          <FormControl>
                            <Input placeholder="Business phone" {...field} />
                          </FormControl>
                        )}
                      />
                    </div>
                  </div>
                  <FormMessage>{form.formState.errors.businessPhone?.message}</FormMessage>
                </FormItem>

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.signup.labels.companyName}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.signup.placeholders.companyName} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? t.signup.buttons.loading : t.signup.buttons.submit}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-center">
          <Link
            to="/"
            className="font-medium text-accent hover:text-accent/90"
          >
            {t.signup.buttons.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
