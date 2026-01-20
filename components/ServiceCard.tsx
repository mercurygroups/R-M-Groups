
import React from 'react';
import * as Icons from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = (Icons as any)[service.icon] || Icons.HelpCircle;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <div className="h-48 w-full overflow-hidden relative">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
            <IconComponent className="text-white" size={24} />
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {service.description}
        </p>
        <div className="mt-auto">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-blue-600 font-semibold text-sm flex items-center space-x-1 hover:space-x-2 transition-all"
          >
            <span>Inquire Now</span>
            <Icons.ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
