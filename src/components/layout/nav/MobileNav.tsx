import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Menu, Search, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 md:hidden">
        {/* Mobile Post Button */}
        <button className="flex items-center gap-1 rounded-lg bg-[#B08A38] px-3 py-1.5 text-sm text-white transition-all duration-200 hover:opacity-90 transform hover:scale-[0.98]">
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

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute left-0 right-0 top-20 border-t border-primary-foreground/20 py-4 space-y-4 bg-[#0A1836] md:hidden transition-all duration-300",
          isOpen ? "block opacity-100" : "hidden opacity-0"
        )}
      >
        {/* Search Bar */}
        <div className="flex items-center gap-2 mx-4 px-4 py-2 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10">
          <Search className="h-5 w-5 text-white/70" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent text-white placeholder-white/70 outline-none w-full"
          />
        </div>

        {/* Language Selector */}
        <button className="flex w-full items-center justify-between mx-4 rounded-lg border border-primary-foreground/20 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-foreground/10">
          <span>English</span>
          <Globe className="h-5 w-5" />
        </button>

        {/* Login Link */}
        <Link 
          to="/login" 
          className="flex w-full items-center gap-2 px-4 mx-4 py-2 text-white transition-colors duration-200 hover:text-[#B08A38]"
        >
          <User className="h-5 w-5" />
          <span>Login</span>
        </Link>

        {/* Full Width Post Button */}
        <button className="flex w-[calc(100%-2rem)] mx-4 items-center justify-center gap-2 rounded-lg bg-[#B08A38] px-6 py-2.5 font-medium text-white transition-all duration-200 hover:opacity-90 transform hover:scale-[0.98]">
          <span>Post</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </>
  );
};