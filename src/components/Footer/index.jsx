import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  EnvelopeIcon,
  PhoneIcon 
} from '@heroicons/react/24/outline';

// MIDDLE LINKS DATA
const footerSections = [
  {
    id: 1,
    section: "Explore",
    links: [
      { name: 'Countries', path: '/countries' },
      { name: 'Cities', path: '/cities' },
      { name: 'Popular Destinations', path: '/popular' },
      { name: 'Travel Tips', path: '/tips' }
    ],
  },
  {
    id: 2,
    section: "Categories",
    links: [
      { name: 'Adventure', path: '/adventure' },
      { name: 'Culture', path: '/culture' },
      { name: 'Nature', path: '/nature' },
      { name: 'Urban', path: '/urban' }
    ]
  },
  {
    id: 3,
    section: "Resources",
    links: [
      { name: 'Travel Guide', path: '/guide' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Support', path: '/support' },
      { name: 'Blog', path: '/blog' }
    ]
  }
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-black -mt-40" id="footer-section">
      <div className="mx-auto max-w-2xl pt-48 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">

          {/* COLUMN-1 - Brand */}
          <div className='col-span-4'>
            <h3 className='text-white text-4xl font-semibold leading-9 mb-4'> 
              {t('Travel Blueprint')}
            </h3>
            <p className='text-offwhite text-lg mb-8 max-w-sm'>
              {t('Discover the world\'s most amazing destinations and create unforgettable travel experiences.')}
            </p>
            
            {/* Contact Info */}
            <div className='space-y-4 mb-8'>
              <div className='flex items-center gap-3 text-offwhite'>
                <EnvelopeIcon className='h-5 w-5' />
                <span>info@travelblueprint.com</span>
              </div>
              <div className='flex items-center gap-3 text-offwhite'>
                <PhoneIcon className='h-5 w-5' />
                <span>+966533971797</span>
              </div>
            </div>

            {/* Social Links */}
            <div className='flex gap-4'>
              <div className='footer-icons'>
                <Link to="#" aria-label="Facebook">
                  <img src={'/images/footer/vec.svg'} alt="facebook" className="w-4 h-5" />
                </Link>
              </div>
              <div className='footer-icons'>
                <Link to="#" aria-label="Twitter">
                  <img src={'/images/footer/twitter.svg'} alt="twitter" className="w-5 h-5" />
                </Link>
              </div>
              <div className='footer-icons'>
                <Link to="#" aria-label="Instagram">
                  <img src={'/images/footer/instagram.svg'} alt="instagram" className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* COLUMNS 2/3/4 - Links */}
          {/*footerSections.map((section) => (
            <div key={section.id} className="group relative col-span-2">
              <p className="text-white text-xl font-extrabold mb-9">{t(section.section)}</p>
              <ul>
                {section.links.map((link, index) => (
                  <li key={index} className='mb-5'>
                    <Link 
                      to={link.path} 
                      className="text-white text-lg font-normal mb-6 space-links hover:text-blue transition-colors"
                    >
                      {t(link.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))*/}

        </div>
      </div>

      {/* All Rights Reserved */}
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="pt-5 pb-5 px-4 sm:px-6 lg:px-4 border-solid border-t border-footer">
          <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 xl:gap-x-8">
            <div>
              <h3 className='text-center md:text-start text-offwhite text-lg'>
                ©2024 - {t('All Rights Reserved by')} 
                <span className="text-blue ml-1">Travel Blueprint</span>
              </h3>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link to="/privacy">
                <h3 className="text-offwhite pr-6 hover:text-blue transition-colors">
                  {t('Privacy Policy')}
                </h3>
              </Link>
              <Link to="/terms">
                <h3 className="text-offwhite pl-6 border-solid border-l border-footer hover:text-blue transition-colors">
                  {t('Terms & Conditions')}
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer; 