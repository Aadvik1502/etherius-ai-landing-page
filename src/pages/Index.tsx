import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <ImpactSection />
      <ServicesSection />
      <ProcessSection />
      <SocialProofSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
