import i18n from './i18n';
import { LANG_KEY } from './constants';
export function setLanguage(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem(LANG_KEY, lang);
}
export function getLanguage() {
    return (localStorage.getItem(LANG_KEY) || 'en');
}
