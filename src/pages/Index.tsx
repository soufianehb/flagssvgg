import { FilterForm } from "@/components/filters/FilterForm";
import { FilterSheet } from "@/components/filters/FilterSheet";
import { useTranslation } from "@/lib/i18n";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-secondary p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
          {t.filters.title}
        </h1>
        
        {/* Desktop Filters */}
        <div className="hidden md:block bg-white rounded-lg shadow-sm p-6">
          <FilterForm className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" />
        </div>

        {/* Mobile Sheet */}
        <FilterSheet />
      </div>
    </div>
  );
};

export default Index;