import React, { useState } from 'react';
import { createProduct, uploadProductImage } from '../services/productService';
import { useNavigate } from 'react-router-dom'; // 1. Asegúrate de que useNavigate esté importado
import { Box, TextField, Button, Typography, MenuItem, CircularProgress, Alert } from '@mui/material';

// Ya no necesitamos la prop 'onProductAdded'
function AddProductForm() {
  const [productData, setProductData] = useState({ /* ... */ });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    let finalImageUrl = productData.image_url || '';

    try {
      if (imageFile) {
        const uploadResponse = await uploadProductImage(imageFile);
        finalImageUrl = uploadResponse.image_url;
      }

      const dataToSend = {
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock),
        image_url: finalImageUrl,
      };
      
      await createProduct(dataToSend);
      alert('¡Producto añadido con éxito!');
      navigate('/');
      
      if (onProductAdded) {
        onProductAdded();
      }
      
      setProductData({ name: '', description: '', price: '', stock: '', category: 'Frutas', image_url: '' });
      setImageFile(null);
      setTimeout(() => setMessage(''), 4000);

    } catch (err) {
      const errorDetail = err.detail || 'Ocurrió un error al añadir el producto.';
      setError(Array.isArray(errorDetail) ? errorDetail[0].msg : errorDetail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField margin="normal" required fullWidth name="name" label="Nombre del Producto" value={productData.name} onChange={handleChange} />
      <TextField margin="normal" fullWidth name="description" label="Descripción" value={productData.description} onChange={handleChange} multiline rows={3} />
      <TextField margin="normal" required fullWidth name="price" label="Precio" type="number" value={productData.price} onChange={handleChange} />
      <TextField margin="normal" required fullWidth name="stock" label="Stock" type="number" value={productData.stock} onChange={handleChange} />
      
      <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
        Seleccionar Imagen (Archivo)
        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
      </Button>
      {imageFile && <Typography variant="body2" sx={{ mt: 1 }}>Archivo: {imageFile.name}</Typography>}
      
      <TextField margin="normal" fullWidth name="image_url" label="O Pegar URL de la Imagen" id="image_url" value={productData.image_url} onChange={handleChange} sx={{mt: 2}}/>

      <TextField margin="normal" required fullWidth select label="Categoría" value={productData.category} onChange={handleChange} name="category">
        <MenuItem value="Frutas">Frutas</MenuItem>
        <MenuItem value="Verduras">Verduras</MenuItem>
        <MenuItem value="Tubérculos">Tubérculos</MenuItem>
      </TextField>

      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Añadir Producto'}
      </Button>
    </Box>
  );
}

export default AddProductForm;