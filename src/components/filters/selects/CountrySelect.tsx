
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/lib/i18n";
import { useCountryCodes } from "@/hooks/useCountryCodes";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

interface CountrySelectProps {
  value?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  onCountryCodeChange?: (dialCode: string) => void;
}

export function CountrySelect({ value, onChange, onValueChange, onCountryCodeChange }: CountrySelectProps) {
  const { t } = useTranslation();
  const { data: countries, isLoading } = useCountryCodes();

  const handleValueChange = (newValue: string) => {
    if (onChange) onChange(newValue);
    if (onValueChange) onValueChange(newValue);
    
    // Find the selected country and update the dial code
    const selectedCountry = countries?.find(c => c.name === newValue);
    if (selectedCountry && onCountryCodeChange) {
      onCountryCodeChange(selectedCountry.dial_code);
    }
  };

  if (isLoading) {
    return <Skeleton className="h-10 w-full" />;
  }

  const FlagImage = ({ countryCode }: { countryCode: string }) => {
    return (
      <img
        src={`/flags/4x3/${countryCode.toLowerCase()}.svg`}
        alt={`${countryCode} flag`}
        className="w-6 h-4 mr-2 inline-block object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="country-select" className="text-sm font-semibold text-gray-700 block">
        {t.filters.country.label}
      </Label>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger id="country-select" className="w-full">
          <SelectValue placeholder={t.filters.country.placeholder}>
            {value && countries && (
              <span className="flex items-center">
                <FlagImage countryCode={countries.find(c => c.name === value)?.code || ''} />
                {value}
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {countries?.map((country) => (
            <SelectItem key={country.code} value={country.name}>
              <span className="flex items-center">
                <FlagImage countryCode={country.code} />
                {country.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
