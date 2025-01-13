import { useTranslation } from "@/lib/i18n";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-montserrat font-bold">
          Multi-Lingua Dashboard
        </h1>
      </div>
    </header>
  );
};