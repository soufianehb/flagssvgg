const contactLinks = ["Contact Us", "Legal Notice"];

export const ContactLinks = () => (
  <div className="space-y-4">
    <h3 className="font-bold text-lg font-montserrat">Contact</h3>
    <nav className="space-y-3" role="navigation">
      {contactLinks.map((link) => (
        <a
          key={link}
          href="#"
          className="block text-primary-foreground/80 hover:text-accent transition-colors duration-200 font-open-sans"
        >
          {link}
        </a>
      ))}
    </nav>
  </div>
);