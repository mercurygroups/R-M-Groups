import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings, Check } from 'lucide-react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    functional: true,
    analytics: true,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const consent = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] bg-white border-t border-slate-200 shadow-2xl">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {!showSettings ? (
          // Main Cookie Banner
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="flex items-start space-x-3 flex-1">
              <div className="bg-orange-100 p-2 rounded-xl">
                <Cookie className="text-orange-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-2">We use cookies to enhance your experience</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We use cookies to provide you with a better experience, analyze site traffic, and serve personalized content. 
                  You can choose which cookies to accept or reject all non-essential cookies.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium"
              >
                <Settings size={16} />
                <span>Customize</span>
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          // Cookie Settings Panel
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Cookie Preferences</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Essential Cookies */}
              <div className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900">Essential Cookies</h4>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Always Active
                  </div>
                </div>
                <p className="text-slate-600 text-sm">
                  Required for the website to function properly. Cannot be disabled.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900">Functional Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({...preferences, functional: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-slate-600 text-sm">
                  Remember your preferences and provide enhanced features.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900">Analytics Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-slate-600 text-sm">
                  Help us understand how you use our website to improve our services.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900">Marketing Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-slate-600 text-sm">
                  Show you personalized content and relevant advertisements.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleRejectAll}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptSelected}
                className="flex items-center justify-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Check size={16} />
                <span>Save Preferences</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;