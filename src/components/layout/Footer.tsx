import { SocialIcons } from "./footer/SocialIcons";
import { QuickLinks } from "./footer/QuickLinks";
import { ContactLinks } from "./footer/ContactLinks";
import { Newsletter } from "./footer/Newsletter";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Social Column */}
          <div className="space-y-4">
            <div className="text-2xl font-bold font-montserrat">
              <span className="text-accent">E</span>xporti
              <span className="text-accent">T</span>rader
            </div>
            <p className="text-primary-foreground/80 font-open-sans">
              Your trusted platform for international trade and business connections.
            </p>
            <SocialIcons />
          </div>

          <QuickLinks />
          <ContactLinks />
          <Newsletter />
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/20 text-center text-primary-foreground/80 font-open-sans">
          <p>&copy; {new Date().getFullYear()} ExportiTrader. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};