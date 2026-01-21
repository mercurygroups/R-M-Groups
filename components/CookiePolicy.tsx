import React from 'react';
import { X, Cookie, Shield, Settings, Info } from 'lucide-react';

interface CookiePolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Cookie size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Cookie Policy</h2>
              <p className="text-orange-100 text-sm">How we use cookies on our website</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="prose prose-slate max-w-none">
            
            <div className="bg-orange-50 p-4 rounded-2xl mb-6 flex items-start space-x-3">
              <Info className="text-orange-600 mt-1" size={20} />
              <div>
                <p className="text-orange-800 font-semibold mb-1">What are Cookies?</p>
                <p className="text-orange-700 text-sm">
                  Cookies are small text files stored on your device to enhance your browsing experience and help us improve our services.
                </p>
              </div>
            </div>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Cookie className="mr-2 text-orange-500" size={20} />
                1. How We Use Cookies
              </h3>
              <div className="space-y-3 text-slate-700">
                <p>
                  R&M Groups uses cookies to provide you with a better, faster, and safer experience. Cookies help us understand how you use our website, remember your preferences, and improve our services.
                </p>
                <p>
                  We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period or until you delete them).
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">2. Types of Cookies We Use</h3>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                    <Shield className="mr-2" size={16} />
                    Essential Cookies
                  </h4>
                  <p className="text-blue-800 text-sm mb-2">These cookies are necessary for the website to function properly.</p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Authentication and security</li>
                    <li>• Shopping cart functionality</li>
                    <li>• Form submission and validation</li>
                    <li>• Load balancing and performance</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-2xl">
                  <h4 className="font-bold text-green-900 mb-2 flex items-center">
                    <Settings className="mr-2" size={16} />
                    Functional Cookies
                  </h4>
                  <p className="text-green-800 text-sm mb-2">These cookies enhance your experience by remembering your preferences.</p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Language and region preferences</li>
                    <li>• User interface customizations</li>
                    <li>• Recently viewed services</li>
                    <li>• Contact form auto-fill</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-2xl">
                  <h4 className="font-bold text-purple-900 mb-2">Analytics Cookies</h4>
                  <p className="text-purple-800 text-sm mb-2">These cookies help us understand how visitors interact with our website.</p>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Page views and user journeys</li>
                    <li>• Popular services and content</li>
                    <li>• Website performance metrics</li>
                    <li>• Error tracking and debugging</li>
                  </ul>
                </div>

                <div className="bg-indigo-50 p-4 rounded-2xl">
                  <h4 className="font-bold text-indigo-900 mb-2">Marketing Cookies</h4>
                  <p className="text-indigo-800 text-sm mb-2">These cookies help us show you relevant content and advertisements.</p>
                  <ul className="text-indigo-700 text-sm space-y-1">
                    <li>• Personalized service recommendations</li>
                    <li>• Social media integration</li>
                    <li>• Email marketing preferences</li>
                    <li>• Conversion tracking</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">3. Third-Party Cookies</h3>
              <div className="space-y-3 text-slate-700">
                <p>We may use third-party services that set their own cookies:</p>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <ul className="space-y-2 text-sm">
                    <li><strong>Google Analytics:</strong> Website traffic and user behavior analysis</li>
                    <li><strong>Google Maps:</strong> Location services and mapping functionality</li>
                    <li><strong>Social Media Platforms:</strong> Social sharing and integration features</li>
                    <li><strong>Payment Processors:</strong> Secure payment processing and fraud prevention</li>
                    <li><strong>Customer Support:</strong> Live chat and support ticket systems</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">4. Managing Your Cookie Preferences</h3>
              <div className="space-y-3 text-slate-700">
                <p><strong>Browser Settings:</strong> You can control cookies through your browser settings:</p>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <ul className="space-y-2 text-sm">
                    <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                    <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                    <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                  </ul>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-2xl mt-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Note:</strong> Disabling certain cookies may affect website functionality and your user experience. Essential cookies cannot be disabled as they are necessary for the website to work properly.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">5. Cookie Consent</h3>
              <div className="space-y-3 text-slate-700">
                <p>
                  By continuing to use our website, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by adjusting your browser settings or contacting us directly.
                </p>
                <p>
                  We will ask for your consent before using non-essential cookies and provide clear information about what each type of cookie does.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">6. Updates to This Policy</h3>
              <div className="space-y-3 text-slate-700">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any significant changes by posting the updated policy on our website.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">7. Contact Us</h3>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-slate-700 mb-2">If you have questions about our use of cookies, please contact us:</p>
                <div className="text-slate-600 text-sm space-y-1">
                  <p><strong>Email:</strong> mercurygroups247@gmail.com</p>
                  <p><strong>Phone:</strong> +234 901 190 2882</p>
                  <p><strong>WhatsApp:</strong> +234 901 190 2882</p>
                </div>
              </div>
            </section>

            <div className="bg-orange-50 p-4 rounded-2xl mt-8">
              <p className="text-orange-800 text-sm">
                <strong>Last Updated:</strong> January 2026<br />
                This Cookie Policy is effective as of the date listed above and will remain in effect except with respect to any changes in its provisions in the future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;