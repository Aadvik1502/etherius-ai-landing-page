import { Card, CardContent } from "@/components/ui/card";
import { Search, Hammer, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useVisibilityTracking } from "@/components/Analytics";

const journeySteps = [
  {
    number: "01",
    title: "Uncover",
    icon: Search,
    description: "We start by listening. Through deep partnership, we uncover where AI can create transformational impact for your business—identifying opportunities that drive real competitive advantage and measurable growth.",
    outcome: "Your personalized AI transformation roadmap."
  },
  {
    number: "02",
    title: "Transform",
    icon: Hammer,
    description: "Side by side, we design and deploy AI systems tailored to your goals. Our battle-tested solutions integrate seamlessly with your operations, delivering measurable ROI from day one of deployment.",
    outcome: "Live AI systems generating immediate business value."
  },
  {
    number: "03",
    title: "Scale",
    icon: TrendingUp,
    description: "AI transformation doesn't end at launch. We stay with you as strategic partners, optimizing performance and scaling solutions as your business evolves and grows in the AI-first economy.",
    outcome: "Continuously evolving AI advantage that compounds over time."
  }
];

// Floating Background Elements
const FloatingShape = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <div
    className={`absolute opacity-5 ${className}`}
    style={{
      animation: `float 8s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  >
    <div className="w-24 h-24 bg-gradient-to-br from-neon-yellow/30 to-green-400/30 rounded-full blur-2xl" />
  </div>
);

// Flowing River Timeline Component - Desktop version only
const FlowingTimeline = ({ progress }: { progress: number }) => (
  <div className="absolute left-12 top-0 w-0.5 h-full hidden lg:block z-10">
    <div className="w-full h-full relative">
      {/* Background river */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-yellow/20 to-transparent rounded-full" />
      {/* Animated progress */}
      <div
        className="w-full bg-gradient-to-b from-neon-yellow via-green-400 to-neon-yellow rounded-full transition-all duration-1000 ease-out"
        style={{ height: `${progress}%` }}
      />
      {/* Floating progress indicator */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <div
          className="w-3 h-3 bg-neon-yellow rounded-full absolute shadow-lg border border-white/20"
          style={{
            top: `${Math.min(progress, 95)}%`,
            transform: 'translateX(-50%)',
            boxShadow: '0 0 15px rgba(206, 252, 85, 0.8)'
          }}
        />
      </div>
    </div>
  </div>
);

// Mobile Center Timeline Connector
const MobileCenterConnector = ({ isLast = false }: { isLast?: boolean }) => (
  <div className="lg:hidden flex justify-center my-6">
    <div className="flex flex-col items-center">
      {!isLast && (
        <div className="w-0.5 h-12 bg-gradient-to-b from-neon-yellow/40 to-green-400/40 rounded-full" />
      )}
      <div className="w-3 h-3 bg-gradient-to-br from-neon-yellow to-green-400 rounded-full shadow-lg border border-white/20" style={{ boxShadow: '0 0 10px rgba(206, 252, 85, 0.6)' }} />
      {!isLast && (
        <div className="w-0.5 h-12 bg-gradient-to-b from-green-400/40 to-neon-yellow/40 rounded-full" />
      )}
    </div>
  </div>
);

// Enhanced Journey Step Component with Better Layout
const JourneyStepCard = ({ step, index, isVisible }: { step: typeof journeySteps[0], index: number, isVisible: boolean }) => {
  const IconComponent = step.icon;

  return (
    <div
      className="relative w-full max-w-6xl mx-auto mb-6 lg:mb-16"
      style={{
        animation: isVisible ? `flowIn 1s ease-out forwards` : 'none',
        opacity: isVisible ? 1 : 0,
        animationDelay: `${index * 300}ms`
      }}
    >
      {/* Main Content Card */}
      <Card className="relative group bg-gradient-to-br from-deep-blue/90 via-card/90 to-deep-blue/80 border-2 border-neon-yellow/20 hover:border-neon-yellow/60 transition-all duration-500 hover:shadow-xl hover:shadow-neon-yellow/10 overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-yellow/8 via-transparent to-green-400/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="relative z-10 p-6 md:p-8 lg:p-12">
          <div className="grid lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-center">

            {/* Left: Step Number & Icon - Mobile Optimized */}
            <div className="lg:col-span-2 flex lg:flex-col items-center gap-3 lg:gap-6">
              <div className="relative flex items-center justify-center">
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-br from-neon-yellow/60 to-green-400/60 bg-clip-text text-transparent">
                  {step.number}
                </div>
              </div>

              <div className="relative p-3 md:p-4 bg-gradient-to-br from-neon-yellow/10 to-green-400/10 rounded-lg lg:rounded-xl group-hover:from-neon-yellow/20 group-hover:to-green-400/20 transition-all duration-300 border border-neon-yellow/20">
                <IconComponent className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-neon-yellow group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-neon-yellow/10 to-green-400/10 rounded-lg lg:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Center: Main Content - Mobile Optimized */}
            <div className="lg:col-span-10 space-y-4 md:space-y-5 lg:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-neon-yellow via-green-400 to-neon-yellow bg-clip-text text-transparent transition-all duration-500 leading-tight">
                  {step.title}
                </h3>

                <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed transition-colors duration-300">
                  {step.description}
                </p>
              </div>

              {/* Enhanced Outcome Section - Mobile Optimized */}
              <div className="relative p-4 md:p-5 lg:p-6 bg-gradient-to-r from-neon-yellow/5 via-transparent to-green-400/5 border-l-3 md:border-l-4 border-neon-yellow/40 rounded-r-lg group-hover:border-neon-yellow group-hover:from-neon-yellow/10 group-hover:to-green-400/10 transition-all duration-300">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-gradient-to-br from-neon-yellow to-green-400 rounded-full shadow-lg">
                      <div className="absolute w-2.5 h-2.5 md:w-3 md:h-3 bg-gradient-to-br from-neon-yellow to-green-400 rounded-full animate-ping opacity-30" />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs md:text-sm font-bold text-neon-yellow uppercase tracking-wider block mb-1 md:mb-2">
                      Deliverable:
                    </span>
                    <p className="text-white/90 font-medium text-sm md:text-base lg:text-lg group-hover:text-white transition-colors duration-300 leading-snug">
                      {step.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Connection line to next step */}
        {index < journeySteps.length - 1 && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-neon-yellow/50 to-transparent rounded-full lg:hidden" />
        )}
      </Card>

    </div>
  );
};

export const ProcessSection = () => {
  const { sectionRef: trackingRef } = useVisibilityTracking({ sectionName: 'process' });
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false]);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-triggered animation observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((stepRef, index) => {
      if (stepRef) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSteps(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });

              // Update timeline progress
              setTimeout(() => {
                setTimelineProgress((index + 1) * 33.33);
              }, index * 200);
            }
          },
          { threshold: 0.2 }
        );

        observer.observe(stepRef);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <section id="process" ref={(node) => {
      sectionRef.current = node;
      if (node && trackingRef) {
        (trackingRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    }} className="relative py-12 md:py-16 lg:py-20 px-6 bg-gradient-to-br from-darker-surface via-background to-darker-surface overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Original floating shapes */}
        <FloatingShape className="top-1/4 left-1/6" delay={0} />
        <FloatingShape className="top-2/3 right-1/4" delay={3} />
        <FloatingShape className="top-1/2 left-3/4" delay={6} />

        {/* Additional gradient orbs */}
        <div className="absolute top-1/5 right-1/5 w-28 h-28 bg-gradient-to-br from-neon-yellow/20 to-green-400/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 left-1/5 w-32 h-32 bg-gradient-to-br from-green-400/15 to-neon-yellow/15 rounded-full blur-2xl opacity-40" />
        <div className="absolute top-3/5 right-2/5 w-20 h-20 bg-gradient-to-br from-neon-yellow/30 to-green-400/30 rounded-full blur-xl opacity-45" />

        {/* Ambient depth elements */}
        <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-gradient-to-br from-blue-500/8 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/2 right-1/6 w-16 h-16 bg-gradient-to-tl from-cyan-400/6 to-transparent rounded-full blur-2xl opacity-15" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-3 bg-grid-pattern" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-neon-yellow via-green-400 to-neon-yellow bg-clip-text text-transparent">
              Proven
            </span>
            {" "}
            <span className="bg-gradient-to-r from-neon-yellow via-green-400 to-neon-yellow bg-clip-text text-transparent">
              Process
            </span>
            <br />
            For{" "}
            <span className="bg-gradient-to-r from-neon-yellow via-green-400 to-neon-yellow bg-clip-text text-transparent">
              AI Adoption
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed">
            The best AI transformations and strategic AI implementations happen{" "}
            <span className="text-neon-yellow font-semibold">side by side</span> with expert AI consultants. Our proven methodology combines AI strategy consulting, custom development, and ongoing optimization to deliver enterprise-grade AI solutions that drive measurable business results.
          </p>
        </div>

        {/* Flowing Transformation Journey */}
        <div className="relative">
          {/* Flowing Timeline River */}
          <FlowingTimeline progress={timelineProgress} />

          {/* Journey Steps */}
          <div className="space-y-0 lg:space-y-8 lg:pl-16">
            {journeySteps.map((step, index) => (
              <>
                <div
                  key={index}
                  ref={(el) => stepRefs.current[index] = el}
                  className="relative"
                >
                  <JourneyStepCard
                    step={step}
                    index={index}
                    isVisible={visibleSteps[index]}
                  />
                </div>
                {index < journeySteps.length - 1 && (
                  <MobileCenterConnector key={`connector-${index}`} />
                )}
              </>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-15px) rotate(120deg) scale(1.05); }
          66% { transform: translateY(10px) rotate(240deg) scale(0.95); }
        }

        @keyframes flowIn {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(206, 252, 85, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(206, 252, 85, 0.02) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        .shadow-neon {
          box-shadow: 0 0 20px rgba(206, 252, 85, 0.3);
        }

        .border-l-3 {
          border-left-width: 3px;
        }

        /* Enhanced responsive spacing */
        @media (max-width: 1024px) {
          .max-w-5xl {
            max-width: 95%;
          }
        }

        @media (max-width: 768px) {
          .max-w-5xl {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
};