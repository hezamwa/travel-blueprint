import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ChatBubbleLeftRightIcon,
  DocumentCheckIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  PaperAirplaneIcon,
  LanguageIcon,
  MapIcon,
  RocketLaunchIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import Card from '../components/Card';

const services = [
  {
    id: 0,
    icon: ChatBubbleLeftRightIcon,
    titleKey: 'travel_consultation',
    descriptionKey: 'travel_consultation_desc',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    hoverBg: 'group-hover:from-blue-50 group-hover:to-blue-100'
  },
  {
    id: 1,
    icon: DocumentCheckIcon,
    titleKey: 'visa_issuance_services',
    descriptionKey: 'visa_issuance_services_desc',
    color: 'btnblue',
    gradient: 'from-indigo-500 to-indigo-600',
    hoverBg: 'group-hover:from-indigo-50 group-hover:to-indigo-100'
  },
  {
    id: 2,
    icon: CalendarDaysIcon,
    titleKey: 'consulate_appointment_reservation',
    descriptionKey: 'consulate_appointment_reservation_desc',
    color: 'faqblue',
    gradient: 'from-purple-500 to-purple-600',
    hoverBg: 'group-hover:from-purple-50 group-hover:to-purple-100'
  },
  {
    id: 3,
    icon: ShieldCheckIcon,
    titleKey: 'travel_health_insurance',
    descriptionKey: 'travel_health_insurance_desc',
    color: 'green-500',
    gradient: 'from-green-500 to-green-600',
    hoverBg: 'group-hover:from-green-50 group-hover:to-green-100'
  },
  {
    id: 4,
    icon: PaperAirplaneIcon,
    titleKey: 'application_submissions_services',
    descriptionKey: 'application_submissions_services_desc',
    color: 'orange-500',
    gradient: 'from-orange-500 to-orange-600',
    hoverBg: 'group-hover:from-orange-50 group-hover:to-orange-100'
  },
  {
    id: 5,
    icon: LanguageIcon,
    titleKey: 'document_translation_services',
    descriptionKey: 'document_translation_services_desc',
    color: 'pink-500',
    gradient: 'from-pink-500 to-pink-600',
    hoverBg: 'group-hover:from-pink-50 group-hover:to-pink-100'
  },
  {
    id: 6,
    icon: MapIcon,
    titleKey: 'trip_planning',
    descriptionKey: 'trip_planning_desc',
    color: 'teal-500',
    gradient: 'from-teal-500 to-teal-600',
    hoverBg: 'group-hover:from-teal-50 group-hover:to-teal-100'
  },
  {
    id: 7,
    icon: RocketLaunchIcon,
    titleKey: 'flight_booking',
    descriptionKey: 'flight_booking_desc',
    color: 'red-500',
    gradient: 'from-red-500 to-red-600',
    hoverBg: 'group-hover:from-red-50 group-hover:to-red-100'
  },
  {
    id: 8,
    icon: BuildingOfficeIcon,
    titleKey: 'hotel_booking',
    descriptionKey: 'hotel_booking_desc',
    color: 'yellow-500',
    gradient: 'from-yellow-500 to-yellow-600',
    hoverBg: 'group-hover:from-yellow-50 group-hover:to-yellow-100'
  }
];

const ServiceCard = ({ service, index }) => {
  const { t } = useTranslation();
  const IconComponent = service.icon;

  return (
    <div 
      className="group"
      style={{ 
        animationDelay: `${index * 100}ms` 
      }}
    >
      <Card className={`h-full relative overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl hover:bg-gradient-to-br ${service.hoverBg} border-2 border-transparent hover:border-opacity-20 hover:border-gray-300`}>
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-300`}></div>
        
        {/* Icon with animated background */}
        <div className="relative mb-6">
          <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
            <IconComponent className="h-8 w-8 text-purple" />
          </div>
        </div>

        {/* Content */}
        <div className="relative text-center">
          <h3 className="text-xl font-bold text-darkpurple mb-3 group-hover:text-blue transition-colors duration-300">
            {t(service.titleKey)}
          </h3>
          <p className="text-grey leading-relaxed">
            {t(service.descriptionKey)}
          </p>
        </div>

        {/* Animated border */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </Card>
    </div>
  );
};

const Services = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-lightgrey via-white to-lightgrey">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue via-btnblue to-darkblue py-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-24 h-24 bg-white rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-white rounded-full animate-ping"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="inline-block px-6 py-2 bg-white/20 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
              {t('TRAVEL SERVICES')}
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {t('Our Travel')} <br />
            <span className="text-gold">{t('Services')}</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t('We provide comprehensive travel services to make your journey smooth and memorable. From visa processing to trip planning, we\'ve got you covered.')}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-darkpurple mb-4">
              {t('What We Offer')}
            </h2>
            <p className="text-lg text-grey max-w-2xl mx-auto">
              {t('Choose from our wide range of professional travel services designed to meet all your travel needs')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-darkpurple via-darkblue to-darkpurple py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('Ready to Start Your Journey?')}
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            {t('Contact us through our social media channels to get personalized assistance with any of our services')}
          </p>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* WhatsApp */}
            <div className="group">
              <a 
                href="https://wa.me/966533971797" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-8 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-2xl flex items-center justify-center group-hover:animate-bounce">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
                <p className="text-white/70">+966533971797</p>
              </a>
            </div>

            {/* Instagram */}
            <div className="group">
              <a 
                href="https://instagram.com/travelblueprint" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-8 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:animate-bounce">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Instagram</h3>
                <p className="text-white/70">@travelblueprint</p>
              </a>
            </div>

            {/* Email */}
            <div className="group">
              <a 
                href="mailto:services@travelblueprint.com" 
                className="block p-8 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-blue rounded-2xl flex items-center justify-center group-hover:animate-bounce">
                  <EnvelopeIcon className="h-8 w-8 text-purple" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('Email')}</h3>
                <p className="text-white/70">services@travelblueprint.com</p>
              </a>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/60 text-lg">
              {t('Available 24/7 to assist you with your travel needs')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 