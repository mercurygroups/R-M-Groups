import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  image: string;
}

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Adebayo Ogundimu",
      role: "CEO",
      company: "TechNova Solutions",
      location: "Lagos, Nigeria",
      rating: 5,
      text: "R&M Groups transformed our corporate travel experience. Their attention to detail and 24/7 support made our international business expansion seamless. The visa processing was incredibly efficient, and their luxury car service exceeded all expectations.",
      service: "Corporate Travel Management",
      date: "December 2025",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Fatima Al-Hassan",
      role: "International Relations Director",
      company: "Global Energy Consortium",
      location: "Abuja, Nigeria",
      rating: 5,
      text: "Outstanding service from start to finish! R&M Groups handled our delegation's travel to 5 countries with precision. Their private jet charter service was world-class, and the ground transportation in each city was flawless. Highly recommended for executive travel.",
      service: "Private Jet Charter & VIP Services",
      date: "January 2026",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      name: "Chukwuemeka Okafor",
      role: "Managing Partner",
      company: "Okafor & Associates Law Firm",
      location: "Port Harcourt, Nigeria",
      rating: 5,
      text: "I've used many travel agencies, but R&M Groups is in a league of their own. Their expertise in visa requirements saved us weeks of processing time. The luxury bus rental for our team retreat was immaculate, and their customer service is genuinely 24/7.",
      service: "Visa Processing & Group Travel",
      date: "November 2025",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 4,
      name: "Sarah Okonkwo",
      role: "Event Coordinator",
      company: "Elite Events Nigeria",
      location: "Lagos, Nigeria",
      rating: 5,
      text: "R&M Groups made our destination wedding planning effortless. They coordinated flights for 50+ guests, handled all visa applications, and provided luxury transportation. Their attention to detail and proactive communication made our special day perfect.",
      service: "Group Travel & Event Coordination",
      date: "October 2025",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 5,
      name: "Dr. Ibrahim Musa",
      role: "Medical Director",
      company: "Musa Medical Center",
      location: "Kano, Nigeria",
      rating: 5,
      text: "When I needed urgent medical travel arrangements, R&M Groups delivered beyond expectations. They secured last-minute flights, expedited visa processing, and arranged ground transportation in Germany. Their emergency travel service is truly lifesaving.",
      service: "Emergency Medical Travel",
      date: "September 2025",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 6,
      name: "Amina Bello",
      role: "HR Director",
      company: "Zenith Bank Plc",
      location: "Abuja, Nigeria",
      rating: 5,
      text: "R&M Groups has been our exclusive travel partner for 3 years. Their corporate travel management system streamlined our processes, reduced costs by 30%, and improved employee satisfaction. Their luxury car service for executives is unmatched.",
      service: "Corporate Travel Partnership",
      date: "Ongoing since 2023",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-100/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-100/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 uppercase tracking-wider">
            <Star className="mr-3" size={16} />
            Client Testimonials
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
            What Our Clients
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover why leading businesses and individuals across Nigeria trust R&M Groups for their premium travel and logistics needs.
          </p>
        </div>

        <div className="relative">
          {/* Main testimonial card */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-slate-100 relative overflow-hidden">
            {/* Background quote decoration */}
            <div className="absolute top-8 right-8 text-blue-100">
              <Quote size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-start gap-12">
                <div className="lg:w-1/3">
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      <img 
                        src={currentTestimonial.image} 
                        alt={currentTestimonial.name}
                        className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-full">
                        <Star size={16} fill="currentColor" />
                      </div>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-blue-600 font-semibold mb-1">
                      {currentTestimonial.role}
                    </p>
                    <p className="text-slate-600 mb-4">
                      {currentTestimonial.company}
                    </p>
                    
                    <div className="flex items-center justify-center space-x-4 text-sm text-slate-500 mb-6">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {currentTestimonial.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {currentTestimonial.date}
                      </div>
                    </div>
                    
                    <div className="flex justify-center mb-4">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <div className="bg-blue-50 px-4 py-2 rounded-full">
                      <p className="text-blue-800 text-sm font-semibold">
                        {currentTestimonial.service}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                    <Quote size={32} className="text-blue-600 mb-6" />
                    <blockquote className="text-xl text-slate-700 leading-relaxed font-medium italic">
                      "{currentTestimonial.text}"
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-4 hover:bg-blue-50 transition-all duration-300 group"
          >
            <ChevronLeft size={24} className="text-slate-600 group-hover:text-blue-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-4 hover:bg-blue-50 transition-all duration-300 group"
          >
            <ChevronRight size={24} className="text-slate-600 group-hover:text-blue-600" />
          </button>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-black text-blue-600 mb-2">4.9/5</div>
              <div className="text-sm text-slate-600 uppercase tracking-wider">Average Rating</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-black text-indigo-600 mb-2">500+</div>
              <div className="text-sm text-slate-600 uppercase tracking-wider">Happy Clients</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-black text-purple-600 mb-2">98%</div>
              <div className="text-sm text-slate-600 uppercase tracking-wider">Success Rate</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-black text-pink-600 mb-2">24/7</div>
              <div className="text-sm text-slate-600 uppercase tracking-wider">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;