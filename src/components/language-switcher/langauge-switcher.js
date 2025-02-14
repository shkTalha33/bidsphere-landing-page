'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLang } from '../redux/loginForm';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.auth.lang) || languages[0]; // Default to first language
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (selectedLang) => {
    setIsOpen(false);
    dispatch(setLang(selectedLang));
    i18n.changeLanguage(selectedLang.code);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50"
      >
        <span className='text-sm'>{lang.flag}</span>
        <span className="poppins_regular text-xs md:text-sm">{lang.name}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute mt-1 z-50 w-full bg-white border rounded-md shadow-lg">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`flex items-center  text-sm gap-2 w-full p-2 hover:bg-gray-100 transition ${lang.code === language.code ? 'bg-gray-200 poppins_medium' : ''
                }`}
            >
              <span className='text-sm' >{language.flag}</span>
              <span className="poppins_regular text-xs md:text-sm">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
