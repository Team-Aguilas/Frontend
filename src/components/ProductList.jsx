// // frontend/src/components/ProductList.jsx
// import React, { useState, useEffect } from 'react';
// import { getAllProducts } from '../services/productService';
// import ProductCard from './ProductCard';

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null); // Limpiar errores previos
//         const data = await getAllProducts();
//         // El backend devuelve 'id' como alias de '_id', así que product.id debería funcionar.
//         setProducts(data);
//       } catch (err) {
//         setError(err.message || 'Failed to fetch products. Is the backend running and accessible?');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

//   const listContainerStyle = {
//     padding: '20px',
//   };

//   const listStyle = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '10px', // Espacio entre tarjetas
//     justifyContent: 'center', // Centra las tarjetas si no ocupan toda la fila
//   };

//   const titleStyle = {
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: '30px',
//   };

//   if (loading) return <p style={{textAlign: 'center', marginTop: '50px'}}>Cargando productos... ⏳</p>;
//   if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>Error: {error} 😥</p>;

//   return (
//     <div style={listContainerStyle}>
//       <h2 style={titleStyle}>🍓 Nuestros Productos Frescos 🥕</h2>
//       {products.length === 0 && !loading && (
//         <p style={{textAlign: 'center'}}>No se encontraron productos. ¡Intenta agregar algunos a través del API!</p>
//       )}
//       <div style={listStyle}>
//         {products.map(product => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//         {/* {products.map(product => {
//           const realId = typeof product._id === 'object '? product._id.$oid : product._id;
//         return (
//         <ProductCard
//         key={realId}
//         product={product}
//      /> 
//    );
//  })} */}
//       </div>
//     </div>
//   );
// }

// export default ProductList;


// src/components/ProductList.jsx


// import React, { useState, useEffect } from 'react';
// import { getAllProducts } from '../services/productService';
// import ProductCard from './ProductCard';

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const data = await getAllProducts();
//         setProducts(data);
//       } catch (err) {
//         setError(err.message || 'Failed to fetch products. Is the backend running and accessible?');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const listContainerStyle = {
//     padding: '20px',
//   };
//   const listStyle = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '10px',
//     justifyContent: 'center',
//   };
//   const titleStyle = {
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: '30px',
//   };

//   if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Cargando productos... ⏳</p>;
//   if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>Error: {error} 😥</p>;

//   return (
//     <div style={listContainerStyle}>
//       <h2 style={titleStyle}>🍓 Nuestros Productos Frescos 🥕</h2>

//       {products.length === 0 && !loading && (
//         <p style={{ textAlign: 'center' }}>
//           No se encontraron productos. ¡Intenta agregar algunos a través del API!
//         </p>
//       )}

//       <div style={listStyle}>
//         {products.map(product => {
//           // Normalizar el id por si viene en _id como objeto o string
//           const realId = product.id ?? (
//             typeof product._id === 'object' 
//               ? product._id.$oid 
//               : product._id
//           );
//           return (
//             <ProductCard
//               key={realId}
//               product={product}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default ProductList;



// src/components/ProductList.jsx


import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import ProductCard from './ProductCard';

function ProductList({ token }) {
  const [products, setProducts] = useState([]);
  // ...

  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = (deletedId) => {
    setProducts(prev => prev.filter(p => p.id !== deletedId));
  };

  return (
    <div>
      {/* título, loading, error */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            token={token}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
