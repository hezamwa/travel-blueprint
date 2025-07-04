import React, { useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

const navigation = [
  { name: 'home', href: '/' },
  { name: 'countries', href: '/countries' },
  { name: 'cities', href: '/cities' },
  { name: 'attractions', href: '/attractions' },
  { name: 'services', href: '/services' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // The debounce function receives our function as a parameter
    const debounce = (fn) => {
      // This holds the requestAnimationFrame reference, so we can cancel it if we wish
      let frame;
      // The debounce function returns a new function that can receive a variable number of arguments
      return (...params) => {
        // If the frame variable has been defined, clear it now, and queue for next frame
        if (frame) {
          cancelAnimationFrame(frame);
        }
        // Queue our function call for the next frame
        frame = requestAnimationFrame(() => {
          // Call our function and pass any params we received
          fn(...params);
        });
      };
    };

    // Reads out the scroll position and stores it in the data attribute
    // so we can use it in our stylesheets
    const storeScroll = () => {
      document.documentElement.dataset.scroll = window.scrollY.toString();
    };

    // Listen for new scroll events, here we debounce our `storeScroll` function
    document.addEventListener('scroll', debounce(storeScroll), { passive: true });

    // Update scroll position for first time
    storeScroll();
  }, []);

  return (
    <Disclosure as="nav" className="navbar">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl p-3 md:p-4 lg:px-8">
            <div className="relative flex h-12 sm:h-20 items-center">
              <div className="flex flex-1 items-center sm:justify-between">
                {/* LOGO */}
                <div className="flex flex-shrink-0 items-center border-right">
                  <Link 
                    to="/" 
                    className="text-2xl sm:text-4xl font-semibold text-black hover:text-blue transition-colors"
                  >
                    {t('Travel Blueprint')}
                  </Link>
                </div>

                {/* LINKS */}
                <div className="hidden lg:flex items-center border-right">
                  <div className="flex justify-end space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? 'text-blue border-b-2 border-blue'
                            : 'navlinks hover:text-black',
                          'px-3 py-4 rounded-md text-lg font-normal transition-colors'
                        )}
                      >
                        {t(item.name)}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Language Toggle */}
                <div className="hidden lg:flex">
                  <LanguageToggle />
                </div>
              </div>

              {/* DRAWER FOR MOBILE VIEW */}
              <div className="block lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-lightgrey hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 bg-white shadow-lg">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? 'bg-blue text-white'
                      : 'text-black hover:bg-lightgrey hover:text-black',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {t(item.name)}
                </Link>
              ))}
              <div className="px-3 py-2">
                <LanguageToggle />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar; 