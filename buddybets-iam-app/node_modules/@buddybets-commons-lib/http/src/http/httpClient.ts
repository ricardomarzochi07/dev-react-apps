import axios, { AxiosInstance, AxiosRequestHeaders  } from "axios";

const httpClient: AxiosInstance = axios.create({
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
  } else if (config.headers) {
    // Si headers es un objeto plano
    config.headers['Accept-Language'] = userLang;
    if (token) 
      config.headers['Authorization'] = `Bearer ${token}`;
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
