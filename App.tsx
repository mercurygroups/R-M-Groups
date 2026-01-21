import React, { useState, useEffect } from 'react';
import AuthProvider from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import CoreValuesSection from './components/sections/CoreValuesSection';
import ServicesSection from './components/sections/ServicesSection';
import ContactSection from './components/sections/ContactSection';
import FooterSection from './components/sections/FooterSection';
import ChatBot from './components/ChatBot';
import TermsAndConditions from './components/TermsAndConditions';
import CookiePolicy from './components/CookiePolicy';
import CookieBanner from './components/CookieBanner';
import SEOFAQSection from './components/SEOFAQSection';
import PartnersSection from './components/PartnersSection';
import NewsSection from './components/NewsSection';
import DetailedServicesSection from './components/DetailedServicesSection';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { useGoogleAnalytics, trackUserLocation } from './components/GoogleAnalytics';
import { initializePWA } from './pwaUtils';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);
  
  // Track user location on component mount
  useEffect(() => {
    // Get user's approximate location for analytics (with consent)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // You can use a reverse geocoding service here
          trackUserLocation('Nigeria', 'NG'); // Default to Nigeria for this business
        },
        () => {
          trackUserLocation('Nigeria', 'NG'); // Default fallback
        }
      );
    }
  }, []);

  // Initialize PWA on component mount
  useEffect(() => {
    initializePWA().catch(console.error);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <HeroSection />

        {/* Core Values Section */}
        <CoreValuesSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Detailed Services Section */}
        <DetailedServicesSection />

        {/* Partners Section */}
        <PartnersSection />

        {/* News Section */}
        <NewsSection />

        {/* SEO FAQ Section */}
        <SEOFAQSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <FooterSection 
        onShowTerms={() => setShowTerms(true)}
        onShowCookiePolicy={() => setShowCookiePolicy(true)}
      />

      {/* Additional Components */}
      <ChatBot />
      <CookieBanner />
      <PWAInstallPrompt />
      
      {/* Modal Components */}
      <TermsAndConditions isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <CookiePolicy isOpen={showCookiePolicy} onClose={() => setShowCookiePolicy(false)} />
    </div>
  );
};

export default App;