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
    }, // 🔹 Esto fuerza el tipo correcto
});
// Interceptor request
httpClient.interceptors.request.use(config => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers = Object.assign(Object.assign({}, config.headers), { Authorization: `Bearer ${token}` }); // 🔹 type assertion aquí también
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
