// frontend/src/services/orderService.js
import { createApiClient } from './api';
import { PRODUCTS_API_URL } from '../config';

const orderApiClient = createApiClient(PRODUCTS_API_URL);

export const createOrder = async (items) => {
  try {
    const orderData = {
      items: items.map(item => ({
        product_id: item.product.id || item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        product_name: item.product.name
      }))
    };
    
    console.log('📦 Enviando pedido:', orderData);
    console.log('🔗 URL completa:', `${PRODUCTS_API_URL}/orders/create`);
    
    const response = await orderApiClient.post('/orders/create', orderData);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating order:', error.response?.data || error.message);
    console.error('❌ Status:', error.response?.status);
    console.error('❌ Full response:', error.response);
    throw error.response?.data || new Error('Failed to create order');
  }
};

export const getUserOrders = async () => {
  try {
    const response = await orderApiClient.get('/orders/my-orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to fetch orders');
  }
};
