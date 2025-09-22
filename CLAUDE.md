# Etherius AI Website Development Guide

This CLAUDE.md file provides comprehensive context and instructions for developing the Etherius AI consulting website using Claude Code.

## Project Overview

**Company:** Etherius AI  
**Mission:** Help businesses adopt AI solutions with clarity and confidence—delivering efficiency, growth, and lasting competitive advantage  
**Website Purpose:** High-converting landing page to attract and convert B2B AI consulting clients

## Technology Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Development:** Node.js, npm

## Key Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Brand Identity & Design System

### Colors (Dark Theme Primary)
```css
/* Primary Palette */
--quantum-black: #0F172A;     /* Primary backgrounds */
--neural-white: #FFFFFF;      /* Primary text */
--etherius-blue: #1E40AF;     /* Brand accent, trust */

/* Secondary Palette */
--neon-yellow: #CEFC55;       /* Primary CTA, highlights, interactive elements */
--green-400: #22C55E;         /* Secondary accent, success, growth metrics */
--ai-cyan: #06B6D4;          /* Innovation, tech accents */
--red-500: #EF4444;          /* Problem indicators, warnings */
--neutral-gray: #64748B;      /* Supporting text */

/* Background Variations */
--deep-blue: #1E293B;        /* Card backgrounds */
--darker-surface: #0F172A;    /* Deeper background sections */
```

### Typography
- **Headings:** Inter (Google Fonts) - weights: 400, 500, 600, 700
- **Body:** System fonts (system-ui, sans-serif)
- **Logo:** Located at `src/assets/etherius_ai_logo.svg`

### Design Principles
- 60/30/10 color rule: 60% dark backgrounds, 30% white text, 10% neon accents
- Mobile-first responsive design
- WCAG 2.1 AA accessibility compliance
- Clean, minimal layouts with ample white space

## Content Strategy & Copy

### Hero Section Structure
```
Customer Trust Indicator: "Trusted by 25+ businesses" (with 5-star rating)

Main Headline: "From [ROTATING TEXT]"
Rotating Text Animation (typewriter effect):
- "AI to ROI"
- "uncertainty to clarity"
- "hype to results"

Sub-headline: "We help businesses adopt AI with clarity and confidence—delivering efficiency, growth, and lasting competitive advantage."

Primary CTA: "Unlock Your AI Advantage"

Proven Results Section Header: "Proven Results Across Businesses:"
```

### Trust Indicators
- "68% reduction in support costs through intelligent automation"
- "12x faster workflows with AI-powered process redesign"
- "240% average ROI delivered through solutions in one year"
- "30% increase in customer satisfaction with voice and chat agents"

### Services (4 Core Offerings)
1. **AI Agents That Drive Real Results**
2. **Voice & Chat AI That Converts**
3. **Smart Automations That Scale Your Business**
4. **Strategic AI Solutions & Implementation**

### 3-Step Process
1. **Discover** - AI audit and roadmap creation
2. **Build** - Custom AI solution development and deployment
3. **Grow** - Ongoing optimization and scaling

## Landing Page Structure

Complete implemented sections in order:

1. **Navigation** - Sticky header with brand logo and CTA
2. **Hero Section** - Rotating headline, trust indicators, customer avatars, CTA, proven results metrics
3. **Problem Statement Section** - "Stop Wasting Money" headline with 3 problem cards (70% Failures, Scattered Strategy, Zero ROI)
4. **Solution Overview Section** - "Bridge the Gap" headline with value propositions and animated checkmarks
5. **Services Section** - 4 core AI service offerings with icons and descriptions
6. **Process Section** - 3-step methodology (Discover, Build, Grow)
7. **Contact Section** - Lead capture form and contact information
8. **Footer** - Brand information and navigation links

**Note:** Based on file analysis, the website currently implements 8 core sections. ImpactSection.tsx, SocialProofSection.tsx, and FAQSection.tsx exist as components but are not currently included in the main Index.tsx page layout.

### Core Section Components (Active in Index.tsx):
- **HeroSection.tsx** - Complete with dynamic particles, customer avatars, rotating text
- **ProblemStatementSection.tsx** - 3-card problem layout with custom icons
- **SolutionOverviewSection.tsx** - Animated value propositions with checkmarks
- **ServicesSection.tsx** - Service grid with hover effects
- **ProcessSection.tsx** - 3-step process explanation
- **ContactSection.tsx** - Contact form and information
- **Footer.tsx** - Site footer with links

### Additional Section Components (Built but not currently active):
- **ImpactSection.tsx** - Metrics and results showcase
- **SocialProofSection.tsx** - Testimonials and trust elements
- **FAQSection.tsx** - Expandable FAQ items

## Competitor Design Inspiration

Reference `context/competitor_reference copy.md` for specific techniques:

### From Monk Group (monkgroup.ai)
- Rotating headline animations with value propositions
- Clean service grid with hover effects
- Strategic accent color usage (adapt to neon green)
- Multiple CTA touchpoints throughout page

### Key Adaptations
- Use Etherius brand colors (NOT competitor colors)
- Maintain human-centered, approachable tone
- Focus on business results over technical features
- Implement subtle animations and interactions

## Animation & Interaction Guidelines

```css
/* Primary CTA Hover Effect */
.primary-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(206, 252, 85, 0.4);
  background: color-mix(in srgb, #CEFC55 90%, black 10%);
}

/* Service Card Hover */
.service-card:hover {
  border-color: #CEFC55;
  transform: translateY(-4px);
}
```

- **Staggered animations** for service cards (100ms intervals)
- **Typewriter effect** for rotating headline text
- **Scroll-triggered fade-ins** for sections
- **Subtle parallax** backgrounds for depth
- **Performance-optimized** CSS transforms

## File Structure Context

### Key Directories
- `src/components/` - React components
- `src/components/ui/` - shadcn/ui components
- `src/components/sections/` - Page sections
- `src/assets/` - Images and static files
- `src/pages/` - Page components
- `src/lib/` - Utility functions
- `context/` - Project requirements and brand guidelines

### Current Assets and Components

**Section Components:**
- `src/components/sections/HeroSection.tsx` - Hero with rotating text, particles, trust indicators
- `src/components/sections/ProblemStatementSection.tsx` - Problem statement with custom icons
- `src/components/sections/SolutionOverviewSection.tsx` - Solution overview with animated checkmarks
- `src/components/sections/ServicesSection.tsx` - 4 AI services grid
- `src/components/sections/ProcessSection.tsx` - 3-step process methodology
- `src/components/sections/ImpactSection.tsx` - Results and metrics showcase
- `src/components/sections/SocialProofSection.tsx` - Client testimonials
- `src/components/sections/FAQSection.tsx` - Frequently asked questions
- `src/components/sections/ContactSection.tsx` - Contact form and info
- `src/components/sections/Footer.tsx` - Site footer
- `src/components/Navigation.tsx` - Main navigation header
- `src/components/TypeWriterText.tsx` - Animated rotating headline text
- `src/components/LogoSlider.tsx` - Logo carousel component
- `src/components/RotatingText.tsx` - Text rotation utility component
- `src/components/ProcessTypewriter.tsx` - Process section typewriter animation

**Brand & Logo Assets:**
- `src/assets/etherius_ai_logo.svg` - Main brand logo
- `src/assets/eth_logo_big.svg` - Large brand logo variant
- `src/assets/eth_ai_logo.svg` - Alternative brand logo
- `src/assets/big_ethai_logo.svg` - Large brand logo alternative

**Problem Section Icons:**
- `src/assets/crashed_rocket.svg` - Problem section icon (failures)
- `src/assets/danger_sign.svg` - Problem section icon (strategy)
- `src/assets/empty_wallet.svg` - Problem section icon (ROI)

**Service & Solution Icons:**
- `src/assets/revenue_growth.svg` - Revenue growth illustration
- `src/assets/cost_optimization.svg` - Cost optimization illustration
- `src/assets/customer_experience.svg` - Customer experience illustration
- `src/assets/strategic_partnership.svg` - Strategic partnership illustration
- `src/assets/ai_sales_agent.svg` - AI sales agent illustration
- `src/assets/ai_agent_professional.svg` - Professional AI agent illustration

**Customer Avatars:**
- `src/assets/customer-avatar-1.svg` - Hero section customer avatar
- `src/assets/customer-avatar-2.svg` - Hero section customer avatar
- `src/assets/customer-avatar-3.svg` - Hero section customer avatar

### Context Files Reference
**CRITICAL:** Always reference these files when developing:

- `context/website-copy.md` - All website copy, headlines, CTAs, testimonials (UPDATED)
- `context/competitor_reference copy.md` - Design patterns and conversion techniques
- `context/landing_page_structure copy.pdf` - High-converting page layout structure

## Development Guidelines

### Component Creation
1. Follow existing shadcn/ui patterns in `src/components/ui/`
2. Create section components in `src/components/sections/`
3. Use TypeScript interfaces for props
4. Implement responsive design with Tailwind classes
5. Follow accessibility best practices (ARIA labels, keyboard navigation)

### Styling Standards
- Use Tailwind CSS utility classes
- Follow mobile-first responsive approach
- Maintain consistent spacing using Tailwind's scale
- Use CSS custom properties for brand colors
- Implement dark theme as primary design

### Content Implementation
- Copy ALL content exactly from `context/website-copy.md` (UPDATED WITH CURRENT COPY)
- Implement rotating text animation for hero headline using TypeWriterText component
- Use specific trust indicators and metrics provided in hero section
- Maintain professional, results-focused tone
- Problem section uses red color scheme for urgency
- Solution section uses green/neon color scheme for positive outcomes

### Conversion Optimization
- Multiple CTA placements throughout page
- Clear value propositions in headlines
- Social proof elements prominently displayed
- Mobile-optimized touch targets (48px minimum)
- Fast loading performance (optimize images, code splitting)

## Testing & Quality Assurance

### Before Each Deployment
1. Run `npm run lint` to check code quality
2. Test responsive design on mobile, tablet, desktop
3. Verify all CTAs are functional
4. Check accessibility with screen readers
5. Test form submissions and interactions
6. Validate brand colors and typography consistency

### Performance Checklist
- Images optimized (WebP format preferred)
- Code splitting implemented
- Lazy loading for non-critical content
- Core Web Vitals optimized
- Cross-browser compatibility tested

## Brand Voice & Messaging

### Tone Characteristics
- **Authoritative:** Industry-leading expertise
- **Clear:** Complex AI concepts made simple
- **Results-focused:** Emphasize ROI and business outcomes
- **Professional:** Business-appropriate communication
- **Trustworthy:** Reliable partner with proven results

### Key Messaging Themes
- Transform AI potential into measurable business results
- Bridge the gap between AI technology and business value
- Clear, proven methodology with guaranteed ROI
- Human-centered approach to AI implementation
- Partnership focus over transactional consulting

## Contact & CTA Strategy

### Primary CTA
**Text:** "Unlock Your AI Advantage"  
**Secondary:** "Book Your Free AI Strategy Session"

### Contact Form Fields
- Full Name*, Company Name*, Email*, Phone, Company Size, Industry, AI Experience Level, Project Timeline, AI Goals*

### Placement Strategy
- Hero section (primary CTA)
- After services section
- End of process explanation
- Sticky mobile CTA
- Final page CTA

## SEO & Meta Information

### Target Keywords
- AI consulting
- Business AI implementation
- AI strategy consulting
- Enterprise AI solutions
- AI ROI optimization

### Meta Structure
- Title: Focus on AI consulting and business results
- Description: Include primary value propositions
- OpenGraph tags for social sharing
- Schema markup for business information

---

## IMPORTANT DEVELOPMENT NOTES

1. **Context File Priority:** Always reference the context folder files before making any design or content decisions
2. **Brand Consistency:** Never deviate from the established brand colors, fonts, or voice without explicit instruction
3. **Content Accuracy:** Use the exact copy from `context/website-copy.md` (UPDATED) - do not paraphrase or modify
4. **Mobile-First:** Every component must be fully responsive and mobile-optimized
5. **Performance:** Maintain fast loading times and smooth animations
6. **Accessibility:** Follow WCAG guidelines for inclusive design
7. **Current Status:** Website is fully implemented with all core sections complete and functional
8. **Animation System:** Hero section includes sophisticated particle system and TypeWriter animation
9. **Color Psychology:** Problem section uses red for urgency, solution section uses green/neon for positive outcomes

## CURRENT IMPLEMENTATION STATUS

✅ **Active Sections (Live on Index.tsx):**
- Hero Section (with dynamic particles, rotating text, trust indicators)
- Problem Statement Section (3-card layout with custom icons)
- Solution Overview Section (animated value propositions)
- Services Section (4 AI service offerings)
- Process Section (3-step methodology)
- Contact Section (lead capture form)
- Footer (brand information and links)
- Navigation (sticky header with CTA)

✅ **Additional Built Sections (Components exist, ready to activate):**
- Impact Section (results metrics) - ImpactSection.tsx
- Social Proof Section (testimonials) - SocialProofSection.tsx
- FAQ Section (expandable questions) - FAQSection.tsx

✅ **Key Features Implemented:**
- TypeWriter rotating headline animation
- Dynamic particle system with mouse interaction
- Animated checkmarks for value propositions
- Custom SVG icons for problem statements
- Responsive design across all breakpoints
- Hover effects and micro-interactions
- Gradient text effects for key terms

---

## DEPLOYMENT READINESS & BUSINESS FUNCTIONALITY

### Current Status: Design & Content Complete ✅
The website is fully implemented with all core sections, components, and visual design complete. All content matches the finalized copy and brand guidelines.

### Next Phase: Business Functionality Implementation
To make the website fully functional for business launch, the following integrations and functionality need to be implemented:

#### 🔧 Required Functionality for Launch

**1. Contact Form Integration**
- Backend API endpoint for form submissions
- Email notification system for new leads
- Form validation and error handling
- Success confirmation for users
- CRM integration (optional but recommended)

**2. CTA Button Functionality**
- "Unlock Your AI Advantage" buttons need click handlers
- "Book Your Free AI Strategy Session" buttons need scheduling integration
- Navigation CTA needs proper routing
- Mobile sticky CTA implementation

**3. Analytics & Tracking**
- Google Analytics integration
- Conversion tracking for form submissions
- User behavior tracking
- Performance monitoring

**4. SEO Optimization**
- Meta tags and descriptions
- OpenGraph tags for social sharing
- Schema markup for business information
- Sitemap generation

**5. Performance Optimization**
- Image optimization and lazy loading
- Code splitting for faster load times
- CDN setup for static assets
- Caching strategy implementation

#### 🌐 Domain & Hosting Setup
- Domain registration and DNS configuration
- SSL certificate setup
- Production hosting environment
- Environment variable configuration

#### 📧 Email & Communication Setup
- Business email setup (hello@etheriusai.com)
- Email templates for lead notifications
- Auto-responder for contact form submissions
- Professional email signature

#### 🔒 Security & Compliance
- Contact form spam protection
- HTTPS enforcement
- Privacy policy and terms of service pages
- GDPR compliance considerations

#### 📱 Final Testing Checklist
- Cross-browser compatibility testing
- Mobile responsiveness verification
- Form submission testing
- Page load speed optimization
- Accessibility compliance (WCAG 2.1 AA)
- Contact information accuracy verification

### Optional Enhancements for Launch
- Live chat integration
- Blog/case studies section
- Client portal or dashboard
- Social media integration
- Email newsletter signup

---

This CLAUDE.md file serves as the single source of truth for all website development decisions. The website design and content are currently complete and ready for business functionality implementation and deployment.