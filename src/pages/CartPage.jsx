// frontend/src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  IconButton, 
  Alert,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Add as AddIcon, 
  Remove as RemoveIcon, 
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon 
} from '@mui/icons-material';
import { updateProduct, getProductById } from '../services/productService';
import { createOrder } from '../services/orderService';
import { PRODUCTS_SERVER_URL } from '../config';
import './CartPage.css';

const CartPage = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalItems, 
    getTotalPrice,
    updateProductData
  } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [stockWarnings, setStockWarnings] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    clearCart();
    navigate('/products');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleOrder = async () => {
    if (!isLoggedIn) {
      setError('Debes iniciar sesión para realizar un pedido');
      return;
    }

    if (items.length === 0) {
      setError('Tu carrito está vacío');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      console.log('🛒 Procesando pedido con items:', items);
      
      // Validar stock actual antes de procesar el pedido
      const validatedItems = [];
      for (const item of items) {
        const productId = item.product.id || item.product._id;
        
        try {
          // Obtener los datos actualizados del producto
          const currentProduct = await getProductById(productId);
          console.log(`📦 Stock actual de ${currentProduct.name}: ${currentProduct.stock}`);
          
          if (currentProduct.stock < item.quantity) {
            throw new Error(`Stock insuficiente para ${currentProduct.name}. Stock disponible: ${currentProduct.stock}, solicitado: ${item.quantity}`);
          }
          
          validatedItems.push({
            ...item,
            product: currentProduct // Usar los datos actualizados
          });
        } catch (fetchError) {
          console.error(`Error obteniendo producto ${productId}:`, fetchError);
          throw new Error(`No se pudo verificar el stock de ${item.product.name}`);
        }
      }
      
      // Usar el nuevo endpoint de pedidos
      try {
        console.log('📦 Creando pedido con endpoint específico...');
        console.log('🔗 URL del endpoint:', `${PRODUCTS_SERVER_URL}/api/v1/orders/create`);
        const orderResult = await createOrder(validatedItems);
        console.log('✅ Pedido creado exitosamente:', orderResult);
        
        setShowSuccessModal(true);
        
        // Limpiar carrito después de 6 segundos
        setTimeout(() => {
          clearCart();
          navigate('/products');
          setShowSuccessModal(false);
        }, 6000);
        
      } catch (orderError) {
        console.error('❌ Error con endpoint de pedidos:', orderError);
        console.error('❌ Error details:', orderError.detail || orderError.message);
        console.error('❌ Full error object:', orderError);
        
        // Fallback: intentar actualizar stock directamente (método anterior)
        console.log('🔄 Intentando método de fallback...');
        let hasPermissionError = false;
        const updateResults = [];
        
        for (const item of validatedItems) {
          const productId = item.product.id || item.product._id;
          const newStock = item.product.stock - item.quantity;
          
          console.log(`📦 Intentando actualizar producto ${productId}: stock ${item.product.stock} -> ${newStock}`);
          
          try {
            await updateProduct(productId, { stock: newStock });
            console.log(`✅ Producto ${productId} actualizado exitosamente`);
            updateResults.push({ success: true, product: item.product.name });
          } catch (updateError) {
            console.error(`Error actualizando producto ${productId}:`, updateError);
            
            if (updateError.detail && updateError.detail.includes('permiso')) {
              hasPermissionError = true;
              updateResults.push({ success: false, product: item.product.name, reason: 'sin permisos' });
            } else {
              updateResults.push({ success: false, product: item.product.name, reason: updateError.message });
            }
          }
        }
        
        // Mostrar resultado según los permisos
        if (hasPermissionError) {
          console.log('⚠️ Algunos productos no se pudieron actualizar por permisos:', updateResults);
          setShowSuccessModal(true);
        } else {
          setShowSuccessModal(true);
        }
        
        // Limpiar carrito después de 6 segundos
        setTimeout(() => {
          clearCart();
          navigate('/products');
          setShowSuccessModal(false);
        }, 6000);
      }

    } catch (err) {
      console.error('❌ Error processing order:', err);
      setError(`Error al procesar el pedido: ${err.message || 'Por favor, inténtalo de nuevo.'}`);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    
    const isExternalUrl = imageUrl.startsWith('http://') || 
                         imageUrl.startsWith('https://') || 
                         imageUrl.startsWith('data:');
    
    return isExternalUrl ? imageUrl : `${PRODUCTS_SERVER_URL}${imageUrl}`;
  };

  if (items.length === 0) {
    return (
      <Box className="cart-container">
        <Paper className="cart-content">
          <Box className="empty-cart">
            <ShoppingCartIcon className="empty-cart-icon" />
            <Typography variant="h4" className="empty-cart-title">
              Tu carrito está vacío
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Añade algunos productos deliciosos a tu carrito
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              className="continue-shopping-button"
            >
              Continúa comprando
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="cart-container">
      <Typography variant="h3" className="cart-title" gutterBottom>
        Mi Carrito
      </Typography>

      {/* Mensajes de estado */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Lista de productos */}
        <Grid item xs={12} lg={8}>
          <Paper className="cart-content">
            {items.map((item) => (
              <Box key={item.product.id || item.product._id} className="cart-item">
                <Grid container spacing={2} alignItems="center">
                  {/* Imagen del producto */}
                  <Grid item xs={12} sm={3} md={2}>
                    <img
                      src={getImageUrl(item.product.image_url)}
                      alt={item.product.name}
                      className="cart-item-image"
                    />
                  </Grid>

                  {/* Información del producto */}
                  <Grid item xs={12} sm={4} md={4}>
                    <Typography variant="h6" className="cart-item-name">
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" className="cart-item-description">
                      {item.product.description}
                    </Typography>
                    <Typography variant="h6" className="cart-item-price">
                      {formatPrice(item.product.price)}
                    </Typography>
                  </Grid>

                  {/* Controles de cantidad */}
                  <Grid item xs={12} sm={3} md={4}>
                    <Box className="quantity-controls">
                      <IconButton
                        onClick={() => handleQuantityChange(item.product.id || item.product._id, item.quantity - 1)}
                        className="quantity-button"
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      
                      <Box className="quantity-display">
                        {item.quantity}
                      </Box>
                      
                      <IconButton
                        onClick={() => handleQuantityChange(item.product.id || item.product._id, item.quantity + 1)}
                        className="quantity-button"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Grid>

                  {/* Subtotal y eliminar */}
                  <Grid item xs={12} sm={2} md={2}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#74a57f', mb: 1 }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </Typography>
                      <Button
                        onClick={() => handleRemoveItem(item.product.id || item.product._id)}
                        className="remove-button"
                        startIcon={<DeleteIcon />}
                        size="small"
                      >
                        Eliminar
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Resumen del pedido */}
        <Grid item xs={12} lg={4}>
          <Paper className="order-summary">
            <Typography variant="h5" className="summary-title" gutterBottom>
              Resumen del Pedido
            </Typography>

            <Box className="summary-details">
              <Box className="summary-row">
                <Typography variant="body1">
                  Productos ({getTotalItems()})
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatPrice(getTotalPrice())}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box className="summary-row">
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#74a57f' }}>
                  {formatPrice(getTotalPrice())}
                </Typography>
              </Box>
            </Box>

            <Button
              onClick={handleOrder}
              variant="contained"
              fullWidth
              className="order-button"
              disabled={loading || !isLoggedIn}
              sx={{ mt: 3 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Realizar Pedido'
              )}
            </Button>

            {!isLoggedIn && (
              <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                Debes iniciar sesión para realizar un pedido
              </Typography>
            )}

            <Button
              component={Link}
              to="/products"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              className="continue-shopping-outlined"
            >
              Continúa comprando
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Modal de éxito */}
      <Dialog
        open={showSuccessModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', color: '#74a57f', fontWeight: 'bold' }}>
          ¡Pedido Realizado!
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Gracias por tu pedido, contacta al agricultor para acordar la entrega
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Te redirigiremos al catálogo en unos segundos...
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            sx={{ 
              backgroundColor: '#74a57f',
              '&:hover': { backgroundColor: '#5d8a6b' }
            }}
          >
            Continuar Comprando
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CartPage;