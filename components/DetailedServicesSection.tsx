import React, { useState } from 'react';
import { 
  Plane, 
  FileText, 
  Car, 
  Crown, 
  Shield, 
  Truck, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  MapPin,
  Users,
  Calendar,
  Phone
} from 'lucide-react';

interface ServiceDetail {
  id: string;
  title: string;
  icon: any;
  description: string;
  features: string[];
  pricing: string;
  duration: string;
  locations: string[];
  image: string;
  popular: boolean;
}

const DetailedServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState('flights');

  const services: ServiceDetail[] = [
    {
      id: 'flights',
      title: 'International & Domestic Flight Booking',
      icon: Plane,
      description: 'Comprehensive flight booking services with access to over 500 airlines worldwide. From economy to first-class, we secure the best deals and routes for your travel needs.',
      features: [
        'Access to 500+ airlines globally',
        'Competitive pricing with price matching',
        'Multi-city and complex itinerary planning',
        'Group booking discounts (10+ passengers)',
        '24/7 flight change and cancellation support',
        'Seat selection and meal preferences',
        'Frequent flyer program optimization',
        'Travel insurance integration'
      ],
      pricing: 'From ₦350,000 service fee',
      duration: '2-24 hours processing',
      locations: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano'],
      image: '/images/flight-booking.svg',
      popular: true
    },
    {
      id: 'visa',
      title: 'Professional Visa Processing & Assistance',
      icon: FileText,
      description: 'Expert visa processing services with a 95% approval rate. We handle all documentation, embassy appointments, and follow-ups for business, tourist, and transit visas.',
      features: [
        '95% visa approval success rate',
        'Document preparation and review',
        'Embassy appointment scheduling',
        'Application tracking and updates',
        'Express processing options available',
        'Visa interview preparation',
        'Multiple entry visa expertise',
        'Visa renewal and extension services'
      ],
      pricing: 'From ₦450,000 + embassy fees',
      duration: '5-21 business days',
      locations: ['Lagos', 'Abuja'],
      image: '/images/visa-assistance.svg',
      popular: true
    },
    {
      id: 'luxury-cars',
      title: 'Luxury Car & Bus Rental Services',
      icon: Car,
      description: 'Premium vehicle rental services featuring the latest luxury cars and buses. Perfect for corporate events, airport transfers, and interstate travel with professional chauffeurs.',
      features: [
        'Latest model luxury vehicles',
        'Professional chauffeur services',
        'Airport pickup and drop-off',
        'Interstate travel packages',
        'Corporate event transportation',
        'Wedding and special occasion cars',
        'GPS tracking and 24/7 support',
        'Flexible rental periods'
      ],
      pricing: 'From ₦500,000/day',
      duration: 'Instant booking available',
      locations: ['Lagos', 'Abuja', 'Port Harcourt'],
      image: '/images/luxury-car.svg',
      popular: false
    },
    {
      id: 'private-jet',
      title: 'Private Jet Charter Services',
      icon: Crown,
      description: 'Elite private jet charter services for the ultimate in luxury travel. Access to light jets, mid-size jets, and heavy jets for domestic and international flights.',
      features: [
        'Light, mid-size, and heavy jet options',
        'Domestic and international charters',
        'Flexible scheduling and routing',
        'Luxury ground transportation included',
        'Catering and special requests',
        'Empty leg flight opportunities',
        'Group charter for up to 19 passengers',
        'Concierge services at destination'
      ],
      pricing: 'From ₦15,000,000/flight',
      duration: '4-48 hours notice',
      locations: ['Lagos', 'Abuja', 'Port Harcourt'],
      image: '/images/private-jet.svg',
      popular: false
    },
    {
      id: 'passport',
      title: 'Passport Processing & Documentation',
      icon: Shield,
      description: 'Fast-track passport processing services including new applications, renewals, and replacements. We handle all paperwork and liaison with immigration offices.',
      features: [
        'New passport applications',
        'Passport renewal services',
        'Lost/damaged passport replacement',
        'Express processing options',
        'Document verification and preparation',
        'Immigration office liaison',
        'Passport photo services',
        'Delivery to your location'
      ],
      pricing: 'From ₦400,000 + government fees',
      duration: '3-14 business days',
      locations: ['Lagos', 'Abuja', 'Port Harcourt'],
      image: '/images/passport-processing.svg',
      popular: false
    },
    {
      id: 'logistics',
      title: 'Urban Delivery & Logistics',
      icon: Truck,
      description: 'Reliable urban delivery and logistics services across major Nigerian cities. From same-day delivery to bulk cargo transportation with real-time tracking.',
      features: [
        'Same-day and next-day delivery',
        'Bulk cargo transportation',
        'Real-time package tracking',
        'Secure handling and insurance',
        'Temperature-controlled transport',
        'Warehousing and storage',
        'Last-mile delivery solutions',
        'Corporate logistics partnerships'
      ],
      pricing: 'From ₦350,000/delivery',
      duration: '2-24 hours delivery',
      locations: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'],
      image: '/images/urban-delivery.svg',
      popular: false
    }
  ];

  const activeServiceData = services.find(s => s.id === activeService) || services[0];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-50/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 uppercase tracking-wider">
            <CheckCircle className="mr-3" size={16} />
            Detailed Service Overview
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
            Comprehensive Travel
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Service Portfolio
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Explore our complete range of premium travel and logistics services designed to meet every aspect of your journey, from planning to execution with unmatched excellence.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Service Navigation */}
          <div className="lg:w-1/3">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-3xl p-8 sticky top-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Our Services</h3>
              
              <div className="space-y-4">
                {services.map((service) => {
                  const IconComponent = service.icon;
                  const isActive = activeService === service.id;
                  
                  return (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(service.id)}
                      className={`w-full text-left p-6 rounded-2xl transition-all duration-300 group ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                          : 'bg-white hover:bg-blue-50 text-slate-900 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-white/20' 
                            : 'bg-blue-100 group-hover:bg-blue-200'
                        }`}>
                          <IconComponent 
                            size={24} 
                            className={isActive ? 'text-white' : 'text-blue-600'} 
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold text-sm leading-tight ${
                            isActive ? 'text-white' : 'text-slate-900'
                          }`}>
                            {service.title}
                          </h4>
                          {service.popular && (
                            <span className={`text-xs font-semibold uppercase tracking-wider mt-1 inline-block ${
                              isActive ? 'text-blue-200' : 'text-blue-600'
                            }`}>
                              Popular
                            </span>
                          )}
                        </div>
                        <ArrowRight 
                          size={16} 
                          className={`transition-transform duration-300 ${
                            isActive ? 'text-white translate-x-1' : 'text-slate-400 group-hover:translate-x-1'
                          }`} 
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
              {/* Service Header */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={activeServiceData.image} 
                  alt={activeServiceData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                
                {activeServiceData.popular && (
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">{activeServiceData.title}</h3>
                  <p className="text-blue-200 text-lg">{activeServiceData.description}</p>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-10">
                {/* Quick Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-blue-50 p-6 rounded-2xl text-center">
                    <div className="bg-blue-600 p-3 rounded-xl text-white w-fit mx-auto mb-4">
                      <Clock size={24} />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Processing Time</h4>
                    <p className="text-blue-600 font-semibold">{activeServiceData.duration}</p>
                  </div>
                  
                  <div className="bg-indigo-50 p-6 rounded-2xl text-center">
                    <div className="bg-indigo-600 p-3 rounded-xl text-white w-fit mx-auto mb-4">
                      <MapPin size={24} />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Available In</h4>
                    <p className="text-indigo-600 font-semibold">{activeServiceData.locations.join(', ')}</p>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-2xl text-center">
                    <div className="bg-purple-600 p-3 rounded-xl text-white w-fit mx-auto mb-4">
                      <Users size={24} />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Starting From</h4>
                    <p className="text-purple-600 font-semibold">{activeServiceData.pricing}</p>
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-10">
                  <h4 className="text-2xl font-bold text-slate-900 mb-6">What's Included</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeServiceData.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-green-100 p-1 rounded-full mt-1">
                          <CheckCircle size={16} className="text-green-600" />
                        </div>
                        <span className="text-slate-700 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
                  <h4 className="text-2xl font-bold mb-4">Ready to Get Started?</h4>
                  <p className="text-blue-100 mb-6 text-lg">
                    Contact our expert consultants for personalized service and competitive pricing.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-lg active:scale-95"
                    >
                      Get Quote Now
                    </button>
                    <button className="bg-white/20 backdrop-blur-md text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center">
                      <Phone size={20} className="mr-2" />
                      Call Expert
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Comparison Table */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Service Comparison</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Compare our services to find the perfect solution for your travel needs.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Service</th>
                    <th className="px-6 py-4 text-center font-semibold">Processing Time</th>
                    <th className="px-6 py-4 text-center font-semibold">Starting Price</th>
                    <th className="px-6 py-4 text-center font-semibold">Locations</th>
                    <th className="px-6 py-4 text-center font-semibold">Popular</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={service.id} className={`border-b border-slate-100 hover:bg-blue-50/30 transition-colors ${index % 2 === 0 ? 'bg-slate-50/30' : 'bg-white'}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-xl">
                            <service.icon size={20} className="text-blue-600" />
                          </div>
                          <span className="font-semibold text-slate-900">{service.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-slate-600">{service.duration}</td>
                      <td className="px-6 py-4 text-center font-semibold text-blue-600">{service.pricing}</td>
                      <td className="px-6 py-4 text-center text-slate-600">{service.locations.length} cities</td>
                      <td className="px-6 py-4 text-center">
                        {service.popular ? (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            ⭐ Popular
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedServicesSection;