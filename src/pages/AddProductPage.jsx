import React from 'react';
import AddProductForm from '../components/AddProductForm';

function AddProductPage() {
  const pageStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
  };

  return (
    <div style={pageStyle}>
      <h1 style={{ textAlign: 'center' }}>Crear un Nuevo Producto</h1>
      <p style={{ textAlign: 'center', color: '#555' }}>
        Completa los detalles de la fruta o verdura que deseas vender.
      </p>
      <AddProductForm />
    </div>
  );
}

export default AddProductPage;