import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BlogSEO } from "@/components/SEO";
import { useState } from "react";

// Blog post type
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  imageUrl?: string;
}

// Sample blog posts - replace with actual blog posts
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "AI Voice Agents in 2025: The Complete Implementation Guide for Business Leaders",
    excerpt: "Master AI voice agent implementation with our proven framework. Reduce support costs by 68%, boost customer satisfaction 30%, and scale your business intelligently with this comprehensive guide.",
    author: "Etherius AI Team",
    date: "2025-10-17",
    readTime: "13 min read",
    category: "AI Implementation",
    slug: "ai-voice-agents-implementation-guide-2025"
  },
  {
    id: "2",
    title: "Why 70% of AI Projects Fail in 2025 (And How Your Business Can Succeed)",
    excerpt: "Discover why AI projects fail and learn the proven framework that helps businesses avoid the $trillions lost annually. Real insights from 240% ROI success stories and the exact mistakes to avoid.",
    author: "Etherius AI Team",
    date: "2025-10-15",
    readTime: "11 min read",
    category: "AI Implementation",
    slug: "why-ai-projects-fail-2025"
  },
  {
    id: "3",
    title: "The Complete Guide to Choosing an AI Consulting Firm in 2025",
    excerpt: "🚀 Coming soon! We're crafting the ultimate guide to help you find the perfect AI partner. Spoiler: it's not just about fancy tech demos and buzzwords. Real talk about vetting consultants who deliver results.",
    author: "Etherius AI Team",
    date: "2025-10-07",
    readTime: "8 min read",
    category: "AI Strategy & Planning",
    slug: "choosing-ai-consulting-firm-2025"
  },
  {
    id: "4",
    title: "How to Calculate Real ROI from AI Implementation",
    excerpt: "📊 Coming soon! Learn exactly how to calculate your AI ROI (no spreadsheet wizardry required). Real numbers, real results, real frameworks that actually work in the messy world of business.",
    author: "Etherius AI Team",
    date: "2025-10-06",
    readTime: "10 min read",
    category: "ROI & Business Value",
    slug: "calculate-ai-implementation-roi"
  },
  {
    id: "5",
    title: "AI Automation vs Traditional Automation: Which Delivers Better Results?",
    excerpt: "⚡ Coming soon! The automation showdown nobody asked for but everyone needs. AI vs Traditional—which wins? Spoiler: AI dominates, but not in the ways you think. Get ready for some myth-busting.",
    author: "Etherius AI Team",
    date: "2025-10-05",
    readTime: "7 min read",
    category: "Implementation Guides",
    slug: "ai-automation-vs-traditional-automation"
  },
  {
    id: "6",
    title: "7 Signs Your Business Needs an AI Strategy Consultant",
    excerpt: "🎯 Coming soon! Think you need AI consulting? These 7 signs will tell you if you're actually ready—or just following the hype. (Hint: If you're googling 'do I need AI,' you might already know the answer.)",
    author: "Etherius AI Team",
    date: "2025-10-04",
    readTime: "6 min read",
    category: "AI Strategy & Planning",
    slug: "business-needs-ai-strategy-consultant"
  }
];

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // 1 featured + 8 in grid

  // Calculate pagination
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

  // Featured post is the first one on each page
  const featuredPost = currentPosts[0];
  const gridPosts = currentPosts.slice(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogSEO />
      <Navigation />

      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">AI Insights & Strategies</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Stay ahead with the latest AI consulting strategies, implementation guides, and industry insights from our expert team.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <Card className="group bg-deep-blue border-neon-yellow/20 hover:border-neon-yellow/60 transition-all duration-300 hover:shadow-2xl hover:shadow-neon-yellow/20">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold px-3 py-1 bg-neon-yellow/10 text-neon-yellow rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 bg-green-400/10 text-green-400 rounded-full">
                      Latest Post
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 group-hover:text-neon-yellow transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-white/80 text-lg md:text-xl mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-white/60 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <a
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-neon-yellow font-semibold text-lg group-hover:gap-3 transition-all duration-300"
                  >
                    Read Full Article
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recent Posts Grid */}
          {gridPosts.length > 0 && (
            <>
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white/90">Recent Articles</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {gridPosts.map((post) => (
                  <Card key={post.id} className="group bg-deep-blue border-neon-yellow/20 hover:border-neon-yellow/60 transition-all duration-300 hover:shadow-xl hover:shadow-neon-yellow/10">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <span className="text-xs font-semibold px-3 py-1 bg-neon-yellow/10 text-neon-yellow rounded-full">
                          {post.category}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold mb-3 group-hover:text-neon-yellow transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-white/70 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <a
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-neon-yellow font-semibold group-hover:gap-3 transition-all duration-300"
                      >
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-neon-yellow/20 hover:border-neon-yellow/60 hover:bg-neon-yellow/10 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={
                      currentPage === page
                        ? "bg-gradient-to-r from-neon-yellow to-green-400 text-black hover:from-neon-yellow/90 hover:to-green-400/90"
                        : "border-neon-yellow/20 hover:border-neon-yellow/60 hover:bg-neon-yellow/10"
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-neon-yellow/20 hover:border-neon-yellow/60 hover:bg-neon-yellow/10 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
