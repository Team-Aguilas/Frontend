


// import React, { useState, useEffect } from 'react';
// import { getAllProducts } from '../services/productService';
// import ProductCard from './ProductCard';

// function ProductList({ token }) {
//   const [products, setProducts] = useState([]);
//   // ...

//   const loadProducts = async () => {
//     const data = await getAllProducts();
//     setProducts(data);
//   };

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const handleDelete = (deletedId) => {
//     setProducts(prev => prev.filter(p => p.id !== deletedId));
//   };

//   return (
//     <div>
//       {/* título, loading, error */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
//         {products.map(product => (
//           <ProductCard
//             key={product.id}
//             product={product}
//             token={token}
//             onDelete={handleDelete}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductList;

// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import ProductCard from './ProductCard';

export default function ProductList({ token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = (deletedId) => {
    setProducts(prev => prev.filter(p => p.id !== deletedId));
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Cargando productos… ⏳</p>;
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>Error: {error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        🍓 Nuestros Productos Frescos 🥕
      </h2>
      {products.length === 0 ? (
        <p style={{ textAlign: 'center' }}>
          No se encontraron productos. ¡Agrega alguno desde "Crear producto"!
        </p>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center'
        }}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              token={token}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
