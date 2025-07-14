import { PRODUCTS_API_URL } from '../config';
import { createApiClient } from './api';

const productApiClient = createApiClient(PRODUCTS_API_URL);

export const getAllProducts = async (filters = {}) => {
  try {
    // Axios se encarga de construir la URL con los parámetros, ej: /products?search=manzana
    const response = await productApiClient.get('/products/', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to fetch products');
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await productApiClient.post('/products/', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to create product');
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await productApiClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to fetch product');
  }
};

export const deleteProduct = async (productId) => {
  try {
    // El interceptor en api.js añadirá el token de autorización automáticamente
    const response = await productApiClient.delete(`/products/${productId}`);
    return response.data; // Un DELETE exitoso usualmente devuelve 204 No Content
  } catch (error) {
    console.error('Error deleting product:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to delete product');
  }
};

export const uploadProductImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile); // "file" debe coincidir con el nombre del parámetro en FastAPI

  try {
    // El interceptor añadirá el token. El header 'Content-Type' se establece automáticamente
    // a 'multipart/form-data' por el navegador cuando se usa FormData.
    const response = await productApiClient.post('/products/upload-image', formData);
    return response.data; // Devuelve { "image_url": "/static/images/..." }
  } catch (error) {
    console.error('Error uploading image:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to upload image');
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await productApiClient.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to update product');
  }
};

// Funciones para el sistema de calificaciones
export const createProductRating = async (productId, ratingData) => {
  try {
    console.log('🔍 productService - createProductRating iniciado:', {
      productId,
      ratingData,
      url: `/products/${productId}/ratings`
    });

    const response = await productApiClient.post(`/products/${productId}/ratings`, ratingData);
    
    console.log('✅ productService - createProductRating exitoso:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ productService - Error creating rating:', {
      error: error.response?.data || error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      config: error.config,
      sentData: ratingData,
      url: `/products/${productId}/ratings`
    });
    
    // Si es un error 422, agregar más detalles
    if (error.response?.status === 422) {
      console.error('❌ Error 422 - Validation Error Details:', error.response.data);
    }
    
    throw error.response?.data || new Error('Failed to create rating');
  }
};

export const getProductRatings = async (productId) => {
  try {
    const response = await productApiClient.get(`/products/${productId}/ratings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ratings:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to fetch ratings');
  }
};

export const getMyRatingForProduct = async (productId) => {
  try {
    const response = await productApiClient.get(`/products/${productId}/ratings/me`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null; // Usuario no ha calificado este producto
    }
    console.error('Error fetching my rating:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to fetch my rating');
  }
};