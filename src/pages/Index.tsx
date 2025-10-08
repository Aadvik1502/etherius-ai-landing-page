import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeSEO } from "@/components/SEO";
import { LeadCapturePopup } from "@/components/LeadCapturePopup";
// Lazy load non-critical sections for better performance
import { lazy, Suspense, useEffect } from "react";

const ProblemStatementSection = lazy(() => import("@/components/sections/ProblemStatementSection").then(m => ({ default: m.ProblemStatementSection })));
const SolutionOverviewSection = lazy(() => import("@/components/sections/SolutionOverviewSection").then(m => ({ default: m.SolutionOverviewSection })));
const ServicesSection = lazy(() => import("@/components/sections/ServicesSection").then(m => ({ default: m.ServicesSection })));
const ProcessSection = lazy(() => import("@/components/sections/ProcessSection").then(m => ({ default: m.ProcessSection })));
const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(m => ({ default: m.ContactSection })));
const Footer = lazy(() => import("@/components/sections/Footer").then(m => ({ default: m.Footer })));

// Loading component for better UX
const SectionSkeleton = () => (
  <div className="w-full h-96 bg-background/50 animate-pulse rounded-lg" />
);

const Index = () => {
  // Handle hash navigation when page loads
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for sections to load, then scroll to hash
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HomeSEO />
      <Navigation />
      <LeadCapturePopup />
      <main id="main-content" role="main" aria-label="Main website content">
        <HeroSection />
      <Suspense fallback={<SectionSkeleton />}>
        <ProblemStatementSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <SolutionOverviewSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Footer />
      </Suspense>
      </main>
    </div>
  );
};

export default Index;
