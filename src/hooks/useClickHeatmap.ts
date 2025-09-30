import { useEffect } from 'react';
import apiService from '@/services/apiService.js';

interface ClickData {
  x: number;
  y: number;
  elementType: string;
  elementText: string;
  elementClasses: string;
  elementId: string;
  pageUrl: string;
  viewportWidth: number;
  viewportHeight: number;
  timestamp: string;
}

export const useClickHeatmap = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Get element information
      const elementType = target.tagName.toLowerCase();
      const elementText = target.textContent?.slice(0, 100) || ''; // Limit text length
      const elementClasses = target.className || '';
      const elementId = target.id || '';

      // Get click coordinates (relative to viewport)
      const x = event.clientX;
      const y = event.clientY;

      // Get viewport size
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate relative position (0-100%)
      const relativeX = (x / viewportWidth) * 100;
      const relativeY = (y / viewportHeight) * 100;

      const clickData: ClickData = {
        x: relativeX,
        y: relativeY,
        elementType,
        elementText,
        elementClasses,
        elementId,
        pageUrl: window.location.pathname,
        viewportWidth,
        viewportHeight,
        timestamp: new Date().toISOString()
      };

      // Track the click event
      apiService.trackEvent('click_heatmap', clickData);
    };

    // Add click listener to document
    document.addEventListener('click', handleClick, { passive: true });

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [enabled]);
};