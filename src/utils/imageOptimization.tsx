/**
 * Image optimization utilities for better performance and SEO
 */

export const LazyImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  [key: string]: any;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
};

// Create optimized versions of logos for different use cases
export const OPTIMIZED_LOGOS = {
  // Main logo for navigation (small)
  nav: "/assets/logo-nav-optimized.svg",

  // Hero section logo (medium)
  hero: "/assets/logo-hero-optimized.svg",

  // Large logo for special sections
  large: "/assets/logo-large-optimized.svg",

  // Fallback PNG versions for compatibility
  navPng: "/assets/logo-nav-optimized.png",
  heroPng: "/assets/logo-hero-optimized.png",
  largePng: "/assets/logo-large-optimized.png"
};

// Helper function to get appropriate logo based on context
export const getOptimizedLogo = (size: 'nav' | 'hero' | 'large', format: 'svg' | 'png' = 'svg') => {
  const key = format === 'svg' ? size : `${size}Png` as keyof typeof OPTIMIZED_LOGOS;
  return OPTIMIZED_LOGOS[key];
};

// Image preloading for critical images
export const preloadCriticalImages = () => {
  const criticalImages = [
    OPTIMIZED_LOGOS.nav,
    OPTIMIZED_LOGOS.hero,
    "/assets/customer-avatar-1.svg",
    "/assets/customer-avatar-2.svg",
    "/assets/customer-avatar-3.svg"
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
};