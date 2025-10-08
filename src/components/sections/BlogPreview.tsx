import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

// Preview of latest blog posts for the homepage
const featuredPosts = [
  {
    id: "1",
    title: "The Complete Guide to Choosing an AI Consulting Firm in 2025",
    excerpt: "Discover the key factors to consider when selecting an AI consulting partner that will deliver real ROI for your business.",
    date: "2025-10-07",
    readTime: "8 min read",
    category: "AI Strategy",
    slug: "choosing-ai-consulting-firm-2025"
  },
  {
    id: "2",
    title: "How to Calculate Real ROI from AI Implementation",
    excerpt: "A comprehensive framework for measuring and maximizing ROI from your AI investments with our proprietary calculator.",
    date: "2025-10-06",
    readTime: "10 min read",
    category: "ROI & Value",
    slug: "calculate-ai-implementation-roi"
  },
  {
    id: "3",
    title: "AI Automation vs Traditional Automation: Which Delivers Better Results?",
    excerpt: "Compare AI-powered automation with traditional workflow automation to discover which delivers higher efficiency.",
    date: "2025-10-05",
    readTime: "7 min read",
    category: "Implementation",
    slug: "ai-automation-vs-traditional-automation"
  }
];

export const BlogPreview = () => {
  return (
    <section className="py-24 px-6 bg-darker-surface">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Latest <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">AI Insights</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Expert guidance on AI strategy, implementation, and maximizing ROI from our consulting team.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <Card
              key={post.id}
              className="group bg-deep-blue border-neon-yellow/20 hover:border-neon-yellow/60 transition-all duration-300 hover:shadow-xl hover:shadow-neon-yellow/10"
            >
              <CardContent className="p-6">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="text-xs font-semibold px-3 py-1 bg-neon-yellow/10 text-neon-yellow rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-neon-yellow transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-white/70 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Read More Link */}
                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-neon-yellow font-semibold group-hover:gap-3 transition-all duration-300"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-neon-yellow/40 hover:border-neon-yellow hover:bg-neon-yellow/10"
            onClick={() => window.location.href = '/blog'}
          >
            View All Articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
