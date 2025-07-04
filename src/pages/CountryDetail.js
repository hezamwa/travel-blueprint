import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  BuildingOffice2Icon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { getCountryById, getCitiesByCountry } from '../services/apiService';
import Card from '../components/Card';

const CityCard = ({ city, onClick, index }) => {
  const { t } = useTranslation();

  return (
    <div 
      className="group"
      style={{ 
        animationDelay: `${index * 100}ms` 
      }}
    >
      <Card 
        className="h-full relative overflow-hidden group-hover:scale-105 transition-all duration-500 border-0 shadow-xl hover:shadow-2xl cursor-pointer"
        onClick={onClick}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
        
        <div className="relative">
          {/* Header with Icon and Name */}
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg mr-3">
              <BuildingOffice2Icon className="h-6 w-6 text-purple" />
            </div>
            <h3 className="text-xl font-semibold text-darkpurple group-hover:text-blue transition-colors duration-300">
              {city.name}
            </h3>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-grey group-hover:text-darkpurple transition-colors duration-300">
              <span className="font-medium">{t('best_time')}:</span> {Array.isArray(city.bestTimeToVisit) ? city.bestTimeToVisit.join(', ') : (city.bestTimeToVisit || city.bestTime || 'N/A')}
            </p>
            
            <p className="text-sm text-grey group-hover:text-darkpurple transition-colors duration-300">
              <span className="font-medium">{t('top_attraction')}:</span> {city.topAttraction || 'N/A'}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-grey group-hover:text-darkpurple transition-colors duration-300">
                <span className="font-medium">{t('attractions')}:</span> {city.attractionCount || 0}
              </span>
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-lightblue to-blue text-white text-xs font-medium rounded-full group-hover:from-blue group-hover:to-darkblue transition-all duration-300 transform group-hover:scale-105">
                {t('view_details')}
              </span>
            </div>
          </div>
        </div>

        {/* Animated border */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </Card>
    </div>
  );
};

const CountryDetail = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const countryData = await getCountryById(countryId, i18n.language);
        setCountry(countryData);
        let countryParam = countryId;
        if (i18n.language === 'ar' && countryData && countryData.name) {
          countryParam = countryData.name;
        }
        const citiesData = await getCitiesByCountry(countryParam, i18n.language);
        setCities(citiesData);
      } catch (error) {
        console.error('Error fetching country data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (countryId) {
      fetchCountryData();
    }
  }, [countryId, i18n.language]);

  const handleCityClick = (cityId) => {
    navigate(`/cities/${cityId}`);
  };

  // Helper to render currency string
  const renderCurrency = (currency) => {
    if (!currency) return '';
    if (typeof currency === 'string') return currency;
    if (currency.name && currency.code) return `${currency.name} (${currency.code})`;
    if (currency.name) return currency.name;
    if (currency.code) return currency.code;
    return '';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue"></div>
        <span className="ml-4 text-xl text-grey">{t('loading')}</span>
      </div>
    );
  }

  if (!country) {
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
      <button
        onClick={() => navigate('/countries')}
        className="flex items-center px-4 py-2 text-darkpurple hover:text-blue hover:bg-lightgrey rounded-lg transition-all duration-200 transform hover:scale-105 mb-8"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        {t('back')}
      </button>

      {/* Country Header */}
      <div className="bg-gradient-to-br from-blue via-btnblue to-darkblue rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full animate-bounce"></div>
        </div>
        
        <div className="relative">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
              <GlobeAltIcon className="h-10 w-10 text-purple" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                {country.name || (country.id.charAt(0).toUpperCase() + country.id.slice(1))}
              </h1>
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full">
                {t(country.continent)}
              </span>
            </div>
          </div>

          {/* Country Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">{t('visa_requirement')}</h3>
                <p className="text-white/90 text-lg">
                  {country.countryInfo?.visaRequirement || t('no_data')}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <CurrencyDollarIcon className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-semibold">{t('currency')}</h3>
                </div>
                <p className="text-white/90 text-lg">
                  {country.countryInfo?.currency
                    ? `${country.countryInfo.currency.name} (${country.countryInfo.currency.code})`
                    : t('no_data')}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <LanguageIcon className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-semibold">{t('languages')}</h3>
                </div>
                <p className="text-white/90 text-lg">
                  {country.countryInfo?.officialLanguages?.join(', ') || t('no_data')}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Exchange Rates */}
              {country.countryInfo?.exchangeRates && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    <CurrencyDollarIcon className="h-6 w-6 mr-2" />
                    <h3 className="text-xl font-semibold">{t('exchange_rates')}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-white/90 font-medium">
                        1,000 SAR = {(1000 * (country.countryInfo.exchangeRates.sarToLocal || 0)).toLocaleString()} {renderCurrency(country.countryInfo.currency)}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-white/90 font-medium">
                        100 USD = {(100 * (country.countryInfo.exchangeRates.usdToLocal || 0)).toLocaleString()} {renderCurrency(country.countryInfo.currency)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

                             {/* Telecom Providers */}
               {country.countryInfo?.telecomProviders && country.countryInfo.telecomProviders.length > 0 && (
                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                   <div className="flex items-center mb-4">
                     <PhoneIcon className="h-6 w-6 mr-2" />
                     <h3 className="text-xl font-semibold">{t('telecom_providers')}</h3>
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {country.countryInfo.telecomProviders.map((provider, index) => (
                       <span 
                         key={index}
                         className="px-3 py-1 bg-white/20 text-white text-sm rounded-full"
                       >
                         {typeof provider === 'object' ? provider.name : provider}
                       </span>
                     ))}
                   </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* Cities Section */}
      <div>
        <h2 className="text-4xl font-bold text-darkpurple mb-8">
          {t('cities')} ({cities.length})
        </h2>

        {cities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {cities.map((city, index) => (
              <CityCard
                key={city.id}
                city={city}
                onClick={() => handleCityClick(city.id)}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BuildingOffice2Icon className="mx-auto h-12 w-12 text-grey mb-4" />
            <h3 className="text-lg font-medium text-darkpurple mb-2">{t('no_data')}</h3>
            <p className="text-grey">No cities found for this country.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetail; 