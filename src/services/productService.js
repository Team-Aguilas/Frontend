// // frontend/src/services/productService.js
// import axios from 'axios';
// import { API_BASE_URL } from '../config'; // Asegúrate que '../config' es la ruta correcta a tu config.js

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // VVVVVV ESTA LÍNEA ES LA IMPORTANTE VVVVVV
// const getAllProducts = async () => {
//   try {
//     const response = await apiClient.get('/products');
//     const data = response.data;

//     // Añadimos siempre un campo `id` para usar como key
//     return data.map(p => ({
//       ...p,
//       id: p.id ?? (p._id?.$oid ?? p._id)
//     }));
//   } catch (error) {
//     console.error('Error fetching products:', error.response?.data || error.message);
//     throw error.response?.data || new Error('Failed to fetch products');
//   }
// };
// export default getAllProducts;
// src/services/productService.js
import axios from 'axios';
import { API_BASE_URL } from '../config'; // Ajusta la ruta si es necesario

// Creamos y exportamos apiClient para reusar en otros servicios
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener productos y normalizar el campo `id`
export const getAllProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    const data = response.data;

    return data.map(p => ({
      ...p,
      id: p.id ?? (p._id?.$oid ?? p._id)
    }));
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to fetch products');
  }
};

// // Al final de productService.js
export const createProduct = async (productData, token) => {
  const res = await apiClient.post('/products', productData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
