import axios from 'axios';

// Función para crear una instancia de Axios con interceptor
export const createApiClient = (baseURL) => {
  const client = axios.create({
    baseURL: baseURL,
  });

  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
};