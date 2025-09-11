import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Etherius didn't just implement technology - they transformed how we think about AI. Their business-first approach delivered results that exceeded our expectations.",
    author: "Sarah Johnson",
    title: "CTO, TechCorp",
    company: "TechCorp"
  },
  {
    quote: "The ROI was clear within 6 months. Etherius' expertise saved us from costly mistakes and accelerated our AI journey.",
    author: "Michael Chen",
    title: "VP Innovation, Manufacturing Corp",
    company: "Manufacturing Corp"
  },
  {
    quote: "Finally, an AI consulting firm that speaks business language, not just tech jargon. They made complex AI concepts understandable for our entire leadership team.",
    author: "Amanda Rodriguez",
    title: "CDO, Financial Services Inc",
    company: "Financial Services Inc"
  }
];

export const SocialProofSection = () => {
  return (
    <section className="py-24 px-6 bg-darker-surface">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            What Our <span className="text-neon-yellow">Clients Say</span>
          </h2>
          <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what business leaders say about partnering with Etherius AI.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="card-hover bg-deep-blue border-border/20 p-8 group"
            >
              <CardContent className="p-0">
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-primary/60" />
                </div>
                <blockquote className="text-white leading-relaxed mb-6 italic text-lg">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-l-2 border-primary/30 pl-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-white">
                    {testimonial.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};