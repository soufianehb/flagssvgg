
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "@/lib/i18n";
import { GeneralFormValues } from "../../types/profile";

interface AdditionalBusinessSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function AdditionalBusinessSection({ form }: AdditionalBusinessSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="vat_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              N° de TVA intracommunautaire
              <span className="text-sm text-gray-500 ml-2">(si vous êtes en Europe)</span>
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="business_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vous êtes</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre type d'activité" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="producer">Producteur</SelectItem>
                <SelectItem value="manufacturer">Fabricant</SelectItem>
                <SelectItem value="wholesaler">Grossiste</SelectItem>
                <SelectItem value="broker">Courtier</SelectItem>
                <SelectItem value="retailer">Détaillant</SelectItem>
                <SelectItem value="group">Groupement</SelectItem>
                <SelectItem value="association">Association</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="employee_count"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Effectif</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre effectif" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="1-5">1 à 5</SelectItem>
                <SelectItem value="5-10">5 à 10</SelectItem>
                <SelectItem value="10-20">10 à 20</SelectItem>
                <SelectItem value="20-40">20 à 40</SelectItem>
                <SelectItem value="40-60">40 à 60</SelectItem>
                <SelectItem value="60-100">60 à 100</SelectItem>
                <SelectItem value="100+">+100</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse de votre site web</FormLabel>
            <FormControl>
              <Input {...field} placeholder="https://" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="business_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Précisions sur votre activité
              <span className="block text-sm text-gray-500">
                Profitez de cet espace pour bien décrire votre entreprise votre métier, vos marchés etc ... 
                Ces informations seront diffusées à vos interlocuteurs avant toute prise de contact.
              </span>
            </FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                className="min-h-[150px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="capabilities_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Indications sur vos capacités
              <span className="block text-sm text-gray-500">
                Profitez de cet espace pour précisier si vous le souhaitez votre chiffre d'affaire, 
                vos garanties ou toute indication qui pourra garantir le sérieux de votre entreprise.
              </span>
            </FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                className="min-h-[150px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
