
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FilterX, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import { useCategories } from "@/hooks/useCategories";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CategoryFiltersProps {
  selectedCategory: string;
  selectedSubcategory: string;
  selectedSubSubcategory: string;
  onFilterChange: (category: string, subcategory: string, subSubcategory: string) => void;
}

export const CategoryFilters = ({ 
  selectedCategory,
  selectedSubcategory,
  selectedSubSubcategory,
  onFilterChange 
}: CategoryFiltersProps) => {
  const { t } = useTranslation();
  const { categories, subcategories, subSubcategories, isLoading, error } = useCategories();

  const handleCategoryChange = (value: string) => {
    onFilterChange(value, "", "");
  };

  const handleSubcategoryChange = (value: string) => {
    onFilterChange(selectedCategory, value, "");
  };

  const handleSubSubcategoryChange = (value: string) => {
    onFilterChange(selectedCategory, selectedSubcategory, value);
  };

  const handleClearFilters = () => {
    onFilterChange("", "", "");
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

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          An error occurred while loading categories. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4">
        {/* Main Category */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-semibold text-gray-700 block">
            {t.filters.category.label}
          </Label>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category" className={selectClasses}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <SelectValue placeholder={t.filters.category.placeholder} />
              )}
            </SelectTrigger>
            <SelectContent className={selectContentClasses}>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subcategory */}
        <div className="space-y-2">
          <Label htmlFor="subcategory" className="text-sm font-semibold text-gray-700 block">
            {t.filters.subcategory.label}
          </Label>
          <Select
            value={selectedSubcategory}
            onValueChange={handleSubcategoryChange}
            disabled={!selectedCategory || isLoading}
          >
            <SelectTrigger id="subcategory" className={selectClasses}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <SelectValue placeholder={t.filters.subcategory.placeholder} />
              )}
            </SelectTrigger>
            <SelectContent className={selectContentClasses}>
              {selectedCategory &&
                subcategories[selectedCategory]?.map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sub-subcategory */}
        <div className="space-y-2">
          <Label htmlFor="subsubcategory" className="text-sm font-semibold text-gray-700 block">
            {t.filters.subsubcategory.label}
          </Label>
          <Select
            value={selectedSubSubcategory}
            onValueChange={handleSubSubcategoryChange}
            disabled={!selectedSubcategory || isLoading}
          >
            <SelectTrigger id="subsubcategory" className={selectClasses}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <SelectValue placeholder={t.filters.subsubcategory.placeholder} />
              )}
            </SelectTrigger>
            <SelectContent className={selectContentClasses}>
              {selectedSubcategory &&
                subSubcategories[selectedSubcategory]?.map((subsubcat) => (
                  <SelectItem key={subsubcat.id} value={subsubcat.id}>
                    {subsubcat.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700 block opacity-0">
            {t.filters.actions.clearFilters}
          </Label>
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full bg-[#B08A38] hover:bg-[#B08A38]/90 text-white border-[#B08A38]"
            disabled={isLoading}
          >
            <FilterX className="mr-2 h-5 w-5" />
            {t.filters.actions.clearFilters}
          </Button>
        </div>
      </div>
    </div>
  );
};
