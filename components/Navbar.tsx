
import React, { useState } from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent cursor-pointer" onClick={() => scrollTo('home')}>
              {COMPANY_DETAILS.name}
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollTo('services')} className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Services</button>
            <button onClick={() => scrollTo('about')} className="text-gray-600 hover:text-blue-700 font-medium transition-colors">About</button>
            <button onClick={() => scrollTo('contact')} className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Contact</button>
            <a 
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-all shadow-md active:scale-95"
            >
              <MessageSquare size={18} />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-gray-200 py-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4 px-4">
            <button onClick={() => scrollTo('services')} className="text-left text-lg py-2 border-b border-gray-100">Services</button>
            <button onClick={() => scrollTo('about')} className="text-left text-lg py-2 border-b border-gray-100">About</button>
            <button onClick={() => scrollTo('contact')} className="text-left text-lg py-2 border-b border-gray-100">Contact</button>
            <a href={`tel:${COMPANY_DETAILS.phone}`} className="flex items-center space-x-3 text-blue-600 py-2">
              <Phone size={20} />
              <span>Call Us Now</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
