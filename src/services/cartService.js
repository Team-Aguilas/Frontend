// frontend/src/services/cartService.js
import { createApiClient } from './api';
import { PRODUCTS_API_URL } from '../config';

const cartApiClient = createApiClient(PRODUCTS_API_URL);

export const updateStockFromCart = async (items) => {
  try {
    const stockUpdates = items.map(item => ({
      product_id: item.product.id || item.product._id,
      new_stock: item.product.stock - item.quantity
    }));

    console.log('📦 Actualizando stock desde carrito:', stockUpdates);

    const response = await cartApiClient.post('/products/cart/update-stock', stockUpdates);
    return response.data;
  } catch (error) {
    console.error('Error updating stock from cart:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to update stock from cart');
  }
};
