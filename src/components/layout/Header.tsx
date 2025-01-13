import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Menu, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <nav className="flex h-20 w-full items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0 py-2">
            <Link 
              to="/" 
              className="font-montserrat font-bold tracking-tight text-2xl md:text-3xl leading-[1.2] cursor-pointer transition-all duration-300"
            >
              <span className="text-accent">E</span>
              <span className="text-white">xporti</span>
              <span className="text-accent">T</span>
              <span className="text-white">rader</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Selector */}
            <button className="flex w-[140px] items-center justify-between rounded-lg border border-primary-foreground/20 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-foreground/10">
              <span>English</span>
              <Globe className="h-5 w-5" />
            </button>

            {/* Login Link */}
            <Link 
              to="/login" 
              className="flex items-center gap-2 text-white transition-colors duration-200 hover:text-accent"
            >
              <User className="h-5 w-5" />
              <span>Login</span>
            </Link>

            {/* Post Button */}
            <button className="flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 font-medium text-white transition-all duration-200 hover:opacity-90">
              <span>Post</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Post Button */}
            <button className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm text-white transition-all duration-200 hover:opacity-90">
              <span>Post</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white transition-colors duration-200 hover:bg-primary-foreground/10"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "border-t border-primary-foreground/20 py-4 space-y-4 md:hidden",
            isOpen ? "block" : "hidden"
          )}
        >
          {/* Language Selector */}
          <button className="flex w-full items-center justify-between rounded-lg border border-primary-foreground/20 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-foreground/10">
            <span>English</span>
            <Globe className="h-5 w-5" />
          </button>

          {/* Login Link */}
          <Link 
            to="/login" 
            className="flex w-full items-center gap-2 px-4 py-2 text-white transition-colors duration-200 hover:text-accent"
          >
            <User className="h-5 w-5" />
            <span>Login</span>
          </Link>

          {/* Full Width Post Button */}
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-2.5 font-medium text-white transition-all duration-200 hover:opacity-90">
            <span>Post</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};