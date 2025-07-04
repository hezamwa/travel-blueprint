import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  BuildingOffice2Icon,
  SunIcon,
  PaperAirplaneIcon,
  MapPinIcon,
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { getCityById, getAttractionsByCity } from '../services/apiService';
import Card from '../components/Card';

const AttractionCard = ({ attraction, index }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      className="group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card
        className="cursor-pointer h-full relative overflow-hidden group-hover:scale-105 transition-all duration-500 border-0 shadow-xl hover:shadow-2xl"
        onClick={() => navigate(`/attractions/${attraction.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/attractions/${attraction.id}`); } }}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="relative">
          {/* Icon with animated background */}
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg mr-3">
              <MapPinIcon className="h-6 w-6 text-purple" />
            </div>
            <h3 className="text-xl font-semibold text-darkpurple group-hover:text-blue transition-colors duration-300">
              {attraction.name}
            </h3>
          </div>
          <div className="space-y-3 mb-4">
            <p className="text-sm text-grey">
              <span className="font-medium">{t('type')}:</span> {attraction.type || 'N/A'}
            </p>
            <p className="text-sm text-grey">
              <span className="font-medium">{t('country')}:</span> {attraction.country || 'N/A'}
            </p>
            <div className="flex items-center text-sm text-grey group-hover:text-darkpurple transition-colors duration-300">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-2 transform group-hover:scale-110 transition-transform duration-300">
                <MapPinIcon className="h-4 w-4 text-purple" />
              </div>
              {attraction.city && (
                <button
                  onClick={e => { e.stopPropagation(); navigate(`/cities/${attraction.cityId}`); }}
                  className="underline cursor-pointer text-blue hover:text-darkblue"
                >
                  {attraction.city}
                </button>
              )}
            </div>
            <div className="text-sm text-grey">
              <span className="font-medium">{t('description')}:</span> {attraction.description || t('no_data')}
              {attraction.descriptionAr && (
                <>
                  <div className="border-b border-lightborder my-2"></div>
                  <span className="block text-right" dir="rtl">{attraction.descriptionAr}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-lightblue to-blue text-white text-xs font-medium rounded-full group-hover:from-blue group-hover:to-darkblue transition-all duration-300 transform group-hover:scale-105">
              {attraction.type}
            </span>
            <span className="text-xs text-grey group-hover:text-blue transition-colors duration-300 opacity-0 group-hover:opacity-100">
              {t('view_details')} →
            </span>
          </div>
        </div>
        {/* Animated border */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </Card>
    </div>
  );
};

const CityDetail = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { cityId } = useParams();
  const [city, setCity] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setLoading(true);
        const [cityData, attractionsData] = await Promise.all([
          getCityById(cityId, i18n.language),
          getAttractionsByCity(cityId, i18n.language)
        ]);
        
        setCity(cityData);
        if (Array.isArray(attractionsData)) {
          setAttractions(attractionsData);
        } else if (attractionsData && Array.isArray(attractionsData.data)) {
          setAttractions(attractionsData.data);
        } else {
          setAttractions([]);
        }
      } catch (error) {
        console.error('Error fetching city data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (cityId) {
      fetchCityData();
    }
  }, [cityId, i18n.language]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue"></div>
        <span className="ml-4 text-xl text-grey">{t('loading')}</span>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <h2 className="text-lg font-medium text-grey">
          {t('no_data')}
        </h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate('/cities')}
          className="flex items-center px-4 py-2 text-darkpurple hover:text-blue hover:bg-lightgrey rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          {t('back')}
        </button>
        
        {/* Country Link Button */}
        {city.country && (
          <button
            onClick={() => navigate(`/countries/${city.countryId || city.country}`)}
            className="flex items-center px-6 py-3 bg-blue text-white hover:bg-darkblue rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <GlobeAltIcon className="h-5 w-5 mr-2" />
            {t('view_details')} - {city.country.charAt(0).toUpperCase() + city.country.slice(1)}
            <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
          </button>
        )}
      </div>

      {/* City Header */}
      <div className="bg-gradient-to-br from-blue via-btnblue to-darkblue rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full animate-bounce"></div>
        </div>
        
        <div className="relative">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
              <BuildingOffice2Icon className="h-10 w-10 text-purple" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                {city.name}
              </h1>
              <div className="flex gap-2 items-center">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full">
                  {t(city.continent)}
                </span>
                {/* Country Chip */}
                {city.country && (
                  <span className="inline-block px-4 py-2 bg-gold/20 backdrop-blur-sm text-gold font-medium rounded-full">
                    {city.country.charAt(0).toUpperCase() + city.country.slice(1)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* City Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center mb-2">
                <SunIcon className="h-6 w-6 mr-2" />
                <span className="font-semibold">{t('best_time')}</span>
              </div>
              <p className="text-white/80">{Array.isArray(city.bestTimeToVisit) ? city.bestTimeToVisit.join(', ') : (city.bestTimeToVisit || t('no_data'))}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center mb-2">
                <MapPinIcon className="h-6 w-6 mr-2" />
                <span className="font-semibold">{t('top_attraction')}</span>
              </div>
              <p className="text-white/80">{city.topAttraction || t('no_data')}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center mb-2">
                <SunIcon className="h-6 w-6 mr-2" />
                <span className="font-semibold">{t('avg_temp')}</span>
              </div>
              <p className="text-white/80">{city.avgTemp || t('no_data')}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center mb-2">
                <PaperAirplaneIcon className="h-6 w-6 mr-2" />
                <span className="font-semibold">{t('airport')}</span>
              </div>
              <p className="text-white/80">{city.airportCode || t('no_data')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attractions Section */}
      <div>
        <h2 className="text-4xl font-bold text-darkpurple mb-8">
          {t('attractions')} ({attractions.length})
        </h2>

        {attractions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {attractions.map((attraction, index) => (
              <AttractionCard 
                key={attraction.id} 
                attraction={attraction} 
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPinIcon className="mx-auto h-12 w-12 text-grey mb-4" />
            <h3 className="text-lg font-medium text-darkpurple mb-2">{t('no_data')}</h3>
            <p className="text-grey">No attractions found for this city.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityDetail; 