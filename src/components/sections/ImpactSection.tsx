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
            className="group shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[48px] bg-gradient-to-r from-neon-yellow to-green-400 text-black hover:from-neon-yellow/90 hover:to-green-400/90 neon-glow hover:shadow-neon-yellow/50 px-8 py-6 text-lg font-semibold"
            onClick={() => window.open('https://calendly.com/etheriusai/30min', '_blank')}
          >
            Book Your Free Discovery Call
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};