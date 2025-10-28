import { Separator } from "@/components/ui/separator";
import { Linkedin, Mail, Phone } from "lucide-react";
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
              alt="Etherius AI - Strategic AI Consulting and Implementation Services Logo"
              className="h-12 w-auto mb-6"
              loading="eager"
              width="180"
              height="48"
            />
            <p className="text-lg text-white italic mb-6">
              Strategic AI. Real Results.
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              <a
                href="mailto:team@etheriusai.co"
                className="flex items-center gap-2 text-white/80 hover:text-neon-yellow transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">team@etheriusai.co</span>
              </a>
              <a
                href="tel:+918130474476"
                className="flex items-center gap-2 text-white/80 hover:text-neon-yellow transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+91 8130474476</span>
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div className="space-y-4 md:text-right">
            <div className="flex flex-wrap gap-6 md:justify-end">
              <a href="/#services" className="text-white hover:text-neon-yellow transition-colors">
                Services
              </a>
              <a href="/#process" className="text-white hover:text-neon-yellow transition-colors">
                Process
              </a>
              <a href="/#mission" className="text-white hover:text-neon-yellow transition-colors">
                Mission
              </a>
              <a href="/#contact" className="text-white hover:text-neon-yellow transition-colors">
                Contact
              </a>
            </div>
            
            {/* Social links */}
            <div className="flex gap-4 md:justify-end">
              <a
                href="https://www.linkedin.com/company/etherius-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-card border border-border/20 hover:border-neon-yellow/50 text-white hover:text-neon-yellow transition-all duration-300"
                aria-label="Visit Etherius AI on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-border/20 mb-8" />

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">
          <div>
            © 2025 Etherius AI. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-neon-yellow transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-neon-yellow transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};