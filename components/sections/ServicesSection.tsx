import React from 'react';
import ServiceCard from '../ServiceCard';
import { useGoogleAnalytics } from '../GoogleAnalytics';
import { SERVICES } from '../../constants';

const ServicesSection: React.FC = () => {
  const analytics = useGoogleAnalytics();

  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-indigo-50/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
            Premium Travel Services
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
            Comprehensive Travel
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Solutions in Nigeria
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
            From international flight bookings and visa processing to luxury car rentals and private jet charters, R&M Groups delivers professional travel services across Lagos, Port Harcourt, and Abuja with guaranteed excellence and 24/7 support.
          </p>
          
          {/* SEO-focused service highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <div className="bg-blue-50 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
              <div className="text-sm text-slate-600">International Flights Booked</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-indigo-600 mb-1">95%</div>
              <div className="text-sm text-slate-600">Visa Approval Rate</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
              <div className="text-sm text-slate-600">Customer Support</div>
            </div>
            <div className="bg-pink-50 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-pink-600 mb-1">3</div>
              <div className="text-sm text-slate-600">Major Nigerian Cities</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 rounded-3xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Experience Premium Travel Services?</h3>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              Join hundreds of satisfied clients who trust R&M Groups for their travel needs across Nigeria and beyond.
            </p>
            <button 
              onClick={() => {
                analytics.trackEvent('cta_click', 'Services', 'Get Custom Quote');
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white text-blue-600 px-12 py-6 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl active:scale-95 relative overflow-hidden"
            >
              <span className="relative z-10">Get Your Custom Travel Quote</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;