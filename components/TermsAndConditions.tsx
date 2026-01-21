import React from 'react';
import { X, Shield, FileText, AlertCircle, Scale, Users, Globe, Clock, CreditCard, Phone } from 'lucide-react';

interface TermsAndConditionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-10 duration-500 border border-blue-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 flex items-center justify-between relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-glow-pulse"></div>
          
          <div className="flex items-center space-x-4 relative z-10">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm border border-white/30 animate-glow-soft">
              <FileText size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text">Terms & Conditions</h2>
              <p className="text-blue-100 text-sm font-medium">R&M Groups Premium Travel & Logistics Services</p>
              <p className="text-blue-200 text-xs">Effective January 2026 • Version 2.1</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/30 hover:scale-105 active:scale-95 relative z-10 group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)] bg-gradient-to-br from-slate-50/50 to-blue-50/30">
          <div className="prose prose-slate max-w-none">
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl mb-8 flex items-start space-x-4 border border-blue-100 animate-glow-soft">
              <div className="bg-blue-100 p-2 rounded-xl">
                <AlertCircle className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-blue-900 font-bold mb-2 text-lg">Important Legal Notice</p>
                <p className="text-blue-800 text-sm leading-relaxed">
                  By accessing, using, or engaging any services provided by R&M Groups, you acknowledge that you have read, understood, and agree to be legally bound by these comprehensive terms and conditions. These terms constitute a binding legal agreement between you and R&M Groups.
                </p>
              </div>
            </div>

            <section className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center group">
                <div className="bg-blue-100 p-2 rounded-xl mr-3 group-hover:animate-pulse">
                  <Shield className="text-blue-600" size={24} />
                </div>
                1. Service Agreement & Scope
              </h3>
              <div className="space-y-4 text-slate-700 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-base leading-relaxed">
                  <strong className="text-slate-900">1.1 Company Overview:</strong> R&M Groups Limited ("Company," "we," "our," or "us") is a premium travel and logistics service provider incorporated under the laws of the Federal Republic of Nigeria, specializing in comprehensive travel solutions across West Africa and internationally.
                </p>
                <p className="text-base leading-relaxed">
                  <strong className="text-slate-900">1.2 Service Portfolio:</strong> Our services include but are not limited to:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-900 mb-2">Travel Services</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• International & domestic flight bookings</li>
                      <li>• Visa processing & documentation</li>
                      <li>• Passport services & renewals</li>
                      <li>• Travel insurance arrangements</li>
                      <li>• Hotel & accommodation bookings</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h4 className="font-semibold text-indigo-900 mb-2">Premium Services</h4>
                    <ul className="text-sm text-indigo-800 space-y-1">
                      <li>• Private jet charter services</li>
                      <li>• Luxury vehicle rentals</li>
                      <li>• VIP airport assistance</li>
                      <li>• Corporate travel management</li>
                      <li>• Urban logistics & delivery</li>
                    </ul>
                  </div>
                </div>
                <p className="text-base leading-relaxed">
                  <strong className="text-slate-900">1.3 Legal Binding:</strong> By engaging our services through any means (website, phone, email, or in-person), you ("Client," "Customer," "Traveler," or "you") enter into a legally binding contract governed by these terms, applicable Nigerian laws, and international travel regulations.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center group">
                <div className="bg-green-100 p-2 rounded-xl mr-3 group-hover:animate-pulse">
                  <CreditCard className="text-green-600" size={24} />
                </div>
                2. Booking, Payment & Financial Terms
              </h3>
              <div className="space-y-4 text-slate-700 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p><strong className="text-slate-900">2.1 Booking Process:</strong></p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>All bookings require complete and accurate passenger information</li>
                  <li>Bookings are provisional until confirmed by our team and full payment received</li>
                  <li>Confirmation emails serve as official booking receipts</li>
                  <li>Special requests are subject to availability and additional charges</li>
                </ul>
                
                <p><strong className="text-slate-900">2.2 Payment Terms:</strong></p>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-100">
                  <ul className="space-y-2 text-base">
                    <li><strong>• Full Payment:</strong> Required for bookings under ₦1,000,000</li>
                    <li><strong>• Deposit Option:</strong> 50% deposit for bookings above ₦1,000,000 (balance due 7 days before travel)</li>
                    <li><strong>• Corporate Accounts:</strong> 30-day payment terms available for verified corporate clients</li>
                    <li><strong>• Emergency Bookings:</strong> 100% payment required within 2 hours</li>
                  </ul>
                </div>
                
                <p><strong className="text-slate-900">2.3 Accepted Payment Methods:</strong></p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                    <p className="text-sm font-semibold text-blue-900">Bank Transfer</p>
                    <p className="text-xs text-blue-700">Preferred method</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center border border-purple-100">
                    <p className="text-sm font-semibold text-purple-900">Credit Cards</p>
                    <p className="text-xs text-purple-700">Visa, MasterCard</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center border border-green-100">
                    <p className="text-sm font-semibold text-green-900">Cash Payment</p>
                    <p className="text-xs text-green-700">Office visits</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg text-center border border-orange-100">
                    <p className="text-sm font-semibold text-orange-900">Mobile Money</p>
                    <p className="text-xs text-orange-700">Selected providers</p>
                  </div>
                </div>
                
                <p><strong className="text-slate-900">2.4 Currency & Pricing:</strong></p>
                <ul className="list-disc pl-6 space-y-1 text-base">
                  <li>All prices quoted in Nigerian Naira (₦) unless specified otherwise</li>
                  <li>International transactions subject to current exchange rates</li>
                  <li>Prices may fluctuate due to fuel surcharges, taxes, or supplier changes</li>
                  <li>Price protection available for bookings paid in full</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center group">
                <div className="bg-red-100 p-2 rounded-xl mr-3 group-hover:animate-pulse">
                  <Clock className="text-red-600" size={24} />
                </div>
                3. Cancellation, Changes & Refund Policy
              </h3>
              <div className="space-y-4 text-slate-700 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p><strong className="text-slate-900">3.1 Client-Initiated Cancellations:</strong></p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-slate-100 to-blue-100">
                      <tr>
                        <th className="border border-slate-200 p-3 text-left font-semibold">Cancellation Period</th>
                        <th className="border border-slate-200 p-3 text-left font-semibold">Cancellation Fee</th>
                        <th className="border border-slate-200 p-3 text-left font-semibold">Refund Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-slate-50">
                        <td className="border border-slate-200 p-3">More than 45 days</td>
                        <td className="border border-slate-200 p-3 text-green-600 font-semibold">5%</td>
                        <td className="border border-slate-200 p-3">95% refund</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="border border-slate-200 p-3">31-45 days</td>
                        <td className="border border-slate-200 p-3 text-yellow-600 font-semibold">15%</td>
                        <td className="border border-slate-200 p-3">85% refund</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="border border-slate-200 p-3">15-30 days</td>
                        <td className="border border-slate-200 p-3 text-orange-600 font-semibold">35%</td>
                        <td className="border border-slate-200 p-3">65% refund</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="border border-slate-200 p-3">7-14 days</td>
                        <td className="border border-slate-200 p-3 text-red-600 font-semibold">60%</td>
                        <td className="border border-slate-200 p-3">40% refund</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="border border-slate-200 p-3">Less than 7 days</td>
                        <td className="border border-slate-200 p-3 text-red-700 font-semibold">100%</td>
                        <td className="border border-slate-200 p-3">No refund</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p><strong className="text-slate-900">3.2 Change Fees:</strong></p>
                <ul className="list-disc pl-6 space-y-1 text-base">
                  <li>Name changes: ₦50,000 + airline/supplier fees</li>
                  <li>Date changes: ₦25,000 + fare difference</li>
                  <li>Route changes: ₦35,000 + fare difference</li>
                  <li>Class upgrades: Current fare difference + ₦15,000 service fee</li>
                </ul>
                
                <p><strong className="text-slate-900">3.3 Force Majeure Cancellations:</strong></p>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-blue-900 text-base">
                    In cases of natural disasters, pandemics, war, terrorism, or government-imposed travel restrictions, standard cancellation fees may be waived. Full refunds or travel credits will be provided based on supplier policies and circumstances.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center group">
                <div className="bg-purple-100 p-2 rounded-xl mr-3 group-hover:animate-pulse">
                  <Globe className="text-purple-600" size={24} />
                </div>
                4. Travel Documentation & Requirements
              </h3>
              <div className="space-y-4 text-slate-700 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p><strong className="text-slate-900">4.1 Client Responsibilities:</strong></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <h4 className="font-semibold text-green-900 mb-2">Required Documents</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Valid passport (6+ months validity)</li>
                      <li>• Appropriate visas for destinations</li>
                      <li>• Health certificates & vaccinations</li>
                      <li>• Travel insurance documentation</li>
                      <li>• Return/onward ticket confirmations</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <h4 className="font-semibold text-orange-900 mb-2">Client Obligations</h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Verify all document requirements</li>
                      <li>• Arrive at airports 3 hours early (international)</li>
                      <li>• Comply with airline baggage policies</li>
                      <li>• Follow destination health protocols</li>
                      <li>• Maintain valid travel insurance</li>
                    </ul>
                  </div>
                </div>
                
                <p><strong className="text-slate-900">4.2 Visa Services Disclaimer:</strong></p>
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                  <p className="text-yellow-900 text-base">
                    <strong>Important:</strong> While R&M Groups provides professional visa assistance with a 95% success rate, we cannot guarantee visa approval. Visa decisions rest solely with embassy/consulate officials. All visa fees, regardless of approval outcome, are non-refundable. We recommend applying well in advance of travel dates.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center group">
                <div className="bg-indigo-100 p-2 rounded-xl mr-3 group-hover:animate-pulse">
                  <Scale className="text-indigo-600" size={24} />
                </div>
                5. Liability, Insurance & Risk Management
              </h3>
              <div className="space-y-4 text-slate-700 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p><strong className="text-slate-900">5.1 Comprehensive Travel Insurance:</strong></p>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-blue-900 text-base mb-3">
                    <strong>Mandatory Recommendation:</strong> All clients are strongly advised to purchase comprehensive travel insurance covering:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Trip cancellation/interruption</li>
                      <li>• Medical emergencies abroad</li>
                      <li>• Baggage loss/delay</li>
                      <li>• Flight delays/missed connections</li>
                    </ul>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Emergency evacuation</li>
                      <li>• Personal liability coverage</li>
                      <li>• Adventure sports coverage</li>
                      <li>• COVID-19 related expenses</li>
                    </ul>
                  </div>
                </div>
                
                <p><strong className="text-slate-900">5.2 Limitation of Liability:</strong></p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>R&M Groups' total liability is limited to the amount paid for our services</li>
                  <li>We are not liable for losses preventable through adequate travel insurance</li>
                  <li>Consequential, indirect, or punitive damages are excluded</li>
                  <li>Claims must be reported within 30 days of incident occurrence</li>
                </ul>
                
                <p><strong className="text-slate-900">5.3 Third-Party Service Providers:</strong></p>
                <p className="text-base leading-relaxed">
                  R&M Groups acts as an intermediary for airlines, hotels, car rental companies, and other service providers. We are not liable for their acts, omissions, or failures. Our responsibility is limited to our role as booking agent and service coordinator.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center group">
                <div className="bg-teal-100 p-2 rounded-xl mr-3 group-hover:animate-pulse">
                  <Users className="text-teal-600" size={24} />
                </div>
                6. Privacy, Data Protection & Security
              </h3>
              <div className="space-y-4 text-slate-700 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p><strong className="text-slate-900">6.1 Data Collection & Usage:</strong></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                    <h4 className="font-semibold text-teal-900 mb-2">Information We Collect</h4>
                    <ul className="text-sm text-teal-800 space-y-1">
                      <li>• Personal identification details</li>
                      <li>• Contact information</li>
                      <li>• Passport & travel document data</li>
                      <li>• Payment & billing information</li>
                      <li>• Travel preferences & history</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-900 mb-2">How We Use Your Data</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Service delivery & booking management</li>
                      <li>• Communication & customer support</li>
                      <li>• Legal compliance & documentation</li>
                      <li>• Service improvement & personalization</li>
                      <li>• Marketing (with explicit consent)</li>
                    </ul>
                  </div>
                </div>
                
                <p><strong className="text-slate-900">6.2 Data Security Measures:</strong></p>
                <ul className="list-disc pl-6 space-y-1 text-base">
                  <li>SSL encryption for all online transactions</li>
                  <li>Secure data storage with regular backups</li>
                  <li>Limited access on need-to-know basis</li>
                  <li>Regular security audits and updates</li>
                  <li>Compliance with international data protection standards</li>
                </ul>
                
                <p><strong className="text-slate-900">6.3 Your Rights:</strong></p>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <p className="text-purple-900 text-base">
                    You have the right to access, correct, or delete your personal information. You may also opt-out of marketing communications at any time. Contact our Data Protection Officer at privacy@rmgroups.ng for any data-related requests.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center group">
                <div className="bg-red-100 p-2 rounded-xl mr-3 group-hover:animate-pulse">
                  <AlertCircle className="text-red-600" size={24} />
                </div>
                7. Force Majeure & Emergency Procedures
              </h3>
              <div className="space-y-4 text-slate-700 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p><strong className="text-slate-900">7.1 Force Majeure Events:</strong></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                    <h4 className="font-semibold text-red-900 mb-2">Natural Events</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Earthquakes, floods, hurricanes</li>
                      <li>• Volcanic eruptions</li>
                      <li>• Extreme weather conditions</li>
                      <li>• Pandemics & health emergencies</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <h4 className="font-semibold text-orange-900 mb-2">Human Events</h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• War, terrorism, civil unrest</li>
                      <li>• Government travel restrictions</li>
                      <li>• Airline/supplier bankruptcies</li>
                      <li>• Labor strikes & industrial action</li>
                    </ul>
                  </div>
                </div>
                
                <p><strong className="text-slate-900">7.2 Emergency Response Protocol:</strong></p>
                <ol className="list-decimal pl-6 space-y-2 text-base">
                  <li>Immediate client notification via multiple channels</li>
                  <li>Assessment of alternative travel options</li>
                  <li>Coordination with suppliers for rebooking/refunds</li>
                  <li>24/7 emergency support activation</li>
                  <li>Regular updates until resolution</li>
                </ol>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center group">
                <div className="bg-yellow-100 p-2 rounded-xl mr-3 group-hover:animate-pulse">
                  <Scale className="text-yellow-600" size={24} />
                </div>
                8. Dispute Resolution & Legal Framework
              </h3>
              <div className="space-y-4 text-slate-700 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p><strong className="text-slate-900">8.1 Governing Law & Jurisdiction:</strong></p>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-blue-900 text-base">
                    These terms are governed by the laws of the Federal Republic of Nigeria. Any legal disputes shall be resolved exclusively in the High Court of Lagos State, Nigeria. International arbitration may be considered for cross-border disputes exceeding ₦10,000,000.
                  </p>
                </div>
                
                <p><strong className="text-slate-900">8.2 Dispute Resolution Process:</strong></p>
                <ol className="list-decimal pl-6 space-y-2 text-base">
                  <li><strong>Direct Resolution:</strong> Contact our customer service team within 48 hours</li>
                  <li><strong>Management Review:</strong> Escalation to senior management within 7 days</li>
                  <li><strong>Mediation:</strong> Independent mediation through Lagos Chamber of Commerce</li>
                  <li><strong>Arbitration:</strong> Binding arbitration if mediation fails</li>
                  <li><strong>Legal Action:</strong> Court proceedings as last resort</li>
                </ol>
                
                <p><strong className="text-slate-900">8.3 Limitation Period:</strong></p>
                <p className="text-base leading-relaxed">
                  All claims must be filed within 12 months of the incident or service completion date. Claims filed after this period will not be considered unless exceptional circumstances apply.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center group">
                <div className="bg-green-100 p-2 rounded-xl mr-3 group-hover:animate-pulse">
                  <Phone className="text-green-600" size={24} />
                </div>
                9. Contact Information & Support
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3">R&M Groups Limited</h4>
                    <div className="space-y-2 text-slate-700">
                      <p><strong>Headquarters:</strong> Lagos, Nigeria</p>
                      <p><strong>Email:</strong> mercurygroups247@gmail.com</p>
                      <p><strong>Phone:</strong> +234 901 190 2882</p>
                      <p><strong>WhatsApp:</strong> +234 901 190 2882</p>
                      <p><strong>Website:</strong> www.rmgroups.ng</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3">Business Hours</h4>
                    <div className="space-y-2 text-slate-700">
                      <p><strong>Monday - Friday:</strong> 8:00 AM - 8:00 PM</p>
                      <p><strong>Saturday:</strong> 10:00 AM - 6:00 PM</p>
                      <p><strong>Sunday:</strong> 12:00 PM - 4:00 PM</p>
                      <p><strong>Emergency Support:</strong> 24/7 Available</p>
                      <p><strong>Response Time:</strong> Within 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl mt-10 animate-glow-soft">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white/20 p-2 rounded-xl">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">Terms & Conditions Summary</p>
                  <p className="text-blue-100 text-sm">Version 2.1 • Effective January 21, 2026</p>
                </div>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                These comprehensive terms and conditions may be updated periodically to reflect changes in our services, legal requirements, or industry standards. Clients will be notified of significant changes via email. Continued use of our services after updates constitutes acceptance of revised terms. For questions about these terms, contact our legal department at legal@rmgroups.ng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;