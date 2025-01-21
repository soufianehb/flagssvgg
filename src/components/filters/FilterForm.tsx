import { useTranslation } from "@/lib/i18n";
import { SearchField } from "./search/SearchField";
import { CountrySelect } from "./selects/CountrySelect";
import { SortSelect } from "./selects/SortSelect";
import { ListingIdInput } from "./inputs/ListingIdInput";
import { CategoryFilters } from "./CategoryFilters";
import { cn } from "@/lib/utils";

interface FilterFormProps {
  className?: string;
  filters: {
    country: string;
    sort: string;
    listingId: string;
    keywords: string;
    category: string;
    subcategory: string;
    subSubcategory: string;
  };
  onFilterChange: (filters: Partial<{
    country: string;
    sort: string;
    listingId: string;
    keywords: string;
    category: string;
    subcategory: string;
    subSubcategory: string;
  }>) => void;
}

export const FilterForm = ({ className, filters, onFilterChange }: FilterFormProps) => {
  const handleCategoryChange = (category: string, subcategory: string, subSubcategory: string) => {
    onFilterChange({ category, subcategory, subSubcategory });
  };

  return (
    <form className={cn("space-y-2", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
        <CountrySelect 
          value={filters.country}
          onChange={(value) => onFilterChange({ country: value })}
        />

        <SortSelect 
          value={filters.sort}
          onChange={(value) => onFilterChange({ sort: value })}
        />

        <ListingIdInput 
          value={filters.listingId}
          onChange={(value) => onFilterChange({ listingId: value })}
        />

        <SearchField 
          value={filters.keywords}
          onChange={(value) => onFilterChange({ keywords: value })}
        />
      </div>

      <div className="pt-2">
        <CategoryFilters 
          selectedCategory={filters.category}
          selectedSubcategory={filters.subcategory}
          selectedSubSubcategory={filters.subSubcategory}
          onFilterChange={handleCategoryChange} 
        />
      </div>
    </form>
  );
};