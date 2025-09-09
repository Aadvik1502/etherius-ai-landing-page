import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Zap, Shield, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI Strategy & Consulting",
    description: "Get expert guidance on how AI can transform your business operations and drive growth.",
    features: ["AI Readiness Assessment", "Strategic Roadmapping", "Technology Evaluation", "ROI Planning"]
  },
  {
    icon: Zap,
    title: "Custom AI Solutions",
    description: "Tailored AI implementations designed specifically for your business needs and processes.",
    features: ["Process Automation", "Intelligent Analytics", "Custom Models", "System Integration"]
  },
  {
    icon: Shield,
    title: "AI Implementation & Support",
    description: "End-to-end deployment and ongoing support to ensure your AI solutions deliver results.",
    features: ["Deployment & Testing", "Training & Onboarding", "Performance Monitoring", "Continuous Optimization"]
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
        <div className="grid md:grid-cols-3 gap-8 mb-16">
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
            Explore Our Services
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};