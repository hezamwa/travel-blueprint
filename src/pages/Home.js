import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  GlobeAltIcon, 
  MapPinIcon, 
  BuildingOffice2Icon 
} from '@heroicons/react/24/outline';
import { getMetadata } from '../services/apiService';
import Hero from '../components/Hero';

const StatCard = ({ icon, title, value, gradient, hoverBg }) => {
  return (
    <div className="group">
      <div className={`h-full relative overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl hover:bg-gradient-to-br ${hoverBg} border-2 border-transparent hover:border-opacity-20 hover:border-gray-300 bg-white rounded-2xl p-8 text-center travel-card`}>
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-300`}></div>
        
        {/* Icon with animated background */}
        <div className="relative mb-6">
          <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
            {React.cloneElement(icon, { className: "h-8 w-8 text-purple" })}
          </div>
        </div>

        {/* Content */}
        <div className="relative text-center">
          <div className="text-4xl font-bold text-darkpurple mb-2 group-hover:text-blue transition-colors duration-300">
            {value || 0}
          </div>
          <div className="text-grey font-medium">
            {title}
          </div>
        </div>

        {/* Animated border */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </div>
    </div>
  );
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metadataData = await getMetadata(i18n.language);
        setMetadata(metadataData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue"></div>
        <span className="ml-4 text-xl text-grey">{t('loading')}</span>
      </div>
    );
  }

  return (
    <div>
      <Hero />
      
      {/* Statistics Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-darkpurple mb-4">
            {t('Platform Statistics')}
          </h2>
          <p className="text-lg text-grey max-w-2xl mx-auto">
            {t('Explore our comprehensive database of travel destinations from around the world')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          <StatCard
            icon={<GlobeAltIcon className="h-8 w-8" />}
            title={t('total_countries')}
            value={metadata?.totalCountries}
            gradient="from-blue-500 to-blue-600"
            hoverBg="group-hover:from-blue-50 group-hover:to-blue-100"
          />
          <StatCard
            icon={<BuildingOffice2Icon className="h-8 w-8" />}
            title={t('total_cities')}
            value={metadata?.totalCities}
            gradient="from-purple-500 to-purple-600"
            hoverBg="group-hover:from-purple-50 group-hover:to-purple-100"
          />
          <StatCard
            icon={<MapPinIcon className="h-8 w-8" />}
            title={t('total_attractions')}
            value={metadata?.totalAttractions}
            gradient="from-teal-500 to-teal-600"
            hoverBg="group-hover:from-teal-50 group-hover:to-teal-100"
          />
        </div>
      </div>

      {/* Featured Destinations Section */}
      <div className="bg-lightgrey py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-darkpurple mb-4">
              {t('Featured Destinations')}
            </h2>
            <p className="text-lg text-grey max-w-2xl mx-auto mb-8">
              {t('Discover some of the most popular travel destinations around the world')}
            </p>
            <button 
              onClick={() => navigate('/countries')}
              className="inline-flex items-center px-8 py-4 bg-blue text-white font-semibold rounded-full hover:bg-hoblue transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <GlobeAltIcon className="h-5 w-5 mr-2" />
              {t('View All Countries')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 