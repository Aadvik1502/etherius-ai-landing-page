import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { loadBlogPost, type BlogPost as BlogPostType } from "@/lib/blogLoader";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) {
      console.error('No slug provided');
      return;
    }

    console.log('BlogPost component loading slug:', slug);

    loadBlogPost(slug)
      .then((data) => {
        console.log('loadBlogPost returned:', data);
        if (data) {
          setPost(data);
          console.log('Post set successfully');
        } else {
          console.error('loadBlogPost returned null');
          setError(true);
        }
      })
      .catch((err) => {
        console.error('Error in loadBlogPost:', err);
        setError(true);
      })
      .finally(() => {
        console.log('Loading complete');
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    // Update document title and meta description
    document.title = `${post.frontmatter.title} | Etherius AI`;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', post.frontmatter.meta_description);
    }

    // Add Article schema markup
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'article-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.frontmatter.title,
      "description": post.frontmatter.meta_description,
      "image": post.frontmatter.featured_image || "https://etheriusai.co/blog-default.jpg",
      "author": {
        "@type": "Organization",
        "name": post.frontmatter.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Etherius AI",
        "logo": {
          "@type": "ImageObject",
          "url": "https://etheriusai.co/favicon.svg"
        }
      },
      "datePublished": post.frontmatter.date,
      "dateModified": post.frontmatter.updated,
      "keywords": post.frontmatter.keywords
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('article-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="pt-32 pb-24 px-6 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl text-white/80">Loading article...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="pt-32 pb-24 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-white/80 mb-8">The blog post you're looking for doesn't exist.</p>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-neon-yellow hover:gap-3 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { frontmatter, content } = post;

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
              {frontmatter.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {frontmatter.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(frontmatter.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{frontmatter.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>By {frontmatter.author}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: frontmatter.title,
                    url: window.location.href
                  });
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white
            prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-white
            prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-white/90
            prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-neon-yellow prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:text-white/80 prose-ul:my-6
            prose-ol:text-white/80 prose-ol:my-6
            prose-li:text-white/80 prose-li:my-2
            prose-blockquote:border-l-neon-yellow prose-blockquote:text-white/80
            prose-code:text-neon-yellow prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-deep-blue border border-neon-yellow/20 rounded-lg text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Business with AI?
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
