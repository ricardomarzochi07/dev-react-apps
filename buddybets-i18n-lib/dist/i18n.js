"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(require("i18next"));
const react_i18next_1 = require("react-i18next");
const constants_1 = require("./constants");
const en_json_1 = __importDefault(require("../locales/en.json"));
const es_json_1 = __importDefault(require("../locales/es.json"));
const savedLang = localStorage.getItem(constants_1.LANG_KEY) || 'en';
i18next_1.default
    .use(react_i18next_1.initReactI18next)
    .init({
    resources: {
        en: { translation: en_json_1.default },
        es: { translation: es_json_1.default }
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});
exports.default = i18next_1.default;
