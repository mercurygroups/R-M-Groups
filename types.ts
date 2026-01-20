
export enum ServiceType {
  FLIGHTS = 'Flights',
  PASSPORT = 'Passport',
  INSURANCE = 'Insurance',
  VISA = 'Visa Assistance',
  JET_RENTAL = 'Private Jet',
  LUXURY_CAR = 'Luxury Vehicles',
  DELIVERY = 'Logistics & Delivery'
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  type: ServiceType;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
