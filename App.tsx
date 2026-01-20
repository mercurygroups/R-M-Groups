
import React from 'react';
import Navbar from './components/Navbar';
import ServiceCard from './components/ServiceCard';
import ContactForm from './components/ContactForm';
import ChatBot from './components/ChatBot';
import { SERVICES, COMPANY_DETAILS } from './constants';
import { Mail, Phone, MapPin, CheckCircle2, Globe, Shield, Zap } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section id="home" className="relative h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1464037862335-6c65a52feb81?auto=format&fit=crop&q=80&w=2000" 
              alt="Travel Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/40"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
            <div className="max-w-3xl animate-in fade-in slide-in-from-left-10 duration-1000">
              <span className="inline-block bg-blue-600/30 backdrop-blur-sm border border-blue-400/30 text-blue-200 px-4 py-1 rounded-full text-sm font-semibold mb-6 uppercase tracking-widest">
                Seamless Travel & Logistics
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Your Gateway to <span className="text-blue-400">Premium</span> World Travel.
              </h1>
              <p className="text-xl text-gray-200 mb-10 leading-relaxed">
                R&M Groups offers elite flight processing, visa assistance, luxury car rentals, and fast delivery logistics across Nigeria's major hubs.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl active:scale-95 text-center"
                >
                  Explore Services
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl active:scale-95 text-center"
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-blue-50/50">
                <div className="bg-blue-600 p-3 rounded-xl text-white">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Global Reach</h4>
                  <p className="text-sm text-gray-600">Travel anywhere across the globe with ease.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-indigo-50/50">
                <div className="bg-indigo-600 p-3 rounded-xl text-white">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Secure & Protected</h4>
                  <p className="text-sm text-gray-600">Insurance policies for ultimate peace of mind.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-purple-50/50">
                <div className="bg-purple-600 p-3 rounded-xl text-white">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Swift Logistics</h4>
                  <p className="text-sm text-gray-600">Rapid urban delivery in Lagos, PH, & Abuja.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Core Services</h2>
              <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We handle every detail of your travel and logistics requirements so you can focus on what matters most.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Checklist/Assurance Section */}
        <section className="py-24 bg-blue-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold mb-8">Professional Excellence, Guaranteed.</h2>
                <p className="text-blue-100 mb-10 text-lg leading-relaxed">
                  We adhere to a rigorous internal standard to ensure every client receives world-class service. Our pre-publicity checklist ensures we are fully operational and ready to serve.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    "Registered Business Name",
                    "Valid Travel Permits & TIN",
                    "Official GDS Booking Access",
                    "Refund & Cancellation Policies",
                    "Secure Client Database",
                    "Emergency Response Plans"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                      <CheckCircle2 className="text-blue-400 flex-shrink-0" size={20} />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000" 
                    alt="Corporate" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-md h-64 object-cover" alt="Team" />
                  <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-md h-64 object-cover mt-12" alt="Office" />
                </div>
              </div>
              <div className="lg:w-1/2">
                <span className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4 block">About R&M Groups</span>
                <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">Your Trusted Travel Management Concierge</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8 italic">
                  "{COMPANY_DETAILS.about}"
                </p>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">100%</p>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Reliability</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">24/7</p>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Support</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">Elite</p>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Partnerships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">Get In Touch</h2>
                <p className="text-gray-600 mb-10">Our consultants are ready to help you plan your next journey or arrange your urban deliveries.</p>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Phone & WhatsApp</h4>
                      <p className="text-gray-600">{COMPANY_DETAILS.phone}</p>
                      <a href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`} className="text-sm text-blue-600 hover:underline">Chat on WhatsApp</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Email Address</h4>
                      <p className="text-gray-600">{COMPANY_DETAILS.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Coverage Areas</h4>
                      <p className="text-gray-600">Lagos, Port Harcourt, Abuja & Nationwide Logistics</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-blue-600 rounded-2xl text-white">
                  <h4 className="font-bold mb-2">Office Hours</h4>
                  <p className="text-sm text-blue-100">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-sm text-blue-100">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-sm text-blue-100">Emergency Bookings: 24/7 (WhatsApp)</p>
                </div>
              </div>
              
              <div className="lg:w-2/3">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6 block">
                {COMPANY_DETAILS.name}
              </span>
              <p className="text-gray-400 max-w-sm mb-6">
                Redefining travel and logistics in Nigeria and beyond. Quality service you can trust 24/7.
              </p>
              <div className="flex space-x-4">
                {/* Social icons could go here */}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><button onClick={() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'})} className="hover:text-blue-400">About Us</button></li>
                <li><button onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})} className="hover:text-blue-400">Our Services</button></li>
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-blue-400">Support Center</a></li>
                <li><a href="#" className="hover:text-blue-400">Booking Guides</a></li>
                <li><a href="#" className="hover:text-blue-400">Visa Requirements</a></li>
                <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default App;
