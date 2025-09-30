import { useEffect, useRef, useState } from 'react';
import apiService from '@/services/apiService.js';

interface VisibilityTrackingOptions {
  sectionName: string;
  threshold?: number; // Percentage of section that must be visible (0-1)
  trackTimeSpent?: boolean;
  minTimeToTrack?: number; // Minimum seconds to track (default 1)
}

export const useVisibilityTracking = ({
  sectionName,
  threshold = 0.5,
  trackTimeSpent = true,
  minTimeToTrack = 1
}: VisibilityTrackingOptions) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const visibilityStartTime = useRef<number | null>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          const nowVisible = entry.isIntersecting;

          setIsVisible(nowVisible);

          if (nowVisible && !wasVisible) {
            // Section became visible
            visibilityStartTime.current = Date.now();

            // Track section view (only once per page load)
            if (!hasTrackedView.current) {
              apiService.trackEvent('section_view', {
                sectionName,
                timestamp: new Date().toISOString(),
                intersectionRatio: entry.intersectionRatio
              });

              // Track in GA4
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'view_section', {
                  section_name: sectionName,
                  engagement_type: 'section_view'
                });
              }

              hasTrackedView.current = true;
            }
          } else if (!nowVisible && wasVisible && trackTimeSpent) {
            // Section became hidden - track time spent
            if (visibilityStartTime.current) {
              const timeSpent = (Date.now() - visibilityStartTime.current) / 1000; // Convert to seconds

              if (timeSpent >= minTimeToTrack) {
                apiService.trackEvent('section_time_spent', {
                  sectionName,
                  timeSpent: Math.round(timeSpent),
                  timestamp: new Date().toISOString()
                });
              }

              visibilityStartTime.current = null;
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px'
      }
    );

    observer.observe(currentSection);

    // Cleanup function - track time if section is still visible when component unmounts
    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }

      // Track remaining time if section was visible when unmounting
      if (isVisible && visibilityStartTime.current && trackTimeSpent) {
        const timeSpent = (Date.now() - visibilityStartTime.current) / 1000;

        if (timeSpent >= minTimeToTrack) {
          apiService.trackEvent('section_time_spent', {
            sectionName,
            timeSpent: Math.round(timeSpent),
            timestamp: new Date().toISOString(),
            unmount: true
          });
        }
      }
    };
  }, [sectionName, threshold, trackTimeSpent, minTimeToTrack, isVisible]);

  return { sectionRef, isVisible };
};