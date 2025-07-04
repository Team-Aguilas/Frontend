import React, { useState, useEffect } from 'react';
import { updateProduct } from '../services/productService';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, MenuItem, CircularProgress, Alert } from '@mui/material';

function EditProductForm({ productData }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Frutas',
    image_url: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Cuando el componente se carga, rellena el formulario con los datos del producto
  useEffect(() => {
    if (productData) {
      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        price: productData.price || '',
        stock: productData.stock || '',
        category: productData.category || 'Frutas',
        image_url: productData.image_url || ''
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const dataToUpdate = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    const currentProductId = productData.id || productData._id;

    try {
      await updateProduct(currentProductId, dataToUpdate);
      alert('¡Producto actualizado con éxito!');
      navigate(`/products/${currentProductId}`); // Redirige a la página de detalles
    } catch (err) {
      setError(err.detail || 'Ocurrió un error al actualizar el producto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField margin="normal" required fullWidth name="name" label="Nombre del Producto" value={formData.name} onChange={handleChange} />
      <TextField margin="normal" fullWidth name="description" label="Descripción" value={formData.description} onChange={handleChange} multiline rows={3} />
      <TextField margin="normal" required fullWidth name="price" label="Precio" type="number" value={formData.price} onChange={handleChange} />
      <TextField margin="normal" required fullWidth name="stock" label="Stock" type="number" value={formData.stock} onChange={handleChange} />
      <TextField margin="normal" fullWidth name="image_url" label="URL de la Imagen" value={formData.image_url} onChange={handleChange} />
      <TextField margin="normal" required fullWidth select label="Categoría" value={formData.category} onChange={handleChange} name="category">
        <MenuItem value="Frutas">Frutas</MenuItem>
        <MenuItem value="Verduras">Verduras</MenuItem>
        <MenuItem value="Tubérculos">Tubérculos</MenuItem>
      </TextField>
      
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      
      <Button type="submit" fullWidth variant="contained" color="secondary" sx={{ mt: 3, mb: 2 }} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Guardar Cambios'}
      </Button>
    </Box>
  );
}

export default EditProductForm;