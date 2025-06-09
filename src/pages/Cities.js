import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  TextField,
  CircularProgress,
  Chip,
  Button,
  CardActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  LocationCity as CityIcon,
  WbSunny as WeatherIcon,
  Flight as AirportIcon,
  Attractions as AttractionsIcon,
  Public as CountryIcon,
  OpenInNew as LinkIcon,
  ClearAll as ClearIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getCities } from '../services/firestoreService';

const CityCard = ({ city, onClick, onCountryClick }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={onClick} sx={{ flexGrow: 1 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CityIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h3">
              {city.name}
            </Typography>
          </Box>
          
          {/* Country Information */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
            <CountryIcon sx={{ mr: 1, fontSize: 16, color: 'secondary.main' }} />
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              {city.country ? city.country.charAt(0).toUpperCase() + city.country.slice(1) : 'N/A'}
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>{t('best_time')}:</strong> {city.bestTime || 'N/A'}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>{t('top_attraction')}:</strong> {city.topAttraction || 'N/A'}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <WeatherIcon sx={{ mr: 1, fontSize: 16 }} />
            <Typography variant="body2">
              {city.avgTemp || 'N/A'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AirportIcon sx={{ mr: 1, fontSize: 16 }} />
            <Typography variant="body2">
              {city.airportCode || 'N/A'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip 
              label={t(city.continent)}
              size="small"
              color="primary"
              variant="outlined"
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttractionsIcon sx={{ mr: 0.5, fontSize: 16 }} />
              <Typography variant="caption">
                {city.attractionCount || 0} {t('attractions')}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      
      {/* Country Link Button */}
      <CardActions sx={{ pt: 0 }}>
        <Button
          size="small"
          startIcon={<LinkIcon />}
          onClick={(e) => {
            e.stopPropagation();
            onCountryClick(city.country);
          }}
          sx={{ ml: 'auto' }}
        >
          {t('view_details')} - {city.country ? city.country.charAt(0).toUpperCase() + city.country.slice(1) : ''}
        </Button>
      </CardActions>
    </Card>
  );
};

const Cities = () => {
  const { t } = useTranslation();
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
        const citiesData = await getCities();
        setAllCities(citiesData);
        setFilteredCities(citiesData);
        
        // Extract unique continents, countries, and best times
        const continents = [...new Set(citiesData.map(city => city.continent))].sort();
        const countries = [...new Set(citiesData.map(city => city.country))].sort();
        const bestTimes = [...new Set(
          citiesData
            .map(city => city.bestTime)
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
  }, []);

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
      filtered = baseData.filter(city => city.bestTime === selectedBestTime);
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
        base = base.filter(city => city.bestTime === selectedBestTime);
      }
      
      return base;
    };

    // Update available continents (exclude continent filter itself)
    if (selectedCountry || selectedBestTime) {
      const baseForContinents = getFilteredBase('continent');
      tempAvailableContinents = [...new Set(
        baseForContinents.map(city => city.continent)
      )].sort();
    }

    // Update available countries (exclude country filter itself)
    if (selectedContinent || selectedBestTime) {
      const baseForCountries = getFilteredBase('country');
      tempAvailableCountries = [...new Set(
        baseForCountries.map(city => city.country)
      )].sort();
    }

    // Update available best times (exclude best time filter itself)
    if (selectedContinent || selectedCountry) {
      const baseForBestTimes = getFilteredBase('bestTime');
      tempAvailableBestTimes = [...new Set(
        baseForBestTimes
          .map(city => city.bestTime)
          .filter(time => time && time !== 'N/A')
      )].sort();
    }

    // If no filters are selected, show all options
    if (!selectedContinent && !selectedCountry && !selectedBestTime) {
      tempAvailableContinents = allContinents;
      tempAvailableCountries = allCountries;
      tempAvailableBestTimes = allBestTimes;
    }

    setFilteredCities(filtered);
    setAvailableContinents(tempAvailableContinents);
    setAvailableCountries(tempAvailableCountries);
    setAvailableBestTimes(tempAvailableBestTimes);
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
    setSelectedContinent('');
    setSelectedCountry('');
    setSelectedBestTime('');
    setSearchTerm('');
  };

  const handleCityClick = (cityId) => {
    navigate(`/cities/${cityId}`);
  };

  const handleCountryClick = (countryId) => {
    navigate(`/countries/${countryId}`);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          {t('loading')}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t('cities')}
      </Typography>
      
      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        {/* First Row - Dropdowns */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
          {/* Continent Filter */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>{t('select_continent')}</InputLabel>
            <Select
              value={selectedContinent}
              onChange={handleContinentChange}
              label={t('select_continent')}
            >
              <MenuItem value="">
                {t('all_continents')}
              </MenuItem>
              {availableContinents.map((continent) => (
                <MenuItem key={continent} value={continent}>
                  {t(continent)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Country Filter */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>{t('select_country')}</InputLabel>
            <Select
              value={selectedCountry}
              onChange={handleCountryChange}
              label={t('select_country')}
            >
              <MenuItem value="">
                {t('all_countries')}
              </MenuItem>
              {availableCountries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country.charAt(0).toUpperCase() + country.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Best Time Filter */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>{t('best_time')}</InputLabel>
            <Select
              value={selectedBestTime}
              onChange={handleBestTimeChange}
              label={t('best_time')}
            >
              <MenuItem value="">
                {t('all_best_times')}
              </MenuItem>
              {availableBestTimes.map((bestTime) => (
                <MenuItem key={bestTime} value={bestTime}>
                  {bestTime}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Clear Filters Button */}
          {(selectedContinent || selectedCountry || selectedBestTime || searchTerm) && (
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={handleClearFilters}
              sx={{ height: '56px' }}
            >
              {t('clear_filters')}
            </Button>
          )}
        </Box>

        {/* Second Row - Search */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SearchIcon sx={{ color: 'action.active' }} />
          <TextField
            fullWidth
            variant="outlined"
            placeholder={t('search_cities')}
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ maxWidth: 400 }}
          />
        </Box>
      </Box>

      {/* Cities Grid */}
      <Grid container spacing={3}>
        {filteredCities.map((city) => (
          <Grid item xs={12} sm={6} md={4} key={city.id}>
            <CityCard
              city={city}
              onClick={() => handleCityClick(city.id)}
              onCountryClick={handleCountryClick}
            />
          </Grid>
        ))}
      </Grid>

      {filteredCities.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {t('no_data')}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Cities; 