// frontend/src/components/ProductList.jsx (VERSIÓN SIMPLIFICADA)

import React from 'react';
import ProductCard from './ProductCard';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';

// Este componente ahora recibe todo como props, es más predecible.
function ProductList({ products, loading, error }) {

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center" sx={{ mt: 5 }}>Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        🍓 Nuestros Productos Frescos 🥕
      </Typography>
      
      {products.length === 0 ? (
        <Typography align="center" sx={{ mt: 3 }}>
          No hay productos disponibles en este momento. ¡Intenta añadir uno si has iniciado sesión!
        </Typography>
      ) : (
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {products.map(product => (
            <Grid key={product.id || product._id} xs={12} sm={6} md={6} lg={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ProductList;