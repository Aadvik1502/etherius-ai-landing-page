import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingDown, Zap, Heart, ArrowRight } from "lucide-react";

const stats = [
  {
    icon: TrendingDown,
    percentage: "56%",
    description: "reduction in support costs through intelligent automation"
  },
  {
    icon: Zap,
    percentage: "6x",
    description: "faster workflows with AI-powered process redesign"
  },
  {
    icon: Heart,
    percentage: "30%",
    description: "increase in customer satisfaction with voice and chat agents"
  }
];

export const ImpactSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            The Etherius <span className="text-neon-yellow">Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Partnering with Etherius means more than adopting technology—it means embedding AI as a driver of measurable business advantage. Our clients achieve results that redefine efficiency, growth, and competitiveness.
          </p>
          <h3 className="text-2xl font-semibold text-foreground mb-12">
            Proven Results Across Businesses:
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card 
                key={index}
                className="card-hover bg-deep-blue border-border/20 p-8 text-center group"
              >
                <CardContent className="p-0">
                  <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl w-fit mx-auto mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 neon-glow">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-neon-yellow mb-4">
                    {stat.percentage}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Lead with <span className="text-neon-yellow">AI</span>?
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
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