import { FilterForm } from "@/components/filters/FilterForm";
import { FilterSheet } from "@/components/filters/FilterSheet";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "@/lib/i18n";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
            {t.filters.title}
          </h2>
          
          {/* Desktop Filters */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm p-6">
            <FilterForm className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" />
          </div>

          {/* Mobile Sheet */}
          <FilterSheet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;