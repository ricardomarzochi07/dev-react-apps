"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLanguage = setLanguage;
exports.getLanguage = getLanguage;
const i18n_1 = __importDefault(require("./i18n"));
const constants_1 = require("./constants");
function setLanguage(lang) {
    i18n_1.default.changeLanguage(lang);
    localStorage.setItem(constants_1.LANG_KEY, lang);
}
function getLanguage() {
    return (localStorage.getItem(constants_1.LANG_KEY) || 'en');
}
