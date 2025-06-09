import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Import components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Countries from './pages/Countries';
import Cities from './pages/Cities';
import CityDetail from './pages/CityDetail';
import CountryDetail from './pages/CountryDetail';

// Import i18n
import './i18n';

function App() {
  const { i18n } = useTranslation();

  // Create theme with RTL support
  const theme = createTheme({
    direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
    typography: {
      fontFamily: i18n.language === 'ar' 
        ? "'Noto Sans Arabic', 'Roboto', sans-serif"
        : "'Roboto', 'Noto Sans Arabic', sans-serif"
    },
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  // Update document direction when language changes
  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          minHeight: '100vh',
          bgcolor: 'background.default',
          direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
        }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:countryId" element={<CountryDetail />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/cities/:cityId" element={<CityDetail />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 