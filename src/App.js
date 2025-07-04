import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Countries from './pages/Countries';
import Cities from './pages/Cities';
import CityDetail from './pages/CityDetail';
import CountryDetail from './pages/CountryDetail';
import Services from './pages/Services';
import Attractions from './pages/Attractions';
import AttractionDetail from './pages/AttractionDetail';

// Import i18n
import './i18n';

function App() {
  const { i18n } = useTranslation();

  // Update document direction when language changes
  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:countryId" element={<CountryDetail />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/cities/:cityId" element={<CityDetail />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/attractions/:attractionId" element={<AttractionDetail />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 