import { Separator } from "@/components/ui/separator";
import { Linkedin, Twitter } from "lucide-react";
import ethLogo from "@/assets/big_ethai_logo.svg";

export const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-darker-surface">
      <div className="container mx-auto max-w-6xl">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Brand section */}
          <div>
            <img 
              src={ethLogo} 
              alt="Etherius AI Logo" 
              className="h-12 w-auto mb-6"
              loading="eager"
            />
            <p className="text-lg text-muted-foreground italic mb-6">
              Strategic AI. Real Results.
            </p>
          </div>

          {/* Navigation links */}
          <div className="space-y-4 md:text-right">
            <div className="flex flex-wrap gap-6 md:justify-end">
              <a href="#services" className="text-muted-foreground hover:text-neon-yellow transition-colors">
                Services
              </a>
              <a href="#about" className="text-muted-foreground hover:text-neon-yellow transition-colors">
                About Us
              </a>
              <a href="#case-studies" className="text-muted-foreground hover:text-neon-yellow transition-colors">
                Case Studies
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-neon-yellow transition-colors">
                Contact
              </a>
            </div>
            
            {/* Social links */}
            <div className="flex gap-4 md:justify-end">
              <a 
                href="#"
                className="p-2 rounded-lg bg-card border border-border/20 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#"
                className="p-2 rounded-lg bg-card border border-border/20 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-border/20 mb-8" />

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            © 2025 Etherius AI. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-neon-yellow transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-neon-yellow transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};