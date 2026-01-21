import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import * as Icons from 'lucide-react';
import ContactForm from '../ContactForm';
import { useGoogleAnalytics } from '../GoogleAnalytics';
import { COMPANY_DETAILS } from '../../constants';

const ContactSection: React.FC = () => {
  const analytics = useGoogleAnalytics();

  const handleWhatsAppClick = () => {
    analytics.trackWhatsAppClick();
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsapp}`, '_blank');
  };

  const handleEmailClick = () => {
    analytics.trackEvent('email_click', 'Contact', 'Email Link');
    window.location.href = `mailto:${COMPANY_DETAILS.email}`;
  };

  return (
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
                  <button 
                    onClick={handleWhatsAppClick}
                    className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                  >
                    <span>Chat on WhatsApp</span>
                    <Icons.ExternalLink size={16} className="ml-2" />
                  </button>
                </div>
              </div>
              
              <div className="group flex items-start space-x-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-300">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Email Address</h4>
                  <p className="text-slate-600 text-lg">{COMPANY_DETAILS.email}</p>
                  <button 
                    onClick={handleEmailClick}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    <span>Send Email</span>
                    <Icons.ExternalLink size={16} className="ml-2" />
                  </button>
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
  );
};

export default ContactSection;