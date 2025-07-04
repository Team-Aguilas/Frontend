import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import EditProductForm from '../components/EditProductForm';
import { Box, Typography, CircularProgress } from '@mui/material';

function EditProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const data = await getProductById(productId);
          setProduct(data);
        } catch (err) {
          setError('No se pudo cargar la información del producto para editar.');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center">{error}</Typography>;
  if (!product) return <Typography align="center">Producto no encontrado.</Typography>;

  return (
    <Box sx={{ maxWidth: '600px', margin: '40px auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Editar Producto
      </Typography>
      {/* Pasamos los datos del producto al formulario */}
      <EditProductForm productData={product} />
    </Box>
  );
}

export default EditProductPage;