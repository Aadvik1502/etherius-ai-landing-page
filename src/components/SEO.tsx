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
  title = "AI Consulting That Delivers 240% ROI | Free Strategy Session | Etherius",
  description = "Transform your business with AI consulting that guarantees 240% ROI. 68% cost reduction, 12x faster workflows. Book your free AI strategy session today.",
  keywords = "AI consulting, business AI implementation, AI strategy consulting, enterprise AI solutions, AI ROI optimization, AI agents, voice AI, chat AI, business automation, artificial intelligence consulting, AI transformation, AI implementation consultant",
  canonicalUrl = "https://etheriusai.co",
  ogTitle,
  ogDescription,
  ogImage = "https://etheriusai.co/og-image.svg",
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
    title="AI Consulting That Delivers 240% ROI | Free Strategy Session | Etherius"
    description="Transform your business with AI consulting that guarantees 240% ROI. 68% cost reduction, 12x faster workflows. Book your free AI strategy session today."
    keywords="AI consulting, AI consulting firm, artificial intelligence consulting, AI strategy consulting, AI agents development, voice AI solutions, business AI automation, AI ROI optimization, enterprise AI implementation, AI transformation services, custom AI solutions, AI business strategy, AI implementation consultant, enterprise AI strategy"
    canonicalUrl="https://etheriusai.co/"
    structuredData={{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://etheriusai.co/#organization",
          "name": "Etherius AI",
          "alternateName": "Etherius AI Consulting",
          "description": "Leading AI consulting firm specializing in strategic AI implementation, custom AI agents, voice AI solutions, and business automation. Delivering guaranteed 240% ROI through proven AI transformation strategies.",
          "url": "https://etheriusai.co",
          "logo": {
            "@type": "ImageObject",
            "url": "https://etheriusai.co/favicon.svg",
            "width": 300,
            "height": 100
          },
          "image": "https://etheriusai.co/og-image.svg",
          "telephone": "+1-555-AI-SOLUTIONS",
          "email": "support@etheriusai.co",
          "foundingDate": "2024",
          "numberOfEmployees": "2-10",
          "slogan": "From AI to ROI - Strategic AI Solutions That Deliver Results",
          "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Business Automation", "AI Strategy", "Enterprise AI Implementation", "AI Agents", "Voice AI", "Chat AI", "AI Consulting", "Business Intelligence", "Process Automation", "AI Transformation"],
          "priceRange": "$$$$",
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
              "email": "support@etheriusai.co",
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
          "@id": "https://etheriusai.co/#localbusiness",
          "name": "Etherius AI",
          "image": "https://etheriusai.co/og-image.svg",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 39.8283,
            "longitude": -98.5795
          },
          "url": "https://etheriusai.co",
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
          "@id": "https://etheriusai.co/#website",
          "url": "https://etheriusai.co",
          "name": "Etherius AI - Strategic AI Solutions",
          "description": "Top AI consulting firm delivering 240% ROI through AI agents, voice AI, and smart automation",
          "publisher": {
            "@id": "https://etheriusai.co/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://etheriusai.co/?s={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "Service",
          "@id": "https://etheriusai.co/#ai-consulting-service",
          "name": "AI Consulting Services",
          "description": "Strategic AI implementation and consulting services delivering 240% average ROI through custom AI agents, voice AI solutions, and intelligent business automation.",
          "provider": {
            "@id": "https://etheriusai.co/#organization"
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
          "@id": "https://etheriusai.co/#professional-service",
          "name": "Etherius AI Professional Services",
          "description": "Expert AI consulting and implementation services for businesses seeking competitive advantage through artificial intelligence.",
          "provider": {
            "@id": "https://etheriusai.co/#organization"
          },
          "serviceType": "AI Consulting",
          "category": "Artificial Intelligence Consulting"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://etheriusai.co/#breadcrumbs",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://etheriusai.co/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "AI Consulting Services",
              "item": "https://etheriusai.co/#services"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Our Process",
              "item": "https://etheriusai.co/#process"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Contact Us",
              "item": "https://etheriusai.co/#contact"
            }
          ]
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
    canonicalUrl="https://etheriusai.co/privacy"
    ogType="article"
  />
);

export const TermsSEO = () => (
  <SEO
    title="Terms of Service | Etherius AI - AI Consulting Service Agreement & Business Terms"
    description="Etherius AI terms of service for AI consulting agreements. Clear service terms, intellectual property rights, and business partnership conditions. Transparent AI consulting contract terms and conditions."
    keywords="AI consulting terms of service, AI consulting agreement, artificial intelligence service terms, AI consulting contract, business AI partnership terms, AI consulting legal terms, enterprise AI agreement, AI implementation service terms"
    canonicalUrl="https://etheriusai.co/terms"
    ogType="article"
  />
);

export const NotFoundSEO = () => (
  <SEO
    title="Page Not Found (404) | Etherius AI - Strategic AI Consulting Services"
    description="Page not found. Explore Etherius AI's AI consulting services, AI agents, voice AI solutions, and business automation. Get 240% ROI with our proven AI implementation strategies. Free consultation available."
    keywords="AI consulting, AI services, AI agents, voice AI, business automation, AI strategy consulting, artificial intelligence solutions"
    canonicalUrl="https://etheriusai.co/404"
  />
);

export const BlogSEO = () => (
  <SEO
    title="Blog - AI Consulting Insights & Strategies | Etherius AI"
    description="Expert insights on AI consulting, implementation strategies, ROI optimization, and business transformation. Learn from leading AI experts about custom AI agents, voice AI solutions, and intelligent automation that delivers real results."
    keywords="AI consulting blog, artificial intelligence insights, AI strategy guides, AI implementation tips, business AI transformation, AI ROI optimization, AI agents guide, voice AI insights, chat AI strategies, enterprise AI consulting, AI consulting best practices, machine learning business applications, AI automation strategies, AI transformation insights"
    canonicalUrl="https://etheriusai.co/blog"
    ogType="website"
    structuredData={{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Blog",
          "@id": "https://etheriusai.co/blog#blog",
          "name": "Etherius AI Blog",
          "description": "Expert insights on AI consulting, strategic AI implementation, and business transformation through artificial intelligence",
          "url": "https://etheriusai.co/blog",
          "publisher": {
            "@id": "https://etheriusai.co/#organization"
          },
          "inLanguage": "en-US"
        },
        {
          "@type": "CollectionPage",
          "@id": "https://etheriusai.co/blog#webpage",
          "url": "https://etheriusai.co/blog",
          "name": "Blog - AI Consulting Insights & Strategies | Etherius AI",
          "description": "Expert insights on AI consulting, implementation strategies, ROI optimization, and business transformation",
          "isPartOf": {
            "@id": "https://etheriusai.co/#website"
          },
          "about": {
            "@id": "https://etheriusai.co/#organization"
          },
          "breadcrumb": {
            "@id": "https://etheriusai.co/blog#breadcrumb"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://etheriusai.co/blog#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://etheriusai.co/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": "https://etheriusai.co/blog"
            }
          ]
        }
      ]
    }}
  />
);