import React from 'react';
import { Globe, Shield, Zap } from 'lucide-react';

const CoreValuesSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Why Choose R&M Groups</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Built on excellence, powered by innovation, and driven by your success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-200 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl text-white w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe size={32} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Global Reach</h4>
              <p className="text-slate-600 leading-relaxed">
                Connect to any destination worldwide with our extensive network of trusted partners and premium service providers.
              </p>
            </div>
          </div>
          
          <div className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-indigo-200 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl text-white w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield size={32} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Secure & Protected</h4>
              <p className="text-slate-600 leading-relaxed">
                Comprehensive insurance coverage and secure booking systems ensure your peace of mind throughout your journey.
              </p>
            </div>
          </div>
          
          <div className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-purple-200 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-2xl text-white w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap size={32} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Swift Logistics</h4>
              <p className="text-slate-600 leading-relaxed">
                Lightning-fast urban delivery services across Lagos, Port Harcourt, and Abuja with real-time tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;