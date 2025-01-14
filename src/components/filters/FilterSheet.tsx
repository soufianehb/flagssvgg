import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { FilterForm } from "./FilterForm";
import { useTranslation } from "@/lib/i18n";

export const FilterSheet = () => {
  const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="md:hidden fixed bottom-4 right-4 shadow-lg bg-[#B08A38] text-white hover:bg-[#1EAEDB] hover:text-white"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {t.filters.title}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <div className="h-full overflow-auto pt-6">
          <FilterForm className="flex flex-col gap-4" />
        </div>
      </SheetContent>
    </Sheet>
  );
};