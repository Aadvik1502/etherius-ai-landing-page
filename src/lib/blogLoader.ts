export interface BlogPostFrontmatter {
  title: string;
  meta_description: string;
  keywords: string;
  author: string;
  date: string;
  updated: string;
  category: string;
  readTime: string;
  featured_image?: string;
  schema_type?: string;
}

export interface BlogPost {
  frontmatter: BlogPostFrontmatter;
  content: string;
}

/**
 * Parse frontmatter from markdown manually (browser-compatible)
 */
function parseFrontmatter(markdown: string): { data: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: markdown };
  }

  const frontmatterText = match[1];
  const content = match[2];
  const data: Record<string, string> = {};

  // Parse YAML-like frontmatter
  frontmatterText.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      // Remove quotes if present
      value = value.replace(/^["']|["']$/g, '');
      data[key] = value;
    }
  });

  return { data, content };
}

/**
 * Load and parse a blog post markdown file
 * @param slug - The blog post slug (e.g., "why-ai-projects-fail-2025")
 * @returns Parsed blog post with frontmatter and content
 */
export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    console.log(`Attempting to load blog post: ${slug}`);

    // Fetch the markdown file from the blog directory
    const response = await fetch(`/blog/${slug}.md`);

    console.log(`Fetch response status: ${response.status}`);

    if (!response.ok) {
      console.error(`Blog post not found: ${slug}, Status: ${response.status}`);
      return null;
    }

    const markdown = await response.text();
    console.log(`Markdown loaded, length: ${markdown.length}`);

    // Parse frontmatter and content manually
    const { data, content } = parseFrontmatter(markdown);

    console.log('Frontmatter parsed:', data);
    console.log(`Content length: ${content.length}`);

    return {
      frontmatter: data as BlogPostFrontmatter,
      content: content.trim()
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}
