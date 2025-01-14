import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { FilterForm } from "./FilterForm";
import { useTranslation } from "@/lib/i18n";

interface FilterSheetProps {
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

export const FilterSheet = ({ filters, onFilterChange }: FilterSheetProps) => {
  const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="md:hidden fixed bottom-4 right-4 shadow-lg bg-[#B08A38] text-white hover:bg-[#0A1836] hover:text-white"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {t.filters.title}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] flex flex-col">
        <div className="flex-1 overflow-auto pt-6">
          <FilterForm 
            className="flex flex-col gap-4" 
            filters={filters}
            onFilterChange={onFilterChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};