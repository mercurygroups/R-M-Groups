
import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';
import { SERVICES, COMPANY_DETAILS } from '../constants';
import { trackContactForm, trackPhoneCall, trackWhatsAppClick } from './GoogleAnalytics';

const ContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission
    trackContactForm('Premium Inquiry Form', formData.service);
    
    // Simulate form submission
    console.log('Form data:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 5000);
  };

  const handlePhoneClick = () => {
    trackPhoneCall();
    window.location.href = `tel:${COMPANY_DETAILS.phone}`;
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsapp}`, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-white to-blue-50/50 p-12 rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center text-center relative overflow-hidden animate-glow-pulse">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-2xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-2xl animate-breathing-glow"></div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-8 animate-bounce shadow-lg animate-rainbow-glow">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-blue-500 mr-2" size={24} />
            <h3 className="text-3xl font-black text-slate-900">Message Received!</h3>
            <Sparkles className="text-blue-500 ml-2" size={24} />
          </div>
          
          <p className="text-slate-600 mb-8 text-lg leading-relaxed max-w-md">
            Thank you for choosing R&M Groups! Our premium travel consultants will contact you within 2 hours to discuss your requirements.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-2xl mb-8">
            <p className="text-blue-800 font-semibold text-sm">
              🚀 Priority Response: Your inquiry has been flagged for immediate attention
            </p>
          </div>
          
          <button 
            onClick={() => setIsSubmitted(false)}
            className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 active:scale-95"
          >
            <span className="relative z-10">Send Another Inquiry</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-50/50 p-10 rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden animate-glow-soft">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full blur-2xl animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-2xl animate-breathing-glow"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider animate-glow-border">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse-glow"></div>
            Premium Inquiry Form
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-4 animate-glow-text">Let's Plan Your Journey</h3>
          <p className="text-slate-600 text-lg">Share your travel needs and we'll craft the perfect solution</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-bold text-slate-700 mb-3 group-focus-within:text-blue-600 transition-colors">
                Full Name *
              </label>
              <input 
                type="text" 
                required
                className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-900 placeholder-slate-400 bg-white/80 backdrop-blur-sm"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-slate-700 mb-3 group-focus-within:text-blue-600 transition-colors">
                Phone Number *
              </label>
              <input 
                type="tel" 
                required
                className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-900 placeholder-slate-400 bg-white/80 backdrop-blur-sm"
                placeholder="+234 xxx xxx xxxx"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-bold text-slate-700 mb-3 group-focus-within:text-blue-600 transition-colors">
              Email Address *
            </label>
            <input 
              type="email" 
              required
              className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-900 placeholder-slate-400 bg-white/80 backdrop-blur-sm"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="group">
            <label className="block text-sm font-bold text-slate-700 mb-3 group-focus-within:text-blue-600 transition-colors">
              Service of Interest *
            </label>
            <select 
              required
              className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white/80 backdrop-blur-sm text-slate-900"
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
            >
              <option value="">Select your preferred service...</option>
              {SERVICES.map(s => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
              <option value="General Inquiry">General Inquiry</option>
              <option value="Custom Package">Custom Travel Package</option>
            </select>
          </div>

          <div className="group">
            <label className="block text-sm font-bold text-slate-700 mb-3 group-focus-within:text-blue-600 transition-colors">
              Tell Us About Your Requirements
            </label>
            <textarea 
              rows={5}
              className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none text-slate-900 placeholder-slate-400 bg-white/80 backdrop-blur-sm"
              placeholder="Describe your travel plans, preferred dates, destinations, or any specific requirements..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit"
            className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-5 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-3 active:scale-95 relative overflow-hidden animate-glow-pulse"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <Send size={20} className="group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10 text-lg">Send Premium Inquiry</span>
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-200">
          <div className="text-center">
            <p className="text-slate-500 text-sm mb-4">Prefer direct contact?</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
               <button 
                 onClick={handlePhoneClick}
                 className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors hover:animate-glow-text"
               >
                 <span>📞 Call Now</span>
               </button>
               <span className="hidden sm:block text-slate-300">|</span>
               <button 
                 onClick={handleWhatsAppClick}
                 className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors hover:animate-glow-text"
               >
                 <span>💬 WhatsApp Chat</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
