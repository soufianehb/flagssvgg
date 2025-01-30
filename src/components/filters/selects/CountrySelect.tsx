import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import countryCodesData from '/CountryCodes.json';

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
    const countryData = countryCodesData.find(c => c.name === country);
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
        {countryCodesData.map((country) => (
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