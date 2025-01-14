import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { FilterForm } from "./FilterForm";
import { useTranslation } from "@/lib/i18n";
import { useState } from "react";

export const FilterSheet = () => {
  const { t } = useTranslation();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={`md:hidden fixed bottom-4 right-4 shadow-lg ${
            isClicked ? "bg-[#1EAEDB] text-white hover:bg-[#1EAEDB]/90" : "bg-[#B08A38] text-white hover:bg-[#B08A38]/90"
          }`}
          onClick={handleClick}
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