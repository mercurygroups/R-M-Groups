import React from 'react';
import { useGoogleAnalytics } from '../GoogleAnalytics';
import { COMPANY_DETAILS } from '../../constants';

interface FooterSectionProps {
  onShowTerms: () => void;
  onShowCookiePolicy: () => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({ onShowTerms, onShowCookiePolicy }) => {
  const analytics = useGoogleAnalytics();

  const handleNavigation = (section: string) => {
    analytics.trackEvent('navigation_click', 'Navigation', section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-indigo-900/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-8">
              <span className="text-4xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {COMPANY_DETAILS.name}
              </span>
            </div>
            <p className="text-slate-300 max-w-md mb-8 text-lg leading-relaxed">
              Redefining travel and logistics excellence across Nigeria and beyond. Your trusted partner for premium travel solutions.
            </p>
            
            {/* Social proof */}
            <div className="flex items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">500+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Satisfied Clients</div>
              </div>
              <div className="w-px h-8 bg-slate-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">50+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Destinations</div>
              </div>
              <div className="w-px h-8 bg-slate-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">24/7</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Support</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-8 text-white">Company</h4>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => handleNavigation('about')} 
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('services')} 
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-left"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    analytics.trackEvent('footer_link_click', 'Legal', 'Terms & Conditions');
                    onShowTerms();
                  }}
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    analytics.trackEvent('footer_link_click', 'Legal', 'Cookie Policy');
                    onShowCookiePolicy();
                  }}
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-left"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-8 text-white">Support</h4>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => {
                    analytics.trackEvent('footer_link_click', 'Support', 'Support Center');
                    window.location.href = `mailto:${COMPANY_DETAILS.email}`;
                  }}
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-left"
                >
                  Support Center
                </button>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
                  Booking Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
                  Visa Requirements
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-slate-400 text-sm">Powered by excellence</span>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;