import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, MapPinIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { getAttractionById } from '../services/apiService';
import Card from '../components/Card';

const AttractionDetail = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { attractionId } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttraction = async () => {
      setLoading(true);
      try {
        const data = await getAttractionById(attractionId, i18n.language);
        setAttraction(data);
      } catch (e) {
        setAttraction(null);
      } finally {
        setLoading(false);
      }
    };
    if (attractionId) fetchAttraction();
  }, [attractionId, i18n.language]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue"></div>
        <span className="ml-4 text-xl text-grey">{t('loading')}</span>
      </div>
    );
  }
  if (!attraction) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <h2 className="text-lg font-medium text-grey">{t('no_data')}</h2>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate('/attractions')}
          className="flex items-center px-4 py-2 text-darkpurple hover:text-blue hover:bg-lightgrey rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          {t('back')}
        </button>
        {attraction.city && (
          <button
            onClick={() => navigate(`/cities/${attraction.cityId}`)}
            className="flex items-center px-6 py-3 bg-blue text-white hover:bg-darkblue rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <MapPinIcon className="h-5 w-5 mr-2" />
            {t('view_details')} - {attraction.city}
            <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
          </button>
        )}
      </div>
      <Card className="cursor-pointer h-full relative overflow-hidden group-hover:scale-105 transition-all duration-500 border-0 shadow-xl hover:shadow-2xl">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="relative p-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg mr-3">
              <MapPinIcon className="h-6 w-6 text-purple" />
            </div>
            <h1 className="text-4xl font-bold text-darkpurple mb-4">{attraction.name}</h1>
          </div>
          <div className="space-y-3 mb-4">
            <p className="text-sm text-grey">
              <span className="font-medium">{t('type')}:</span> {attraction.type || 'N/A'}
            </p>
            <p className="text-sm text-grey">
              <span className="font-medium">{t('country')}:</span> {attraction.country || 'N/A'}
            </p>
            <div className="flex items-center text-sm text-grey group-hover:text-darkpurple transition-colors duration-300">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-2 transform group-hover:scale-110 transition-transform duration-300">
                <MapPinIcon className="h-4 w-4 text-purple" />
              </div>
              {attraction.city && (
                <button
                  onClick={() => navigate(`/cities/${attraction.cityId}`)}
                  className="underline cursor-pointer text-blue hover:text-darkblue"
                >
                  {attraction.city}
                </button>
              )}
            </div>
            <div className="text-sm text-grey">
              <span className="font-medium">{t('description')}:</span> {attraction.description || t('no_data')}
              {attraction.descriptionAr && (
                <>
                  <div className="border-b border-lightborder my-2"></div>
                  <span className="block text-right" dir="rtl">{attraction.descriptionAr}</span>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Animated border */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </Card>
    </div>
  );
};

export default AttractionDetail;
