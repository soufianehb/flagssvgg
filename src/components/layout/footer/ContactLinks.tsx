import { useTranslation } from "@/lib/i18n";

export const ContactLinks = () => {
  const { t } = useTranslation();
  const contactLinks = [
    { key: "contactUs", label: t.footer.contact.contactUs },
    { key: "legalNotice", label: t.footer.contact.legalNotice }
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg font-montserrat">{t.footer.contact.title}</h3>
      <nav className="space-y-3" role="navigation" aria-label="Contact links">
        {contactLinks.map(({ key, label }) => (
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