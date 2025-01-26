import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { countries } from "@/data/countries";

interface CountrySelectProps {
  value?: string;
  onChange: (value: string) => void;
}

export const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { t } = useTranslation();

  const selectClasses = "w-full bg-white transition-all duration-200 ease-in-out hover:ring-2 hover:ring-primary/20 focus:ring-2 focus:ring-primary/20";
  const selectContentClasses = cn(
    "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
    "origin-top",
    "!duration-200"
  );

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="country" className={selectClasses}>
          <SelectValue placeholder={t.filters.country.placeholder} />
        </SelectTrigger>
        <SelectContent className={selectContentClasses}>
          {countries.map((country) => (
            <SelectItem
              key={country}
              value={country}
              className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-100"
            >
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};