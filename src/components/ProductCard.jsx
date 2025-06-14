// // frontend/src/components/ProductCard.jsx
// import React from 'react';

// function ProductCard({ product }) {
//   const cardStyle = {
//     border: '1px solid #e0e0e0',
//     borderRadius: '8px',
//     padding: '16px',
//     margin: '10px',
//     width: '220px',
//     boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   };

//   const imgStyle = {
//     width: '100%',
//     height: '160px',
//     objectFit: 'contain', // 'cover' si quieres que llene el espacio, 'contain' para verla completa
//     borderRadius: '4px',
//     marginBottom: '12px',
//   };

//   const nameStyle = {
//     fontSize: '1.1em',
//     fontWeight: 'bold',
//     marginBottom: '8px',
//     textAlign: 'center',
//     color: '#333',
//   };

//   const priceStyle = {
//     fontSize: '1em',
//     color: '#007bff', // Un azul para el precio
//     marginBottom: '4px',
//   };

//   const stockStyle = {
//     fontSize: '0.9em',
//     color: '#555',
//   };

//   return (
//     <div style={cardStyle}>
//       <img
//         src={product.image_url || `https://via.placeholder.com/200x160?text=${product.name.replace(/\s/g, "+")}`}
//         alt={product.name}
//         style={imgStyle}
//       />
//       <h3 style={nameStyle}>{product.name}</h3>
//       <p style={priceStyle}>${product.price ? product.price.toFixed(2) : 'N/A'} {product.currency}</p>
//       <p style={stockStyle}>Stock: {product.stock}</p>
//       {/* <p>{product.description?.substring(0, 50)}...</p> // Opcional */}
//     </div>
//   );
// }

// export default ProductCard;


// src/components/ProductCard.jsx
import React from 'react';
import { apiClient } from '../services/productService';

export default function ProductCard({ product, token, onDelete }) {
  const {
    name,
    price,
    currency,
    stock,
    image_url,
  } = product;

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar ${name}?`)) return;
    await apiClient.delete(`/products/${product.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    onDelete(product.id);
  };

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      margin: '10px',
      width: '220px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
    }}>
      <img
        src={
          image_url ||
          `https://via.placeholder.com/200x160?text=${encodeURIComponent(name)}`
        }
        alt={name}
        style={{
          width: '100%',
          height: '160px',
          objectFit: 'contain',
          borderRadius: '4px',
          marginBottom: '12px',
        }}
      />
      <h3 style={{
        fontSize: '1.1em',
        fontWeight: 'bold',
        marginBottom: '8px',
        textAlign: 'center',
        color: '#333',
      }}>{name}</h3>
      <p style={{
        fontSize: '1em',
        color: '#007bff',
        marginBottom: '4px',
      }}>
        ${price.toFixed(2)} {currency}
      </p>
      <p style={{
        fontSize: '0.9em',
        color: '#555',
      }}>
        Stock: {stock}
      </p>
      <button
        onClick={handleDelete}
        style={{
          marginTop: '10px',
          padding: '6px 12px',
          backgroundColor: '#e3342f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Eliminar
      </button>
    </div>
  );
}
