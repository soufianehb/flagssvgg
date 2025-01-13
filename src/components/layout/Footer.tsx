import { ContactLinks } from "./footer/ContactLinks";
import { Newsletter } from "./footer/Newsletter";
import { QuickLinks } from "./footer/QuickLinks";
import { SocialIcons } from "./footer/SocialIcons";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Première colonne - Logo & Social */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-montserrat">
              <span className="text-accent">E</span>
              <span className="text-primary-foreground">xporti</span>
              <span className="text-accent">T</span>
              <span className="text-primary-foreground">rader</span>
            </h2>
            <p className="text-primary-foreground/80">
              Votre partenaire de confiance pour l'exportation et le commerce international.
            </p>
            <SocialIcons />
          </div>

          {/* Deuxième colonne - Quick Links */}
          <QuickLinks />

          {/* Troisième colonne - Contact */}
          <ContactLinks />

          {/* Quatrième colonne - Newsletter */}
          <Newsletter />
        </div>
      </div>

      {/* Section Copyright */}
      <div className="border-t border-primary-foreground/20 py-6">
        <div className="container mx-auto text-center text-primary-foreground/80">
          <p>&copy; {currentYear} ExportiTrader. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};