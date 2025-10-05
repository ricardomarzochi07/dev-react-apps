// index.ts

// Axios instance
import httpClient from "./http/httpClient";
export { httpClient };

// Tipos base
export * from "./schemas/HttpResponseSchema";

// Utils y helpers
export * from "./utils/handleApiResponse";

// Core
export * from "./core/safeRequest";

// Hooks (si usas React)
export * from "./hooks/useApi";


// ==============================
// Funciones "crudas" (Axios puras)
// ==============================
import { AxiosResponse } from "axios";

export const apiGet = <T>(url: string): Promise<AxiosResponse<T>> =>
  httpClient.get<T>(url);

export const apiPost = <T>(url: string, data: unknown): Promise<AxiosResponse<T>> =>
  httpClient.post<T>(url, data);

export const apiPut = <T>(url: string, data: unknown): Promise<AxiosResponse<T>> =>
  httpClient.put<T>(url, data);

export const apiDelete = <T>(url: string): Promise<AxiosResponse<T>> =>
  httpClient.delete<T>(url);

// ==============================
// Funciones seguras (con parseo)
// ==============================
import { safeRequest } from "./core/safeRequest";
import { HttpResponseSchema } from "./schemas/HttpResponseSchema";
import { ValidatedResponse } from "./utils/handleApiResponse";

/**
 * safeApiGet
 * Wrapper para llamadas GET con validación por código HTTP
 */
export const safeApiGet = <T>(url: string): Promise<ValidatedResponse<T>> =>
  safeRequest(() => httpClient.get<HttpResponseSchema<T>>(url).then(res => res.data));

/**
 * safeApiPost
 */
export const safeApiPost = <T>(
  url: string,
  data: unknown
): Promise<ValidatedResponse<T>> =>
  safeRequest(() => httpClient.post<HttpResponseSchema<T>>(url, data).then(res => res.data));

/**
 * safeApiPut
 */
export const safeApiPut = <T>(
  url: string,
  data: unknown
): Promise<ValidatedResponse<T>> =>
  safeRequest(() => httpClient.put<HttpResponseSchema<T>>(url, data).then(res => res.data));

/**
 * safeApiDelete
 */
export const safeApiDelete = <T>(url: string): Promise<ValidatedResponse<T>> =>
  safeRequest(() => httpClient.delete<HttpResponseSchema<T>>(url).then(res => res.data));
