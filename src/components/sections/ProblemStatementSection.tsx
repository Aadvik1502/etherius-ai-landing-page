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

        {/* Solution CTA Section with Internal Links */}
        <div className="text-center mt-16 md:mt-20 lg:mt-24 px-4">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8">
            Ready to <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">Break Through</span> These Barriers?
          </h3>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed">
            Our proven 3-step process eliminates these roadblocks and delivers guaranteed ROI. See exactly how we solve each challenge.
          </p>

          {/* Internal Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
            <a
              href="#services"
              className="group inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-neon-yellow to-green-400 text-black font-bold text-lg md:text-xl rounded-lg hover:from-neon-yellow/90 hover:to-green-400/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-neon-yellow/25 min-w-[280px]"
              aria-label="View our AI consulting services that solve these problems"
            >
              See Our Solutions
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="#process"
              className="group inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-neon-yellow text-neon-yellow font-bold text-lg md:text-xl rounded-lg hover:bg-neon-yellow hover:text-black transition-all duration-300 hover:scale-105 min-w-[280px]"
              aria-label="Learn about our proven 3-step AI implementation process"
            >
              How We Fix This
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Quick Access Cards - Floating Design */}
          <div className="mt-8 md:mt-12 pt-8 border-t border-gray-700/50">
            <p className="text-gray-400 text-sm md:text-base mb-6 text-center">Quick access to specific solutions:</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">

              {/* ROI-Focused AI Strategy Card */}
              <a
                href="#services"
                className="group relative p-4 md:p-5 bg-gradient-to-br from-blue-500/10 to-blue-400/5 backdrop-blur-sm border border-blue-400/20 rounded-xl hover:border-blue-400/40 transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-400/20 text-center"
                aria-label="Learn about our ROI-focused AI strategy services"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-400/20 rounded-lg flex items-center justify-center group-hover:bg-blue-400/30 transition-colors duration-300">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-blue-400 font-semibold text-xs md:text-sm leading-tight group-hover:underline decoration-2 transition-all duration-300">ROI-Focused AI Strategy</span>
                </div>
              </a>

              {/* 24/7 AI Sales Teams Card */}
              <a
                href="#services"
                className="group relative p-4 md:p-5 bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 backdrop-blur-sm border border-emerald-400/20 rounded-xl hover:border-emerald-400/40 transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-lg hover:shadow-emerald-400/20 text-center"
                aria-label="Discover our 24/7 AI sales team solutions"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-400/30 transition-colors duration-300">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 7-7" />
                    </svg>
                  </div>
                  <span className="text-emerald-400 font-semibold text-xs md:text-sm leading-tight group-hover:underline decoration-2 transition-all duration-300">24/7 AI Sales Teams</span>
                </div>
              </a>

              {/* Cost-Cutting Automation Card */}
              <a
                href="#services"
                className="group relative p-4 md:p-5 bg-gradient-to-br from-orange-500/10 to-orange-400/5 backdrop-blur-sm border border-orange-400/20 rounded-xl hover:border-orange-400/40 transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-lg hover:shadow-orange-400/20 text-center"
                aria-label="See our cost-cutting automation solutions"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-400/20 rounded-lg flex items-center justify-center group-hover:bg-orange-400/30 transition-colors duration-300">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-orange-400 font-semibold text-xs md:text-sm leading-tight group-hover:underline decoration-2 transition-all duration-300">Cost-Cutting Automation</span>
                </div>
              </a>

              {/* Free Consultation Card */}
              <a
                href="#contact"
                className="group relative p-4 md:p-5 bg-gradient-to-br from-neon-yellow/10 to-neon-yellow/5 backdrop-blur-sm border border-neon-yellow/20 rounded-xl hover:border-neon-yellow/40 transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-lg hover:shadow-neon-yellow/20 text-center"
                aria-label="Get started with a free AI consultation"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-neon-yellow/20 rounded-lg flex items-center justify-center group-hover:bg-neon-yellow/30 transition-colors duration-300">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-neon-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="text-neon-yellow font-semibold text-xs md:text-sm leading-tight group-hover:underline decoration-2 transition-all duration-300">Free Consultation</span>
                </div>
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};