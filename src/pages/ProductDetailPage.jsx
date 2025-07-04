import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, deleteProduct } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { Grid, Box, Typography, Button, CircularProgress, Paper, Divider, Stack } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PRODUCTS_SERVER_URL } from '../config';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const data = await getProductById(productId);
          setProduct(data);
        } catch (err) {
          setError('No se pudo cargar el producto.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.")) {
      try {
        await deleteProduct(productId);
        alert("¡Producto eliminado con éxito!");
        navigate('/');
      } catch (err) {
        console.error(err);
        alert(err.detail || "Error al eliminar el producto.");
      }
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center" sx={{ mt: 5 }}>{error}</Typography>;
  if (!product) return <Typography align="center" sx={{ mt: 5 }}>Producto no encontrado.</Typography>;


  const whatsappNumber = product.whatsapp_number.replace(/\D/g, ''); // Elimina todo lo que no sea un dígito
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const imageUrl = product.image_url
    ? `${PRODUCTS_SERVER_URL}${product.image_url}`
    : `https://via.placeholder.com/600x600?text=${encodeURIComponent(product.name)}`;

  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, mt: 2, boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: 2 }}>
      <Grid container spacing={4}>

        {/* --- Columna de la Imagen (Izquierda) --- */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              minHeight: '400px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              p: 2,
            }}
          >
            <Box
              component="img"
              src={imageUrl}
              alt={product.name}
              sx={{
                maxWidth: '100%',
                maxHeight: '500px',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Grid>
        
        {/* --- Columna de los Detalles (Derecha) --- */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Categoría: {product.category}
              </Typography>
              
              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" paragraph color="text.secondary">
                {product.description}
              </Typography>

              <Typography variant="h5" sx={{ my: 2 }}>
                <strong>Stock disponible:</strong> {product.stock} unidades
              </Typography>

              <Typography variant="h3" color="primary.main" sx={{ my: 2, fontWeight: 'bold' }}>
                ${product.price ? product.price.toFixed(2) : 'N/A'}
              </Typography>
            </Box>

            <Box>
              <Button 
                variant="contained" 
                color="success" // El color verde de WhatsApp
                size="large" 
                startIcon={<WhatsAppIcon />} 
                sx={{ width: '100%', py: 1.5, mb: 2, textTransform: 'none', fontSize: '1.1rem' }}
                href={whatsappUrl}
                target="_blank" // Abre en una nueva pestaña
                rel="noopener noreferrer"
              >
                Contactar por WhatsApp
              </Button>

              {/* Acciones del Propietario */}
              {isLoggedIn && user && product.owner_id && (product.owner_id === (user.id || user._id)) && (
                <Box sx={{ border: '1px dashed', borderColor: 'grey.400', p: 2, borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>Acciones del Propietario:</Typography>
                  <Stack direction="row" spacing={1}>
                    <Button component={Link} to={`/products/edit/${product.id || product._id}`} variant="outlined" startIcon={<EditIcon />}>
                      Editar
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
                      Eliminar
                    </Button>
                  </Stack>
                </Box>
              )}
            </Box>
          </Stack>
        </Grid>

      </Grid>
    </Paper>
  );
}

export default ProductDetailPage;