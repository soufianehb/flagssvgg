import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

export const Newsletter = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg font-montserrat">{t.footer.newsletter.title}</h3>
      <div className="space-y-3">
        <div className="relative">
          <Input
            type="email"
            placeholder={t.footer.newsletter.placeholder}
            className="bg-transparent border-primary-foreground/20 placeholder:text-primary-foreground/50 focus:border-accent focus:ring-accent focus:ring-offset-primary font-open-sans"
            aria-label="Newsletter email input"
          />
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/50" aria-hidden="true" />
        </div>
        <Button 
          variant="outline" 
          className="w-full font-open-sans transition-all duration-300 bg-accent text-white hover:bg-primary active:bg-primary/90 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
        >
          {t.footer.newsletter.subscribe}
        </Button>
      </div>
    </div>
  );
};