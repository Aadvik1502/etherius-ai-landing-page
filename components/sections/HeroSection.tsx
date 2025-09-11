import { Button } from "@/components/ui/button";
import { TypewriterText } from "@/components/TypewriterText";
import { ArrowRight, Users, Star } from "lucide-react";
import avatar1 from "@/assets/customer-avatar-1.jpg";
import avatar2 from "@/assets/customer-avatar-2.jpg";
import avatar3 from "@/assets/customer-avatar-3.jpg";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative pt-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-darker-surface to-background opacity-50" />
      
      <div className="container mx-auto text-center z-10 max-w-6xl">
        {/* Customer avatars and testimonial */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex -space-x-2">
            <img 
              src={avatar1} 
              alt="Customer testimonial" 
              className="w-8 h-8 rounded-full border-2 border-background object-cover"
            />
            <img 
              src={avatar2} 
              alt="Customer testimonial" 
              className="w-8 h-8 rounded-full border-2 border-background object-cover"
            />
            <img 
              src={avatar3} 
              alt="Customer testimonial" 
              className="w-8 h-8 rounded-full border-2 border-background object-cover"
            />
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground ml-4">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span>Trusted by 200+ businesses</span>
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

      </div>
    </section>
  );
};