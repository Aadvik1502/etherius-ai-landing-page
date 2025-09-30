import { useEffect } from 'react';
import apiService from '@/services/apiService.js';
import { useClickHeatmap } from '@/hooks/useClickHeatmap';

// Re-export tracking hooks
export { useVisibilityTracking } from '@/hooks/useVisibilityTracking';
export { useClickHeatmap } from '@/hooks/useClickHeatmap';

// GA4 Event Tracking Utility
export const trackGA4Event = (eventName: string, eventParams: Record<string, any> = {}) => {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, eventParams);
      console.log(`✅ GA4 Event tracked: ${eventName}`, eventParams);
    }
  } catch (error) {
    console.warn('GA4 event tracking failed:', error);
  }
};

interface AnalyticsProps {
  pageName?: string;
  trackPageView?: boolean;
  trackClicks?: boolean;
}

export const Analytics = ({ pageName, trackPageView = true, trackClicks = true }: AnalyticsProps) => {
  // Always call hooks unconditionally (React rules)
  useClickHeatmap();

  useEffect(() => {
    if (trackPageView) {
      // Track page view with optional custom page name
      apiService.trackPageView(pageName);
    }
  }, [pageName, trackPageView]);

  return null; // This component doesn't render anything
};

// Hook for tracking CTA clicks
export const useCTATracking = () => {
  const trackCTAClick = async (ctaType: string, ctaText: string, location: string) => {
    try {
      // Track in custom backend
      await apiService.trackCTAClick(ctaType, ctaText, location);

      // Track in GA4
      trackGA4Event('engage_with_cta', {
        cta_type: ctaType,
        cta_text: ctaText,
        cta_location: location
      });
    } catch (error) {
      console.warn('CTA tracking failed:', error);
    }
  };

  return { trackCTAClick };
};

// Hook for tracking form interactions
export const useFormTracking = () => {
  const trackFormStart = async (formType: string) => {
    try {
      await apiService.trackFormInteraction('started', null, { formType });
    } catch (error) {
      console.warn('Form start tracking failed:', error);
    }
  };

  const trackFieldFocus = async (fieldName: string, formType: string) => {
    try {
      await apiService.trackFormInteraction('field_focus', fieldName, { formType });
    } catch (error) {
      console.warn('Field focus tracking failed:', error);
    }
  };

  const trackFieldBlur = async (fieldName: string, formType: string, hasValue: boolean) => {
    try {
      await apiService.trackFormInteraction('field_blur', fieldName, {
        formType,
        hasValue,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Field blur tracking failed:', error);
    }
  };

  return { trackFormStart, trackFieldFocus, trackFieldBlur };
};

// Hook for tracking button/link clicks
export const useClickTracking = () => {
  const trackClick = async (elementType: string, elementText: string, elementLocation: string, additionalData = {}) => {
    try {
      await apiService.trackEvent('element_click', {
        elementType,
        elementText,
        elementLocation,
        ...additionalData,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Click tracking failed:', error);
    }
  };

  return { trackClick };
};

// Component wrapper for automatic click tracking
interface TrackedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  trackingData: {
    type: string;
    text: string;
    location: string;
    additionalData?: Record<string, any>;
  };
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}

export const TrackedButton = ({
  children,
  onClick,
  trackingData,
  className = '',
  disabled = false,
  ...props
}: TrackedButtonProps) => {
  const { trackClick } = useClickTracking();

  const handleClick = async () => {
    // Track the click
    await trackClick(
      trackingData.type,
      trackingData.text,
      trackingData.location,
      trackingData.additionalData
    );

    // Execute the original onClick if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Component wrapper for automatic link tracking
interface TrackedLinkProps {
  children: React.ReactNode;
  href: string;
  trackingData: {
    type: string;
    text: string;
    location: string;
    additionalData?: Record<string, any>;
  };
  className?: string;
  target?: string;
  [key: string]: any;
}

export const TrackedLink = ({
  children,
  href,
  trackingData,
  className = '',
  target,
  ...props
}: TrackedLinkProps) => {
  const { trackClick } = useClickTracking();

  const handleClick = async () => {
    // Track the click
    await trackClick(
      trackingData.type,
      trackingData.text,
      trackingData.location,
      {
        href,
        target,
        ...trackingData.additionalData
      }
    );
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      {...props}
    >
      {children}
    </a>
  );
};

export default Analytics;