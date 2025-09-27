import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
}

export const SEO = ({
  title = "Etherius AI - Strategic AI Solutions for Business Growth",
  description = "Strategic AI consulting that delivers real results. We help businesses adopt AI with clarity and confidence—delivering efficiency, growth, and lasting competitive advantage.",
  keywords = "AI consulting, business AI implementation, AI strategy consulting, enterprise AI solutions, AI ROI optimization, AI agents, voice AI, chat AI, business automation, artificial intelligence consulting",
  canonicalUrl = "https://www.etheriusai.com",
  ogTitle,
  ogDescription,
  ogImage = "https://www.etheriusai.com/og-image.svg",
  ogType = "website",
  twitterTitle,
  twitterDescription,
  twitterImage,
  structuredData
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update existing meta tags or create new ones
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Update Open Graph tags
    updateMetaTag('og:title', ogTitle || title);
    updateMetaTag('og:description', ogDescription || description);
    updateMetaTag('og:image', ogImage);
    updateMetaTag('og:type', ogType);
    updateMetaTag('og:url', canonicalUrl);

    // Update Twitter tags
    updateMetaTag('twitter:title', twitterTitle || ogTitle || title);
    updateMetaTag('twitter:description', twitterDescription || ogDescription || description);
    updateMetaTag('twitter:image', twitterImage || ogImage);
    updateMetaTag('twitter:card', 'summary_large_image');

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Add structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, canonicalUrl, ogTitle, ogDescription, ogImage, ogType, twitterTitle, twitterDescription, twitterImage, structuredData]);

  return null;
};

// Pre-configured SEO components for common pages
export const HomeSEO = () => (
  <SEO
    title="Etherius AI - Top AI Consulting Firm | 240% ROI Guaranteed | Strategic AI Solutions"
    description="Leading AI consulting firm delivering guaranteed 240% ROI. We specialize in AI agents, voice AI, and smart automation for businesses. 68% cost reduction, 12x faster workflows. Free consultation available."
    keywords="AI consulting, AI consulting firm, artificial intelligence consulting, AI strategy consulting, AI agents development, voice AI solutions, business AI automation, AI ROI optimization, enterprise AI implementation, AI transformation services, custom AI solutions, AI business strategy"
    canonicalUrl="https://www.etheriusai.com/"
    structuredData={{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.etheriusai.com/#organization",
          "name": "Etherius AI",
          "alternateName": "Etherius AI Consulting",
          "description": "Leading AI consulting firm specializing in strategic AI implementation, custom AI agents, voice AI solutions, and business automation. Delivering guaranteed 240% ROI through proven AI transformation strategies.",
          "url": "https://www.etheriusai.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.etheriusai.com/favicon.svg",
            "width": 300,
            "height": 100
          },
          "image": "https://www.etheriusai.com/og-image.svg",
          "telephone": "+1-555-AI-SOLUTIONS",
          "email": "hello@etheriusai.com",
          "foundingDate": "2024",
          "numberOfEmployees": "2-10",
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+1-555-AI-SOLUTIONS",
              "contactType": "customer service",
              "areaServed": "US",
              "availableLanguage": ["en"],
              "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              }
            },
            {
              "@type": "ContactPoint",
              "email": "hello@etheriusai.com",
              "contactType": "sales",
              "areaServed": "Worldwide"
            }
          ],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US",
            "addressRegion": "United States"
          },
          "areaServed": {
            "@type": "Country",
            "name": "United States"
          },
          "sameAs": [
            "https://twitter.com/etherius_ai",
            "https://linkedin.com/company/etherius-ai"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "25",
            "bestRating": "5",
            "worstRating": "1"
          }
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://www.etheriusai.com/#localbusiness",
          "name": "Etherius AI",
          "image": "https://www.etheriusai.com/og-image.svg",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 39.8283,
            "longitude": -98.5795
          },
          "url": "https://www.etheriusai.com",
          "telephone": "+1-555-AI-SOLUTIONS",
          "priceRange": "$$$$",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://www.etheriusai.com/#website",
          "url": "https://www.etheriusai.com",
          "name": "Etherius AI - Strategic AI Solutions",
          "description": "Top AI consulting firm delivering 240% ROI through AI agents, voice AI, and smart automation",
          "publisher": {
            "@id": "https://www.etheriusai.com/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.etheriusai.com/?s={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "Service",
          "@id": "https://www.etheriusai.com/#ai-consulting-service",
          "name": "AI Consulting Services",
          "description": "Strategic AI implementation and consulting services delivering 240% average ROI through custom AI agents, voice AI solutions, and intelligent business automation.",
          "provider": {
            "@id": "https://www.etheriusai.com/#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "United States"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "AI Consulting Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Agents Development",
                  "description": "Custom AI agents that drive real business results and automate complex processes"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Voice & Chat AI Solutions",
                  "description": "Advanced voice and chat AI systems that convert visitors into customers"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Smart Business Automation",
                  "description": "AI-powered automations that scale your business operations efficiently"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Strategic AI Implementation",
                  "description": "Comprehensive AI strategy and implementation for enterprise transformation"
                }
              }
            ]
          }
        },
        {
          "@type": "ProfessionalService",
          "@id": "https://www.etheriusai.com/#professional-service",
          "name": "Etherius AI Professional Services",
          "description": "Expert AI consulting and implementation services for businesses seeking competitive advantage through artificial intelligence.",
          "provider": {
            "@id": "https://www.etheriusai.com/#organization"
          },
          "serviceType": "AI Consulting",
          "category": "Artificial Intelligence Consulting"
        }
      ]
    }}
  />
);

export const PrivacySEO = () => (
  <SEO
    title="Privacy Policy | Etherius AI - GDPR Compliant AI Consulting Data Protection"
    description="Etherius AI's comprehensive privacy policy ensures GDPR compliance and enterprise-grade data protection. Learn how we safeguard your business data during AI consulting projects. Secure AI implementation guaranteed."
    keywords="AI consulting privacy policy, GDPR compliance AI, data protection artificial intelligence, AI consulting data security, enterprise AI privacy, business data protection, AI consulting confidentiality, secure AI implementation"
    canonicalUrl="https://www.etheriusai.com/privacy"
    ogType="article"
  />
);

export const TermsSEO = () => (
  <SEO
    title="Terms of Service | Etherius AI - AI Consulting Service Agreement & Business Terms"
    description="Etherius AI terms of service for AI consulting agreements. Clear service terms, intellectual property rights, and business partnership conditions. Transparent AI consulting contract terms and conditions."
    keywords="AI consulting terms of service, AI consulting agreement, artificial intelligence service terms, AI consulting contract, business AI partnership terms, AI consulting legal terms, enterprise AI agreement, AI implementation service terms"
    canonicalUrl="https://www.etheriusai.com/terms"
    ogType="article"
  />
);

export const NotFoundSEO = () => (
  <SEO
    title="Page Not Found (404) | Etherius AI - Strategic AI Consulting Services"
    description="Page not found. Explore Etherius AI's AI consulting services, AI agents, voice AI solutions, and business automation. Get 240% ROI with our proven AI implementation strategies. Free consultation available."
    keywords="AI consulting, AI services, AI agents, voice AI, business automation, AI strategy consulting, artificial intelligence solutions"
    canonicalUrl="https://www.etheriusai.com/404"
  />
);