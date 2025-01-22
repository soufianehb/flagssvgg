import React from 'react';
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

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

const Signup = () => {
  const { t } = useTranslation();
  const { signup } = useAuth();

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
      companyName: "",
      phoneNumber: "",
      businessPhone: "",
      phoneCode: "",
      businessPhoneCode: "",
    },
  });

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
                      <Input type="password" placeholder={t.signup.placeholders.password} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      <Input placeholder={t.signup.placeholders.country} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phoneCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.signup.labels.phoneNumber}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.signup.placeholders.phoneNumber} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="businessPhoneCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Phone Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter business phone code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.signup.labels.businessPhone}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.signup.placeholders.businessPhone} {...field} />
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