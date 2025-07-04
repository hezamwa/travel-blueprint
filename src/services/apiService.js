import i18n from '../i18n';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;// || 'http://localhost:3001/api';

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
export const getCountries = (locale, selectOnly = false) => fetchAPI(`/countries${selectOnly ? '?select=name,id' : ''}`, locale);

// Get country by ID
export const getCountryById = (countryId, locale) => fetchAPI(`/countries/${countryId}`, locale);

// Get all cities
export const getCities = (locale, selectOnly = false) => fetchAPI(`/cities${selectOnly ? '?select=name,id' : ''}`, locale);

// Get city by ID
export const getCityById = (cityId, locale) => fetchAPI(`/cities/${cityId}`, locale);

// Get cities by country (if supported by backend query param)
export const getCitiesByCountry = (countryId, locale) => fetchAPI(`/cities?country=${encodeURIComponent(countryId)}`, locale);

// Get attractions by city (if supported by backend query param)
export const getAttractionsByCity = (cityId, locale) => fetchAPI(`/attractions?cityId=${encodeURIComponent(cityId)}`, locale);

// Get metadata (app metadata)
export const getMetadata = (locale) => fetchAPI('/metadata/app_metadata', locale);

// Get all attractions with filters and pagination
export const getAttractions = (filters = {}, locale) => {
  const params = new URLSearchParams();
  if (filters.page) params.append('page', filters.page);
  if (filters.pageSize) params.append('pageSize', filters.pageSize);
  if (filters.name) params.append('name', filters.name);
  if (filters.type) params.append('type', filters.type);
  if (filters.city) params.append('city', filters.city);
  if (filters.country) params.append('country', filters.country);
  if (filters.continent) params.append('continent', filters.continent);
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI(`/attractions${query}`, locale);
};

// Get attraction by ID
export const getAttractionById = (attractionId, locale) => fetchAPI(`/attractions/${attractionId}`, locale);

// Add more functions as needed for other endpoints 