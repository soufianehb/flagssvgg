import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { FilterForm } from "./FilterForm";
import { useTranslation } from "@/lib/i18n";

export const FilterSheet = () => {
  const { t } = useTranslation();

  const handleSearch = () => {
    // La logique de recherche sera gérée par le FilterForm
    // Cette fonction est juste pour fermer la feuille après la recherche
  };

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
          <FilterForm className="flex flex-col gap-4" />
        </div>
        <div className="py-4 mt-auto border-t">
          <Button 
            className="w-full bg-[#B08A38] text-white hover:bg-[#0A1836] h-11"
            onClick={handleSearch}
          >
            Rechercher
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};