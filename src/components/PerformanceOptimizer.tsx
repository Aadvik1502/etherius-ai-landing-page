import { useEffect } from 'react';

// Extend the window interface to include gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters: Record<string, unknown>) => void;
  }
}

interface PerformanceOptimizerProps {
  preloadImages?: boolean;
  lazyLoadImages?: boolean;
  optimizeFonts?: boolean;
}

export const PerformanceOptimizer = ({
  preloadImages = true,
  lazyLoadImages = true,
  optimizeFonts = true
}: PerformanceOptimizerProps) => {
  useEffect(() => {
    // Preload critical images
    if (preloadImages) {
      const criticalImages = [
        '/assets/etherius_ai_logo.svg',
        '/assets/customer-avatar-1.svg',
        '/assets/customer-avatar-2.svg',
        '/assets/customer-avatar-3.svg'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    }

    // Set up font optimization
    if (optimizeFonts) {
      const fontLink = document.createElement('link');
      fontLink.rel = 'preconnect';
      fontLink.href = 'https://fonts.googleapis.com';
      document.head.appendChild(fontLink);

      const fontLinkCrossdomain = document.createElement('link');
      fontLinkCrossdomain.rel = 'preconnect';
      fontLinkCrossdomain.href = 'https://fonts.gstatic.com';
      fontLinkCrossdomain.crossOrigin = '';
      document.head.appendChild(fontLinkCrossdomain);
    }

    // Add performance observer for monitoring Core Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.log(`LCP: ${entry.startTime}ms`);
            // Track to analytics if needed
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                metric_name: 'LCP',
                metric_value: Math.round(entry.startTime),
                metric_id: 'lcp'
              });
            }
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift (CLS)
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const clsEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
            if (!clsEntry.hadRecentInput) {
              console.log(`CLS: ${clsEntry.value}`);
              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  metric_name: 'CLS',
                  metric_value: Math.round((clsEntry.value || 0) * 1000),
                  metric_id: 'cls'
                });
              }
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                metric_name: 'FID',
                metric_value: Math.round(entry.processingStart - entry.startTime),
                metric_id: 'fid'
              });
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // First Contentful Paint (FCP)
        const fcpObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.log(`FCP: ${entry.startTime}ms`);
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

      } catch (error) {
        console.warn('Performance Observer not fully supported:', error);
      }
    }

    // Preload DNS for external domains
    const dnsPrefetch = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://calendly.com',
      'https://analytics.google.com'
    ];

    dnsPrefetch.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Enable resource hints for better performance
    const resourceHints = document.createElement('link');
    resourceHints.rel = 'preconnect';
    resourceHints.href = 'https://calendly.com';
    document.head.appendChild(resourceHints);

    // Lazy load images that are below the fold
    if (lazyLoadImages) {
      const images = document.querySelectorAll('img[data-lazy]');

      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = img.dataset.lazy || '';
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          });
        });

        images.forEach((img) => imageObserver.observe(img));
      }
    }
  }, [preloadImages, lazyLoadImages, optimizeFonts]);

  return null; // This component doesn't render anything
};