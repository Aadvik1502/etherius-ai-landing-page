import { Card, CardContent } from "@/components/ui/card";
import { SearchX, Users, Settings, AlertTriangle } from "lucide-react";
import { HiOutlineBanknotes } from "react-icons/hi2";

const problems = [
  {
    icon: "money_bag",
    title: "Hidden Costs & Unclear ROI",
    statistic: "75%",
    summary: "Worry about unclear returns and wasted investment",
    impactPoints: [
      "Hidden costs spiral beyond initial budgets",
      "Fear of expensive failure with no guarantees",
      "Budget planning becomes impossible"
    ]
  },
  {
    icon: SearchX,
    title: "Blind to AI Benefits",
    statistic: "90%",
    summary: "Don't know what processes can be automated",
    impactPoints: [
      "Missing obvious efficiency improvements",
      "Lack strategic guidance on AI possibilities",
      "Competitors gain unfair advantages"
    ]
  },
  {
    icon: Users,
    title: "We're Too Small for AI",
    statistic: "68%",
    summary: "Believe AI is only for large enterprises",
    impactPoints: [
      "Think current operations are 'fine without it'",
      "Assume they lack scale for AI benefits",
      "Fall behind while competitors advance"
    ]
  },
  {
    icon: Settings,
    title: "Complex Integration Fears",
    statistic: "85%",
    summary: "Worry about disrupting existing workflows",
    impactPoints: [
      "Fear massive system overhauls required",
      "Concerned about cultural changes needed",
      "Paralyzed by complexity assumptions"
    ]
  }
];

export const ProblemStatementSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-6 relative overflow-hidden bg-quantum-black">

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4">
            These <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">4 Barriers</span> Are<br />
            Blocking Your <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">AI Success</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed px-4">
            Most businesses know AI is essential but get stuck on these critical misconceptions.<br />
            We help you navigate past them to real results.
          </p>
        </div>

        {/* Problems Grid - 2x2 Layout on All Screen Sizes */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;

            return (
              <Card
                key={index}
                className="bg-gradient-to-br from-slate-900/90 to-quantum-black border border-neon-yellow/20 hover:border-neon-yellow/40 p-4 md:p-8 lg:p-10 group transition-all duration-300 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-neon-yellow/10 hover:transform hover:-translate-y-2 relative overflow-hidden h-full flex flex-col"
              >

                <CardContent className="p-0 relative z-10 flex-1 flex flex-col justify-between text-center">
                  {/* Icon with enhanced styling */}
                  <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-neon-yellow/5 rounded-2xl md:rounded-3xl mx-auto mb-3 md:mb-4 lg:mb-6 group-hover:scale-105 transition-all duration-300 flex items-center justify-center border border-neon-yellow/10">
                    {problem.icon === "money_bag" ? (
                      <HiOutlineBanknotes className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-neon-yellow" />
                    ) : (
                      <IconComponent className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-neon-yellow" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent mb-3 md:mb-4 lg:mb-6 leading-tight text-center">
                    {problem.title}
                  </h3>

                  {/* Large Statistic */}
                  <div className="mb-4 md:mb-6">
                    <div className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none mb-2 text-center">
                      {problem.statistic}
                    </div>
                    <div className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-300 font-medium text-center leading-tight px-1">
                      {problem.summary}
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