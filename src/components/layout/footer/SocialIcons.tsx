import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export const SocialIcons = () => (
  <div className="flex space-x-4 mt-6">
    {socialLinks.map(({ icon: Icon, href, label }) => (
      <a
        key={label}
        href={href}
        aria-label={label}
        className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
      >
        <Icon className="w-5 h-5" />
      </a>
    ))}
  </div>
);