import React from 'react';
import { X, Shield, FileText, AlertCircle } from 'lucide-react';

interface TermsAndConditionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Terms & Conditions</h2>
              <p className="text-blue-100 text-sm">R&M Groups Premium Travel & Logistics</p>
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
            
            <div className="bg-blue-50 p-4 rounded-2xl mb-6 flex items-start space-x-3">
              <AlertCircle className="text-blue-600 mt-1" size={20} />
              <div>
                <p className="text-blue-800 font-semibold mb-1">Important Notice</p>
                <p className="text-blue-700 text-sm">
                  By using R&M Groups services, you agree to these terms and conditions. Please read carefully.
                </p>
              </div>
            </div>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Shield className="mr-2 text-blue-600" size={20} />
                1. Service Agreement
              </h3>
              <div className="space-y-3 text-slate-700">
                <p>
                  R&M Groups ("we," "our," or "us") provides premium travel and logistics services including but not limited to flight bookings, visa assistance, passport processing, travel insurance, luxury vehicle rentals, private jet charters, and urban delivery services.
                </p>
                <p>
                  By engaging our services, you ("client," "customer," or "you") agree to be bound by these terms and conditions, which constitute a legally binding agreement between you and R&M Groups.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">2. Booking and Payment Terms</h3>
              <div className="space-y-3 text-slate-700">
                <p><strong>2.1 Booking Confirmation:</strong> All bookings are subject to availability and confirmation. A booking is only confirmed upon receipt of full payment or agreed deposit.</p>
                <p><strong>2.2 Payment:</strong> Payment must be made in full at the time of booking unless otherwise agreed in writing. We accept cash, bank transfers, and major credit cards.</p>
                <p><strong>2.3 Currency:</strong> All prices are quoted in Nigerian Naira (NGN) unless otherwise specified. Foreign currency transactions may incur additional charges.</p>
                <p><strong>2.4 Price Changes:</strong> Prices may be subject to change due to currency fluctuations, fuel surcharges, taxes, or supplier price increases until full payment is received.</p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">3. Cancellation and Refund Policy</h3>
              <div className="space-y-3 text-slate-700">
                <p><strong>3.1 Client Cancellations:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>More than 30 days before travel: 10% cancellation fee</li>
                  <li>15-30 days before travel: 25% cancellation fee</li>
                  <li>7-14 days before travel: 50% cancellation fee</li>
                  <li>Less than 7 days before travel: 100% cancellation fee</li>
                </ul>
                <p><strong>3.2 Supplier Cancellations:</strong> If a service is cancelled by our suppliers, we will provide a full refund or alternative arrangements at no additional cost.</p>
                <p><strong>3.3 Refund Processing:</strong> Approved refunds will be processed within 14-21 business days to the original payment method.</p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">4. Travel Documentation</h3>
              <div className="space-y-3 text-slate-700">
                <p><strong>4.1 Client Responsibility:</strong> Clients are responsible for ensuring they have valid passports, visas, and other required travel documents.</p>
                <p><strong>4.2 Visa Services:</strong> While we provide visa assistance, we cannot guarantee visa approval. Visa fees are non-refundable regardless of approval status.</p>
                <p><strong>4.3 Health Requirements:</strong> Clients must comply with all health requirements including vaccinations and health certificates as required by destinations.</p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">5. Liability and Insurance</h3>
              <div className="space-y-3 text-slate-700">
                <p><strong>5.1 Travel Insurance:</strong> We strongly recommend comprehensive travel insurance. R&M Groups is not liable for losses that could have been covered by insurance.</p>
                <p><strong>5.2 Limitation of Liability:</strong> Our liability is limited to the total amount paid for our services. We are not liable for indirect, consequential, or punitive damages.</p>
                <p><strong>5.3 Third-Party Services:</strong> We act as agents for airlines, hotels, and other service providers. Our liability for their services is limited to our role as booking agent.</p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">6. Privacy and Data Protection</h3>
              <div className="space-y-3 text-slate-700">
                <p><strong>6.1 Data Collection:</strong> We collect personal information necessary to provide our services including names, contact details, passport information, and payment details.</p>
                <p><strong>6.2 Data Usage:</strong> Personal information is used solely for service delivery, communication, and legal compliance. We do not sell or share data with unauthorized third parties.</p>
                <p><strong>6.3 Data Security:</strong> We implement appropriate security measures to protect personal information against unauthorized access, alteration, or disclosure.</p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">7. Force Majeure</h3>
              <div className="space-y-3 text-slate-700">
                <p>
                  R&M Groups shall not be liable for any failure to perform due to circumstances beyond our reasonable control, including but not limited to acts of God, war, terrorism, pandemic, government regulations, natural disasters, or supplier failures.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">8. Dispute Resolution</h3>
              <div className="space-y-3 text-slate-700">
                <p><strong>8.1 Governing Law:</strong> These terms are governed by the laws of the Federal Republic of Nigeria.</p>
                <p><strong>8.2 Jurisdiction:</strong> Any disputes shall be resolved in the courts of Lagos State, Nigeria.</p>
                <p><strong>8.3 Mediation:</strong> We encourage resolution of disputes through mediation before pursuing legal action.</p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">9. Contact Information</h3>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-slate-700 mb-2"><strong>R&M Groups</strong></p>
                <p className="text-slate-600 text-sm">Email: mercurygroups247@gmail.com</p>
                <p className="text-slate-600 text-sm">Phone: +234 901 190 2882</p>
                <p className="text-slate-600 text-sm">WhatsApp: +234 901 190 2882</p>
              </div>
            </section>

            <div className="bg-blue-50 p-4 rounded-2xl mt-8">
              <p className="text-blue-800 text-sm">
                <strong>Last Updated:</strong> January 2026<br />
                These terms and conditions may be updated periodically. Continued use of our services constitutes acceptance of any changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;