
import React from 'react';
import { Plane, Passport, ShieldCheck, FileText, Anchor, Car, Bike, Info } from 'lucide-react';
import { Service, ServiceType } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Flight Bookings',
    description: 'Seamless processing of domestic and international flight tickets with competitive pricing and 24/7 support.',
    icon: 'Plane',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=800',
    type: ServiceType.FLIGHTS
  },
  {
    id: '2',
    title: 'Passport Processing',
    description: 'Expert guidance and assistance through the Nigerian passport application and renewal process.',
    icon: 'Passport',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800',
    type: ServiceType.PASSPORT
  },
  {
    id: '3',
    title: 'Travel Insurance',
    description: 'Comprehensive travel insurance policies to protect you against unforeseen events during your journeys.',
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1454165833767-027ff33027ef?auto=format&fit=crop&q=80&w=800',
    type: ServiceType.INSURANCE
  },
  {
    id: '4',
    title: 'Visa Assistance',
    description: 'Specialized visa processing for tours, conferences, and business travel worldwide.',
    icon: 'FileText',
    image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800',
    type: ServiceType.VISA
  },
  {
    id: '5',
    title: 'Private Jet Rental',
    description: 'Elite private jet charter services for high-profile business or leisure travel across Africa and beyond.',
    icon: 'Plane',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800',
    type: ServiceType.JET_RENTAL
  },
  {
    id: '6',
    title: 'Luxury Vehicle Rental',
    description: 'Interstate rental of premium cars and luxury buses across Nigeria for group tours or corporate events.',
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
    type: ServiceType.LUXURY_CAR
  },
  {
    id: '7',
    title: 'Urban Logistics',
    description: 'Swift delivery bike services for goods in Lagos, Port Harcourt, and Abuja. Reliable and efficient.',
    icon: 'Bike',
    image: 'https://images.unsplash.com/photo-1558981403-c5f97dbbe480?auto=format&fit=crop&q=80&w=800',
    type: ServiceType.DELIVERY
  }
];

export const COMPANY_DETAILS = {
  name: 'R&M Groups',
  email: 'mercurygroups247@gmail.com',
  phone: '+234 901 190 2882',
  whatsapp: '2349011902882',
  about: `R&M Groups is a premier, multi-faceted travel management and logistics conglomerate headquartered in Nigeria. We specialize in delivering high-end travel solutions and seamless urban logistics tailored to the modern professional and leisure traveler. From domestic and international flight ticketing to elite private jet rentals and interstate luxury ground transport, our reach is comprehensive. Our dedicated team manages complex visa processes for tours and conferences, handles passport logistics, and provides robust travel insurance policies. Furthermore, our urban delivery network in Lagos, Port Harcourt, and Abuja ensures your business or personal goods move with speed and safety. At R&M Groups, our mission is to redefine mobility and travel excellence through integrity, reliability, and world-class service.`
};
