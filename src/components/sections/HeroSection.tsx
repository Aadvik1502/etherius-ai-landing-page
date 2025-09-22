import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TypewriterText } from "@/components/TypeWriterText";
import { LogoSlider } from "@/components/LogoSlider";
import { ArrowRight, Users, Star, TrendingDown, Zap, Heart } from "lucide-react";
import { useState, useEffect } from "react";

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


const stats = [
  {
    icon: TrendingDown,
    percentage: "68%",
    description: "Reduction in support costs through intelligent automation"
  },
  {
    icon: Zap,
    percentage: "12x",
    description: "Faster workflows with AI-powered process redesign"
  },
  {
    icon: RoiIcon,
    percentage: "240%",
    description: "Average ROI delivered through solutions in one year"
  },
  {
    icon: Heart,
    percentage: "30%",
    description: "Increase in customer satisfaction with voice and chat agents"
  }
];

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [particlePositions, setParticlePositions] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
  }>>([]);

  // Generate initial particles with better distribution - Mobile optimized
  useEffect(() => {
    const particles = [];
    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const gridCols = isMobile ? 3 : 5;
    const gridRows = isMobile ? 3 : 4;
    const particleCount = isMobile ? 12 : 20;

    for (let i = 0; i < particleCount; i++) {
      // Calculate grid position for better distribution
      const gridX = (i % gridCols) / (gridCols - 1);
      const gridY = Math.floor(i / gridCols) / (gridRows - 1);

      // Add random offset within grid cell for natural look
      const offsetX = (Math.random() - 0.5) * 15; // ±7.5% offset
      const offsetY = (Math.random() - 0.5) * 20; // ±10% offset

      particles.push({
        id: i,
        x: Math.max(5, Math.min(95, gridX * 100 + offsetX)), // Keep within bounds
        y: Math.max(5, Math.min(95, gridY * 100 + offsetY)), // Keep within bounds
        vx: (Math.random() - 0.5) * 0.00209, // Reduced by 5%
        vy: (Math.random() - 0.5) * 0.00209, // Reduced by 5%
        size: Math.random() * 4 + 3.5, // Slightly smaller: 3.5-7.5px
        opacity: Math.random() * 0.15 + 0.35, // Slightly lower opacity: 0.35-0.5
        color: Math.random() > 0.65 ? 'neon-yellow' : 'green',
      });
    }

    setParticlePositions(particles);
  }, []);

  // Animate particles - Mobile optimized
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const animationInterval = setInterval(() => {
      setParticlePositions(prev => prev.map(particle => {
        let newX = particle.x + particle.vx * 26.125;
        let newY = particle.y + particle.vy * 26.125;
        let newVx = particle.vx;
        let newVy = particle.vy;

        // Bounce off edges and add some randomness
        if (newX <= 0 || newX >= 100) {
          newVx = -particle.vx + (Math.random() - 0.5) * 0.01;
          newX = Math.max(0, Math.min(100, newX));
        }
        if (newY <= 0 || newY >= 100) {
          newVy = -particle.vy + (Math.random() - 0.5) * 0.01;
          newY = Math.max(0, Math.min(100, newY));
        }

        // Occasional direction changes for organic movement (less frequent, more gentle)
        if (Math.random() < 0.002) {
          newVx += (Math.random() - 0.5) * 0.003;
          newVy += (Math.random() - 0.5) * 0.003;
          // Keep velocity reasonable and controlled
          newVx = Math.max(-0.003135, Math.min(0.003135, newVx));
          newVy = Math.max(-0.003135, Math.min(0.003135, newVy));
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
        };
      }));
    }, isMobile ? 75 : 50); // 13fps on mobile, 20fps on desktop for performance

    return () => clearInterval(animationInterval);
  }, [particlePositions.length]); // Add dependency to fix the isMobile scope issue

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
      aria-label="Hero section with company introduction and call-to-action"
    >
      {/* SVG Gradient Definition for Stars */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(206, 252, 85, 1)" />
            <stop offset="50%" stopColor="rgba(206, 252, 85, 1)" />
            <stop offset="50%" stopColor="rgba(34, 197, 94, 1)" />
            <stop offset="100%" stopColor="rgba(34, 197, 94, 1)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Premium Dynamic Particles with Proximity Lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-darker-surface to-background opacity-50" />

        {/* Dynamic Moving Particles */}
        {particlePositions.map((particle) => {
          // Calculate distance from cursor to particle
          const distanceFromCursor = Math.sqrt(
            Math.pow(mousePosition.x - particle.x, 2) +
            Math.pow(mousePosition.y - particle.y, 2)
          );

          // Proximity lighting - only activates within 15% screen distance
          const isInProximity = distanceFromCursor < 15;
          const proximityIntensity = Math.max(0, (15 - distanceFromCursor) / 15);

          // Enhanced opacity when near cursor
          const finalOpacity = particle.opacity + (proximityIntensity * 0.7);

          // Much brighter glow effect when in proximity
          const glowIntensity = proximityIntensity * 1.2;

          return (
            <div
              key={particle.id}
              className="absolute rounded-full transition-all duration-500 ease-out"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: particle.color === 'neon-yellow'
                  ? `radial-gradient(circle,
                      rgba(206, 252, 85, ${finalOpacity}) 0%,
                      rgba(206, 252, 85, ${finalOpacity * 0.6}) 60%,
                      transparent 80%
                    )`
                  : `radial-gradient(circle,
                      rgba(34, 197, 94, ${finalOpacity}) 0%,
                      rgba(34, 197, 94, ${finalOpacity * 0.6}) 60%,
                      transparent 80%
                    )`,
                boxShadow: isInProximity
                  ? `0 0 ${12 + glowIntensity * 16}px ${
                      particle.color === 'neon-yellow'
                        ? `rgba(206, 252, 85, ${Math.min(1, glowIntensity * 1.1)})`
                        : `rgba(34, 197, 94, ${Math.min(1, glowIntensity * 1.1)})`
                    }`
                  : 'none',
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}

        {/* Subtle ambient depth elements */}
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-gradient-to-br from-blue-500/8 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gradient-to-tl from-cyan-400/6 to-transparent rounded-full blur-2xl opacity-15" />

        {/* Very subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.005]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(206, 252, 85, 0.3) 1px, transparent 0)`,
              backgroundSize: '80px 80px',
            }}
          />
        </div>
      </div>
      
      <div className="container mx-auto text-center z-10 max-w-7xl px-6 mt-24">


        {/* Main Headline */}
        <div className="mb-12">
          <TypewriterText />
        </div>

        {/* Value Proposition */}
        <div className="mb-16">
          <p className="text-xl md:text-2xl lg:text-3xl text-white/95 max-w-5xl mx-auto leading-relaxed font-medium">
            We help businesses adopt AI with clarity and confidence—delivering{" "}
            <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent font-bold">growth</span>,{" "}
            <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent font-bold">efficiency</span>, and lasting{" "}
            <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent font-bold">competitive advantage</span>.
          </p>
        </div>

        {/* Powered By Logo Slider */}
        <div className="mb-8">
          <LogoSlider />
        </div>

        {/* Primary CTA - Enhanced mobile touch target */}
        <div className="flex items-center justify-center">
          <Button
            size="lg"
            className="group shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[48px] bg-gradient-to-r from-neon-yellow to-green-400 text-black hover:from-neon-yellow/90 hover:to-green-400/90 neon-glow hover:shadow-neon-yellow/50 px-8 py-6 md:px-10 md:py-7 text-lg md:text-xl font-bold min-w-[200px]"
            onClick={() => window.open('https://calendly.com/etheriusai/30min', '_blank')}
          >
            Unlock Your AI Advantage
            <ArrowRight className="ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </div>


      </div>

    </section>
  );
};