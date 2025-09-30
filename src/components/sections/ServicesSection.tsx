import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, DollarSign, Users, Target, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useVisibilityTracking } from "@/components/Analytics";
import aiPartnershipIcon from "@/../icons/services_section/ai_partnership.svg";
import aiSalesIcon from "@/../icons/services_section/ai_sales.svg";
import aiAutomationIcon from "@/../icons/services_section/ai_automation.svg";
import customerExperienceIcon from "@/assets/customer_experience.svg";

const services = [
  {
    id: "strategic-partnership",
    icon: aiPartnershipIcon,
    title: "Strategic AI Partnership",
    altText: "AI partnership services icon showing connected business network nodes representing strategic collaboration",
    promise: "Custom AI solutions built specifically for your business",
    credibility: "ROI-focused with proven results",
    hook: "Start your AI transformation",
    description: [
      "✓ Complete AI transformation from strategy to deployment",
      "✓ Custom AI agents built specifically for your business operations",
      "✓ Dedicated AI team that integrates seamlessly with your operations",
      "✓ Scalable solutions that evolve and grow with your business"
    ],
    impact: [
      "Your business operates with cutting-edge AI advantage",
      "Custom solutions grow and adapt with your business",
      "You stay ahead of competitors with continuous innovation"
    ],
    colorScheme: "purple", // purple for premium/expertise/strategic partnership
    testimonial: "Best AI partnership decision we've ever made. True experts.",
    client: "Financial Services CTO",
    cta: "Start Partnership"
  },
  {
    id: "revenue-growth",
    icon: aiSalesIcon,
    title: "AI Sales Teams That Work 24/7",
    altText: "AI sales automation icon depicting 24/7 sales funnel with revenue growth arrows and conversion metrics",
    promise: "Turn every lead into a qualified opportunity while you sleep",
    credibility: "Proven across industries",
    hook: "See how it works for your industry",
    description: [
      "✓ AI sales agents that qualify and convert leads 24/7",
      "✓ Voice AI systems that turn every call into revenue opportunities",
      "✓ Intelligent lead scoring that identifies your highest-value prospects",
      "✓ Revenue optimization that discovers hidden growth opportunities"
    ],
    impact: [
      "Your sales team works 24/7 without breaks or sick days",
      "Every lead gets qualified instantly and personally",
      "Revenue growth becomes predictable and scalable"
    ],
    colorScheme: "emerald", // emerald green for money/growth/prosperity
    testimonial: "Revenue increased 280% in 6 months with their AI sales system.",
    client: "TechCorp CEO",
    cta: "Boost Revenue Now"
  },
  {
    id: "cost-optimization",
    icon: aiAutomationIcon,
    title: "AI Automations That Save Money",
    altText: "Cost optimization icon showing efficiency arrows, dollar savings symbols, and automated workflow processes",
    promise: "Cut overhead costs without cutting quality or staff",
    credibility: "Delivering measurable cost reductions",
    hook: "Show me the savings",
    description: [
      "✓ AI agents that eliminate operational waste automatically",
      "✓ Smart workflow automations that cuts manual work by 80%",
      "✓ Intelligent bottleneck detection and removal systems",
      "✓ Workflow optimization that runs continuously while you sleep"
    ],
    impact: [
      "Your business runs efficiently without constant oversight",
      "Manual bottlenecks disappear and processes flow smoothly",
      "Cost savings compound month after month automatically"
    ],
    colorScheme: "orange", // orange for action/energy/savings
    testimonial: "Saved $1.2M annually through intelligent automation.",
    client: "Manufacturing Corp CFO",
    cta: "Cut Costs Today"
  },
  {
    id: "customer-experience",
    icon: customerExperienceIcon,
    title: "24/7 AI Customer Support",
    altText: "Customer experience icon with chat bubbles, satisfaction metrics, and 24/7 support symbols",
    promise: "Every customer query answered perfectly, instantly",
    credibility: "Trusted by businesses nationwide",
    hook: "See our support in action",
    description: [
      "✓ 24/7 AI support agents that feel completely human",
      "✓ Voice AI assistants that handle complex customer queries",
      "✓ Proactive care systems that solve problems before they happen",
      "✓ Personalized experiences that increase customer lifetime value"
    ],
    impact: [
      "Customers get instant, perfect support at any hour",
      "Your team focuses on growth instead of repetitive queries",
      "Customer loyalty increases with consistent, quality service"
    ],
    colorScheme: "blue", // blue for trust/reliability/support
    testimonial: "Customer satisfaction jumped from 72% to 94% in 3 months.",
    client: "E-commerce Director",
    cta: "Delight Customers"
  }
];

// Counter animation hook
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startCount = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(startCount + (end - startCount) * progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return { count, elementRef };
};

const getColorClasses = (colorScheme: string) => {
  switch (colorScheme) {
    case 'emerald':
      return {
        accent: 'text-emerald-400/70',
        accentBg: 'bg-emerald-400',
        border: 'border-emerald-400/15 hover:border-emerald-400/30',
        bg: 'bg-slate-900/90',
        glow: 'hover:shadow-emerald-400/10'
      };
    case 'orange':
      return {
        accent: 'text-orange-400/70',
        accentBg: 'bg-orange-400',
        border: 'border-orange-400/15 hover:border-orange-400/30',
        bg: 'bg-slate-900/90',
        glow: 'hover:shadow-orange-400/10'
      };
    case 'blue':
      return {
        accent: 'text-blue-400/70',
        accentBg: 'bg-blue-400',
        border: 'border-blue-400/15 hover:border-blue-400/30',
        bg: 'bg-slate-900/90',
        glow: 'hover:shadow-blue-400/10'
      };
    case 'purple':
      return {
        accent: 'text-purple-400/70',
        accentBg: 'bg-purple-400',
        border: 'border-purple-400/15 hover:border-purple-400/30',
        bg: 'bg-slate-900/90',
        glow: 'hover:shadow-purple-400/10'
      };
    default:
      return {
        accent: 'text-emerald-400/70',
        accentBg: 'bg-emerald-400',
        border: 'border-emerald-400/15 hover:border-emerald-400/30',
        bg: 'bg-slate-900/90',
        glow: 'hover:shadow-emerald-400/10'
      };
  }
};

export const ServicesSection = () => {
  const { sectionRef } = useVisibilityTracking({ sectionName: 'services' });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [expandedImpacts, setExpandedImpacts] = useState<Record<string, boolean>>({});

  const toggleImpact = (serviceId: string) => {
    setExpandedImpacts(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  // Call all hooks at the top level
  const counters = [
    useCounter(3),    // Revenue growth: 3x
    useCounter(68),   // Cost optimization: 68%
    useCounter(85),   // Customer experience: 85%
    useCounter(240)   // Strategic partnership: 240%
  ];

  return (
    <section ref={sectionRef} id="services" className="py-16 md:py-20 lg:py-24 px-6 relative overflow-hidden bg-gradient-to-br from-darker-surface via-background to-darker-surface" aria-labelledby="services-heading" role="main">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/6 left-1/8 w-32 h-32 bg-gradient-to-br from-neon-yellow/15 to-green-400/15 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-3/4 right-1/6 w-28 h-28 bg-gradient-to-br from-green-400/20 to-neon-yellow/20 rounded-full blur-2xl opacity-30" />
        <div className="absolute top-1/2 left-2/3 w-24 h-24 bg-gradient-to-br from-neon-yellow/25 to-green-400/25 rounded-full blur-2xl opacity-50" />
        <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-gradient-to-br from-green-400/15 to-neon-yellow/15 rounded-full blur-xl opacity-35" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-2 bg-grid-pattern" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 id="services-heading" className="text-5xl md:text-6xl font-bold mb-8 text-white">
            Our <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Four strategic AI solutions designed to transform your business.
          </p>
        </div>

        {/* Impact Grid - 2x2 Layout on All Screen Sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const colors = getColorClasses(service.colorScheme);
            const isHovered = hoveredCard === service.id;
            const { count, elementRef } = counters[index];

            return (
              <Card
                key={service.id}
                ref={elementRef}
                className={`group cursor-pointer transform transition-all duration-300 hover:scale-[1.005]
                  ${colors.bg} ${colors.border} border
                  ${isHovered ? 'shadow-xl ' + colors.glow : 'shadow-lg shadow-black/50'}
                  relative overflow-hidden hover:-translate-y-1 focus-within:ring-4 focus-within:ring-neon-yellow/50`}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                role="article"
                aria-labelledby={`service-title-${service.id}`}
                aria-describedby={`service-description-${service.id}`}
                tabIndex={0}
              >
                <CardContent className="p-4 md:p-6 lg:p-8 relative z-10">
                  {/* Professional Icon */}
                  <div className="text-center mb-3 md:mb-4 lg:mb-6">
                    <div className={`inline-flex p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl bg-white/5 group-hover:scale-[1.02] transition-transform duration-300`}>
                      <img
                        src={service.icon}
                        alt={service.altText}
                        className={service.id === 'strategic-partnership' ? 'w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-[68px] xl:h-[68px]' : 'w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 xl:w-16 xl:h-16'}
                        width={service.id === 'strategic-partnership' ? '68' : '64'}
                        height={service.id === 'strategic-partnership' ? '68' : '64'}
                        loading="lazy"
                        decoding="async"
                        role="img"
                        style={{
                          filter: service.colorScheme === 'emerald' ? 'brightness(0) saturate(100%) invert(64%) sepia(88%) saturate(1425%) hue-rotate(95deg) brightness(98%) contrast(87%)' :
                                  service.colorScheme === 'orange' ? 'brightness(0) saturate(100%) invert(71%) sepia(100%) saturate(1000%) hue-rotate(3deg) brightness(101%) contrast(107%)' :
                                  service.colorScheme === 'blue' ? 'brightness(0) saturate(100%) invert(45%) sepia(100%) saturate(3000%) hue-rotate(217deg) brightness(90%) contrast(140%)' :
                                  'brightness(0) saturate(100%) invert(60%) sepia(77%) saturate(7471%) hue-rotate(265deg) brightness(98%) contrast(104%)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Capability Statement */}
                  <div className="text-center mb-3 md:mb-4 lg:mb-6">
                    <h3 id={`service-title-${service.id}`} className={`text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight ${
                      service.colorScheme === 'emerald' ? 'bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent' :
                      service.colorScheme === 'orange' ? 'bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent' :
                      service.colorScheme === 'blue' ? 'bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent' :
                      'bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent'
                    }`}>
                      {service.title}
                    </h3>
                  </div>

                  {/* Service Description */}
                  <div className="text-center mb-4 md:mb-6 lg:mb-8">
                    <p id={`service-description-${service.id}`} className="text-white text-sm md:text-base lg:text-lg leading-relaxed font-medium px-1">
                      {service.promise}
                    </p>
                  </div>

                  {/* Always Visible Content */}
                  <div>
                      {/* What We Deliver */}
                      <div className="border-t border-white/10 pt-3 md:pt-4 lg:pt-6 mb-3 md:mb-4 lg:mb-6">
                        <h4 className={`font-bold mb-2 md:mb-3 lg:mb-4 text-sm md:text-base ${colors.accent}`}>
                          What We Deliver:
                        </h4>
                        <div className="space-y-1 md:space-y-2 lg:space-y-3">
                          {service.description.map((point, idx) => (
                            <div key={idx} className="flex items-start space-x-3 group">
                              <div className="flex-shrink-0 mt-1">
                                <span className={`text-lg font-bold ${colors.accent} group-hover:scale-110 transition-transform duration-200`}>✓</span>
                              </div>
                              <span className="text-white text-xs md:text-sm lg:text-base leading-relaxed">{point.replace('✓ ', '')}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* The Impact - Collapsible */}
                      <div className="border-t border-white/10 pt-6 mb-6">
                        <button
                          onClick={() => toggleImpact(service.id)}
                          className={`flex items-center space-x-2 font-bold mb-4 text-base ${colors.accent} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-yellow/50 rounded-lg p-2 hover:bg-white/5`}
                          aria-expanded={expandedImpacts[service.id]}
                          aria-controls={`impact-content-${service.id}`}
                          aria-label={`${expandedImpacts[service.id] ? 'Hide' : 'Show'} impact details for ${service.title}`}
                        >
                          <span>The Impact</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              expandedImpacts[service.id] ? 'rotate-180' : 'rotate-0'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                        <div
                          id={`impact-content-${service.id}`}
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            expandedImpacts[service.id]
                              ? 'max-h-96 opacity-100'
                              : 'max-h-0 opacity-0'
                          }`}
                          aria-hidden={!expandedImpacts[service.id]}
                        >
                          <div className="space-y-4 pb-2">
                            {service.impact.map((impact, idx) => (
                              <div key={idx} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200">
                                <div className="flex-shrink-0">
                                  <div className={`w-2 h-2 rounded-full ${colors.accentBg} animate-pulse`}></div>
                                </div>
                                <span className="text-white leading-relaxed font-medium">{impact}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                  </div>

                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Ready to Scale CTA Text */}
        <div className="text-center mt-12 md:mt-16 lg:mt-20">
          <p
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth'
              });
            }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-neon-yellow hover:text-neon-yellow/80 cursor-pointer transition-all duration-300 group inline-flex items-center gap-2"
          >
            <span>Ready to Scale with AI?</span>
            <ArrowRight className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 group-hover:translate-x-1 transition-transform duration-300" />
          </p>
        </div>

      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(206, 252, 85, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(206, 252, 85, 0.02) 1px, transparent 1px);
          background-size: 80px 80px;
        }
      `}</style>
    </section>
  );
};