import axios, { AxiosInstance, AxiosRequestHeaders  } from "axios";

const httpClient: AxiosInstance = axios.create({
  timeout: 10000,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json"
  } as AxiosRequestHeaders, // 🔹 Esto fuerza el tipo correcto
});

// Interceptor request
httpClient.interceptors.request.use(config => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    } as AxiosRequestHeaders; // 🔹 type assertion aquí también
  }
  return config;
});

// Interceptor response
httpClient.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) console.warn("No autorizado, redirigir login");
    return Promise.reject(err);
  }
);

export default httpClient;
