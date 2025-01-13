import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "es", label: "Spain" },
];

interface FilterFormProps {
  className?: string;
}

export const FilterForm = ({ className }: FilterFormProps) => {
  const { t } = useTranslation();
  const [keywords, setKeywords] = useState("");

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      console.log("Searching for:", value); // Replace with actual search logic
    }, 300),
    []
  );

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeywords(value);
    debouncedSearch(value);
  };

  return (
    <form className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="country">{t.filters.country.label}</Label>
        <Select>
          <SelectTrigger id="country">
            <SelectValue placeholder={t.filters.country.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort">{t.filters.sort.label}</Label>
        <Select>
          <SelectTrigger id="sort">
            <SelectValue placeholder={t.filters.sort.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t.filters.sort.newest}</SelectItem>
            <SelectItem value="oldest">{t.filters.sort.oldest}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="listingId">{t.filters.listingId.label}</Label>
        <Input
          id="listingId"
          type="number"
          placeholder={t.filters.listingId.placeholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="keywords">{t.filters.keywords.label}</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="keywords"
            className="pl-10"
            placeholder={t.filters.keywords.placeholder}
            value={keywords}
            onChange={handleKeywordsChange}
          />
        </div>
      </div>
    </form>
  );
};