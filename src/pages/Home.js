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
  Paper
} from '@mui/material';
import {
  Public as CountriesIcon,
  LocationCity as CitiesIcon,
  Place as AttractionsIcon,
  ExploreOutlined as ExploreIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getMetadata } from '../services/firestoreService';

const StatCard = ({ icon, title, value, color = 'primary' }) => {
  return (
    <Card sx={{ height: '100%', textAlign: 'center' }}>
      <CardContent>
        <Box sx={{ color: `${color}.main`, mb: 2 }}>
          {icon}
        </Box>
        <Typography variant="h4" component="div" gutterBottom>
          {value || 0}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metadataData = await getMetadata();
        setMetadata(metadataData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <Container maxWidth="lg">
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 2,
          color: 'white',
          mb: 6,
          mt: 4
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          {t('welcome')}
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
          {t('subtitle')}
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<ExploreIcon />}
          onClick={() => navigate('/countries')}
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.3)',
            },
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          {t('explore')}
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<CountriesIcon sx={{ fontSize: 48 }} />}
            title={t('total_countries')}
            value={metadata?.totalCountries}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<CitiesIcon sx={{ fontSize: 48 }} />}
            title={t('total_cities')}
            value={metadata?.totalCities}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<AttractionsIcon sx={{ fontSize: 48 }} />}
            title={t('total_attractions')}
            value={metadata?.totalAttractions}
            color="success"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 