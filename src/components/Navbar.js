import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  IconButton
} from '@mui/material';
import { 
  Home as HomeIcon,
  Public as CountriesIcon,
  LocationCity as CitiesIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        {/* Logo/Brand */}
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          🧭 Travel Blueprint
        </Typography>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              fontWeight: isActive('/') ? 'bold' : 'normal',
              textDecoration: isActive('/') ? 'underline' : 'none'
            }}
          >
            {t('home')}
          </Button>

          <Button
            color="inherit"
            startIcon={<CountriesIcon />}
            onClick={() => navigate('/countries')}
            sx={{
              fontWeight: isActive('/countries') ? 'bold' : 'normal',
              textDecoration: isActive('/countries') ? 'underline' : 'none'
            }}
          >
            {t('countries')}
          </Button>

          <Button
            color="inherit"
            startIcon={<CitiesIcon />}
            onClick={() => navigate('/cities')}
            sx={{
              fontWeight: isActive('/cities') ? 'bold' : 'normal',
              textDecoration: isActive('/cities') ? 'underline' : 'none'
            }}
          >
            {t('cities')}
          </Button>

          {/* Language Switcher */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <LanguageIcon sx={{ mr: 1, color: 'inherit' }} />
            <FormControl size="small">
              <Select
                value={i18n.language}
                onChange={handleLanguageChange}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '& .MuiSelect-icon': {
                    color: 'white',
                  },
                }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ar">العربية</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 