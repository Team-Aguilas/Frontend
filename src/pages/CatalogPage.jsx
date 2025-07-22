import React, { useState, useEffect, useCallback } from 'react';
import ProductList from '../components/ProductList';
import { getAllProducts } from '../services/productService';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Paper, Typography, Pagination, Stack } from '@mui/material';
import './CatalogPage.css';

const PAGE_SIZE = 3;

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  // La función para obtener productos no cambia
  const fetchProducts = useCallback(async (filters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProducts(filters);
      setProducts(data.products);
      setPageCount(Math.ceil(data.total / PAGE_SIZE));
    } catch (err) {
      setError(err.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const filters = {
      page,
      search: searchTerm,
      category,
      sort_by: sortBy,
    };
    fetchProducts(filters);
  }, [page, category, sortBy]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1); 
      const filters = {
        page: 1,
        search: searchTerm,
        category,
        sort_by: sortBy,
      };
      fetchProducts(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]); 

  

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box className="catalog-container">
      <Typography variant="h3" component="h1" gutterBottom align="center" className="catalog-title">
        Nuestro Catálogo
      </Typography>
      
      <Paper className="catalog-filters-container" sx={{ p: 2, mb: 4, borderRadius: 2 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems="center"
        >
          <TextField
            label="Buscar productos..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="catalog-search-input"
            sx={{ width: '100%', flexGrow: 1 }}
          />
          <FormControl size="small" className="catalog-select-field" sx={{ width: { xs: '100%', md: 200 }, minWidth: 180 }}>
            <InputLabel>Categoría</InputLabel>
            <Select value={category} label="Categoría" onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
              <MenuItem value=""><em>Todas</em></MenuItem>
              <MenuItem value="Frutas">Frutas</MenuItem>
              <MenuItem value="Verduras">Verduras</MenuItem>
              <MenuItem value="Tubérculos">Tubérculos</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" className="catalog-select-field" sx={{ width: { xs: '100%', md: 220 }, minWidth: 180 }}>
            <InputLabel>Ordenar por</InputLabel>
            <Select value={sortBy} label="Ordenar por" onChange={(e) => { setSortBy(e.target.value); setPage(1); }}>
              <MenuItem value=""><em>Relevancia</em></MenuItem>
              <MenuItem value="price_asc">Precio: Menor a Mayor</MenuItem>
              <MenuItem value="price_desc">Precio: Mayor a Menor</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>
      
      <ProductList products={products} loading={loading} error={error} />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {pageCount > 1 && (
          <Box className="catalog-pagination-container">
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CatalogPage;