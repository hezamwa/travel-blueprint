import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      "home": "Home",
      "countries": "Countries",
      "cities": "Cities",
      "attractions": "Attractions",
      "search": "Search",
      "language": "Language",
      
      // Home page
      "welcome": "Welcome to Travel Blueprint",
      "subtitle": "Discover amazing destinations worldwide",
      "explore": "Explore Destinations",
      "total_countries": "Countries",
      "total_cities": "Cities", 
      "total_attractions": "Attractions",
      
      // Countries
      "select_continent": "Select Continent",
      "all_continents": "All Continents",
      "select_country": "Select Country",
      "all_countries": "All Countries",
      "visa_requirement": "Visa Requirement",
      "all_visa_requirements": "All Visa Requirements",
      "clear_filters": "Clear Filters",
      "currency": "Currency",
      "languages": "Languages",
      "telecom_providers": "Telecom Providers",
      "exchange_rates": "Exchange Rates",
      
      // Cities
      "search_cities": "Search cities by name...",
      "best_time": "Best Time to Visit",
      "all_best_times": "All Times",
      "top_attraction": "Top Attraction",
      "avg_temp": "Average Temperature",
      "airport": "Airport",
      "attraction_count": "Attractions",
      
      // Attractions
      "type": "Type",
      "description": "Description",
      "view_details": "View Details",
      "back": "Back",
      "attraction_types": "Attraction Types",
      "filter_by_type": "Filter by Type",
      "all_types": "All Types",
      
      // Loading states
      "loading": "Loading...",
      "no_data": "No data available",
      "error": "Error loading data",
      
      // Continents
      "europe": "Europe",
      "asia": "Asia", 
      "africa": "Africa",
      "north_america": "North America",
      "south_america": "South America",
      "oceania": "Oceania"
    }
  },
  ar: {
    translation: {
      // Navigation
      "home": "الرئيسية",
      "countries": "البلدان",
      "cities": "المدن",
      "attractions": "المعالم السياحية",
      "search": "بحث",
      "language": "اللغة",
      
      // Home page
      "welcome": "مرحباً بكم في خارطة السفر",
      "subtitle": "اكتشف وجهات سياحية مذهلة حول العالم",
      "explore": "استكشف الوجهات",
      "total_countries": "دولة",
      "total_cities": "مدينة",
      "total_attractions": "معلم سياحي",
      
      // Countries
      "select_continent": "اختر القارة",
      "all_continents": "جميع القارات",
      "select_country": "اختر الدولة",
      "all_countries": "جميع الدول",
      "visa_requirement": "متطلبات التأشيرة",
      "all_visa_requirements": "جميع متطلبات التأشيرة",
      "clear_filters": "مسح المرشحات",
      "currency": "العملة",
      "languages": "اللغات",
      "telecom_providers": "مقدمو خدمات الاتصالات",
      "exchange_rates": "أسعار الصرف",
      // Cities
      "search_cities": "البحث في المدن بالاسم...",
      "best_time": "أفضل وقت للزيارة",
      "all_best_times": "جميع الأوقات",
      "top_attraction": "أهم معلم سياحي",
      "avg_temp": "متوسط درجة الحرارة",
      "airport": "المطار",
      "attraction_count": "المعالم السياحية",
      
      // Attractions
      "type": "النوع",
      "description": "الوصف",
      "view_details": "عرض التفاصيل",
      "back": "رجوع",
      "attraction_types": "أنواع المعالم السياحية",
      "filter_by_type": "تصفية حسب النوع",
      "all_types": "جميع الأنواع",
      
      // Loading states
      "loading": "جاري التحميل...",
      "no_data": "لا توجد بيانات متاحة",
      "error": "خطأ في تحميل البيانات",
      
      // Continents
      "europe": "أوروبا",
      "asia": "آسيا",
      "africa": "أفريقيا", 
      "north_america": "أمريكا الشمالية",
      "south_america": "أمريكا الجنوبية",
      "oceania": "أوقيانوسيا"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n; 