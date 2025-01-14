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

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      console.log("Searching for:", value);
    }, 300),
    []
  );

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeywords(value);
    debouncedSearch(value);
  };

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
    <form className={cn("space-y-8", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
        <div className="space-y-4">
          <Label htmlFor="country" className="text-sm font-semibold text-gray-700 block">
            {t.filters.country.label}
          </Label>
          <Select>
            <SelectTrigger id="country" className={selectClasses}>
              <SelectValue placeholder={t.filters.country.placeholder} />
            </SelectTrigger>
            <SelectContent className={selectContentClasses}>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label htmlFor="sort" className="text-sm font-semibold text-gray-700 block">
            {t.filters.sort.label}
          </Label>
          <Select>
            <SelectTrigger id="sort" className={selectClasses}>
              <SelectValue placeholder={t.filters.sort.placeholder} />
            </SelectTrigger>
            <SelectContent className={selectContentClasses}>
              <SelectItem value="newest">{t.filters.sort.newest}</SelectItem>
              <SelectItem value="oldest">{t.filters.sort.oldest}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label htmlFor="listingId" className="text-sm font-semibold text-gray-700 block">
            {t.filters.listingId.label}
          </Label>
          <Input
            id="listingId"
            type="number"
            placeholder={t.filters.listingId.placeholder}
            className="w-full bg-white"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="keywords" className="text-sm font-semibold text-gray-700 block">
            {t.filters.keywords.label}
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="keywords"
              className="pl-10 w-full bg-white"
              placeholder={t.filters.keywords.placeholder}
              value={keywords}
              onChange={handleKeywordsChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
};