import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  BuildingOffice2Icon,
  SunIcon,
  PaperAirplaneIcon,
  MapPinIcon,
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { getCities } from '../services/apiService';
import Card from '../components/Card';

const CityCard = ({ city, onClick, onCountryClick, index }) => {
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
        onClick={(e) => {
          console.log('City card clicked!', city.name);
          onClick();
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
        
        <div className="relative">
          {/* Header with City Icon and Name */}
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg mr-3">
              <BuildingOffice2Icon className="h-6 w-6 text-purple" />
            </div>
            <h3 className="text-xl font-semibold text-darkpurple group-hover:text-blue transition-colors duration-300">
              {city.name}
            </h3>
          </div>
          
          {/* Country Information */}
          <div 
            className="flex items-center mb-4 p-2 bg-lightgrey rounded-lg group-hover:bg-gradient-to-r group-hover:from-lightgrey group-hover:to-lightblue transition-all duration-300 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onCountryClick(city.country);
            }}
          >
            <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-2 transform group-hover:scale-110 transition-transform duration-300">
              <GlobeAltIcon className="h-4 w-4 text-purple" />
            </div>
            <span className="text-sm font-medium text-darkpurple group-hover:text-blue transition-colors duration-300">
              {city.country ? city.country.charAt(0).toUpperCase() + city.country.slice(1) : 'N/A'}
            </span>
            <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-auto text-grey group-hover:text-blue transition-colors duration-300" />
          </div>
          
          <div className="space-y-3 mb-4">
            <p className="text-sm text-grey group-hover:text-darkpurple transition-colors duration-300">
              <span className="font-medium">{t('best_time')}:</span> {Array.isArray(city.bestTimeToVisit) ? city.bestTimeToVisit.join(', ') : (city.bestTimeToVisit || 'N/A')}
            </p>
            
            <p className="text-sm text-grey group-hover:text-darkpurple transition-colors duration-300">
              <span className="font-medium">{t('top_attraction')}:</span> {city.topAttraction || 'N/A'}
            </p>
            
            <div className="flex items-center text-sm text-grey group-hover:text-darkpurple transition-colors duration-300">
              <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-2 transform group-hover:scale-110 transition-transform duration-300">
                <SunIcon className="h-4 w-4 text-purple" />
              </div>
              <span>{city.avgTemp || 'N/A'}</span>
            </div>
            
            <div className="flex items-center text-sm text-grey group-hover:text-darkpurple transition-colors duration-300">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-2 transform group-hover:scale-110 transition-transform duration-300">
                <PaperAirplaneIcon className="h-4 w-4 text-purple" />
              </div>
              <span>{city.airportCode || 'N/A'}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-lightblue to-blue text-white text-xs font-medium rounded-full group-hover:from-blue group-hover:to-darkblue transition-all duration-300 transform group-hover:scale-105">
              {t(city.continent)}
            </span>
            <div className="flex items-center text-xs text-grey group-hover:text-darkpurple transition-colors duration-300">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>{city.attractionCount || 0} {t('attractions')}</span>
            </div>
          </div>
          
          <div className="text-center">
            <span className="text-xs text-grey group-hover:text-blue transition-colors duration-300 opacity-0 group-hover:opacity-100">
              {t('view_details')} →
            </span>
          </div>
        </div>

        {/* Animated border */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </Card>
    </div>
  );
};

const Cities = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [allCities, setAllCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedBestTime, setSelectedBestTime] = useState('');
  
  // Available options for filters
  const [allContinents, setAllContinents] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allBestTimes, setAllBestTimes] = useState([]);
  const [availableContinents, setAvailableContinents] = useState([]);
  const [availableCountries, setAvailableCountries] = useState([]);
  const [availableBestTimes, setAvailableBestTimes] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const citiesData = await getCities(i18n.language);
        setAllCities(citiesData);
        setFilteredCities(citiesData);
        
        // Extract unique continents, countries, and best times
        const continents = [...new Set(citiesData.map(city => city.continent))].sort();
        const countries = [...new Set(citiesData.map(city => city.country))].sort();
        const bestTimes = [...new Set(
          citiesData
            .flatMap(city => Array.isArray(city.bestTimeToVisit) ? city.bestTimeToVisit : (city.bestTimeToVisit ? [city.bestTimeToVisit] : []))
            .filter(time => time && time !== 'N/A')
        )].sort();
        
        setAllContinents(continents);
        setAllCountries(countries);
        setAllBestTimes(bestTimes);
        setAvailableContinents(continents);
        setAvailableCountries(countries);
        setAvailableBestTimes(bestTimes);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [i18n.language]);

  useEffect(() => {
    let filtered = allCities;
    let tempAvailableContinents = allContinents;
    let tempAvailableCountries = allCountries;
    let tempAvailableBestTimes = allBestTimes;

    // Apply continent filter
    if (selectedContinent) {
      filtered = filtered.filter(city => city.continent === selectedContinent);
    }

    // Apply country filter
    if (selectedCountry) {
      const baseData = selectedContinent ? filtered : allCities;
      filtered = baseData.filter(city => city.country === selectedCountry);
    }

    // Apply best time filter
    if (selectedBestTime) {
      const baseData = (selectedContinent || selectedCountry) ? filtered : allCities;
      filtered = baseData.filter(city => Array.isArray(city.bestTimeToVisit) ? city.bestTimeToVisit.includes(selectedBestTime) : city.bestTimeToVisit === selectedBestTime);
    }

    // Apply search term filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Update available options based on current active filters
    const getFilteredBase = (excludeFilter) => {
      let base = allCities;
      
      if (excludeFilter !== 'continent' && selectedContinent) {
        base = base.filter(city => city.continent === selectedContinent);
      }
      
      if (excludeFilter !== 'country' && selectedCountry) {
        base = base.filter(city => city.country === selectedCountry);
      }
      
      if (excludeFilter !== 'bestTime' && selectedBestTime) {
        base = base.filter(city => Array.isArray(city.bestTimeToVisit) ? city.bestTimeToVisit.includes(selectedBestTime) : city.bestTimeToVisit === selectedBestTime);
      }
      
      return base;
    };

    // Update available continents
    const continentsFromCurrentFilters = [...new Set(
      getFilteredBase('continent').map(city => city.continent)
    )].sort();
    setAvailableContinents(continentsFromCurrentFilters);

    // Update available countries
    const countriesFromCurrentFilters = [...new Set(
      getFilteredBase('country').map(city => city.country)
    )].sort();
    setAvailableCountries(countriesFromCurrentFilters);

    // Update available best times
    const monthOrder = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const bestTimesFromCurrentFilters = [...new Set(
      getFilteredBase('bestTime')
        .flatMap(city => Array.isArray(city.bestTimeToVisit) ? city.bestTimeToVisit : (city.bestTimeToVisit ? [city.bestTimeToVisit] : []))
        .filter(time => time && time !== 'N/A')
    )].sort((a, b) => {
      const aIndex = monthOrder.findIndex(m => m.toLowerCase() === a.toLowerCase());
      const bIndex = monthOrder.findIndex(m => m.toLowerCase() === b.toLowerCase());
      if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
    setAvailableBestTimes(bestTimesFromCurrentFilters);

    setFilteredCities(filtered);
  }, [selectedContinent, selectedCountry, selectedBestTime, searchTerm, allCities, allContinents, allCountries, allBestTimes]);

  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleBestTimeChange = (event) => {
    setSelectedBestTime(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedContinent('');
    setSelectedCountry('');
    setSelectedBestTime('');
  };

  const handleCityClick = (cityId) => {
    console.log('Clicking city with ID:', cityId);
    navigate(`/cities/${cityId}`);
  };

  const handleCountryClick = (countryId) => {
    navigate(`/countries/${countryId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue"></div>
        <span className="ml-4 text-xl text-grey">{t('loading')}</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-darkpurple mb-4">
          {t('cities')}
        </h1>
        <p className="text-lg text-grey">
          {t('Explore cities around the world and plan your next adventure')}
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-8 space-y-4 p-6 bg-lightgrey rounded-2xl">
        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-grey" />
          <input
            type="text"
            placeholder={t('search_cities')}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-lightborder rounded-xl focus:ring-2 focus:ring-blue focus:border-transparent bg-white"
          />
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-4 items-center">
          <FunnelIcon className="h-5 w-5 text-grey" />
          
          {/* Continent Filter */}
          <select
            value={selectedContinent}
            onChange={handleContinentChange}
            className="px-4 py-2 border border-lightborder rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent bg-white"
          >
            <option value="">{t('all_continents')}</option>
            {availableContinents.map(continent => (
              <option key={continent} value={continent}>
                {t(continent)}
              </option>
            ))}
          </select>

          {/* Country Filter */}
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="px-4 py-2 border border-lightborder rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent bg-white"
          >
            <option value="">{t('all_countries')}</option>
            {availableCountries.map(country => (
              <option key={country} value={country}>
                {country ? country.charAt(0).toUpperCase() + country.slice(1) : ''}
              </option>
            ))}
          </select>

          {/* Best Time Filter */}
          <select
            value={selectedBestTime}
            onChange={handleBestTimeChange}
            className="px-4 py-2 border border-lightborder rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent bg-white"
          >
            <option value="">{t('all_best_times')}</option>
            {availableBestTimes.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          {/* Clear Filters Button */}
          {(selectedContinent || selectedCountry || selectedBestTime || searchTerm) && (
            <button
              onClick={handleClearFilters}
              className="flex items-center px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <XMarkIcon className="h-4 w-4 mr-2" />
              {t('clear_filters')}
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filteredCities.length === 0 ? (
        <div className="text-center py-12">
          <BuildingOffice2Icon className="mx-auto h-12 w-12 text-grey mb-4" />
          <h3 className="text-lg font-medium text-darkpurple mb-2">{t('no_data')}</h3>
          <p className="text-grey">{t('Try adjusting your filters to see more results')}</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-grey">
              {t('Showing')} {filteredCities.length} {filteredCities.length === 1 ? t('city') : t('cities')}
            </p>
          </div>

          {/* Cities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredCities.map((city, index) => (
              <CityCard
                key={`${city.id}-${city.name}`}
                city={city}
                onClick={() => handleCityClick(city.id)}
                onCountryClick={handleCountryClick}
                index={index}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cities; 