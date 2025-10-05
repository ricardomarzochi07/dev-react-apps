import i18n from './i18n';
import { LANG_KEY, AppLanguage } from './constants';

export function setLanguage(lang: AppLanguage) {
  i18n.changeLanguage(lang);
  localStorage.setItem(LANG_KEY, lang);
}

export function getLanguage(): AppLanguage {
  return (localStorage.getItem(LANG_KEY) || 'en') as AppLanguage;
}
