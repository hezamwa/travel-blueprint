import i18n from '../i18n';

const API_BASE_URL = 'http://localhost:3001/api';

// Helper to handle fetch and errors
async function fetchAPI(endpoint, locale) {
  // Use provided locale or current i18n language
  const lang = locale || i18n.language || 'en';
  // Add locale param to endpoint
  let url = `${API_BASE_URL}${endpoint}`;
  url += url.includes('?') ? `&locale=${lang}` : `?locale=${lang}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// Get all countries
export const getCountries = (locale) => fetchAPI('/countries', locale);

// Get country by ID
export const getCountryById = (countryId, locale) => fetchAPI(`/countries/${countryId}`, locale);

// Get all cities
export const getCities = (locale) => fetchAPI('/cities', locale);

// Get city by ID
export const getCityById = (cityId, locale) => fetchAPI(`/cities/${cityId}`, locale);

// Get cities by country (if supported by backend query param)
export const getCitiesByCountry = (countryId, locale) => fetchAPI(`/cities?country=${encodeURIComponent(countryId)}`, locale);

// Get attractions by city (if supported by backend query param)
export const getAttractionsByCity = (cityId, locale) => fetchAPI(`/attractions?city=${encodeURIComponent(cityId)}`, locale);

// Get metadata (app metadata)
export const getMetadata = (locale) => fetchAPI('/metadata/app_metadata', locale);

// Add more functions as needed for other endpoints 