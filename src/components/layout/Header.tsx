import { useTranslation } from "@/lib/i18n";
import { Link } from "react-router-dom";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center">
        <Link 
          to="/" 
          className="font-montserrat font-bold tracking-tight text-2xl md:text-3xl leading-[1.2] cursor-pointer transition-all duration-300"
        >
          <span className="text-accent">E</span>
          <span className="text-white">xporti</span>
          <span className="text-accent">T</span>
          <span className="text-white">rader</span>
        </Link>
      </div>
    </header>
  );
};