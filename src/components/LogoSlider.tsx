import React from 'react';

// Professional AI Company logos with tier-based sizing for consistent visual hierarchy
const logoData = [
  { name: 'OpenAI', logo: '/icons/powered_by/openAI_white_logo.svg', tier: 'tier1' },
  { name: 'Claude AI', logo: '/icons/powered_by/claude_white_logo.svg', tier: 'tier1' },
  { name: 'n8n', logo: '/icons/powered_by/n8n_white_logo.svg', tier: 'tier2' },
  { name: 'ElevenLabs', logo: '/icons/powered_by/eleven_labs_logo.svg', tier: 'tier2' },
  { name: 'AWS', logo: '/icons/powered_by/aws_white_logo.svg', tier: 'tier3' },
  { name: 'Meta', logo: '/icons/powered_by/meta_logo.svg', tier: 'tier3' },
  { name: 'Perplexity AI', logo: '/icons/powered_by/perplexity_white_logo.svg', tier: 'tier2' },
];

export const LogoSlider = () => {
  // Duplicate the logos array for seamless infinite scroll
  const duplicatedLogos = [...logoData, ...logoData];

  return (
    <div className="w-full py-4 px-4">
      {/* Section Header */}
      <div className="text-center mb-6">
        <p className="text-white/70 text-sm md:text-base font-medium tracking-wide">
          Powered by industry-leading AI
        </p>
      </div>

      {/* Logo Container with Enhanced Glass Morphism - Mobile optimized */}
      <div className="logo-slider-container relative w-full max-w-[320px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] mx-auto overflow-hidden rounded-xl md:rounded-2xl bg-black/20 backdrop-blur-xl border border-neon-yellow/10 shadow-2xl">
        {/* Enhanced inner glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-yellow/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-yellow/10 to-transparent" />

        {/* Scrolling Logo Container - Mobile optimized */}
        <div className="flex animate-logo-scroll py-4 md:py-6">
          {duplicatedLogos.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="logo-item flex-shrink-0 mx-0.5 sm:mx-1 md:mx-2 lg:mx-4 flex items-center justify-center group cursor-pointer transition-all duration-300"
            >
              {/* Logo Image Container - Mobile responsive sizing with explicit dimensions */}
              <div className="w-24 sm:w-28 md:w-40 lg:w-50 h-12 sm:h-14 md:h-20 lg:h-24 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img
                  src={company.logo}
                  alt={`${company.name} AI technology partner logo`}
                  className={`logo-${company.tier} opacity-70 group-hover:opacity-100 transition-all duration-300 logo-filter`}
                  width={company.tier === 'tier1' ? '120' : company.tier === 'tier2' ? '100' : '80'}
                  height={company.tier === 'tier1' ? '80' : company.tier === 'tier2' ? '70' : '60'}
                  loading="lazy"
                  decoding="async"
                  fetchpriority={index < 4 ? 'high' : 'low'}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced gradient overlays for seamless infinite scroll effect */}
        <div className="absolute top-0 left-0 w-24 md:w-32 h-full bg-gradient-to-r from-black/50 via-black/30 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-24 md:w-32 h-full bg-gradient-to-l from-black/50 via-black/30 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};