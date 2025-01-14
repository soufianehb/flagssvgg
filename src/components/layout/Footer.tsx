import { ContactLinks } from "./footer/ContactLinks";
import { Newsletter } from "./footer/Newsletter";
import { QuickLinks } from "./footer/QuickLinks";
import { SocialIcons } from "./footer/SocialIcons";
import { useTranslation } from "@/lib/i18n";

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First column - Logo & Social */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-montserrat">
              <span className="text-accent">E</span>
              <span className="text-primary-foreground">xporti</span>
              <span className="text-accent">T</span>
              <span className="text-primary-foreground">rader</span>
            </h2>
            <p className="text-primary-foreground/80">
              {t.footer.tagline}
            </p>
            <SocialIcons />
          </div>

          {/* Second column - Quick Links */}
          <QuickLinks />

          {/* Third column - Contact */}
          <ContactLinks />

          {/* Fourth column - Newsletter */}
          <Newsletter />
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-primary-foreground/20 py-6">
        <div className="container mx-auto text-center text-primary-foreground/80">
          <p>&copy; {currentYear} ExportiTrader. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};