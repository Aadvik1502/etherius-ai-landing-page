import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";
import { NotFoundSEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NotFoundSEO />
      <Navigation />

      {/* 404 Content */}
      <main className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          {/* Large 404 */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-white via-neon-yellow to-white bg-clip-text text-transparent opacity-90">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-neutral-gray leading-relaxed">
              The AI-powered page you're looking for has evolved beyond this URL.
              Let's redirect you back to solutions that drive real business results.
            </p>
          </div>

          {/* Attempted URL */}
          <div className="mb-8 p-4 bg-deep-blue rounded-lg border border-border/20">
            <p className="text-sm text-neutral-gray">
              Attempted URL: <span className="text-neon-yellow font-mono">{location.pathname}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Button
              onClick={() => window.location.href = '/'}
              className="w-full md:w-auto bg-neon-yellow text-black hover:bg-neon-yellow/90 font-semibold px-6 py-3 transition-all duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Homepage
            </Button>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full md:w-auto border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-black font-semibold px-6 py-3 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-border/20">
            <p className="text-neutral-gray mb-4">Looking for something specific?</p>
            <div className="space-x-4 text-sm">
              <a href="/#services" className="text-neon-yellow hover:underline">Our Services</a>
              <span className="text-neutral-gray">•</span>
              <a href="/#contact" className="text-neon-yellow hover:underline">Contact Us</a>
              <span className="text-neutral-gray">•</span>
              <a href="/privacy" className="text-neon-yellow hover:underline">Privacy Policy</a>
              <span className="text-neutral-gray">•</span>
              <a href="/terms" className="text-neon-yellow hover:underline">Terms</a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
