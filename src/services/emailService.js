// frontend/src/services/emailService.js
import emailjs from '@emailjs/browser';

// Configuración de EmailJS
const EMAILJS_CONFIG = {
  serviceId: 'service_cnq2e3j',
  templateId: 'template_bqqfhtk',
  publicKey: '6qL45ME9lDNSepcpU'
};

// Inicializar EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

export const sendOrderEmail = async (orderData) => {
  try {
    console.log('📧 Enviando pedido por email...', orderData);
    
    // Preparar los datos para el template de EmailJS
    const templateParams = {
      to_email: 'tu-email@ejemplo.com', // Cambia por tu email de negocio
      customer_name: orderData.customerName || 'Cliente',
      customer_email: orderData.customerEmail || 'no-disponible@email.com',
      order_date: new Date().toLocaleDateString('es-CO'),
      order_time: new Date().toLocaleTimeString('es-CO'),
      order_items: orderData.items.map(item => 
        `${item.product.name} x${item.quantity} - ${formatPrice(item.product.price * item.quantity)}`
      ).join('\n'),
      total_amount: formatPrice(orderData.totalAmount),
      items_count: orderData.items.length,
      order_id: generateOrderId()
    };

    console.log('📧 Parámetros del template:', templateParams);

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log('✅ Email enviado exitosamente:', response);
    return {
      success: true,
      message: 'Pedido enviado por email exitosamente',
      emailResponse: response
    };

  } catch (error) {
    console.error('❌ Error enviando email:', error);
    throw {
      success: false,
      message: 'Error al enviar el email',
      error: error
    };
  }
};

// Función auxiliar para formatear precios
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price);
};

// Función auxiliar para generar ID de pedido
const generateOrderId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 5);
  return `ORD-${timestamp}-${randomStr}`.toUpperCase();
};
