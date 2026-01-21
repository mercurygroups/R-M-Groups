
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ServiceCard from './components/ServiceCard';
import ContactForm from './components/ContactForm';
import ChatBot from './components/ChatBot';
import TermsAndConditions from './components/TermsAndConditions';
import CookiePolicy from './components/CookiePolicy';
import CookieBanner from './components/CookieBanner';
import SEOFAQSection from './components/SEOFAQSection';
import { SERVICES, COMPANY_DETAILS } from './constants';
import { Mail, Phone, MapPin, CheckCircle2, Globe, Shield, Zap, ExternalLink } from 'lucide-react';
import * as Icons from 'lucide-react';

const App: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80" 
              alt="Professional Travel Services" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/85"></div>
          </div>
          
          {/* Floating elements for depth */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
            <div className="max-w-4xl animate-in fade-in slide-in-from-left-10 duration-1000 w-full">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-md border border-blue-400/30 text-blue-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 uppercase tracking-wider">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                <span className="hidden sm:inline">Premium Travel & Logistics Solutions</span>
                <span className="sm:hidden">Premium Travel Solutions</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 leading-[0.9] tracking-tight">
                Nigeria's Premier
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  Travel Company
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-8 sm:mb-12 leading-relaxed font-light max-w-3xl">
                Expert flight booking, visa processing, luxury car rentals, and private jet charters across Lagos, Port Harcourt, and Abuja. Professional travel solutions with guaranteed excellence and 24/7 support.
              </p>
              
              <div className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-2xl">
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hero-button group bg-white text-slate-900 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-2xl font-bold text-base sm:text-lg lg:text-xl hover:bg-slate-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 active:scale-95 text-center relative overflow-hidden flex-1 sm:flex-none sm:min-w-[200px] lg:min-w-[220px]"
                >
                  <span className="relative z-10">Explore Our Services</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hero-button group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-2xl font-bold text-base sm:text-lg lg:text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 active:scale-95 text-center relative overflow-hidden flex-1 sm:flex-none sm:min-w-[200px] lg:min-w-[220px]"
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

        {/* Core Values Section */}
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

        {/* Services Section */}
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
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-white text-blue-600 px-12 py-6 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl active:scale-95 relative overflow-hidden"
                >
                  <span className="relative z-10">Get Your Custom Travel Quote</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Checklist/Assurance Section */}
        <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 px-6 py-3 rounded-full text-sm font-semibold mb-8 uppercase tracking-wider">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                  Professional Excellence
                </div>
                
                <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                  Guaranteed
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Quality Standards
                  </span>
                </h2>
                
                <p className="text-xl text-slate-200 mb-12 leading-relaxed font-light">
                  We maintain rigorous operational standards to ensure every client receives world-class service. Our comprehensive quality assurance process guarantees excellence at every touchpoint.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "Licensed & Registered", desc: "Fully compliant business operations" },
                    { title: "GDS Booking Access", desc: "Direct airline reservation systems" },
                    { title: "24/7 Support Team", desc: "Round-the-clock assistance" },
                    { title: "Secure Payments", desc: "Protected transaction processing" },
                    { title: "Insurance Coverage", desc: "Comprehensive protection plans" },
                    { title: "Emergency Response", desc: "Immediate crisis management" }
                  ].map((item, idx) => (
                    <div key={idx} className="group flex items-start space-x-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle2 className="text-white flex-shrink-0" size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-300">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/2 relative">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Corporate Excellence" 
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/30 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 uppercase tracking-wider">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                About R&M Groups
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                Your Trusted
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Travel Partner
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Since our inception, R&M Groups has been at the forefront of premium travel and logistics solutions, serving discerning clients across Nigeria and beyond.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-20 mb-20">
              <div className="lg:w-1/2">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
                      <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700" alt="Professional Team" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="font-bold text-lg">Expert Team</h4>
                        <p className="text-sm opacity-90">Professional consultants</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 mt-12">
                    <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
                      <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700" alt="Modern Technology" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="font-bold text-lg">Advanced Systems</h4>
                        <p className="text-sm opacity-90">Cutting-edge technology</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 mb-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Story</h3>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    "{COMPANY_DETAILS.about}"
                  </p>
                  <div className="bg-blue-50 p-6 rounded-2xl">
                    <h4 className="font-bold text-blue-900 mb-3">Our Mission</h4>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      To redefine mobility and travel excellence through integrity, reliability, and world-class service, making premium travel accessible and seamless for every client.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-3xl font-black">500+</div>
                      <div className="text-xs opacity-90">CLIENTS</div>
                    </div>
                    <p className="text-sm text-slate-600 uppercase font-semibold tracking-wider">Happy Travelers</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-3xl font-black">24/7</div>
                      <div className="text-xs opacity-90">HOURS</div>
                    </div>
                    <p className="text-sm text-slate-600 uppercase font-semibold tracking-wider">Support Available</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-3xl font-black">50+</div>
                      <div className="text-xs opacity-90">DESTINATIONS</div>
                    </div>
                    <p className="text-sm text-slate-600 uppercase font-semibold tracking-wider">Global Reach</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Values */}
            <div className="bg-white rounded-3xl p-12 shadow-lg border border-slate-100">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h3>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  The principles that guide everything we do and define who we are as a company.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-2xl mb-6 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icons.Heart className="text-white" size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">Excellence</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      We strive for perfection in every service we provide, ensuring exceptional quality and attention to detail.
                    </p>
                  </div>
                </div>
                
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl mb-6 group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
                    <div className="bg-gradient-to-br from-green-600 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icons.Shield className="text-white" size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">Integrity</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Transparency, honesty, and ethical practices form the foundation of all our client relationships.
                    </p>
                  </div>
                </div>
                
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl mb-6 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icons.Users className="text-white" size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">Partnership</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      We build lasting relationships with our clients, understanding their unique needs and exceeding expectations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO FAQ Section */}
        <SEOFAQSection />

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-50/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-50/50 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 uppercase tracking-wider">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Get In Touch
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                Start Your Journey
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Today
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Ready to experience premium travel services? Our expert consultants are standing by to help you plan your perfect journey.
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-20">
              <div className="lg:w-2/5">
                <div className="space-y-8">
                  <div className="group flex items-start space-x-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                      <Phone size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Phone & WhatsApp</h4>
                      <p className="text-slate-600 text-lg mb-2">{COMPANY_DETAILS.phone}</p>
                      <a href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`} className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors">
                        <span>Chat on WhatsApp</span>
                        <Icons.ExternalLink size={16} className="ml-2" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="group flex items-start space-x-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-300">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                      <Mail size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Email Address</h4>
                      <p className="text-slate-600 text-lg">{COMPANY_DETAILS.email}</p>
                      <a href={`mailto:${COMPANY_DETAILS.email}`} className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                        <span>Send Email</span>
                        <Icons.ExternalLink size={16} className="ml-2" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="group flex items-start space-x-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Service Areas</h4>
                      <p className="text-slate-600 text-lg">Lagos, Port Harcourt, Abuja</p>
                      <p className="text-sm text-slate-500">Nationwide logistics coverage</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl text-white">
                  <h4 className="text-xl font-bold mb-6">Business Hours</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Monday - Friday</span>
                      <span className="font-semibold">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Saturday</span>
                      <span className="font-semibold">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Emergency Support</span>
                      <span className="font-semibold text-green-400">24/7 Available</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-3/5">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

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
                    onClick={() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'})} 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})} 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-left"
                  >
                    Our Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowTerms(true)}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-left"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowCookiePolicy(true)}
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
                  <a 
                    href={`mailto:${COMPANY_DETAILS.email}`} 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    Support Center
                  </a>
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

      <ChatBot />
      <CookieBanner />
      
      {/* Modal Components */}
      <TermsAndConditions isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <CookiePolicy isOpen={showCookiePolicy} onClose={() => setShowCookiePolicy(false)} />
    </div>
  );
};

export default App;
