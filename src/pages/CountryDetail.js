import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  CardActionArea,
  Link
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Public as CountryIcon,
  AttachMoney as CurrencyIcon,
  Language as LanguageIcon,
  LocationCity as CityIcon,
  Phone as TelecomIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { getCountryById, getCitiesByCountry } from '../services/firestoreService';

const CityCard = ({ city, onClick }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CityIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h3">
              {city.name}
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>{t('best_time')}:</strong> {city.bestTime || 'N/A'}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>{t('top_attraction')}:</strong> {city.topAttraction || 'N/A'}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            <strong>{t('attractions')}:</strong> {city.attractionCount || 0}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const CountryDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const [countryData, citiesData] = await Promise.all([
          getCountryById(countryId),
          getCitiesByCountry(countryId)
        ]);
        
        setCountry(countryData);
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
  }, [countryId]);

  const handleCityClick = (cityId) => {
    navigate(`/cities/${cityId}`);
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

  if (!country) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          {t('no_data')}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<BackIcon />}
        onClick={() => navigate('/countries')}
        sx={{ mb: 3 }}
      >
        {t('back')}
      </Button>

      {/* Country Header */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CountryIcon sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h3" component="h1">
              {country.id.charAt(0).toUpperCase() + country.id.slice(1)}
            </Typography>
            <Chip 
              label={t(country.continent)}
              color="primary"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Country Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {t('visa_requirement')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {country.countryInfo?.visaRequirement || t('no_data')}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CurrencyIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                <strong>{t('currency')}:</strong> {country.countryInfo?.currency || t('no_data')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <LanguageIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                <strong>{t('languages')}:</strong> {country.countryInfo?.officialLanguages?.join(', ') || t('no_data')}
              </Typography>
            </Box>
          </Grid>

          {/* Exchange Rates */}
          <Grid item xs={12} md={6}>
            {country.countryInfo?.exchangeRates && (
              <>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CurrencyIcon sx={{ mr: 1 }} />
                  <strong>{t('exchange_rates')}</strong> 
                </Typography>               
                <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                   {/* SAR Conversion */}
                  <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1 }}>
                    1,000 SAR = {(1000 * (country.countryInfo.exchangeRates.sarToLocal || 0)).toLocaleString()} {country.countryInfo.currency}
                  </Typography>  
                   {/* USD Conversion */}
                  <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1 }}>
                    100 USD = {(100 * (country.countryInfo.exchangeRates.usdToLocal || 0)).toLocaleString()} {country.countryInfo.currency}
                  </Typography>                 
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Cities Section */}
      <Typography variant="h4" component="h2" gutterBottom>
        {t('cities')} ({cities.length})
      </Typography>

      {cities.length > 0 ? (
        <Grid container spacing={3}>
          {cities.map((city) => (
            <Grid item xs={12} sm={6} md={4} key={city.id}>
              <CityCard
                city={city}
                onClick={() => handleCityClick(city.id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {t('no_data')}
          </Typography>
        </Box>
      )}

      {/* Telecom Providers Section */}
      {country.countryInfo?.telecomProviders && country.countryInfo.telecomProviders.length > 0 && (
        <>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
            <TelecomIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            {t('telecom_providers')}
          </Typography>
          
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Grid container spacing={3}>
                {country.countryInfo.telecomProviders.map((provider, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                      <Typography variant="h6" gutterBottom>
                        {provider.name}
                      </Typography>
                      {provider.website && (
                        <Link
                          href={provider.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: 'inline-block',
                            mt: 1,
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ mt: 1 }}
                          >
                            Visit Website
                          </Button>
                        </Link>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
};

export default CountryDetail; 