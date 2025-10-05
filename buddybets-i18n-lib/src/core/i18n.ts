import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LANG_KEY } from './constants';

import en from '../locales/en.json';
import es from '../locales/es.json';

const savedLang = localStorage.getItem(LANG_KEY) || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es }
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
