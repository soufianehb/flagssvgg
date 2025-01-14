import { Link } from "react-router-dom";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileNav } from "./nav/MobileNav";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#0A1836] shadow-lg">
      <div className="mx-auto max-w-[1536px] px-4 lg:px-8">
        <nav className="flex h-20 w-full items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0 py-2">
            <Link 
              to="/" 
              className="font-montserrat font-bold tracking-tight text-2xl md:text-3xl leading-[1.2] cursor-pointer transition-all duration-200"
            >
              <span className="text-[#B08A38]">E</span>
              <span className="text-white">xporti</span>
              <span className="text-[#B08A38]">T</span>
              <span className="text-white">rader</span>
              <sup className="text-[#B08A38] text-sm -top-3 ml-0.9">.com</sup>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Mobile Navigation */}
          <MobileNav />
        </nav>
      </div>
    </header>
  );
};
