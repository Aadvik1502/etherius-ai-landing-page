import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { useEffect } from "react";

// This is a template for individual blog posts
// Replace with actual blog post data from CMS or markdown files

export default function BlogPost() {
  useEffect(() => {
    // Add Article schema markup
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'article-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Blog Post Title Here",
      "description": "Blog post excerpt/description here",
      "image": "https://etheriusai.co/blog-image.jpg",
      "author": {
        "@type": "Organization",
        "name": "Etherius AI"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Etherius AI",
        "logo": {
          "@type": "ImageObject",
          "url": "https://etheriusai.co/favicon.svg"
        }
      },
      "datePublished": "2025-10-07",
      "dateModified": "2025-10-07"
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('article-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <article className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Back to Blog Link */}
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-neon-yellow hover:gap-3 transition-all duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </a>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="text-xs font-semibold px-3 py-1 bg-neon-yellow/10 text-neon-yellow rounded-full">
              AI Strategy & Planning
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Blog Post Title Goes Here
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>October 7, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>8 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <span>By Etherius AI Team</span>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-white/80 leading-relaxed mb-6">
              This is the blog post content area. Replace this with your actual blog post content.
              The content should be written in a way that provides value to readers while incorporating
              relevant SEO keywords naturally.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Section Heading</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              Your blog post content continues here with detailed information, insights, and actionable
              advice for your readers. Break up the content with headings, subheadings, lists, and images
              to improve readability and engagement.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">Subheading</h3>
            <ul className="list-disc list-inside space-y-2 text-white/80 mb-6">
              <li>Key point or benefit number one</li>
              <li>Key point or benefit number two</li>
              <li>Key point or benefit number three</li>
            </ul>

            <p className="text-white/80 leading-relaxed mb-6">
              Continue with more valuable content that addresses your readers' pain points and provides
              solutions related to AI consulting, implementation, and business transformation.
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-deep-blue border border-neon-yellow/20 rounded-lg text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Implement AI in Your Business?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Book a free AI strategy session with our experts to discover how we can help you achieve
              240% ROI through strategic AI implementation.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-neon-yellow to-green-400 text-black hover:from-neon-yellow/90 hover:to-green-400/90"
              onClick={() => window.open('https://calendly.com/etheriusai/30min', '_blank')}
            >
              Book Free Consultation
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
