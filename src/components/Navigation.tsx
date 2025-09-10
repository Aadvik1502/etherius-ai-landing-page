import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ethLogo from "@/assets/eth_logo.png";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Impact", href: "#impact" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={ethLogo} 
              alt="Etherius AI Logo" 
              className="h-10 w-auto"
              loading="eager"
            />
            <h2 className="text-2xl font-bold">
              <span className="text-neon-yellow">Etherius</span>{" "}
              <span className="text-foreground">AI</span>
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-neon-yellow transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow"
            >
              Unlock Your AI Advantage
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-neon-yellow"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border/20">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-muted-foreground hover:text-neon-yellow transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Unlock Your AI Advantage
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};