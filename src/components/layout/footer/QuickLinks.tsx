const quickLinks = ["Listings", "Directory", "Tools"];

export const QuickLinks = () => (
  <div className="space-y-4">
    <h3 className="font-bold text-lg font-montserrat">Quick Links</h3>
    <nav className="space-y-3" role="navigation" aria-label="Quick links">
      {quickLinks.map((link) => (
        <a
          key={link}
          href="#"
          className="block text-primary-foreground/80 hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary font-open-sans"
        >
          {link}
        </a>
      ))}
    </nav>
  </div>
);