import httpClient from "./http/httpClient";
export { httpClient };
export * from "./schemas/HttpResponseSchema";
export * from "./utils/handleApiResponse";
export * from "./core/safeRequest";
export * from "./hooks/useApi";
import { AxiosResponse } from "axios";
export declare const apiGet: <T>(url: string) => Promise<AxiosResponse<T>>;
export declare const apiPost: <T>(url: string, data: unknown) => Promise<AxiosResponse<T>>;
export declare const apiPut: <T>(url: string, data: unknown) => Promise<AxiosResponse<T>>;
export declare const apiDelete: <T>(url: string) => Promise<AxiosResponse<T>>;
import { ValidatedResponse } from "./utils/handleApiResponse";
/**
 * safeApiGet
 * Wrapper para llamadas GET con validación por código HTTP
 */
export declare const safeApiGet: <T>(url: string) => Promise<ValidatedResponse<T>>;
/**
 * safeApiPost
 */
export declare const safeApiPost: <T>(url: string, data: unknown) => Promise<ValidatedResponse<T>>;
/**
 * safeApiPut
 */
export declare const safeApiPut: <T>(url: string, data: unknown) => Promise<ValidatedResponse<T>>;
/**
 * safeApiDelete
 */
export declare const safeApiDelete: <T>(url: string) => Promise<ValidatedResponse<T>>;
