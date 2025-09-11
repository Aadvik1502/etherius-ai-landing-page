import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const ImpactSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Lead with <span className="text-neon-yellow">AI</span>?
          </h3>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed mb-8">
            The AI revolution is already here. The question is whether you'll be leading it or chasing it. At Etherius, we partner with you to adopt AI with clarity and confidence—and deliver results that last.
          </p>
          <p className="text-lg font-semibold text-foreground mb-8">
            Let's explore what AI can do for your business.
          </p>
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow px-8 py-6 text-lg font-semibold group"
          >
            Book Your Free Discovery Call
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};