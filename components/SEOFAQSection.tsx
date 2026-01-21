import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const SEOFAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What travel services does R&M Groups offer in Nigeria?",
      answer: "R&M Groups provides comprehensive travel services including international and domestic flight bookings, visa processing and assistance, passport application services, travel insurance, luxury car rentals, private jet charters, and urban delivery services across Lagos, Port Harcourt, and Abuja. We specialize in both corporate and leisure travel solutions."
    },
    {
      question: "How can I book international flights through R&M Groups?",
      answer: "You can book international flights by contacting our expert consultants at +234 901 190 2882 or via WhatsApp. Our team provides 24/7 support, competitive pricing, access to major airlines worldwide, and assistance with complex itineraries. We handle everything from booking to travel documentation."
    },
    {
      question: "Does R&M Groups assist with visa applications for international travel?",
      answer: "Yes, we provide professional visa processing services for business, tourism, and conference travel to multiple countries. Our experienced team has high approval rates and guides you through the entire visa application process, including document preparation and embassy appointments."
    },
    {
      question: "What luxury transportation options are available in Lagos, Abuja, and Port Harcourt?",
      answer: "R&M Groups offers premium car rentals, luxury buses for group travel, and private jet charter services. Our luxury vehicle fleet includes high-end cars for corporate events, interstate travel, and special occasions. Professional chauffeur services are available upon request."
    },
    {
      question: "How does R&M Groups ensure reliable travel insurance coverage?",
      answer: "We partner with leading insurance providers to offer comprehensive travel insurance policies that protect against unforeseen events, medical emergencies, trip cancellations, and lost luggage. Our policies cover both domestic and international travel with 24/7 emergency support."
    },
    {
      question: "What makes R&M Groups different from other travel agencies in Nigeria?",
      answer: "R&M Groups stands out through our 24/7 professional support, comprehensive service portfolio, luxury focus, experienced consultants, and commitment to excellence. We offer personalized travel solutions, have established partnerships with premium service providers, and maintain the highest standards of customer service."
    },
    {
      question: "Can R&M Groups handle corporate travel management for businesses?",
      answer: "Absolutely! We specialize in corporate travel management, offering tailored solutions for businesses including group bookings, expense management, travel policy compliance, and dedicated account management. Our corporate services cover everything from executive travel to large conference arrangements."
    },
    {
      question: "What are R&M Groups' operating hours and emergency contact options?",
      answer: "Our regular business hours are Monday-Friday 8:00 AM - 6:00 PM, and Saturday 10:00 AM - 4:00 PM. For emergency travel situations, we provide 24/7 WhatsApp support at +234 901 190 2882. Our emergency services ensure you're never stranded during your travels."
    },
    {
      question: "How far in advance should I book travel services with R&M Groups?",
      answer: "For optimal pricing and availability, we recommend booking international flights 2-8 weeks in advance, visa services 4-6 weeks before travel, and luxury transportation 1-2 weeks ahead. However, we also handle last-minute bookings and emergency travel arrangements with our extensive network."
    },
    {
      question: "Does R&M Groups offer travel packages and group discounts?",
      answer: "Yes, we create customized travel packages for individuals, families, and groups. Our packages can include flights, accommodation, transportation, and activities. We offer competitive group discounts for corporate travel, family vacations, and special events. Contact us for personalized package quotes."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 uppercase tracking-wider">
            <HelpCircle className="mr-3" size={16} />
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Everything You Need to Know About
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Our Travel Services
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Get answers to common questions about our premium travel and logistics services across Nigeria.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-slate-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <ChevronUp className="text-blue-600" size={24} />
                  ) : (
                    <ChevronDown className="text-slate-400" size={24} />
                  )}
                </div>
              </button>
              
              {openFAQ === index && (
                <div className="px-8 pb-6 animate-in slide-in-from-top duration-200">
                  <div className="border-t border-slate-100 pt-6">
                    <p className="text-slate-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-blue-600 text-white p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-blue-100 mb-6">
              Our travel experts are ready to assist you with personalized solutions for all your travel needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+2349011902882"
                className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Call +234 901 190 2882
              </a>
              <a
                href="https://wa.me/2349011902882"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-green-700 transition-colors"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
};

export default SEOFAQSection;