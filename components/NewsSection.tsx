import React from 'react';
import { Calendar, Clock, ArrowRight, Newspaper, TrendingUp } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

const NewsSection: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "R&M Groups Expands Private Jet Charter Services Across West Africa",
      excerpt: "We're excited to announce the expansion of our luxury private jet charter services to cover all major West African destinations, offering unprecedented convenience for business and leisure travelers.",
      category: "Company News",
      date: "January 15, 2026",
      readTime: "3 min read",
      image: "/images/private-jet.svg",
      featured: true
    },
    {
      id: 2,
      title: "New Partnership with Leading European Airlines Enhances Flight Options",
      excerpt: "Our strategic partnership with major European carriers now provides our clients with exclusive access to premium routes and competitive pricing for international travel.",
      category: "Partnerships",
      date: "January 10, 2026",
      readTime: "2 min read",
      image: "/images/flight-booking.svg",
      featured: false
    },
    {
      id: 3,
      title: "Visa Processing Times Reduced by 40% Through Digital Innovation",
      excerpt: "Our investment in cutting-edge digital processing technology has significantly reduced visa application processing times, making international travel more accessible for our clients.",
      category: "Technology",
      date: "January 8, 2026",
      readTime: "4 min read",
      image: "/images/visa-assistance.svg",
      featured: false
    },
    {
      id: 4,
      title: "Luxury Car Rental Fleet Upgraded with Latest Premium Vehicles",
      excerpt: "We've added 50 new luxury vehicles to our fleet, including the latest models from Mercedes-Benz, BMW, and Lexus, ensuring our clients travel in ultimate comfort and style.",
      category: "Fleet Update",
      date: "January 5, 2026",
      readTime: "2 min read",
      image: "/images/luxury-car.svg",
      featured: false
    },
    {
      id: 5,
      title: "24/7 Emergency Travel Support Now Available in 15 Languages",
      excerpt: "Our commitment to exceptional customer service extends globally with multilingual emergency support, ensuring assistance is available whenever and wherever you need it.",
      category: "Customer Service",
      date: "December 28, 2025",
      readTime: "3 min read",
      image: "/images/corporate-office.svg",
      featured: false
    },
    {
      id: 6,
      title: "Sustainable Travel Initiative: Carbon Offset Program Launched",
      excerpt: "R&M Groups introduces a comprehensive carbon offset program, allowing environmentally conscious travelers to minimize their carbon footprint while enjoying premium travel services.",
      category: "Sustainability",
      date: "December 20, 2025",
      readTime: "5 min read",
      image: "/images/tech-workspace.svg",
      featured: false
    }
  ];

  const featuredNews = newsItems.find(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 uppercase tracking-wider">
            <Newspaper className="mr-3" size={16} />
            Latest News & Updates
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
            Stay Updated with
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              R&M Groups News
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover the latest developments, partnerships, and innovations that make R&M Groups Nigeria's leading premium travel and logistics company.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Featured Article */}
          {featuredNews && (
            <div className="lg:col-span-2">
              <div className="group bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 hover:shadow-3xl transition-all duration-500">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={featuredNews.image} 
                    alt={featuredNews.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  
                  {/* Featured badge */}
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                    <TrendingUp size={16} className="inline mr-2" />
                    Featured
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {featuredNews.category}
                  </div>
                </div>
                
                <div className="p-10">
                  <div className="flex items-center space-x-6 text-sm text-slate-500 mb-6">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {featuredNews.date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2" />
                      {featuredNews.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {featuredNews.title}
                  </h3>
                  
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    {featuredNews.excerpt}
                  </p>
                  
                  <button className="group/btn inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-all duration-300">
                    <span>Read Full Article</span>
                    <ArrowRight size={20} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* News List */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Recent Updates</h3>
              
              <div className="space-y-6">
                {regularNews.slice(0, 4).map((item) => (
                  <article key={item.id} className="group border-b border-slate-100 last:border-b-0 pb-6 last:pb-0">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                          <img src={item.image} alt="" className="w-8 h-8" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                            {item.category}
                          </span>
                          <span className="text-slate-500 text-xs">{item.date}</span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                          {item.title}
                        </h4>
                        
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">
                          {item.excerpt.substring(0, 120)}...
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-xs flex items-center">
                            <Clock size={12} className="mr-1" />
                            {item.readTime}
                          </span>
                          
                          <button className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                  View All News & Updates
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Informed</h3>
          <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new services, exclusive offers, and travel industry insights.
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-2xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-white/20"
            />
            <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-colors duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          
          <p className="text-blue-200 text-sm mt-4">
            Join 5,000+ subscribers. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;