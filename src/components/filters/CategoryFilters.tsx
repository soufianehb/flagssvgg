import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";

const categories = [
  "Architecture & Design",
  "Agriculture",
  "Aeronautics",
  "Medical",
  "Maritime",
  "Industry",
];

const subcategories = {
  "Architecture & Design": ["Interior Design", "Urban Planning", "Landscape"],
  "Agriculture": ["Farming", "Livestock", "Forestry"],
  // ... other categories
};

const subSubcategories = {
  "Interior Design": ["Residential", "Commercial", "Industrial"],
  "Farming": ["Organic", "Traditional", "Hydroponics"],
  // ... other subcategories
};

interface CategoryFiltersProps {
  onFilterChange?: (category: string, subcategory: string, subSubcategory: string) => void;
}

export const CategoryFilters = ({ onFilterChange }: CategoryFiltersProps) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<string>("");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategory("");
    setSelectedSubSubcategory("");
    onFilterChange?.(value, "", "");
  };

  const handleSubcategoryChange = (value: string) => {
    setSelectedSubcategory(value);
    setSelectedSubSubcategory("");
    onFilterChange?.(selectedCategory, value, "");
  };

  const handleSubSubcategoryChange = (value: string) => {
    setSelectedSubSubcategory(value);
    onFilterChange?.(selectedCategory, selectedSubcategory, value);
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedSubSubcategory("");
    onFilterChange?.("", "", "");
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6">
        {/* Main Category */}
        <div className="space-y-4">
          <Label htmlFor="category" className="text-sm font-semibold text-gray-700 block">
            {t.filters.category.label}
          </Label>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category" className={selectClasses}>
              <SelectValue placeholder={t.filters.category.placeholder} />
            </SelectTrigger>
            <SelectContent className={selectContentClasses}>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subcategory */}
        <div className="space-y-4">
          <Label htmlFor="subcategory" className="text-sm font-semibold text-gray-700 block">
            {t.filters.subcategory.label}
          </Label>
          <Select
            value={selectedSubcategory}
            onValueChange={handleSubcategoryChange}
            disabled={!selectedCategory}
          >
            <SelectTrigger id="subcategory" className={selectClasses}>
              <SelectValue placeholder={t.filters.subcategory.placeholder} />
            </SelectTrigger>
            <SelectContent className={selectContentClasses}>
              {selectedCategory &&
                subcategories[selectedCategory as keyof typeof subcategories]?.map((subcat) => (
                  <SelectItem key={subcat} value={subcat}>
                    {subcat}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sub-subcategory */}
        <div className="space-y-4">
          <Label htmlFor="subsubcategory" className="text-sm font-semibold text-gray-700 block">
            {t.filters.subsubcategory.label}
          </Label>
          <Select
            value={selectedSubSubcategory}
            onValueChange={handleSubSubcategoryChange}
            disabled={!selectedSubcategory}
          >
            <SelectTrigger id="subsubcategory" className={selectClasses}>
              <SelectValue placeholder={t.filters.subsubcategory.placeholder} />
            </SelectTrigger>
            <SelectContent className={selectContentClasses}>
              {selectedSubcategory &&
                subSubcategories[selectedSubcategory as keyof typeof subSubcategories]?.map(
                  (subsubcat) => (
                    <SelectItem key={subsubcat} value={subsubcat}>
                      {subsubcat}
                    </SelectItem>
                  )
                )}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold text-gray-700 block opacity-0">
            {t.filters.actions.clearFilters}
          </Label>
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <FilterX className="mr-2 h-4 w-4" />
            {t.filters.actions.clearFilters}
          </Button>
        </div>
      </div>
    </div>
  );
};