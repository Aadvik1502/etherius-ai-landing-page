import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemStatementSection } from "@/components/sections/ProblemStatementSection";
import { SolutionOverviewSection } from "@/components/sections/SolutionOverviewSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { HomeSEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HomeSEO />
      <Navigation />
      <HeroSection />
      <ProblemStatementSection />
      <SolutionOverviewSection />
      <ServicesSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
