import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SocialIcon = ({ icon: Icon, href, label }: { icon: any; href: string; label: string }) => (
  <a
    href={href}
    aria-label={label}
    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
  >
    <Icon className="w-5 h-5" />
  </a>
);

export const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = ["Listings", "Directory", "Tools"];
  const contactLinks = ["Contact Us", "Legal Notice"];

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
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <SocialIcon
                  key={social.label}
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                />
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg font-montserrat">Quick Links</h3>
            <nav className="space-y-3" role="navigation">
              {quickLinks.map((link) => (
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

          {/* Contact Column */}
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

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg font-montserrat">Newsletter</h3>
            <div className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-primary-foreground/20 placeholder:text-primary-foreground/50 focus:border-accent font-open-sans"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/50" />
              </div>
              <Button variant="outline" className="w-full hover:bg-accent hover:text-white font-open-sans">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/20 text-center text-primary-foreground/80 font-open-sans">
          <p>&copy; {new Date().getFullYear()} ExportiTrader. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};