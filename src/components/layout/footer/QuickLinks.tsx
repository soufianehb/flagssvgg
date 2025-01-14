import { useTranslation } from "@/lib/i18n";

export const QuickLinks = () => {
  const { t } = useTranslation();
  const quickLinks = [
    { key: "listings", label: t.footer.quickLinks.listings },
    { key: "directory", label: t.footer.quickLinks.directory },
    { key: "tools", label: t.footer.quickLinks.tools }
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg font-montserrat">{t.footer.quickLinks.title}</h3>
      <nav className="space-y-3" role="navigation" aria-label="Quick links">
        {quickLinks.map(({ key, label }) => (
          <a
            key={key}
            href="#"
            className="block text-primary-foreground/80 hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary font-open-sans"
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
};