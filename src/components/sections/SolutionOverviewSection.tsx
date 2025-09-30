import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, Zap, Heart } from "lucide-react";
import { useVisibilityTracking } from "@/components/Analytics";

// Custom SVG icons
const RoiIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 375.12 383.03998"
    className={className}
    fill="currentColor"
  >
    <path d="M138.269531 113.84375C70.90625 113.84375 16.292969 168.457031 16.292969 235.820312C16.292969 303.1875 70.90625 357.800781 138.269531 357.800781C169.210938 357.800781 197.445312 346.289062 218.949219 327.304688C222.316406 324.335938 227.457031 324.65625 230.429688 328.023438C233.402344 331.390625 233.082031 336.527344 229.710938 339.5C205.347656 361.003906 173.324219 374.0625 138.269531 374.0625C61.921875 374.0625 0.03125 312.167969 0.03125 235.820312C0.03125 159.472656 61.921875 97.582031 138.269531 97.582031C159.324219 97.582031 179.296875 102.292969 197.179688 110.726562C201.242188 112.644531 202.980469 117.488281 201.0625 121.550781C199.148438 125.613281 194.304688 127.351562 190.242188 125.4375C174.484375 118.003906 156.875 113.84375 138.269531 113.84375Z"/>
    <path d="M138.269531 146.371094C88.867188 146.371094 48.820312 186.417969 48.820312 235.820312C48.820312 285.222656 88.867188 325.273438 138.269531 325.273438C171.367188 325.273438 200.28125 307.296875 215.757812 280.539062C218.007812 276.652344 222.980469 275.324219 226.871094 277.574219C230.757812 279.824219 232.085938 284.796875 229.835938 288.683594C211.570312 320.261719 177.410156 341.535156 138.269531 341.535156C79.886719 341.535156 32.558594 294.207031 32.558594 235.820312C32.558594 177.4375 79.886719 130.109375 138.269531 130.109375C150.613281 130.109375 162.476562 132.226562 173.507812 136.125C177.742188 137.621094 179.960938 142.269531 178.464844 146.503906C176.96875 150.738281 172.320312 152.957031 168.089844 151.460938C158.773438 148.167969 148.738281 146.371094 138.269531 146.371094Z"/>
    <path d="M120.085938 187.03125C131.535156 181.308594 145.007812 181.308594 156.453125 187.03125L174.433594 196.023438C178.453125 198.03125 180.078125 202.914062 178.070312 206.929688C176.0625 210.949219 171.179688 212.578125 167.160156 210.566406L149.179688 201.578125C142.3125 198.144531 134.226562 198.144531 127.359375 201.578125L120.492188 205.011719C116.4375 207.039062 113.875 211.183594 113.875 215.71875C113.875 222.332031 119.234375 227.691406 125.847656 227.691406L150.695312 227.691406C166.289062 227.691406 178.929688 240.332031 178.929688 255.925781C178.929688 266.617188 172.886719 276.394531 163.320312 281.179688L156.453125 284.613281C145.007812 290.335938 131.535156 290.335938 120.085938 284.613281L102.105469 275.621094C98.089844 273.613281 96.460938 268.730469 98.46875 264.710938C100.476562 260.695312 105.363281 259.066406 109.378906 261.074219L127.359375 270.066406C134.226562 273.5 142.3125 273.5 149.179688 270.066406L156.046875 266.632812C160.105469 264.605469 162.664062 260.460938 162.664062 255.925781C162.664062 249.3125 157.304688 243.953125 150.695312 243.953125L125.847656 243.953125C110.253906 243.953125 97.613281 231.3125 97.613281 215.71875C97.613281 205.023438 103.652344 195.246094 113.21875 190.464844Z"/>
    <path d="M138.269531 162.636719C142.761719 162.636719 146.402344 166.277344 146.402344 170.769531L146.402344 300.875C146.402344 305.367188 142.761719 309.007812 138.269531 309.007812C133.78125 309.007812 130.140625 305.367188 130.140625 300.875L130.140625 170.769531C130.140625 166.277344 133.78125 162.636719 138.269531 162.636719Z"/>
    <path d="M268.378906 0C271.097656 0 273.636719 1.359375 275.144531 3.621094L372.726562 149.992188C374.390625 152.488281 374.542969 155.695312 373.128906 158.339844C371.714844 160.984375 368.960938 162.636719 365.960938 162.636719L320.867188 162.636719L320.867188 365.929688C320.867188 370.421875 317.226562 374.0625 312.734375 374.0625L225.6875 374.0625C221.195312 374.0625 217.554688 370.421875 217.554688 365.929688L217.554688 162.636719L170.796875 162.636719C167.796875 162.636719 165.042969 160.984375 163.628906 158.339844C162.214844 155.695312 162.367188 152.488281 164.03125 149.992188L261.613281 3.621094C263.121094 1.359375 265.660156 0 268.378906 0Z"/>
  </svg>
);

// Animated Checkmark SVG Component
const AnimatedCheckmark = ({ className, delay = 0 }: { className?: string; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const checkmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (checkmarkRef.current) {
      observer.observe(checkmarkRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={checkmarkRef} className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-green-400"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="currentColor"
          className="opacity-20"
        />
        <path
          d="M8 12.5l2.5 2.5L16 9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="10"
          strokeDashoffset={isVisible ? "0" : "10"}
          className="transition-all duration-1000 ease-out"
          style={{
            transitionDelay: `${delay}ms`
          }}
        />
      </svg>
    </div>
  );
};

// Background geometric shapes
const FloatingShape = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <div
    className={`absolute opacity-10 ${className}`}
    style={{
      animation: `float 6s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  >
    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full blur-xl" />
  </div>
);

const stats = [
  {
    icon: RoiIcon,
    percentage: "240%",
    description: "Average ROI delivered through solutions in one year"
  },
  {
    icon: Zap,
    percentage: "12x",
    description: "Faster workflows with AI-powered process redesign"
  },
  {
    icon: TrendingDown,
    percentage: "68%",
    description: "Reduction in support costs through intelligent automation"
  },
  {
    icon: Heart,
    percentage: "30%",
    description: "Increase in customer satisfaction with voice and chat agents"
  }
];

const valuePropositions = [
  {
    text: "Strategic roadmap that drives real business results.",
    delay: 0
  },
  {
    text: "Complete solution development and deployment.",
    delay: 150
  },
  {
    text: "Working AI systems that integrate seamlessly with your operations.",
    delay: 300
  },
  {
    text: "Guaranteed measurable ROI within 6 months.",
    delay: 450
  },
  {
    text: "Your team empowered to succeed with ongoing support.",
    delay: 600
  }
];

export const SolutionOverviewSection = () => {
  const { sectionRef } = useVisibilityTracking({ sectionName: 'solution-overview' });
  return (
    <section ref={sectionRef} id="mission" className="relative py-16 md:py-20 lg:py-24 px-6 bg-gradient-to-br from-background via-background to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingShape className="top-1/4 left-1/4" delay={0} />
        <FloatingShape className="top-3/4 right-1/4" delay={2} />
        <FloatingShape className="top-1/2 left-3/4" delay={4} />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-5 bg-grid-pattern" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Column - Headline and Introduction */}
          <div className="space-y-8">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                We Bridge the<br />
                Gap Between<br />
                <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">
                  AI Potential
                </span>{" "}and<br />
                <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">
                  Business Results
                </span>
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Our proven methodology delivers measurable outcomes that transform your business operations and drive sustainable growth.
              </p>
            </div>
          </div>

          {/* Right Column - Value Propositions */}
          <div className="space-y-8">
            <h3 className="text-3xl font-semibold text-center -ml-8">
              <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">Our Mission</span>
            </h3>

            <div className="space-y-5">
              {valuePropositions.map((prop, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 p-4 rounded-lg border border-transparent hover:border-green-400/20 hover:bg-green-400/5 transition-all duration-300 transform hover:translate-x-2"
                  style={{
                    animation: `slideInRight 0.8s ease-out forwards`,
                    animationDelay: `${prop.delay}ms`,
                    opacity: 0
                  }}
                >
                  <AnimatedCheckmark
                    className="flex-shrink-0 mt-1"
                    delay={prop.delay + 200}
                  />
                  <p className="text-white text-lg leading-relaxed group-hover:text-green-400/90 transition-colors duration-300">
                    {prop.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Proven Results Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-semibold mb-12 text-center -ml-8">
            <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">Proven Results Across Industries</span>
          </h3>

          {/* Stats Grid - 2x2 on Mobile, 4 columns on Large */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12 lg:mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="card-hover bg-deep-blue border-border/20 p-3 md:p-6 lg:p-8 text-center group"
                >
                  <CardContent className="p-0">
                    <div className="p-2 md:p-3 lg:p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg md:rounded-xl w-fit mx-auto mb-3 md:mb-4 lg:mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 neon-glow">
                      <IconComponent className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-primary" />
                    </div>
                    <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent mb-2 md:mb-3 lg:mb-4">
                      {stat.percentage}
                    </div>
                    <p className="text-white text-xs md:text-sm lg:text-base leading-relaxed px-1">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
};