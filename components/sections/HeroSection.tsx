import React from 'react';
import { useGoogleAnalytics } from '../GoogleAnalytics';

const HeroSection: React.FC = () => {
  const analytics = useGoogleAnalytics();

  const handleExploreServices = () => {
    analytics.trackEvent('hero_button_click', 'Navigation', 'Explore Services');
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartJourney = () => {
    analytics.trackEvent('hero_button_click', 'Navigation', 'Start Journey');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/moutaman-kamal-9aVkgRLC8g4-unsplash.jpg" 
          alt="Professional Travel Services" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/85"></div>
      </div>
      
      {/* Floating elements for depth */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-breathing-glow delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-glow-soft"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        <div className="max-w-4xl animate-in fade-in slide-in-from-left-10 duration-1000 w-full">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-md border border-blue-400/30 text-blue-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 uppercase tracking-wider animate-glow-border">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 sm:mr-3 animate-pulse-glow"></div>
            <span className="hidden sm:inline">Premium Travel & Logistics Solutions</span>
            <span className="sm:hidden">Premium Travel Solutions</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 leading-[0.9] tracking-tight animate-glow-text">
            Nigeria's Premier
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent animate-rainbow-glow">
              Travel Company
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-8 sm:mb-12 leading-relaxed font-light max-w-3xl">
            Expert flight booking, visa processing, luxury car rentals, and private jet charters across Lagos, Port Harcourt, and Abuja. Professional travel solutions with guaranteed excellence and 24/7 support.
          </p>
          
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-2xl">
            <button 
              onClick={handleExploreServices}
              className="hero-button group bg-white text-slate-900 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-2xl font-bold text-base sm:text-lg lg:text-xl hover:bg-slate-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 active:scale-95 text-center relative overflow-hidden flex-1 sm:flex-none sm:min-w-[200px] lg:min-w-[220px] animate-glow-soft"
            >
              <span className="relative z-10">Explore Our Services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            <button 
              onClick={handleStartJourney}
              className="hero-button group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-2xl font-bold text-base sm:text-lg lg:text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 active:scale-95 text-center relative overflow-hidden flex-1 sm:flex-none sm:min-w-[200px] lg:min-w-[220px] animate-glow-pulse"
            >
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6 sm:gap-8 mt-16 pt-8 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">500+</div>
              <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider">Happy Clients</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">24/7</div>
              <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider">Support</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider">Reliable</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;