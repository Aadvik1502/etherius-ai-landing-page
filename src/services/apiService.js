// API service for communicating with the backend

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;

        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'include'
        };

        const config = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        };

        try {
            console.log(`🌐 Making API request to: ${endpoint}`);
            const response = await fetch(url, config);

            const data = await response.json();

            if (!response.ok) {
                console.error(`❌ API Error (${response.status}):`, data);
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }

            console.log(`✅ API request successful: ${endpoint}`);
            return data;

        } catch (error) {
            console.error(`❌ API request failed for ${endpoint}:`, error);

            // Return a more user-friendly error object
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                throw new Error('Unable to connect to server. Please check your internet connection and try again.');
            }

            throw error;
        }
    }

    // Contact form submission
    async submitContactForm(formData) {
        return this.makeRequest('/contact', {
            method: 'POST',
            body: JSON.stringify({
                ...formData,
                // Add page tracking data
                pageUrl: window.location.href,
                referrer: document.referrer,
                timestamp: new Date().toISOString()
            })
        });
    }

    // Analytics tracking
    async trackEvent(eventType, eventData = {}) {
        try {
            return this.makeRequest('/analytics', {
                method: 'POST',
                body: JSON.stringify({
                    eventType,
                    eventData,
                    pageUrl: window.location.href,
                    sessionId: this.getSessionId(),
                    timestamp: new Date().toISOString()
                })
            });
        } catch (error) {
            // Don't throw analytics errors to avoid disrupting user experience
            console.warn('Analytics tracking failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Health check
    async checkHealth() {
        return this.makeRequest('/health');
    }

    // Utility methods

    getSessionId() {
        // Get or create session ID for analytics
        let sessionId = sessionStorage.getItem('etherius_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('etherius_session_id', sessionId);
        }
        return sessionId;
    }

    // Track page view
    async trackPageView(pageName = null) {
        const pageData = {
            page: pageName || document.title,
            url: window.location.href,
            path: window.location.pathname,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };

        return this.trackEvent('page_view', pageData);
    }

    // Track CTA clicks
    async trackCTAClick(ctaType, ctaText, location) {
        return this.trackEvent('cta_click', {
            ctaType,
            ctaText,
            location,
            timestamp: new Date().toISOString()
        });
    }

    // Track form interactions
    async trackFormInteraction(action, formField = null, formData = {}) {
        return this.trackEvent('form_interaction', {
            action, // 'started', 'field_focus', 'field_blur', 'submitted', 'error'
            formField,
            formData,
            timestamp: new Date().toISOString()
        });
    }

    // Track scroll depth
    async trackScrollDepth(percentage) {
        return this.trackEvent('scroll_depth', {
            percentage,
            url: window.location.href,
            timestamp: new Date().toISOString()
        });
    }

    // Track time on page
    async trackTimeOnPage(timeInSeconds) {
        return this.trackEvent('time_on_page', {
            timeInSeconds,
            url: window.location.href,
            timestamp: new Date().toISOString()
        });
    }
}

// Create singleton instance
const apiService = new ApiService();

// Auto-track page view when service is loaded
if (typeof window !== 'undefined') {
    // Track page view after a short delay to ensure page is fully loaded
    setTimeout(() => {
        apiService.trackPageView();
    }, 1000);

    // Track scroll depth milestones
    let maxScrollDepth = 0;
    const scrollMilestones = [25, 50, 75, 90, 100];

    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

        if (scrollPercentage > maxScrollDepth) {
            maxScrollDepth = scrollPercentage;

            // Track milestone achievements
            scrollMilestones.forEach(milestone => {
                if (scrollPercentage >= milestone && maxScrollDepth < milestone + 5) {
                    apiService.trackScrollDepth(milestone);
                }
            });
        }
    };

    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 100);
    });

    // Track time on page
    let startTime = Date.now();
    let timeTracked = false;

    const trackTimeBeforeLeave = () => {
        if (!timeTracked) {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            if (timeSpent > 10) { // Only track if user stayed more than 10 seconds
                apiService.trackTimeOnPage(timeSpent);
                timeTracked = true;
            }
        }
    };

    // Track time when user leaves page
    window.addEventListener('beforeunload', trackTimeBeforeLeave);
    window.addEventListener('pagehide', trackTimeBeforeLeave);

    // Also track after 2 minutes for long sessions
    setTimeout(trackTimeBeforeLeave, 120000);
}

export default apiService;