"use strict";
// index.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeApiDelete = exports.safeApiPut = exports.safeApiPost = exports.safeApiGet = exports.apiDelete = exports.apiPut = exports.apiPost = exports.apiGet = exports.httpClient = void 0;
// Axios instance
const httpClient_1 = __importDefault(require("./http/httpClient"));
exports.httpClient = httpClient_1.default;
// Tipos base
__exportStar(require("./schemas/HttpResponseSchema"), exports);
// Utils y helpers
__exportStar(require("./utils/handleApiResponse"), exports);
// Core
__exportStar(require("./core/safeRequest"), exports);
// Hooks (si usas React)
__exportStar(require("./hooks/useApi"), exports);
const apiGet = (url) => httpClient_1.default.get(url);
exports.apiGet = apiGet;
const apiPost = (url, data) => httpClient_1.default.post(url, data);
exports.apiPost = apiPost;
const apiPut = (url, data) => httpClient_1.default.put(url, data);
exports.apiPut = apiPut;
const apiDelete = (url) => httpClient_1.default.delete(url);
exports.apiDelete = apiDelete;
// ==============================
// Funciones seguras (con parseo)
// ==============================
const safeRequest_1 = require("./core/safeRequest");
/**
 * safeApiGet
 * Wrapper para llamadas GET con validación por código HTTP
 */
const safeApiGet = (url) => (0, safeRequest_1.safeRequest)(() => httpClient_1.default.get(url).then(res => res.data));
exports.safeApiGet = safeApiGet;
/**
 * safeApiPost
 */
const safeApiPost = (url, data) => (0, safeRequest_1.safeRequest)(() => httpClient_1.default.post(url, data).then(res => res.data));
exports.safeApiPost = safeApiPost;
/**
 * safeApiPut
 */
const safeApiPut = (url, data) => (0, safeRequest_1.safeRequest)(() => httpClient_1.default.put(url, data).then(res => res.data));
exports.safeApiPut = safeApiPut;
/**
 * safeApiDelete
 */
const safeApiDelete = (url) => (0, safeRequest_1.safeRequest)(() => httpClient_1.default.delete(url).then(res => res.data));
exports.safeApiDelete = safeApiDelete;
