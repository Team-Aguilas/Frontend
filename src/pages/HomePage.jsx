// frontend/src/pages/HomePage.jsx (VERSIÓN CORREGIDA)

import React, { useState, useEffect, useCallback } from 'react';
import ProductList from '../components/ProductList';
import { getAllProducts } from '../services/productService';

// Ya no necesitamos AddProductForm ni useAuth aquí.

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // La lógica para obtener los datos se queda aquí, lo cual es correcto.
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      {/* El formulario ya no se renderiza aquí. La página está limpia. */}
      <ProductList products={products} loading={loading} error={error} />
    </>
  );
}

export default HomePage;