# Etherius AI Website Development Guide

This CLAUDE.md file provides comprehensive context and instructions for developing the Etherius AI consulting website using Claude Code.

## Project Overview

**Company:** Etherius AI Consulting  
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
--attractive-neon: #CEFC55;   /* CTAs, interactive elements */
--ai-cyan: #06B6D4;          /* Innovation, tech accents */
--success-green: #10B981;     /* Growth, results, metrics */
--neutral-gray: #64748B;      /* Supporting text */
```

### Typography
- **Headings:** Inter (Google Fonts) - weights: 400, 500, 600, 700
- **Body:** System fonts (system-ui, sans-serif)
- **Logo:** Located at `src/assets/eth_logo_big.svg`

### Design Principles
- 60/30/10 color rule: 60% dark backgrounds, 30% white text, 10% neon accents
- Mobile-first responsive design
- WCAG 2.1 AA accessibility compliance
- Clean, minimal layouts with ample white space

## Content Strategy & Copy

### Hero Section Structure
```
Main Headline: "From [ROTATING TEXT] to lasting results"
Rotating Text Animation (typewriter effect):
- "AI to ROI"
- "uncertainty to clarity" 
- "hype to results"

Sub-headline: "We help businesses adopt AI with clarity and confidence—delivering efficiency, growth, and lasting competitive advantage."

Primary CTA: "Unlock Your AI Advantage"
```

### Trust Indicators
- "68% reduction in support costs through intelligent automation"
- "12x faster workflows with AI-powered process redesign"
- "Average 240% ROI in first year"
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

Following the high-converting structure from `context/landing_page_structure copy.pdf`:

1. **Navbar** - Sticky header with clear CTA
2. **Hero/Main Fold** - Strong headline, video/demo, trust indicators
3. **Social Proof** - Company logos and metrics
4. **Solutions** - 4 service offerings with icons
5. **Benefits** - Outcome-driven statements with visual elements
6. **Process** - 3-step methodology explanation
7. **Pricing** - Clear plans and value propositions
8. **Testimonials** - Customer success stories
9. **FAQ** - Address common objections
10. **CTA** - Final conversion opportunity
11. **Footer** - Trust elements and navigation

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

### Context Files Reference
**CRITICAL:** Always reference these files when developing:

- `context/brand-identity copy.md` - Complete brand guidelines, colors, typography, voice
- `context/website-copy copy.md` - All website copy, headlines, CTAs, testimonials
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
- Copy ALL content exactly from `context/website-copy copy.md`
- Implement rotating text animation for hero headline
- Use specific trust indicators and metrics provided
- Maintain professional, results-focused tone

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
3. **Content Accuracy:** Use the exact copy from `website-copy copy.md` - do not paraphrase or modify
4. **Mobile-First:** Every component must be fully responsive and mobile-optimized
5. **Performance:** Maintain fast loading times and smooth animations
6. **Accessibility:** Follow WCAG guidelines for inclusive design

This CLAUDE.md file serves as the single source of truth for all website development decisions. Always reference the context files and maintain consistency with the established brand identity and conversion-focused approach.