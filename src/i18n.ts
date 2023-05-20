import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationRU from '../locales/translationRU.json';
import translationEN from '../locales/translationEN.json';
import translationCH from '../locales/translationCH.json';

const resources = {
  ru: {
    translation: translationRU,
  },
  en: {
    translation: translationEN,
  },
  ch: {
    translation: translationCH,
  },
};

const savedLanguage = sessionStorage.getItem('language');

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage || 'ru',
  fallbackLng: 'ru',
});

export { i18n };
