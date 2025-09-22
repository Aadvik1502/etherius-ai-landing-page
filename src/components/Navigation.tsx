import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import ethLogo from "../../icons/etherius_ai_logo.svg";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Mission", href: "#mission" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={ethLogo} 
              alt="Etherius AI Logo" 
              className="h-20 w-auto"
              loading="eager"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-neon-yellow transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
            <Button
              size="default"
              className="group shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[48px] bg-gradient-to-r from-neon-yellow to-green-400 text-black hover:from-neon-yellow/90 hover:to-green-400/90 neon-glow hover:shadow-neon-yellow/50"
              onClick={() => window.open('https://calendly.com/etheriusai/30min', '_blank')}
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
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced touch targets */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/20">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white hover:text-neon-yellow transition-colors duration-200 font-medium py-3 px-2 min-h-[48px] flex items-center rounded-lg hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button
              size="default"
              className="group shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[48px] bg-gradient-to-r from-neon-yellow to-green-400 text-black hover:from-neon-yellow/90 hover:to-green-400/90 neon-glow hover:shadow-neon-yellow/50 w-full mt-4 py-3"
              onClick={() => window.open('https://calendly.com/etheriusai/30min', '_blank')}
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