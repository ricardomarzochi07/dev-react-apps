export const LANG_KEY = 'appLang';

export const SUPPORTED_LANGUAGES = ['en', 'es','pt','fr'] as const;
export type AppLanguage = typeof SUPPORTED_LANGUAGES[number];
