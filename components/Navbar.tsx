
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, User, LogOut, Settings } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import UserDashboard from './UserDashboard';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 navbar-backdrop ${
      isScrolled 
        ? 'navbar-scrolled bg-white/98 backdrop-blur-md shadow-xl border-b border-slate-200/60 animate-glow-soft' 
        : 'bg-slate-900/20 backdrop-blur-xl border-b border-white/20 shadow-lg animate-breathing-glow'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => scrollTo('home')}
              className="group flex items-center space-x-3 animate-glow-text"
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg' 
                  : 'bg-gradient-to-br from-blue-500 to-indigo-500 shadow-xl shadow-blue-500/30'
              }`}>
                <span className="text-white font-black text-lg">R&M</span>
              </div>
              <span className={`text-2xl font-black transition-all duration-300 navbar-brand ${
                isScrolled 
                  ? 'text-slate-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:bg-clip-text hover:text-transparent' 
                  : 'text-white drop-shadow-lg hover:text-blue-200'
              }`}>
                {COMPANY_DETAILS.name}
              </span>
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollTo('services')} 
              className={`font-semibold transition-all duration-300 hover:scale-105 navbar-link ${
                isScrolled 
                  ? 'text-slate-700 hover:text-blue-600' 
                  : 'text-white/95 hover:text-blue-200 drop-shadow-sm'
              }`}
            >
              Services
            </button>
            <button 
              onClick={() => scrollTo('about')} 
              className={`font-semibold transition-all duration-300 hover:scale-105 navbar-link ${
                isScrolled 
                  ? 'text-slate-700 hover:text-blue-600' 
                  : 'text-white/95 hover:text-blue-200 drop-shadow-sm'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => scrollTo('contact')} 
              className={`font-semibold transition-all duration-300 hover:scale-105 navbar-link ${
                isScrolled 
                  ? 'text-slate-700 hover:text-blue-600' 
                  : 'text-white/95 hover:text-blue-200 drop-shadow-sm'
              }`}
            >
              Contact
            </button>
            
            <div className={`w-px h-6 ${
              isScrolled ? 'bg-slate-300/50' : 'bg-white/30'
            }`}></div>
            
            {/* Authentication Section */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-2xl transition-all duration-300 ${
                    isScrolled 
                      ? 'text-slate-700 hover:bg-slate-100' 
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="font-semibold">{user.firstName}</span>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="font-semibold text-slate-900">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-slate-600">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                          {user.membershipTier}
                        </span>
                        <span className="text-xs text-slate-500">{user.loyaltyPoints} points</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setShowUserDashboard(true);
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                    >
                      <Settings size={18} className="text-slate-600" />
                      <span className="text-slate-700">Dashboard</span>
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors text-red-600"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 active:scale-95 flex items-center space-x-2"
              >
                <User size={18} />
                <span>Sign In</span>
              </button>
            )}
            
            <a 
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-2xl flex items-center space-x-2 hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-green-500/25 active:scale-95"
            >
              <MessageSquare size={18} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">WhatsApp</span>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-2 rounded-2xl transition-all duration-300 ${
                isScrolled 
                  ? 'text-slate-700 hover:bg-slate-100' 
                  : 'text-white hover:bg-white/20 drop-shadow-sm'
              }`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-t border-slate-200/60 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-4">
            <button 
              onClick={() => scrollTo('services')} 
              className="block w-full text-left text-lg py-3 px-4 rounded-2xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-semibold"
            >
              Services
            </button>
            <button 
              onClick={() => scrollTo('about')} 
              className="block w-full text-left text-lg py-3 px-4 rounded-2xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-semibold"
            >
              About
            </button>
            <button 
              onClick={() => scrollTo('contact')} 
              className="block w-full text-left text-lg py-3 px-4 rounded-2xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-semibold"
            >
              Contact
            </button>
            
            <div className="pt-4 border-t border-slate-200">
              {isAuthenticated && user ? (
                <>
                  <button
                    onClick={() => {
                      setShowUserDashboard(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 text-blue-600 py-3 px-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 w-full"
                  >
                    <User size={20} />
                    <span className="font-semibold">My Account</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 text-red-600 py-3 px-4 rounded-2xl hover:bg-red-50 transition-all duration-300 mt-2 w-full"
                  >
                    <LogOut size={20} />
                    <span className="font-semibold">Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 text-blue-600 py-3 px-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 w-full"
                >
                  <User size={20} />
                  <span className="font-semibold">Sign In</span>
                </button>
              )}
              
              <a 
                href={`tel:${COMPANY_DETAILS.phone}`} 
                className="flex items-center space-x-3 text-blue-600 py-3 px-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 mt-2"
              >
                <Phone size={20} />
                <span className="font-semibold">Call Us Now</span>
              </a>
              <a 
                href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-green-600 py-3 px-4 rounded-2xl hover:bg-green-50 transition-all duration-300 mt-2"
              >
                <MessageSquare size={20} />
                <span className="font-semibold">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      {/* User Dashboard */}
      <UserDashboard 
        isOpen={showUserDashboard} 
        onClose={() => setShowUserDashboard(false)} 
      />
    </nav>
  );
};

export default Navbar;
