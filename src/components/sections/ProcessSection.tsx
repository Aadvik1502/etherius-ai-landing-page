import { Card, CardContent } from "@/components/ui/card";
import { Search, Hammer, TrendingUp } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    icon: Search,
    description: "We start by listening. Through a structured AI audit, we uncover where AI can create the biggest impact for your business—whether reducing costs, streamlining workflows, or unlocking new growth opportunities.",
    outcome: "a clear, prioritized roadmap for AI success."
  },
  {
    number: "02", 
    title: "Build",
    icon: Hammer,
    description: "With your roadmap in place, we design and deploy AI systems tailored to your goals. Our expertly crafted solutions are robust, scalable, and seamlessly integrated into your operations.",
    outcome: "a live AI solution delivering measurable ROI from day one."
  },
  {
    number: "03",
    title: "Grow", 
    icon: TrendingUp,
    description: "AI isn't just a project—it's a long-term advantage. We stay with you beyond deployment, optimizing performance, tracking impact, and scaling as your business evolves.",
    outcome: "AI that compounds value over time, giving you a sustained competitive edge."
  }
];

export const ProcessSection = () => {
  return (
    <section className="py-24 px-6 bg-darker-surface">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            We partner with you to turn AI into a lasting{" "}
            <span className="text-neon-yellow">competitive advantage</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            AI adoption shouldn't be overwhelming. At Etherius, we guide you through a clear, results-driven journey—helping you move from untapped potential to measurable business impact.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-8">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card 
                key={index}
                className="card-hover bg-deep-blue border-border/20 p-8 group"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Step number and icon */}
                    <div className="flex items-center gap-4 md:min-w-[200px]">
                      <div className="text-6xl font-bold text-primary/20">
                        {step.number}
                      </div>
                      <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-4 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <div className="border-l-2 border-primary/30 pl-4">
                        <p className="text-sm font-semibold text-primary">
                          Outcome: <span className="font-normal text-muted-foreground">{step.outcome}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};