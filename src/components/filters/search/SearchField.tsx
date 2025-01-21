import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/i18n";
import { useCallback } from "react";
import debounce from "lodash/debounce";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchField = ({ value, onChange }: SearchFieldProps) => {
  const { t } = useTranslation();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onChange(value);
    }, 300),
    [onChange]
  );

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="keywords" className="text-sm font-semibold text-gray-700 block">
        {t.filters.keywords.label}
      </Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          id="keywords"
          className="pl-10 w-full bg-white"
          placeholder={t.filters.keywords.placeholder}
          value={value}
          onChange={handleKeywordsChange}
        />
      </div>
    </div>
  );
};