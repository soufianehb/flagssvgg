
import { useTranslation } from "@/lib/i18n";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const QuickLinks = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  const quickLinks = [
    { key: "home", label: "Home", path: "/home" },
    { key: "listings", label: t.footer.quickLinks.listings, path: "#" },
    { key: "directory", label: t.footer.quickLinks.directory, path: "#" },
    { key: "tools", label: t.footer.quickLinks.tools, path: "#" },
    ...(isAuthenticated ? [{ key: "profile", label: "Profile", path: "/profile" }] : [])
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg font-montserrat">{t.footer.quickLinks.title}</h3>
      <nav className="space-y-3" role="navigation" aria-label="Quick links">
        {quickLinks.map(({ key, label, path }) => (
          <Link
            key={key}
            to={path}
            className="block text-primary-foreground/80 hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary font-open-sans"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

