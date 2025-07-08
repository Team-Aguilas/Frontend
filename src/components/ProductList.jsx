// frontend/src/components/ProductList.jsx (VERSIÓN SIMPLIFICADA)

import React from 'react';
import ProductCard from './ProductCard';
import { Typography, CircularProgress, Box } from '@mui/material';

// Este componente ahora recibe todo como props, es más predecible.
function ProductList({ products, loading, error }) {

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center" sx={{ mt: 5 }}>Error: {error}</Typography>;

  return (
    
    <Box>
      {products.length === 0 ? (
        <Typography align="center" sx={{ mt: 3 }}>
          No hay productos disponibles en este momento. ¡Intenta añadir uno si has iniciado sesión!
        </Typography>
      ) : (
        <Box sx={{
          display: 'grid',
          // Esto crea columnas responsivas. Cada una tendrá un mínimo de 340px
          // y se ajustarán automáticamente para llenar el contenedor.
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 3, // Espacio entre las tarjetas
          mt: 2,
        }}>
          {products.map(product => (
            // La tarjeta se renderiza directamente aquí, sin un <Grid item> que la envuelva.
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ProductList;