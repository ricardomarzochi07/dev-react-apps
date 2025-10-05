"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const httpClient = axios_1.default.create({
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});
// 🔹 Interceptor único para headers comunes
httpClient.interceptors.request.use(config => {
    const userLang = localStorage.getItem('appLang') || navigator.language || 'en';
    const token = localStorage.getItem("auth_token");
    if (config.headers && typeof config.headers.set === 'function') {
        // Si headers es una instancia de AxiosHeaders
        config.headers.set('Accept-Language', userLang);
        if (token)
            config.headers.set('Authorization', `Bearer ${token}`);
    }
    else if (config.headers) {
        // Si headers es un objeto plano
        config.headers['Accept-Language'] = userLang;
        if (token)
            config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
// Interceptor response
httpClient.interceptors.response.use(res => res, err => {
    var _a;
    if (((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 401)
        console.warn("No autorizado, redirigir login");
    return Promise.reject(err);
});
exports.default = httpClient;
