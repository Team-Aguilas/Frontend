// import React, { useState } from 'react';
// import { createProduct } from '../services/productService';

// function CreateProductForm({ token }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     stock: '',
//     category: '',
//     image_url: '',
//   });

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = { ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) };
//       await createProduct(payload, token);
//       alert('Producto creado exitosamente!');
//     } catch (err) {
//       alert('Error al crear producto: ' + (err.message || err));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
//       <h3>Crear nuevo producto 🛒</h3>
//       <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
//       <input name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
//       <input name="price" placeholder="Precio" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
//       <input name="stock" placeholder="Inventario" type="number" value={formData.stock} onChange={handleChange} required />
//       <input name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} required />
//       <input name="image_url" placeholder="URL de imagen (opcional)" value={formData.image_url} onChange={handleChange} />
//       <button type="submit">Crear Producto</button>
//     </form>
//   );
// }

// export default CreateProductForm;

// src/components/CreateProductForm.jsx
import React, { useState } from 'react';
import { createProduct } from '../services/productService';

export default function CreateProductForm({ token }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image_url: '',
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };
      await createProduct(payload, token);
      alert('Producto creado exitosamente!');
    } catch (err) {
      alert('Error al crear producto: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h3>Crear nuevo producto 🛒</h3>
      <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
      <input name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
      <input name="price" placeholder="Precio" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
      <input name="stock" placeholder="Inventario" type="number" value={formData.stock} onChange={handleChange} required />
      <input name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} required />
      <input name="image_url" placeholder="URL de imagen (opcional)" value={formData.image_url} onChange={handleChange} />
      <button type="submit">Crear Producto</button>
    </form>
  );
}
