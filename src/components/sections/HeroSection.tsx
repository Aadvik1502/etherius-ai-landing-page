import { Button } from "@/components/ui/button";
import { TypewriterText } from "@/components/TypeWriterText";
import { ArrowRight, Users, Star } from "lucide-react";
import headshot1 from "@/assets/customer-headshot-1.jpg";
import headshot2 from "@/assets/customer-headshot-2.jpg";
import headshot3 from "@/assets/customer-headshot-3.jpg";

export const HeroSection = () => {
  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center px-6 relative pt-20"
      aria-label="Hero section with company introduction and call-to-action"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-darker-surface to-background opacity-50" />
      
      <div className="container mx-auto text-center z-10 max-w-6xl">
        {/* Customer avatars and testimonial */}
        <div className="flex items-center justify-center gap-1 mb-8">
          <div className="flex -space-x-2">
            <img 
              src={headshot1} 
              alt="Sarah Chen, Marketing Director" 
              className="w-8 h-8 rounded-full border-2 border-primary/20 object-cover shadow-lg"
              loading="eager"
            />
            <img 
              src={headshot2} 
              alt="Michael Thompson, CEO" 
              className="w-8 h-8 rounded-full border-2 border-primary/20 object-cover shadow-lg"
              loading="eager"
            />
            <img 
              src={headshot3} 
              alt="David Williams, CTO" 
              className="w-8 h-8 rounded-full border-2 border-primary/20 object-cover shadow-lg"
              loading="eager"
            />
          </div>
          <div className="flex items-center gap-1 text-sm text-white">
            <div className="flex -space-x-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <Star className="w-4 h-4 fill-primary text-primary" />
              <Star className="w-4 h-4 fill-primary text-primary" />
              <Star className="w-4 h-4 fill-primary text-primary" />
              <Star className="w-4 h-4 fill-primary text-primary" />
            </div>
            <span className="font-medium">Trusted by 25+ businesses</span>
          </div>
        </div>

        {/* Typewriter headline */}
        <TypewriterText />

        {/* Sub-text */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
          We help businesses adopt AI with clarity and confidence—delivering{" "}
          <span className="text-neon-yellow font-semibold">efficiency</span>,{" "}
          <span className="text-neon-yellow font-semibold">growth</span>, and lasting{" "}
          <span className="text-neon-yellow font-semibold">competitive advantage</span>.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow px-8 py-6 text-lg font-semibold group"
          >
            Unlock Your AI Advantage
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Trusted by logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
          <div className="text-sm font-medium text-muted-foreground">Trusted by companies across industries</div>
        </div>
      </div>
    </section>
  );
};