import React, { useStaeact';
import AuthProvider from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ServiceCard from './components/Ser;
import ContactForm from './components/ContactForm';
import ChatBot from './components/ChatBot';
import TermsAndConditions from './component
import CookiePolicy from './components/CookiePolicy';
import CookieBanner from './components/CookieBanner';
import SEOFAQSection from './components/SEOFAQSection';
import TestimonialsSection from './components/Testimoniion';
import PartnersSection from './components/PartnersSection';
import NewsSection from './components/NewsSection';
import DetailedServicesSection from './components/D;
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { useGoogleAnalytics, trackUserLocation } from './compytics';
import { SERVICES, COMPANY_DETAILS } from './constants';
import { Mail, Phone, MapPin, CheckCircle2, Globe, Shielact';
import * as Icons from 'lucide-react';
import { initializePWA } from './pwaUtils';


  return (
    <AuthP>
      <AppContent />
    </AuthProvider>
  );
};


  const [showTerms, setShowTerms] = 
  const [showCookiePolicy, setShowCookiePolicy] = uslse);
  
  
  const analytics = useGoogleAnalytics();

nt mount
  useEffect(() => {
    // Get user's ant)
    if (navigator.geolocation) {
      navigator.geolocation.getCn(
        (position) => {
          // You can us
          trackUserLocation('Nigeria', 'NG'); // Default 
        },
        ()
          track
        }
      );
    }
  }, []);


  const handleExploreServices{
    analytics.trackEvent('hero_button_c
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

{
    analytics.trackEvent('hero_buttourney');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }
  };

s
  const handlePhoneClick = () => {
    analytics.trackPhoneCall();
    window.location.href = `tel
  };

> {
    analytics.trackWhatsAppClick();
    window.open(`https://wa.me/${CO
  };

cks
  const handleEmailClic> {
    analytics.trackEvent('email_clnk');
    window.location.href = `mailto:${COMPANY_DETAILS.email}`;
  };

s
  const handleNavigation = ({
    analytics.trackEvent('navigation_click', 'Nav
    document.getElementById(section)?.scrollIntoView({ behavior: 'sm });
  };


  useEffect(() => {
    initializePWA());
  }, []);

 return (
    <div c
      <Navbar />

      <main classNa">
    */}
  ">
z-0">
            <img 
              src="/images/moutaman-kamal-9aVkgRLC8g" 
              alt="Professional Travel Services" 
              className="w-f"
            />
            <div className="absolute inset-0 bg-div>
          </div>
          
          {/* Floating elements for depth */}
          <div className="absolute top-20 right-20 w</div>
          <div"></div>
          
          <div c">
          l">
              <div className="inline-flex ite
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                <span className="hidden sm:inline">Premium Travel & Logistics Solutions</span>
          pan>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 leading-[0.9] tracking-tight">
                Nigeria's Premier
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-4t">
                  Travel Company
                </span>
              </h1>
              
              <p className="text-
                Expert flight booking, visa processing, luxury car rentals, and private jet charters across Lagos, Port Harcourtrt.
              </p>
              
              <div 
              button 
                  onClick={handleExploreServices}
                  className="hero-button group bg-white text-slate-900 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-2xl font-bold text-base sm:text-lg lg:text-xl hover:bg-slate-100 transition-all duration-300"
                >
              s</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600/div>
                </button>
                <button 
                  onClick={handleStartJourney}
                 0px]"
                >
                  <span className="relative z-10">Start Your Journey</span>
                  <div cl
                </button
              </div>
              
              {/* */}
              <div className="flex flex-col sm:flex-row items-center justif>
                <div className="text-center">
                  <div cl
                  <div>
                </div>
                <div className="hidden
                <div className="text-center">
                  <div className="text-2xl sm/div>
                  <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wid
                </div>
                <div c></div>
                <div className="text-center">
                  <div className="text-2xl sm0%</div>
                  <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-widdiv>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Valuetion */}
        <section cla
          <div cla
            <div>
              <h2 oups</h2>

              <p className="text-sl
                Built on excellence, powered by innovation, and driven by your success.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative bg-white p-8 rounded-3xl shadow-lg hover:e-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indi
                <d">
                  ">
            
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">Global Reach</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Connect to any destination 
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-white p-8 rounde
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl opacity-0 group-hover:opaci
                <div c10">
                  <divn-300">
                     />
              
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">Secure & Protected</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Comprehensive insurance covourney.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-white p-8 rounde>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl opacity-0 group-hover:opa>
                <div c10">
                  <div">
                    
              iv>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">Swift Logistics</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Lightning-fast urban delive
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services S */}
        <section id=den">
          {/* Backn */}
          <div c"></div>
          <div cla
       
          <div className="max-w-
            <div className="text-center mb-20">
              <div className="inline-fl>
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Premium Travel Services
          iv>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8t">
                Comprehensive Travel
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Solutions in Nigeria
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
                From international fpport.
              </p>
              
              {/* SEO-f
              <div ">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
                  
              v>
                <div className="bg-indigo-50 p-4 rou-2xl">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">95%</div>
                  <div className="text-sm text-slate-600">Viv>
                </div>
                <div className="bg-purple-50 p-4 rounded-2xl">
                  <diviv>
                  <div className="text-sm text-slate-600">Cust/div>
                </div>
                <div className="bg-pink-50 p-4 rounded-2xl">
                  <div/div>
                  <div className="text-sm text-slate-600">Majo>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1
              {SERVICES.map((service) => (
                <Service} />
              ))}
            </div>
            
            {/* Call to action */}
            <div className="text-center mt">
              <div className="bg-gradient-to-r from-blue-600 to-in
                <h3>
                <p>
            .
                </p>
                <button 
                  onClick={() => {
                    analytics.trackEvent('cta_click', 'Services', 'Get Custom Quote');
                    document.getElementById('contact')?.scrollIntoView({ beh;
                  }}
                  cl"
                >
                  <span className=te</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Serv}
        <DetailedSeron />

        {/* Test*/}
        <Testimoni>

        {/* Partners Section */}
        <PartnersSection />

        {/* News Section */}
        <NewsSection />

        {/* SEO FAQ Section */}
        <SEOFAQSection />

        {/* Cont*/}
        <s">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-tov>
          <div className="absolute bottoiv>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center m-20">
              <div cla
                ></div>
                Get In Touch
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                Start Your Journey
                <span cla
                  Today
                
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Read
              </
            </div>
            
            <div className="flex flex-col lg:flex-row gap-20">
              <div className="lg:w-2/5">
                <div className="space-y-8">
                  <div className="group flex items-start space-x-6 p-6 bg-gradient-to-br fr
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounde
                      <Phone size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Phone & WhatsApp</h4>
                      <p className="text-slate-600 text-lg mb-2">{COMPANY_DETAILS.phone>
                      <button 
                        onCClick}
                        className="inline-flex items-center text-green-600 font-sem
                      >
                        <spaan>
                        <I>
                     n>
                    </v>
                  </iv>
                  
                  <div className="group flex item00">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 roun>
                      <28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Email Address</h4>
                    </p>
                      <button 
                      lClick}
                s"
                      >
                        <span>Send Email</span>
                        <Icons.ExternalLink size={16} className="ml-2" />
                    </button>
                  >
                
                  
>
                    <div clas
                      <MapPin size={28} />
                    </div>
                    <div>
          </h4>
                      <p className="text-slate-600 text-lg">Lagos, Port Harcourt
                      <p className="text-sm texe</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-gradient-to-br from-slate-900 to-blue-900 rounded-3e">
                  <h4 classN
                  <div className="space-y-3">
                    <div classNaenter">
                      <>
                   
                    </div>
                    <div className="flex justify-between items-center">
                  an>
                  </span>

                    <div className="flex justify-between items-center">
                      <span className="t>
                      <span className="font-semibold tex
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

      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative on">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l fr
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-i
        
        <div className="ma">
          <div className6">
            <div class
              <div c">
              
                  {COMPANY_DETAILS.name}
                </span>
              </div>
              <p className="text-slate-300 max-w-md mb-8 text-lg leading-relaxed">
                Redefining travel and logisti.
              </p>
              
              {/* Social proof */}
              <div className="flex items-center space-x-8 mb-8">
                <div className="text-center">
                  <div c/div>
                  <div cv>
                </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Destinations</div>
                </div>
                <div className="w-px h-8 bg-slate-600"></div>
                <div class">
                  <div className="text-2xl font-bold text-blue-400">24/7</div>
                  <div c/div>
                </iv>
              </div>
            </div>
            
            <div>
              <h4 classNam/h4>
              <ul className="space-y-4">
                <li>
                  tton 
                    onClick={() => handleNavigation('out')} 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-left"
                  >
                    About Us
                  </button
                </li>
                <li>
                  <buton 
                    } 
                  "
     >
                    Our Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                    ions');
                    );
              }}
                    className="text-slate-300 hover:text-blue-400 tra
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      analytics.trackEvent('footer_link_click', 'Legal', 'Cookie Policy');
                      se
                    }}
                    cl-left"
                  >
                    Cookie Policy
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-8 text-white">Support</h4>
              <ul classN">
                <li>
                  <but
                
                      analytics.trackEvent('footer_er');
                      window.location.href = `mailto:${COMPANY_DETAILS.email}`;
                    }}
                    className="text-slate-300 hover:text-blue-400 trant"
                  >
                    Support Center
                  </button>
                </li>
                <li>
                  <a hre">
                    Bo Guides
                  </
                </li>
                
                  
s
                  </a>
                </li>

                  <a href="#" classN
                    FAQ
</a>
                </li>
              </ul>
div>
          </div>
          
">
            <div className="fle
              <p className="text-slate-400 text-sm">
                &copy; {new Date().getFrved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
          ce</span>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-bl
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-200"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <ChatBot />
      <CookieBanner />
      <PWAInstallPrompt />
      
      {/* Modal Co/}
      <Terms/>
      <CookiePolicy isOpen={showCookiePolicy} onClose={() => s
    </div>
  );
};

export default App;