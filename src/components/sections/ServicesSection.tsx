import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, Settings, Lightbulb, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Agents That Drive Real Results",
    description: "24/7 intelligent agents that handle customer service, operations, and workflows—reducing costs by up to 60% while boosting efficiency. Get a reliable AI workforce that works tirelessly for your business growth.",
    features: ["24/7 Customer Service", "Workflow Automation", "Cost Reduction up to 60%", "Scalable AI Workforce"]
  },
  {
    icon: MessageSquare,
    title: "Voice & Chat AI That Converts",
    description: "Human-like voice agents and chatbots that respond instantly, delight customers, and drive sales. Experience 3x faster response times, 85% customer satisfaction, and dramatically lower support costs.",
    features: ["3x Faster Response Times", "85% Customer Satisfaction", "Human-like Interactions", "Sales-Driven Conversations"]
  },
  {
    icon: Settings,
    title: "Smart Automations That Scale Your Business",
    description: "Custom workflow automations that eliminate bottlenecks and grow with your business. Remove manual tasks, connect your systems, and create an organization that runs 5x more efficiently.",
    features: ["5x Efficiency Gains", "System Integration", "Bottleneck Elimination", "Scalable Workflows"]
  },
  {
    icon: Lightbulb,
    title: "Strategic AI Solutions & Implementation",
    description: "End-to-end AI strategy and development tailored to your unique business goals. We design, build, and deploy custom AI systems that deliver guaranteed ROI from day one—not just consulting, complete solutions.",
    features: ["Custom AI Development", "Guaranteed ROI", "Complete Solutions", "Strategic Implementation"]
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Our <span className="text-neon-yellow">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From strategy to implementation, we provide comprehensive AI solutions 
            tailored to your business needs and objectives.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index}
                className="card-hover bg-deep-blue border-border/20 p-6 text-center group h-full"
              >
                <CardContent className="p-0">
                  <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl w-fit mx-auto mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow px-8 py-6 text-lg font-semibold group"
          >
            Book Your Free AI Strategy Session
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};