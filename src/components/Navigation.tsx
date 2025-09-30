import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import ethLogo from "@/assets/etherius_ai_logo.svg";
import { useCTATracking } from "@/components/Analytics";

export const Navigation = () => {
  const { trackCTAClick } = useCTATracking();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Mission", href: "#mission" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-0 overflow-hidden" style={{backgroundColor: 'rgba(8, 8, 8, 0.95)', borderTop: 'none', outline: 'none'}} role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" aria-label="Etherius AI Home">
              <img
                src={ethLogo}
                alt="Etherius AI Logo - AI Consulting Firm"
                className="h-12 md:h-20 w-auto object-contain"
                width="160"
                height="80"
                loading="eager"
                fetchpriority="high"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" role="menu" aria-label="Desktop navigation menu">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-neon-yellow transition-colors duration-200 font-medium flex items-center h-12"
                role="menuitem"
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </a>
            ))}
            <Button
              size="default"
              className="group shadow-lg transform hover:scale-105 transition-all duration-300 h-12 bg-gradient-to-r from-neon-yellow to-green-400 text-black hover:from-neon-yellow/90 hover:to-green-400/90 flex items-center border border-neon-yellow/20 hover:border-neon-yellow/40"
              onClick={() => {
                trackCTAClick('secondary', 'Book a Discovery Call', 'navigation-desktop');
                window.open('https://calendly.com/etheriusai/30min', '_blank');
              }}
              aria-label="Book a Discovery Call - Opens in new tab"
            >
              Book a Discovery Call
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          {/* Mobile menu button - Enhanced touch target */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-neon-yellow min-h-[48px] min-w-[48px] p-3"
              aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced touch targets */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/20" id="mobile-menu" role="menu" aria-label="Mobile navigation menu">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white hover:text-neon-yellow transition-colors duration-200 font-medium py-3 px-2 min-h-[48px] flex items-center rounded-lg hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </a>
            ))}
            <Button
              size="default"
              className="group shadow-lg transform hover:scale-105 transition-all duration-300 min-h-[48px] bg-gradient-to-r from-neon-yellow to-green-400 text-black hover:from-neon-yellow/90 hover:to-green-400/90 w-full mt-4 py-3 border border-neon-yellow/20 hover:border-neon-yellow/40"
              onClick={() => {
                trackCTAClick('secondary', 'Book a Discovery Call', 'navigation-mobile');
                window.open('https://calendly.com/etheriusai/30min', '_blank');
              }}
              aria-label="Book a Discovery Call - Opens in new tab"
            >
              Book a Discovery Call
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};