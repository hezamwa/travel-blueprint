import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, FunnelIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getAttractions, getCities, getCountries } from '../services/apiService';
import Card from '../components/Card';

const AttractionCard = ({ attraction, onClick, onCityClick, index }) => {
  const { t } = useTranslation();
  return (
    <div
      className="group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card
        className="cursor-pointer h-full relative overflow-hidden group-hover:scale-105 transition-all duration-500 border-0 shadow-xl hover:shadow-2xl"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
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
              <span className="underline cursor-pointer" onClick={e => { e.stopPropagation(); onCityClick(attraction.city); }}>{attraction.city || 'N/A'}</span>
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

const Attractions = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [attractions, setAttractions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [allTypes, setAllTypes] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [fullCityList, setFullCityList] = useState([]);
  const [fullCountryList, setFullCountryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Always fetch all cities and countries for full lists
        const [attractionsRes, citiesData, countriesData] = await Promise.all([
          getAttractions({
            page,
            pageSize,
            name: searchTerm,
            type: selectedType,
            city: selectedCity,
            country: selectedCountry
          }, i18n.language),
          getCities(i18n.language, true),
          getCountries(i18n.language, true)
        ]);
        setAttractions(attractionsRes.data);
        setTotal(attractionsRes.total);
        // Determine if any filter (except pagination) is applied
        const anyFilter = !!(searchTerm || selectedType || selectedCity || selectedCountry);
        if (anyFilter) {
          setAllCities([...new Set(attractionsRes.data.map(a => a.city).filter(Boolean))].sort());
          setAllCountries([...new Set(attractionsRes.data.map(a => a.country).filter(Boolean))].sort());
        } else {
          // On initial load or when filters are cleared, use freshly fetched data
          const cities = [...new Set(citiesData.map(city => city.name))].sort();
          const countries = [...new Set(countriesData.map(country => country.name).filter(Boolean))].sort();
          setAllCities(cities);
          setAllCountries(countries);
          // Also update full lists if not set
          if (fullCityList.length === 0) setFullCityList(cities);
          if (fullCountryList.length === 0) setFullCountryList(countries);
        }
        setAllTypes([...new Set(attractionsRes.data.map(a => a.type))].sort());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [i18n.language, page, pageSize, searchTerm, selectedType, selectedCity, selectedCountry]);

  const handleTypeChange = e => setSelectedType(e.target.value);
  const handleCityChange = e => setSelectedCity(e.target.value);
  const handleCountryChange = e => setSelectedCountry(e.target.value);
  const handleSearchChange = e => setSearchTerm(e.target.value);
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedCity('');
    setSelectedCountry('');
    setPage(1);
  };
  const handleAttractionClick = id => navigate(`/attractions/${id}`);
  const handleCityClick = cityName => {
    const city = allCities.find(c => c === cityName);
    if (city) navigate(`/cities?name=${encodeURIComponent(city)}`);
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
        <h1 className="text-5xl font-bold text-darkpurple mb-4">{t('attractions')}</h1>
        <p className="text-lg text-grey">{t('Explore attractions and plan your next adventure')}</p>
      </div>
      <div className="mb-8 space-y-4 p-6 bg-lightgrey rounded-2xl">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-grey" />
          <input
            type="text"
            placeholder={t('search_attractions') || t('search')}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-lightborder rounded-xl focus:ring-2 focus:ring-blue focus:border-transparent bg-white"
          />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <FunnelIcon className="h-5 w-5 text-grey" />
          <select value={selectedType} onChange={handleTypeChange} className="px-4 py-2 border border-lightborder rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent bg-white">
            <option value="">{t('all_types')}</option>
            {allTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <select value={selectedCity} onChange={handleCityChange} className="px-4 py-2 border border-lightborder rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent bg-white">
            <option value="">{t('all_cities') || t('cities')}</option>
            {allCities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
          <select value={selectedCountry} onChange={handleCountryChange} className="px-4 py-2 border border-lightborder rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent bg-white">
            <option value="">{t('all_countries')}</option>
            {allCountries.map(country => <option key={country} value={country}>{country}</option>)}
          </select>
          {(selectedType || selectedCity || selectedCountry || searchTerm) && (
            <button onClick={handleClearFilters} className="flex items-center px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <XMarkIcon className="h-4 w-4 mr-2" />
              {t('clear_filters')}
            </button>
          )}
        </div>
      </div>
      {attractions.length === 0 ? (
        <div className="text-center py-12">
          <MapPinIcon className="mx-auto h-12 w-12 text-grey mb-4" />
          <h3 className="text-lg font-medium text-darkpurple mb-2">{t('no_data')}</h3>
          <p className="text-grey">{t('Try adjusting your filters to see more results')}</p>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-grey flex items-center gap-4">
              {t('Showing')} {attractions.length} / {total} {total === 1 ? t('attraction') : t('attractions')}
              {/* Pagination Controls (top) */}
              {total > pageSize && (
                <span className="flex gap-2 ml-4">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg bg-lightgrey text-darkpurple disabled:opacity-50 transition-all duration-200 transform hover:scale-105 hover:bg-blue hover:text-white shadow-lg hover:shadow-xl"
                  >
                    {t('Previous')}
                  </button>
                  <span className="px-4 py-2">{t('Page')} {page}</span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page * pageSize >= total}
                    className="px-4 py-2 rounded-lg bg-lightgrey text-darkpurple disabled:opacity-50 transition-all duration-200 transform hover:scale-105 hover:bg-blue hover:text-white shadow-lg hover:shadow-xl"
                  >
                    {t('Next')}
                  </button>
                </span>
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {attractions.map((attraction, index) => (
              <AttractionCard
                key={`${attraction.id}-${attraction.name}`}
                attraction={attraction}
                onClick={() => handleAttractionClick(attraction.id)}
                onCityClick={handleCityClick}
                index={index}
              />
            ))}
          </div>
          {/* Pagination Controls (bottom) */}
          {total > pageSize && (
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-lightgrey text-darkpurple disabled:opacity-50 transition-all duration-200 transform hover:scale-105 hover:bg-blue hover:text-white shadow-lg hover:shadow-xl"
              >
                {t('Previous')}
              </button>
              <span className="px-4 py-2">{t('Page')} {page}</span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page * pageSize >= total}
                className="px-4 py-2 rounded-lg bg-lightgrey text-darkpurple disabled:opacity-50 transition-all duration-200 transform hover:scale-105 hover:bg-blue hover:text-white shadow-lg hover:shadow-xl"
              >
                {t('Next')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Attractions;
