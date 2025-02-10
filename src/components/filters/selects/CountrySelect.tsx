
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
  showLabel?: boolean;
}

export function CountrySelect({ value, onChange, onValueChange, onCountryCodeChange, showLabel = true }: CountrySelectProps) {
  const { t } = useTranslation();
  const { data: countries, isLoading } = useCountryCodes();

  const handleValueChange = (newValue: string) => {
    if (onChange) onChange(newValue);
    if (onValueChange) onValueChange(newValue);
    
    // Find the selected country and update the dial code
    const selectedCountry = countries?.find(c => c.code === newValue);
    if (selectedCountry && onCountryCodeChange) {
      onCountryCodeChange(selectedCountry.dial_code);
    }
  };

  if (isLoading) {
    return <Skeleton className="h-8 w-24" />;
  }

  const FlagImage = ({ countryCode }: { countryCode: string }) => {
    return (
      <img
        src={`/flags/4x3/${countryCode.toLowerCase()}.svg`}
        alt={`${countryCode} flag`}
        className="w-4 h-3 mr-1 inline-block object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  };

  return (
    <div className="space-y-1">
      {showLabel && (
        <Label htmlFor="country-select" className="text-sm font-medium text-gray-700 block">
          Code
        </Label>
      )}
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger id="country-select" className="w-20 h-8 text-sm px-2">
          <SelectValue placeholder={t.filters.country.placeholder}>
            {value && countries && (
              <span className="flex items-center text-xs">
                <FlagImage countryCode={value} />
                {countries.find(c => c.code === value)?.dial_code}
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[300px] w-fit min-w-[180px]">
          {countries?.map((country) => (
            <SelectItem key={country.code} value={country.code} className="text-sm">
              <span className="flex items-center">
                <FlagImage countryCode={country.code} />
                <span className="ml-1">{country.name}</span>
                <span className="ml-auto text-xs text-gray-500">{country.dial_code}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
