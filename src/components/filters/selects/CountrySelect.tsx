import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/lib/i18n";

// Temporary data until Supabase implementation
const temporaryCountries = [
  { name: "United States", dial_code: "+1", code: "US" },
  { name: "United Kingdom", dial_code: "+44", code: "GB" },
  { name: "France", dial_code: "+33", code: "FR" },
  { name: "Germany", dial_code: "+49", code: "DE" },
  { name: "Japan", dial_code: "+81", code: "JP" },
  { name: "China", dial_code: "+86", code: "CN" },
  { name: "India", dial_code: "+91", code: "IN" }
];

interface CountrySelectProps {
  value?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
}

export function CountrySelect({ value, onChange, onValueChange }: CountrySelectProps) {
  const { t } = useTranslation();

  const handleValueChange = (newValue: string) => {
    if (onChange) onChange(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  const FlagImage = ({ country }: { country: string }) => {
    const countryData = temporaryCountries.find(c => c.name === country);
    if (!countryData) return null;
    
    return (
      <img
        src={`/flags/4x3/${countryData.code.toLowerCase()}.svg`}
        alt={`${country} flag`}
        className="w-6 h-4 mr-2 inline-block object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={t.filters.country.placeholder}>
          {value && (
            <span className="flex items-center">
              <FlagImage country={value} />
              {value}
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {temporaryCountries.map((country) => (
          <SelectItem key={country.code} value={country.name}>
            <span className="flex items-center">
              <FlagImage country={country.name} />
              {country.name}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}