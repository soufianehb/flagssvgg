import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CountryCode {
  id: string;
  name: string;
  dial_code: string;
  code: string;
  is_active: boolean;
}

export const useCountryCodes = () => {
  return useQuery({
    queryKey: ["countryCodes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("country_codes_dial")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as CountryCode[];
    },
  });
};