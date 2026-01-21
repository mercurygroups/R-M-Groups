
import React from 'react';
import * as Icons from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = (Icons as any)[service.icon] || Icons.HelpCircle;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-200 hover:-translate-y-3">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-indigo-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:via-indigo-50/30 group-hover:to-purple-50/50 transition-all duration-500"></div>
      
      <div className="h-56 w-full overflow-hidden relative">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
        
        {/* Floating icon */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
            <IconComponent className="text-white" size={28} />
          </div>
        </div>
        
        {/* Premium badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          Premium
        </div>
      </div>
      
      <div className="p-8 relative z-10">
        <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-slate-600 leading-relaxed mb-8 text-base">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group/btn inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-all duration-300"
          >
            <span>Learn More</span>
            <Icons.ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
          
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
            <Icons.Star size={20} className="text-blue-600" />
          </div>
        </div>
      </div>
      
      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-400 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
    </div>
  );
};

export default ServiceCard;
