import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation & Brand
      "Travel Blueprint": "Travel Blueprint",
      "home": "Home",
      "countries": "Countries",
      "cities": "Cities",
      "services": "Services",
      "attractions": "Attractions",
      "search": "Search",
      "language": "Language",
      
      // Hero Section
      "TRAVEL BLUEPRINT": "TRAVEL BLUEPRINT",
      "Discover": "Discover",
      "Amazing": "Amazing", 
      "Destinations": "Destinations",
      "Explore the world's most beautiful places and create unforgettable memories with our comprehensive travel guide.": "Explore the world's most beautiful places and create unforgettable memories with our comprehensive travel guide.",
      "Explore Countries": "Explore Countries",
      "Browse Cities": "Browse Cities",
      "Travelers": "Travelers",
      
      // Services Page
      "TRAVEL SERVICES": "TRAVEL SERVICES",
      "Our Travel": "Our Travel",
      "Services": "Services",
      "We provide comprehensive travel services to make your journey smooth and memorable. From visa processing to trip planning, we've got you covered.": "We provide comprehensive travel services to make your journey smooth and memorable. From visa processing to trip planning, we've got you covered.",
      "What We Offer": "What We Offer",
      "Choose from our wide range of professional travel services designed to meet all your travel needs": "Choose from our wide range of professional travel services designed to meet all your travel needs",
      "Ready to Start Your Journey?": "Ready to Start Your Journey?",
      "Contact us through our social media channels to get personalized assistance with any of our services": "Contact us through our social media channels to get personalized assistance with any of our services",
      "Email": "Email",
      "Available 24/7 to assist you with your travel needs": "Available 24/7 to assist you with your travel needs",
      
      // Service Items
      "travel_consultation": "Travel Consultation",
      "travel_consultation_desc": "Get expert advice and personalized recommendations for your travel plans from our experienced consultants.",
      "visa_issuance_services": "Visa Issuance Services",
      "visa_issuance_services_desc": "Complete visa processing and application services for all destinations with guaranteed approval support.",
      "consulate_appointment_reservation": "Consulate Appointment Reservation",
      "consulate_appointment_reservation_desc": "Fast and reliable consulate appointment booking service to secure your visa interview dates.",
      "travel_health_insurance": "Travel Health Insurance",
      "travel_health_insurance_desc": "Comprehensive travel insurance coverage to protect you during your journey worldwide.",
      "application_submissions_services": "Application Submission Services",
      "application_submissions_services_desc": "Professional assistance with all types of travel document applications and submissions.",
      "document_translation_services": "Document Translation Services",
      "document_translation_services_desc": "Certified translation services for all your travel documents in multiple languages.",
      "trip_planning": "Trip Planning",
      "trip_planning_desc": "Customized travel itineraries and planning services to make your trip unforgettable.",
      "flight_booking": "Flight Booking",
      "flight_booking_desc": "Best flight deals and booking services with flexible options and competitive prices.",
      "hotel_booking": "Hotel Booking",
      "hotel_booking_desc": "Premium hotel reservations and accommodation services worldwide at the best rates.",
      
      // Home page
      "welcome": "Welcome to Travel Blueprint",
      "subtitle": "Discover amazing destinations worldwide",
      "explore": "Explore Destinations",
      "total_countries": "Countries",
      "total_cities": "Cities", 
      "total_attractions": "Attractions",
      "Platform Statistics": "Platform Statistics",
      "Explore our comprehensive database of travel destinations from around the world": "Explore our comprehensive database of travel destinations from around the world",
      "Featured Destinations": "Featured Destinations",
      "Discover some of the most popular travel destinations around the world": "Discover some of the most popular travel destinations around the world",
      "View All Countries": "View All Countries",
      
      // Countries
      "Explore countries around the world and plan your next adventure": "Explore countries around the world and plan your next adventure",
      "Try adjusting your filters to see more results": "Try adjusting your filters to see more results",
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
      "Showing": "Showing",
      "city": "city",
      "cities": "cities",
      
      // Attractions
      "attractions": "Attractions",
      "attraction": "Attraction",
      "type": "Type",
      "description": "Description",
      "view_details": "View Details",
      "back": "Back",
      "attraction_types": "Attraction Types",
      "filter_by_type": "Filter by Type",
      "all_types": "All Types",
      "search_attractions": "Search attractions by name...",
      "all_cities": "All Cities",
      "Explore attractions and plan your next adventure": "Explore attractions and plan your next adventure",
      
      // Footer
      "Discover the world's most amazing destinations and create unforgettable travel experiences.": "Discover the world's most amazing destinations and create unforgettable travel experiences.",
      "Explore": "Explore",
      "Categories": "Categories",
      "Resources": "Resources",
      "Popular Destinations": "Popular Destinations",
      "Travel Tips": "Travel Tips",
      "Adventure": "Adventure",
      "Culture": "Culture",
      "Nature": "Nature", 
      "Urban": "Urban",
      "Travel Guide": "Travel Guide",
      "FAQ": "FAQ",
      "Support": "Support",
      "Blog": "Blog",
      "All Rights Reserved by": "All Rights Reserved by",
      "Privacy Policy": "Privacy Policy",
      "Terms & Conditions": "Terms & Conditions",
      
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
      // Navigation & Brand
      "Travel Blueprint": "خارطة السفر",
      "home": "الرئيسية",
      "countries": "البلدان",
      "cities": "المدن",
      "services": "الخدمات",
      "attractions": "المعالم السياحية",
      "search": "بحث",
      "language": "اللغة",
      
      // Hero Section
      "TRAVEL BLUEPRINT": "خارطة السفر",
      "Discover": "اكتشف",
      "Amazing": "وجهات", 
      "Destinations": "مذهلة",
      "Explore the world's most beautiful places and create unforgettable memories with our comprehensive travel guide.": "استكشف أجمل الأماكن في العالم واصنع ذكريات لا تُنسى مع دليل السفر الشامل الخاص بنا.",
      "Explore Countries": "استكشف البلدان",
      "Browse Cities": "تصفح المدن",
      "Travelers": "مسافر",
      
      // Services Page
      "TRAVEL SERVICES": "خدمات السفر",
      "Our Travel": "خدمات",
      "Services": "السفر",
      "We provide comprehensive travel services to make your journey smooth and memorable. From visa processing to trip planning, we've got you covered.": "نقدم خدمات سفر شاملة لجعل رحلتك سلسة ولا تُنسى. من معالجة التأشيرات إلى تخطيط الرحلات، نحن نغطي كل احتياجاتك.",
      "What We Offer": "ما نقدمه",
      "Choose from our wide range of professional travel services designed to meet all your travel needs": "اختر من مجموعتنا الواسعة من خدمات السفر المهنية المصممة لتلبية جميع احتياجات السفر الخاصة بك",
      "Ready to Start Your Journey?": "هل أنت مستعد لبدء رحلتك؟",
      "Contact us through our social media channels to get personalized assistance with any of our services": "تواصل معنا عبر قنوات التواصل الاجتماعي للحصول على مساعدة شخصية مع أي من خدماتنا",
      "Email": "البريد الإلكتروني",
      "Available 24/7 to assist you with your travel needs": "متاحون على مدار الساعة طوال أيام الأسبوع لمساعدتك في احتياجات السفر",
      
      // Service Items
      "travel_consultation": "استشارات السفر",
      "travel_consultation_desc": "احصل على نصائح الخبراء وتوصيات شخصية لخطط السفر من مستشارينا ذوي الخبرة.",
      "visa_issuance_services": "خدمات إصدار التأشيرات",
      "visa_issuance_services_desc": "خدمات معالجة وتقديم طلبات التأشيرة الكاملة لجميع الوجهات مع ضمان دعم الموافقة.",
      "consulate_appointment_reservation": "حجز مواعيد القنصلية",
      "consulate_appointment_reservation_desc": "خدمة حجز مواعيد القنصلية السريعة والموثوقة لتأمين مواعيد مقابلة التأشيرة.",
      "travel_health_insurance": "التأمين الصحي للسفر",
      "travel_health_insurance_desc": "تغطية تأمينية شاملة للسفر لحمايتك أثناء رحلتك في جميع أنحاء العالم.",
      "application_submissions_services": "خدمات تقديم الطلبات",
      "application_submissions_services_desc": "مساعدة مهنية مع جميع أنواع طلبات وثائق السفر والتقديمات.",
      "document_translation_services": "خدمات ترجمة الوثائق",
      "document_translation_services_desc": "خدمات ترجمة معتمدة لجميع وثائق السفر الخاصة بك بلغات متعددة.",
      "trip_planning": "تخطيط الرحلات",
      "trip_planning_desc": "خدمات تخطيط الرحلات المخصصة وبرامج السفر لجعل رحلتك لا تُنسى.",
      "flight_booking": "حجز الطيران",
      "flight_booking_desc": "أفضل عروض الطيران وخدمات الحجز مع خيارات مرنة وأسعار تنافسية.",
      "hotel_booking": "حجز الفنادق",
      "hotel_booking_desc": "حجوزات فنادق فاخرة وخدمات الإقامة في جميع أنحاء العالم بأفضل الأسعار.",
      
      // Home page
      "welcome": "مرحباً بكم في خارطة السفر",
      "subtitle": "اكتشف وجهات سياحية مذهلة حول العالم",
      "explore": "استكشف الوجهات",
      "total_countries": "دولة",
      "total_cities": "مدينة",
      "total_attractions": "معلم سياحي",
      "Platform Statistics": "إحصائيات المنصة",
      "Explore our comprehensive database of travel destinations from around the world": "استكشف قاعدة البيانات الشاملة للوجهات السياحية من جميع أنحاء العالم",
      "Featured Destinations": "الوجهات المميزة",
      "Discover some of the most popular travel destinations around the world": "اكتشف بعض الوجهات السياحية الأكثر شعبية حول العالم",
      "View All Countries": "عرض جميع البلدان",
      
      // Countries
      "Explore countries around the world and plan your next adventure": "استكشف البلدان حول العالم وخطط لمغامرتك القادمة",
      "Try adjusting your filters to see more results": "جرب تعديل المرشحات لرؤية المزيد من النتائج",
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
      "Showing": "عرض",
      "city": "مدينة",
      "cities": "مدن",
      
      // Attractions
      "attractions": "المعالم السياحية",
      "attraction": "معلم سياحي",
      "type": "النوع",
      "description": "الوصف",
      "view_details": "عرض التفاصيل",
      "back": "رجوع",
      "attraction_types": "أنواع المعالم السياحية",
      "filter_by_type": "تصفية حسب النوع",
      "all_types": "جميع الأنواع",
      "search_attractions": "ابحث عن المعالم بالاسم...",
      "all_cities": "كل المدن",
      "Explore attractions and plan your next adventure": "استكشف المعالم السياحية وخطط لمغامرتك القادمة",
      
      // Footer
      "Discover the world's most amazing destinations and create unforgettable travel experiences.": "اكتشف أروع الوجهات في العالم واصنع تجارب سفر لا تُنسى.",
      "Explore": "استكشف",
      "Categories": "الفئات",
      "Resources": "الموارد",
      "Popular Destinations": "الوجهات الشعبية",
      "Travel Tips": "نصائح السفر",
      "Adventure": "المغامرة",
      "Culture": "الثقافة",
      "Nature": "الطبيعة",
      "Urban": "حضري",
      "Travel Guide": "دليل السفر",
      "FAQ": "الأسئلة الشائعة",
      "Support": "الدعم",
      "Blog": "المدونة",
      "All Rights Reserved by": "جميع الحقوق محفوظة لـ",
      "Privacy Policy": "سياسة الخصوصية",
      "Terms & Conditions": "الشروط والأحكام",
      
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