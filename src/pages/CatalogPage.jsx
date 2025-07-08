import React, { useState, useEffect, useCallback } from 'react';
import ProductList from '../components/ProductList';
import { getAllProducts } from '../services/productService';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Paper, Typography, Stack } from '@mui/material';

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = {
        search: searchTerm || undefined,
        category: category || undefined,
        sort_by: sortBy || undefined,
      };
      const data = await getAllProducts(filters);
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, category, sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Nuestro Catálogo
      </Typography>
      
      {/* --- Panel de Búsqueda y Filtros usando Stack --- */}
      <Paper sx={{ p: 2, mb: 4, borderRadius: 2 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }} // Columna en móviles, Fila en escritorio
          spacing={2}
          alignItems="center"
        >
          {/* La barra de búsqueda crece para ocupar el espacio sobrante */}
          <TextField
            label="Buscar productos..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: '100%', flexGrow: 1 }}
          />
          
          {/* Selectores con un ancho definido para evitar que se aplasten */}
          <FormControl size="small" sx={{ width: { xs: '100%', md: 200 }, minWidth: 180 }}>
            <InputLabel>Categoría</InputLabel>
            <Select value={category} label="Categoría" onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value=""><em>Todas</em></MenuItem>
              <MenuItem value="Frutas">Frutas</MenuItem>
              <MenuItem value="Verduras">Verduras</MenuItem>
              <MenuItem value="Tubérculos">Tubérculos</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ width: { xs: '100%', md: 220 }, minWidth: 180 }}>
            <InputLabel>Ordenar por</InputLabel>
            <Select value={sortBy} label="Ordenar por" onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value=""><em>Relevancia</em></MenuItem>
              <MenuItem value="price_asc">Precio: Menor a Mayor</MenuItem>
              <MenuItem value="price_desc">Precio: Mayor a Menor</MenuItem>
            </Select>
          </FormControl>

        </Stack>
      </Paper>
      
      <ProductList products={products} loading={loading} error={error} />
    </Box>
  );
}

export default CatalogPage;