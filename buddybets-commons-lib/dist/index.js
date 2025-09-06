"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiDelete = exports.apiPut = exports.apiPost = exports.apiGet = exports.httpClient = void 0;
const httpClient_1 = __importDefault(require("./httpClient"));
exports.httpClient = httpClient_1.default;
/*
export const apiGet = <T>(url: string) => httpClient.get<T>(url).then(res => res.data);

export const apiPost = <T>(url: string, data: unknown) => httpClient.post<T>(url, data).then(res => res.data);
export const apiPut = <T>(url: string, data: unknown) => httpClient.put<T>(url, data).then(res => res.data);
export const apiDelete = <T>(url: string) => httpClient.delete<T>(url).then(res => res.data);
*/
const apiGet = (url) => httpClient_1.default.get(url);
exports.apiGet = apiGet;
const apiPost = (url, data) => httpClient_1.default.post(url, data);
exports.apiPost = apiPost;
const apiPut = (url, data) => httpClient_1.default.put(url, data);
exports.apiPut = apiPut;
const apiDelete = (url) => httpClient_1.default.delete(url);
exports.apiDelete = apiDelete;
