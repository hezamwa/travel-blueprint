import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, MapPinIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl my-10 sm:py-10 px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 my-16">
        {/* COLUMN-1 */}
        <div className="mx-auto sm:mx-0">
          <div className="py-3 text-center lg:text-start">
            <button className="text-blue bg-lightblue hover:shadow-xl text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider hover:text-white hover:bg-black transition-all duration-300">
              {t('TRAVEL BLUEPRINT')}
            </button>
          </div>
          
          <div className="py-3 text-center lg:text-start">
            <h1 className="text-6xl lg:text-80xl font-bold text-darkpurple leading-tight">
              {t('Discover')} <br />
              {t('Amazing')} <br />
              {t('Destinations')}
            </h1>
          </div>
          
          <div className="my-7 text-center lg:text-start">
            <p className="text-lg text-grey mb-8 max-w-lg">
              {t('Explore the world\'s most beautiful places and create unforgettable memories with our comprehensive travel guide.')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 text-center lg:text-start">
            <Link 
              to="/countries"
              className="inline-flex items-center justify-center text-sm md:text-xl font-semibold hover:shadow-xl bg-blue text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue transition-all duration-300 group"
            >
              <MapPinIcon className="h-5 w-5 mr-2" />
              {t('Explore Countries')}
              <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/cities"
              className="inline-flex items-center justify-center text-sm md:text-xl font-semibold hover:shadow-xl border-2 border-blue text-blue py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-blue hover:text-white transition-all duration-300 group"
            >
              <GlobeAltIcon className="h-5 w-5 mr-2" />
              {t('Browse Cities')}
              <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* COLUMN-2 */}
        {
        <div className="lg:-m-6 lg:mt-6 hidden lg:block" id="hero-image">
          <div className="relative">
            <img 
              src="/images/banner/stockvault-flight-map-illustration-small.png" 
              alt="Travel illustration" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue/10 to-transparent rounded-2xl"></div>
          </div>
        </div>}
      </div>     
    </div>
  );
};

export default Hero; 