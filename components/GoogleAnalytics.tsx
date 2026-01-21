import { useEffect } from 'react';

// Google Analytics 4 tracking functions
export const GA_TRACKING_ID = 'G-RMGROUPS2026'; // Replace with your actual GA4 tracking ID

// Page view tracking
export const pageview = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
      page_title: title,
    });
  }
};

// Custom event tracking for travel services
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Enhanced eCommerce tracking for travel bookings
export const trackServiceInquiry = (serviceName: string, serviceType: string, estimatedValue?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'service_inquiry', {
      event_category: 'Travel Services',
      event_label: serviceName,
      service_type: serviceType,
      currency: 'NGN',
      value: estimatedValue || 0,
      custom_parameter_1: serviceType,
      custom_parameter_2: 'Nigeria'
    });
  }
};

// Track contact form submissions
export const trackContactForm = (formType: string, serviceInterest?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      event_category: 'Contact',
      event_label: formType,
      service_interest: serviceInterest,
      form_type: formType
    });
  }
};

// Track phone calls
export const trackPhoneCall = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'phone_call', {
      event_category: 'Contact',
      event_label: 'Phone Call Initiated',
      contact_method: 'phone'
    });
  }
};

// Track WhatsApp clicks
export const trackWhatsAppClick = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'Contact',
      event_label: 'WhatsApp Chat Initiated',
      contact_method: 'whatsapp'
    });
  }
};

// Track service card clicks
export const trackServiceClick = (serviceName: string, serviceType: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'service_click', {
      event_category: 'Services',
      event_label: serviceName,
      service_type: serviceType
    });
  }
};

// Track scroll depth for engagement
export const trackScrollDepth = (percentage: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', {
      event_category: 'Engagement',
      event_label: `${percentage}% Scroll Depth`,
      scroll_depth: percentage
    });
  }
};

// Track FAQ interactions
export const trackFAQClick = (question: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'faq_click', {
      event_category: 'Engagement',
      event_label: question,
      interaction_type: 'faq'
    });
  }
};

// Track chatbot interactions
export const trackChatbotInteraction = (action: string, message?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'chatbot_interaction', {
      event_category: 'AI Assistant',
      event_label: action,
      chatbot_action: action,
      message_preview: message?.substring(0, 50) || ''
    });
  }
};

// Track user location (with consent)
export const trackUserLocation = (city?: string, country?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_location', {
      event_category: 'Demographics',
      user_city: city || 'Unknown',
      user_country: country || 'Unknown'
    });
  }
};

// Enhanced conversion tracking
export const trackConversion = (conversionType: string, value?: number, currency = 'NGN') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      event_category: 'Conversions',
      event_label: conversionType,
      currency: currency,
      value: value || 0,
      conversion_type: conversionType
    });
  }
};

// AI-powered user behavior tracking
export const trackUserBehavior = (behaviorType: string, details: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_behavior', {
      event_category: 'AI Insights',
      event_label: behaviorType,
      behavior_type: behaviorType,
      ...details
    });
  }
};

// Google Analytics Hook for React components
export const useGoogleAnalytics = () => {
  useEffect(() => {
    // Track page load time
    const trackPageLoadTime = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        trackEvent('page_load_time', 'Performance', 'Load Time', loadTime);
      }
    };

    // Track scroll depth
    let maxScroll = 0;
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        trackScrollDepth(scrollPercent);
      }
    };

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 30) { // Only track if user spent more than 30 seconds
        trackEvent('time_on_page', 'Engagement', 'Time Spent', timeSpent);
      }
    };

    // Add event listeners
    window.addEventListener('scroll', trackScroll);
    window.addEventListener('beforeunload', trackTimeOnPage);
    
    // Track page load time after page is fully loaded
    if (document.readyState === 'complete') {
      trackPageLoadTime();
    } else {
      window.addEventListener('load', trackPageLoadTime);
    }

    // Cleanup
    return () => {
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('beforeunload', trackTimeOnPage);
      window.removeEventListener('load', trackPageLoadTime);
    };
  }, []);

  return {
    trackEvent,
    trackServiceInquiry,
    trackContactForm,
    trackPhoneCall,
    trackWhatsAppClick,
    trackServiceClick,
    trackFAQClick,
    trackChatbotInteraction,
    trackUserLocation,
    trackConversion,
    trackUserBehavior
  };
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export default useGoogleAnalytics;