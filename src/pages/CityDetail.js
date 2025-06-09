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
  Divider
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  LocationCity as CityIcon,
  WbSunny as WeatherIcon,
  Flight as AirportIcon,
  Place as AttractionIcon,
  Public as CountryIcon,
  OpenInNew as LinkIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { getCityById, getAttractionsByCity } from '../services/firestoreService';

const AttractionCard = ({ attraction }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AttractionIcon sx={{ mr: 1, color: 'secondary.main' }} />
          <Typography variant="h6" component="h3">
            {attraction.name}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip 
            label={attraction.type}
            size="small"
            color="secondary"
            variant="outlined"
          />
          {attraction.typeAr && attraction.typeAr !== attraction.type && (
            <Chip 
              label={attraction.typeAr}
              size="small"
              color="secondary"
              variant="filled"
            />
          )}
        </Box>
        
        {/* English Description */}
        {attraction.description && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary', display: 'flex', alignItems: 'center', mb: 0.5 }}>
              🇬🇧 English
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              {attraction.description}
            </Typography>
          </Box>
        )}
        
        {/* Divider if both descriptions exist */}
        {attraction.description && attraction.descriptionAr && (
          <Divider sx={{ my: 1 }} />
        )}
        
        {/* Arabic Description */}
        {attraction.descriptionAr && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary', display: 'flex', alignItems: 'center', mb: 0.5 }}>
              🇸🇦 العربية
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                fontStyle: 'italic',
                direction: 'rtl',
                textAlign: 'right'
              }}
            >
              {attraction.descriptionAr}
            </Typography>
          </Box>
        )}
        
        {/* Show "No description" if neither exists */}
        {!attraction.description && !attraction.descriptionAr && (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {t('no_data')}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const CityDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cityId } = useParams();
  const [city, setCity] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setLoading(true);
        const [cityData, attractionsData] = await Promise.all([
          getCityById(cityId),
          getAttractionsByCity(cityId)
        ]);
        
        setCity(cityData);
        setAttractions(attractionsData);
      } catch (error) {
        console.error('Error fetching city data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (cityId) {
      fetchCityData();
    }
  }, [cityId]);

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

  if (!city) {
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/cities')}
        >
          {t('back')}
        </Button>
        
        {/* Country Link Button */}
        {city.country && (
          <Button
            variant="outlined"
            startIcon={<CountryIcon />}
            endIcon={<LinkIcon />}
            onClick={() => navigate(`/countries/${city.country}`)}
            sx={{ ml: 2 }}
          >
            {t('view_details')} - {city.country.charAt(0).toUpperCase() + city.country.slice(1)}
          </Button>
        )}
      </Box>

      {/* City Header */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CityIcon sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h3" component="h1">
              {city.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center' }}>
              <Chip 
                label={t(city.continent)}
                color="primary"
              />
              {/* Country Chip */}
              {city.country && (
                <Chip
                  icon={<CountryIcon />}
                  label={city.country.charAt(0).toUpperCase() + city.country.slice(1)}
                  color="secondary"
                  variant="outlined"
                  clickable
                  onClick={() => navigate(`/countries/${city.country}`)}
                />
              )}
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {t('best_time')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {city.bestTime || t('no_data')}
            </Typography>

            <Typography variant="h6" gutterBottom>
              {t('top_attraction')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {city.topAttraction || t('no_data')}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WeatherIcon sx={{ mr: 1 }} />
              <Typography variant="body1">
                <strong>{t('avg_temp')}:</strong> {city.avgTemp || t('no_data')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AirportIcon sx={{ mr: 1 }} />
              <Typography variant="body1">
                <strong>{t('airport')}:</strong> {city.airportName || t('no_data')} ({city.airportCode || 'N/A'})
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Attractions Section */}
      <Typography variant="h4" component="h2" gutterBottom>
        {t('attractions')} ({attractions.length})
      </Typography>

      {attractions.length > 0 ? (
        <Grid container spacing={3}>
          {attractions.map((attraction) => (
            <Grid item xs={12} sm={6} md={4} key={attraction.id}>
              <AttractionCard attraction={attraction} />
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
    </Container>
  );
};

export default CityDetail; 