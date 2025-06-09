import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  limit,
  collectionGroup 
} from 'firebase/firestore';
import { db } from '../firebase';

// Get all countries
export const getCountries = async () => {
  try {
    const countriesRef = collection(db, 'countries');
    const snapshot = await getDocs(countriesRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

// Get countries by continent
export const getCountriesByContinent = async (continent) => {
  try {
    const countriesRef = collection(db, 'countries');
    const q = query(
      countriesRef,
      where('continent', '==', continent)
    );
    const snapshot = await getDocs(q);
    const countries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Sort by id on client side to avoid needing composite index
    return countries.sort((a, b) => (a.id || '').localeCompare(b.id || ''));
  } catch (error) {
    console.error('Error fetching countries by continent:', error);
    throw error;
  }
};

// Get country by ID
export const getCountryById = async (countryId) => {
  try {
    const countryRef = doc(db, 'countries', countryId);
    const snapshot = await getDoc(countryRef);
    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...snapshot.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching country:', error);
    throw error;
  }
};

// Get all cities
export const getCities = async () => {
  try {
    const citiesRef = collection(db, 'cities');
    const snapshot = await getDocs(citiesRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

// Get cities by country
export const getCitiesByCountry = async (country) => {
  try {
    const citiesRef = collection(db, 'cities');
    const q = query(
      citiesRef,
      where('country', '==', country)
    );
    const snapshot = await getDocs(q);
    const cities = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Sort by name on client side to avoid needing composite index
    return cities.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  } catch (error) {
    console.error('Error fetching cities by country:', error);
    throw error;
  }
};

// Get cities by continent
export const getCitiesByContinent = async (continent) => {
  try {
    const citiesRef = collection(db, 'cities');
    const q = query(
      citiesRef,
      where('continent', '==', continent)
    );
    const snapshot = await getDocs(q);
    const cities = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Sort by name on client side to avoid needing composite index
    return cities.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  } catch (error) {
    console.error('Error fetching cities by continent:', error);
    throw error;
  }
};

// Get city by ID
export const getCityById = async (cityId) => {
  try {
    const cityRef = doc(db, 'cities', cityId);
    const snapshot = await getDoc(cityRef);
    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...snapshot.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching city:', error);
    throw error;
  }
};

// Get attractions for a specific city
export const getAttractionsByCity = async (cityId) => {
  try {
    const attractionsRef = collection(db, 'cities', cityId, 'attractions');
    const snapshot = await getDocs(attractionsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching attractions:', error);
    throw error;
  }
};

// Get attractions by type (across all cities)
export const getAttractionsByType = async (type, maxResults = 20) => {
  try {
    const attractionsRef = collectionGroup(db, 'attractions');
    const q = query(
      attractionsRef,
      where('type', '==', type),
      limit(maxResults)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching attractions by type:', error);
    throw error;
  }
};

// Get all attraction types
export const getAttractionTypes = async () => {
  try {
    const attractionsRef = collectionGroup(db, 'attractions');
    const snapshot = await getDocs(attractionsRef);
    const types = new Set();
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.type) {
        types.add(data.type);
      }
    });
    return Array.from(types).sort();
  } catch (error) {
    console.error('Error fetching attraction types:', error);
    throw error;
  }
};

// Get all attraction types with Arabic translations
export const getAttractionTypesWithTranslations = async () => {
  try {
    const attractionsRef = collectionGroup(db, 'attractions');
    const snapshot = await getDocs(attractionsRef);
    const typesMap = new Map();
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.type) {
        typesMap.set(data.type, {
          en: data.type,
          ar: data.typeAr || data.type
        });
      }
    });
    
    return Array.from(typesMap.values()).sort((a, b) => a.en.localeCompare(b.en));
  } catch (error) {
    console.error('Error fetching attraction types with translations:', error);
    throw error;
  }
};

// Get app metadata
export const getMetadata = async () => {
  try {
    const metadataRef = doc(db, 'metadata', 'app_metadata');
    const snapshot = await getDoc(metadataRef);
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    throw error;
  }
};

// Get exchange rates
export const getExchangeRates = async () => {
  try {
    const ratesRef = collection(db, 'exchange_rates');
    const snapshot = await getDocs(ratesRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

// Search cities by name
export const searchCities = async (searchTerm) => {
  try {
    const citiesRef = collection(db, 'cities');
    const snapshot = await getDocs(citiesRef);
    const cities = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Client-side filtering for search
    return cities.filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching cities:', error);
    throw error;
  }
}; 