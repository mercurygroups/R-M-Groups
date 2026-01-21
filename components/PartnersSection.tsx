import React from 'react';
import { Shield, Award, Globe, Zap } from 'lucide-react';

const PartnersSection: React.FC = () => {
  const partners = [
    {
      name: "International Air Transport Association",
      logo: "IATA",
      description: "Certified travel agent with global airline access",
      category: "Aviation"
    },
    {
      name: "Nigerian Civil Aviation Authority",
      logo: "NCAA",
      description: "Licensed and regulated by Nigerian aviation authority",
      category: "Regulatory"
    },
    {
      name: "Global Distribution System",
      logo: "GDS",
      description: "Direct access to worldwide flight inventory",
      category: "Technology"
    },
    {
      name: "Visa Facilitation Services",
      logo: "VFS",
      description: "Authorized visa processing partner",
      category: "Documentation"
    },
    {
      name: "Luxury Car Rental Network",
      logo: "LCR",
      description: "Premium vehicle fleet partnerships",
      category: "Transportation"
    },
    {
      name: "Private Aviation Consortium",
      logo: "PAC",
      description: "Elite private jet charter network",
      category: "Luxury"
    }
  ];

  const certifications = [
    {
      icon: Shield,
      title: "ISO 9001:2015 Certified",
      description: "Quality management system certification for consistent service delivery"
    },
    {
      icon: Award,
      title: "IATA Accredited Agent",
      description: "International Air Transport Association certified travel professional"
    },
    {
      icon: Globe,
      title: "Global Entry Partner",
      description: "Authorized partner for expedited international travel processing"
    },
    {
      icon: Zap,
      title: "24/7 Emergency Response",
      description: "Round-the-clock crisis management and travel assistance certification"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 uppercase tracking-wider">
            <Shield className="mr-3" size={16} />
            Trusted Partnerships
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
            Industry-Leading
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Partnerships & Certifications
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Our strategic partnerships with global leaders and industry certifications ensure you receive world-class service backed by the highest standards of excellence and reliability.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <div key={index} className="group bg-gradient-to-br from-white to-slate-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-200 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl text-white w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={32} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{cert.title}</h4>
                <p className="text-slate-600 leading-relaxed text-sm">{cert.description}</p>
              </div>
            );
          })}
        </div>

        {/* Partners Showcase */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-indigo-500/10 to-transparent"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-black mb-6">Strategic Partners</h3>
              <p className="text-slate-200 text-lg max-w-3xl mx-auto leading-relaxed">
                We collaborate with industry leaders to provide you with unparalleled access to premium travel services and exclusive benefits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <div key={index} className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-black text-white">{partner.logo}</span>
                    </div>
                    <div className="bg-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold text-blue-200 uppercase tracking-wider">
                      {partner.category}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3 text-center">{partner.name}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed text-center">{partner.description}</p>
                </div>
              ))}
            </div>

            {/* Partnership Benefits */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/10 p-6 rounded-2xl mb-4">
                  <div className="text-3xl font-black text-blue-400 mb-2">50+</div>
                  <div className="text-sm text-slate-300 uppercase tracking-wider">Global Partners</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 p-6 rounded-2xl mb-4">
                  <div className="text-3xl font-black text-indigo-400 mb-2">200+</div>
                  <div className="text-sm text-slate-300 uppercase tracking-wider">Destinations</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 p-6 rounded-2xl mb-4">
                  <div className="text-3xl font-black text-purple-400 mb-2">24/7</div>
                  <div className="text-sm text-slate-300 uppercase tracking-wider">Global Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-12">Why Leading Organizations Trust Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-2xl">
              <div className="text-4xl font-black text-blue-600 mb-4">99.8%</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Service Reliability</h4>
              <p className="text-slate-600 text-sm">Consistent delivery of premium travel services with minimal disruptions</p>
            </div>
            <div className="bg-indigo-50 p-8 rounded-2xl">
              <div className="text-4xl font-black text-indigo-600 mb-4">15min</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Average Response Time</h4>
              <p className="text-slate-600 text-sm">Lightning-fast customer support and emergency assistance</p>
            </div>
            <div className="bg-purple-50 p-8 rounded-2xl">
              <div className="text-4xl font-black text-purple-600 mb-4">100%</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Compliance Rate</h4>
              <p className="text-slate-600 text-sm">Full adherence to international travel regulations and safety standards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;