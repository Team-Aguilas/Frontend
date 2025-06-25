// frontend/src/services/authService.js

import { USERS_API_URL } from '../config';
import { createApiClient } from './api';

const authApiClient = createApiClient(USERS_API_URL);

export const registerUser = async (userData) => {
  try {
    const response = await authApiClient.post('/users/', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to register user');
  }
};

export const loginUser = async (credentials) => {
  const formData = new FormData();
  formData.append('username', credentials.email);
  formData.append('password', credentials.password);

  try {
    const response = await authApiClient.post('/auth/login', formData);
    if (response.data.access_token) {
      localStorage.setItem('accessToken', response.data.access_token);
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to log in');
  }
};

// VVVVVV ASEGÚRATE DE QUE ESTA FUNCIÓN ESTÉ PRESENTE Y SEA EXPORTADA VVVVVV
export const getCurrentUser = async () => {
    try {
        // El interceptor en api.js añadirá el token de autorización automáticamente
        const response = await authApiClient.get('/auth/me');
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error.response?.data || error.message);
        throw error.response?.data || new Error('Failed to fetch current user');
    }
};
// ^^^^^^ ESTA ES LA FUNCIÓN QUE PROBABLEMENTE FALTA O NO ESTÁ EXPORTADA ^^^^^^

export const logoutUser = () => {
  localStorage.removeItem('accessToken');
};