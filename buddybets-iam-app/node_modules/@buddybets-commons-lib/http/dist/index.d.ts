import httpClient from "./httpClient";
import { AxiosResponse } from 'axios';
export { httpClient };
export declare const apiGet: <T>(url: string) => Promise<AxiosResponse<T>>;
export declare const apiPost: <T>(url: string, data: unknown) => Promise<AxiosResponse<T>>;
export declare const apiPut: <T>(url: string, data: unknown) => Promise<AxiosResponse<T>>;
export declare const apiDelete: <T>(url: string) => Promise<AxiosResponse<T>>;
