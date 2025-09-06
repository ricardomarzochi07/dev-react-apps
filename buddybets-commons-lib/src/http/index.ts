import httpClient from "./httpClient";
import { AxiosResponse } from 'axios';
export { httpClient }; // Exportas la instancia

/*
export const apiGet = <T>(url: string) => httpClient.get<T>(url).then(res => res.data);

export const apiPost = <T>(url: string, data: unknown) => httpClient.post<T>(url, data).then(res => res.data);
export const apiPut = <T>(url: string, data: unknown) => httpClient.put<T>(url, data).then(res => res.data);
export const apiDelete = <T>(url: string) => httpClient.delete<T>(url).then(res => res.data);
*/

export const apiGet = <T>(url: string): Promise<AxiosResponse<T>> =>
  httpClient.get<T>(url);

export const apiPost = <T>(url: string, data: unknown): Promise<AxiosResponse<T>> =>
  httpClient.post<T>(url, data);

export const apiPut = <T>(url: string, data: unknown): Promise<AxiosResponse<T>> =>
  httpClient.put<T>(url, data);

export const apiDelete = <T>(url: string): Promise<AxiosResponse<T>> =>
  httpClient.delete<T>(url);