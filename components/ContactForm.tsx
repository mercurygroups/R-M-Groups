
import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { SERVICES, COMPANY_DETAILS } from '../constants';

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
    // Simulate form submission
    console.log('Form data:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 size={48} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Received!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for contacting R&M Groups. One of our consultants will reach out to you within the next 24 hours.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="text-blue-600 font-medium hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Inquiry Form</h3>
      <p className="text-gray-500 mb-8 text-center text-sm">Tell us about your travel or logistics needs</p>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="+234 ..."
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
          <select 
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
          >
            <option value="">Select a service...</option>
            {SERVICES.map(s => (
              <option key={s.id} value={s.title}>{s.title}</option>
            ))}
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
          <textarea 
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
            placeholder="Tell us more about your requirements..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 active:scale-95"
        >
          <Send size={20} />
          <span>Send Inquiry</span>
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col items-center space-y-2">
        <p className="text-gray-400 text-xs">Direct support channels:</p>
        <div className="flex space-x-4">
           <a href={`tel:${COMPANY_DETAILS.phone}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">Call</a>
           <span className="text-gray-300">|</span>
           <a href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-green-600 hover:text-green-800">WhatsApp</a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
