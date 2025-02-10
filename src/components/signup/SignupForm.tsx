
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { toast } from "@/components/ui/use-toast";
import { signupSchema } from "./validation/signupSchema";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PersonalInfoFields } from "./form-sections/PersonalInfoFields";

type SignupFormValues = z.infer<typeof signupSchema>;

const COUNTRY_API_URL = 'https://restcountries.com/v3.1/name';
const TIMEOUT_MS = 3000;

export const SignupForm = () => {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const getCountryFromLocale = () => {
    const locale = navigator.language;
    console.log('Browser locale:', locale);
    
    // Try to extract country code from locale (e.g., 'en-US' -> 'US')
    const countryCode = locale.split('-')[1];
    
    if (!countryCode) {
      console.log('No country code in locale, using default');
      return 'United States';
    }

    const commonCountries: Record<string, string> = {
      'US': 'United States',
      'GB': 'United Kingdom',
      'FR': 'France',
      'ES': 'Spain',
      'DE': 'Germany',
    };

    const countryName = commonCountries[countryCode];
    console.log('Mapped country name:', countryName);
    return countryName || 'United States';
  };

  const detectUserCountry = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const countryName = getCountryFromLocale();
      console.log('Attempting to fetch country details for:', countryName);
      
      const response = await fetch(`${COUNTRY_API_URL}/${encodeURIComponent(countryName)}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.warn('Country API request failed:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url
        });
        return countryName; // Fall back to the simple name mapping
      }

      const countries = await response.json();
      console.log('API response:', countries);
      
      if (Array.isArray(countries) && countries.length > 0) {
        const detectedCountry = countries[0].name.common;
        console.log('Successfully detected country:', detectedCountry);
        return detectedCountry;
      }
      
      console.log('No matching country found, using fallback');
      return countryName;
    } catch (error) {
      console.warn('Country detection error:', error);
      return getCountryFromLocale(); // Fall back to locale-based detection
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const country = await detectUserCountry();
      
      const profileData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        is_profile_complete: false,
        status: 'pending',
        country: country,
        metadata: {
          countryDetectionMethod: country === getCountryFromLocale() ? 'locale' : 'api',
          detectionTimestamp: new Date().toISOString()
        }
      };

      await signup(data.email, data.password, profileData);
      
      toast({
        title: t.signup.messages.success.title,
        description: t.signup.messages.success.description,
      });

      navigate("/login");
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PersonalInfoFields form={form} />

        <Button
          type="submit"
          className="w-full bg-accent hover:bg-accent/90 text-white font-semibold"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t.signup.buttons.loading}
            </>
          ) : (
            t.signup.buttons.submit
          )}
        </Button>
      </form>
    </Form>
  );
};
