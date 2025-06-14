// // src/services/userService.js
// import {apiClient} from './productService';


// export const registerUser = async ({ email, full_name, password }) => {
//   try {
//     const payload = { email, full_name, password };
//     const res = await apiClient.post('/users', payload);
//     return res.data;
//   } catch (error) {
//     console.error('Error registrando usuario:', error.response?.data || error.message);
//     throw error.response?.data || new Error('Failed to register user');
//   }
// };

// src/services/userService.js
import { apiClient } from './productService'; // Ahora sí existe apiClient exportado

export const registerUser = async ({ email, full_name, password }) => {
  try {
    const payload = { email, full_name, password };
    const res = await apiClient.post('/users', payload);
    return res.data;
  } catch (error) {
    console.error('Error registrando usuario:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to register user');
  }
};