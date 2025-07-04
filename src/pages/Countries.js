import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  GlobeAltIcon, 
  CurrencyDollarIcon, 
  LanguageIcon,
  XMarkIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { getCountries } from '../services/apiService';
import Card from '../components/Card';

const CountryCard = ({ country, onClick, index }) => {
  const { t } = useTranslation();

  return (
    <div 
      className="group"
      style={{ 
        animationDelay: `${index * 100}ms` 
      }}
    >
      <Card 
        className="cursor-pointer h-full relative overflow-hidden group-hover:scale-105 transition-all duration-500 border-0 shadow-xl hover:shadow-2xl"
        onClick={(e) => {
          console.log('Country card clicked!', country.id);
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
        
        <div className="relative">
          {/* Icon with animated background */}
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg mr-3">
              <GlobeAltIcon className="h-6 w-6 text-purple" />
            </div>
            <h3 className="text-xl font-semibold text-darkpurple group-hover:text-blue transition-colors duration-300">
              {country.name || (country.id.charAt(0).toUpperCase() + country.id.slice(1))}
            </h3>
          </div>
          
          <div className="space-y-3 mb-4">
            <p className="text-sm text-grey">
              <span className="font-medium">{t('visa_requirement')}:</span> {country.countryInfo?.visaRequirement || 'N/A'}
            </p>
            
            <div className="flex items-center text-sm text-grey group-hover:text-darkpurple transition-colors duration-300">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-2 transform group-hover:scale-110 transition-transform duration-300">
                <CurrencyDollarIcon className="h-4 w-4 text-purple" />
              </div>
              <span>
                {country.countryInfo?.currency
                  ? `${country.countryInfo.currency.name} (${country.countryInfo.currency.code})`
                  : 'N/A'}
              </span>
            </div>
            
            <div className="flex items-center text-sm text-grey group-hover:text-darkpurple transition-colors duration-300">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-2 transform group-hover:scale-110 transition-transform duration-300">
                <LanguageIcon className="h-4 w-4 text-purple" />
              </div>
              <span>{country.countryInfo?.officialLanguages?.join(', ') || 'N/A'}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-lightblue to-blue text-white text-xs font-medium rounded-full group-hover:from-blue group-hover:to-darkblue transition-all duration-300 transform group-hover:scale-105">
              {country.continent}
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

const Countries = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedVisaRequirement, setSelectedVisaRequirement] = useState('');
  const [allVisaRequirements, setAllVisaRequirements] = useState([]);
  const [availableVisaRequirements, setAvailableVisaRequirements] = useState([]);

  const uniqueContinents = useMemo(() => {
    return [...new Set(allCountries.map(c => c.continent).filter(Boolean))].sort();
  }, [allCountries]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const countriesData = await getCountries(i18n.language);
        setAllCountries(countriesData);
        setFilteredCountries(countriesData);
        
        // Extract unique visa requirements from all data
        const visaRequirements = [...new Set(
          countriesData
            .map(country => country.countryInfo?.visaRequirement)
            .filter(requirement => requirement && requirement !== 'N/A')
        )].sort();
        setAllVisaRequirements(visaRequirements);
        
        // Initialize available options with all options
        setAvailableVisaRequirements(visaRequirements);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [i18n.language]);

  useEffect(() => {
    let filtered = allCountries;
    let tempAvailableVisaRequirements = allVisaRequirements;

    // Apply continent filter and update available visa requirements
    if (selectedContinent) {
      filtered = filtered.filter(country => country.continent === selectedContinent);
      
      // Update available visa requirements based on selected continent
      tempAvailableVisaRequirements = [...new Set(
        filtered
          .map(country => country.countryInfo?.visaRequirement)
          .filter(requirement => requirement && requirement !== 'N/A')
      )].sort();
    }

    // Apply visa requirement filter and update available visa requirements
    if (selectedVisaRequirement) {
      // If we already filtered by continent, use that filtered list
      const baseCountries = selectedContinent ? filtered : allCountries;
      
      filtered = baseCountries.filter(
        country => country.countryInfo?.visaRequirement === selectedVisaRequirement
      );
      
      // Update available visa requirements based on selected visa requirement
      tempAvailableVisaRequirements = [...new Set(
        filtered
          .map(country => country.countryInfo?.visaRequirement)
          .filter(requirement => requirement && requirement !== 'N/A')
      )].sort();
    }

    // If no filters are selected, show all options
    if (!selectedContinent && !selectedVisaRequirement) {
      tempAvailableVisaRequirements = allVisaRequirements;
    }

    setFilteredCountries(filtered);
    setAvailableVisaRequirements(tempAvailableVisaRequirements);
  }, [selectedContinent, selectedVisaRequirement, allCountries, allVisaRequirements]);

  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
  };

  const handleVisaRequirementChange = (event) => {
    setSelectedVisaRequirement(event.target.value);
  };

  const handleClearFilters = () => {
    setSelectedContinent('');
    setSelectedVisaRequirement('');
  };

  const handleCountryClick = (countryId) => {
    console.log('Clicking country with ID:', countryId);
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
          {t('countries')}
        </h1>
        <p className="text-lg text-grey">
          {t('Explore countries around the world and plan your next adventure')}
        </p>
      </div>
      
      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4 items-center p-6 bg-lightgrey rounded-2xl">
        <FunnelIcon className="h-5 w-5 text-blue" />
        
        {/* Continent Filter */}
        <div className="min-w-[200px]">
          <label className="block text-sm font-medium text-grey mb-2">
            {t('select_continent')}
          </label>
          <select
            value={selectedContinent}
            onChange={handleContinentChange}
            className="w-full px-4 py-2 border border-linegrey rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-colors"
          >
            <option value="">{t('all_continents')}</option>
            {uniqueContinents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>

        {/* Visa Requirement Filter */}
        <div className="min-w-[200px]">
          <label className="block text-sm font-medium text-grey mb-2">
            {t('visa_requirement')}
          </label>
          <select
            value={selectedVisaRequirement}
            onChange={handleVisaRequirementChange}
            className="w-full px-4 py-2 border border-linegrey rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-colors"
          >
            <option value="">{t('all_visa_requirements')}</option>
            {availableVisaRequirements.map((requirement) => (
              <option key={requirement} value={requirement}>
                {requirement}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {(selectedContinent || selectedVisaRequirement) && (
          <button
            onClick={handleClearFilters}
            className="flex items-center px-4 py-2 border border-grey text-grey hover:border-blue hover:text-blue rounded-lg transition-colors duration-300"
          >
            <XMarkIcon className="h-4 w-4 mr-2" />
            {t('clear_filters')}
          </button>
        )}
      </div>

              {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredCountries.map((country, index) => (
            <CountryCard
              key={country.id}
              country={country}
              onClick={() => handleCountryClick(country.id)}
              index={index}
            />
          ))}
      </div>

      {filteredCountries.length === 0 && !loading && (
        <div className="text-center mt-12">
          <h3 className="text-xl font-medium text-grey">
            {t('no_data')}
          </h3>
          <p className="text-grey mt-2">
            {t('Try adjusting your filters to see more results')}
          </p>
        </div>
      )}
    </div>
  );
};

export default Countries; 