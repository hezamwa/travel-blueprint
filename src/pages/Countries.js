import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Chip,
  Button
} from '@mui/material';
import {
  Public as CountryIcon,
  AttachMoney as CurrencyIcon,
  Language as LanguageIcon,
  ClearAll as ClearIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getCountries } from '../services/firestoreService';

const CountryCard = ({ country, onClick }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CountryIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h3">
              {country.id.charAt(0).toUpperCase() + country.id.slice(1)}
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>{t('visa_requirement')}:</strong> {country.countryInfo?.visaRequirement || 'N/A'}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CurrencyIcon sx={{ mr: 1, fontSize: 16 }} />
            <Typography variant="body2">
              {country.countryInfo?.currency || 'N/A'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LanguageIcon sx={{ mr: 1, fontSize: 16 }} />
            <Typography variant="body2">
              {country.countryInfo?.officialLanguages?.join(', ') || 'N/A'}
            </Typography>
          </Box>
          
          <Chip 
            label={t(country.continent)}
            size="small"
            color="primary"
            variant="outlined"
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Countries = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedVisaRequirement, setSelectedVisaRequirement] = useState('');
  const [allVisaRequirements, setAllVisaRequirements] = useState([]);
  const [availableContinents, setAvailableContinents] = useState([]);
  const [availableVisaRequirements, setAvailableVisaRequirements] = useState([]);

  const allContinents = ['europe', 'asia', 'africa', 'north_america', 'south_america', 'oceania'];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const countriesData = await getCountries();
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
        setAvailableContinents(allContinents);
        setAvailableVisaRequirements(visaRequirements);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    let filtered = allCountries;
    let tempAvailableContinents = allContinents;
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

    // Apply visa requirement filter and update available continents
    if (selectedVisaRequirement) {
      // If we already filtered by continent, use that filtered list
      const baseCountries = selectedContinent ? filtered : allCountries;
      
      filtered = baseCountries.filter(
        country => country.countryInfo?.visaRequirement === selectedVisaRequirement
      );
      
      // Update available continents based on selected visa requirement
      tempAvailableContinents = [...new Set(
        (selectedContinent ? allCountries : filtered)
          .filter(country => 
            selectedVisaRequirement ? 
            country.countryInfo?.visaRequirement === selectedVisaRequirement : true
          )
          .map(country => country.continent)
      )].sort();
    }

    // If no continent is selected, update available continents based on visa requirement
    if (!selectedContinent && selectedVisaRequirement) {
      tempAvailableContinents = [...new Set(
        allCountries
          .filter(country => country.countryInfo?.visaRequirement === selectedVisaRequirement)
          .map(country => country.continent)
      )].sort();
    }

    // If no visa requirement is selected, update available visa requirements based on continent
    if (!selectedVisaRequirement && selectedContinent) {
      tempAvailableVisaRequirements = [...new Set(
        allCountries
          .filter(country => country.continent === selectedContinent)
          .map(country => country.countryInfo?.visaRequirement)
          .filter(requirement => requirement && requirement !== 'N/A')
      )].sort();
    }

    // If no filters are selected, show all options
    if (!selectedContinent && !selectedVisaRequirement) {
      tempAvailableContinents = allContinents;
      tempAvailableVisaRequirements = allVisaRequirements;
    }

    setFilteredCountries(filtered);
    setAvailableContinents(tempAvailableContinents);
    setAvailableVisaRequirements(tempAvailableVisaRequirements);
  }, [selectedContinent, selectedVisaRequirement, allCountries, allContinents, allVisaRequirements]);

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
        {t('countries')}
      </Typography>
      
      {/* Filters */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
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

        {/* Visa Requirement Filter */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>{t('visa_requirement')}</InputLabel>
          <Select
            value={selectedVisaRequirement}
            onChange={handleVisaRequirementChange}
            label={t('visa_requirement')}
          >
            <MenuItem value="">
              {t('all_visa_requirements')}
            </MenuItem>
            {availableVisaRequirements.map((requirement) => (
              <MenuItem key={requirement} value={requirement}>
                {requirement}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Clear Filters Button */}
        {(selectedContinent || selectedVisaRequirement) && (
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

      {/* Countries Grid */}
      <Grid container spacing={3}>
        {filteredCountries.map((country) => (
          <Grid item xs={12} sm={6} md={4} key={country.id}>
            <CountryCard
              country={country}
              onClick={() => handleCountryClick(country.id)}
            />
          </Grid>
        ))}
      </Grid>

      {filteredCountries.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {t('no_data')}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Countries; 