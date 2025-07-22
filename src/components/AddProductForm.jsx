import React, { useState } from 'react';
import { createProduct, uploadProductImage } from '../services/productService';
import { useNavigate } from 'react-router-dom'; // 1. Asegúrate de que useNavigate esté importado
import { Box, TextField, Button, Typography, MenuItem, CircularProgress, Alert } from '@mui/material';
import './AddProductForm.css';

// Ya no necesitamos la prop 'onProductAdded'
function AddProductForm() {
  const [productData, setProductData] = useState({ 
    name: '', 
    description: '', 
    price: '', 
    stock: '', 
    category: 'Frutas', 
    image_url: '', 
    whatsapp_number: '' 
  });
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
    // Si selecciona un archivo, limpiar la URL
    if (e.target.files[0]) {
      setProductData(prevState => ({ ...prevState, image_url: '' }));
    }
  };

  const clearImageSelection = () => {
    setImageFile(null);
    setProductData(prevState => ({ ...prevState, image_url: '' }));
  };

  const handleUrlChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({ ...prevState, [name]: value }));
    // Si empieza a escribir una URL, limpiar el archivo
    if (name === 'image_url' && value.trim() !== '') {
      setImageFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    let finalImageUrl = '';

    try {
      // Prioridad: 1. Archivo subido, 2. URL proporcionada
      if (imageFile) {
        console.log('📁 Subiendo archivo:', imageFile.name);
        const uploadResponse = await uploadProductImage(imageFile);
        finalImageUrl = uploadResponse.image_url;
        console.log('✅ URL del archivo subido:', finalImageUrl);
      } else if (productData.image_url && productData.image_url.trim() !== '') {
        finalImageUrl = productData.image_url.trim();
        console.log('🔗 Usando URL proporcionada:', finalImageUrl);
      } else {
        console.log('⚠️ No se proporcionó imagen');
      }

      const dataToSend = {
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock),
        image_url: finalImageUrl,
      };
      
      console.log('📤 Datos a enviar:', dataToSend);
      
      const createdProduct = await createProduct(dataToSend);
      console.log('✅ Producto creado:', createdProduct);
      
      setMessage('¡Producto añadido con éxito!');
      
      // Limpiar el formulario
      setProductData({ name: '', description: '', price: '', stock: '', category: 'Frutas', image_url: '', whatsapp_number: '' });
      setImageFile(null);
      
      // Navegar después de un breve delay para mostrar el mensaje
      setTimeout(() => {
        navigate('/products');
      }, 2000);
      setTimeout(() => setMessage(''), 4000);

    } catch (err) {
      const errorDetail = err.detail || 'Ocurrió un error al añadir el producto.';
      setError(Array.isArray(errorDetail) ? errorDetail[0].msg : errorDetail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="add-product-form-container">
      <Typography className="add-product-form-title" variant="h4" component="h2">
        Añadir Nuevo Producto
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate className="add-product-form">
        <TextField 
          margin="normal" 
          required 
          fullWidth 
          name="name" 
          label="Nombre del Producto" 
          value={productData.name} 
          onChange={handleChange}
          className="add-product-input"
        />
        
        <TextField 
          margin="normal" 
          fullWidth 
          name="description" 
          label="Descripción" 
          value={productData.description} 
          onChange={handleChange} 
          multiline 
          rows={3}
          className="add-product-input add-product-description"
        />
        
        <TextField 
          margin="normal" 
          required 
          fullWidth 
          name="price" 
          label="Precio" 
          type="number" 
          value={productData.price} 
          onChange={handleChange}
          className="add-product-input"
        />
        
        <TextField 
          margin="normal" 
          required 
          fullWidth 
          name="stock" 
          label="Stock" 
          type="number" 
          value={productData.stock} 
          onChange={handleChange}
          className="add-product-input"
        />
        
        <TextField 
          margin="normal" 
          required 
          fullWidth 
          name="whatsapp_number" 
          label="Número de WhatsApp de Contacto" 
          type="tel"
          placeholder="Ej: 573001234567"
          value={productData.whatsapp_number} 
          onChange={handleChange}
          className="add-product-input"
        />
        
        <Typography variant="h6" sx={{ mt: 2, mb: 1, color: '#74a57f', fontWeight: 600 }}>
          Imagen del Producto
        </Typography>
        
        <Button 
          variant="outlined" 
          component="label" 
          fullWidth 
          className="add-product-image-button"
          sx={{ mt: 1 }}
        >
          📷 Seleccionar Imagen (Archivo)
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>
        
        {imageFile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Typography variant="body2" className="file-info" sx={{ flexGrow: 1 }}>
              📁 Archivo seleccionado: {imageFile.name}
            </Typography>
            <Button 
              size="small" 
              onClick={clearImageSelection}
              sx={{ 
                color: '#e74c3c', 
                minWidth: 'auto',
                fontSize: '0.75rem',
                padding: '4px 8px'
              }}
            >
              ✕ Cambiar
            </Button>
          </Box>
        )}
        
        {productData.image_url && !imageFile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Typography variant="body2" className="file-info" sx={{ flexGrow: 1 }}>
              🔗 URL de imagen configurada
            </Typography>
            <Button 
              size="small" 
              onClick={clearImageSelection}
              sx={{ 
                color: '#e74c3c', 
                minWidth: 'auto',
                fontSize: '0.75rem',
                padding: '4px 8px'
              }}
            >
              ✕ Limpiar
            </Button>
          </Box>
        )}
        
        <Typography variant="body2" sx={{ mt: 2, mb: 1, color: '#8395a7', textAlign: 'center' }}>
          - O -
        </Typography>
        
        <TextField 
          margin="normal" 
          fullWidth 
          name="image_url" 
          label="Pegar URL de la Imagen" 
          value={productData.image_url} 
          onChange={handleUrlChange}
          className="add-product-input"
          placeholder="https://ejemplo.com/imagen.jpg"
          disabled={!!imageFile}
          helperText={imageFile ? "Se usará el archivo seleccionado" : "Pega aquí la URL de una imagen"}
        />

        <TextField 
          margin="normal" 
          required 
          fullWidth 
          select 
          label="Categoría" 
          value={productData.category} 
          onChange={handleChange} 
          name="category"
          className="add-product-input add-product-select"
        >
          <MenuItem value="Frutas">🍎 Frutas</MenuItem>
          <MenuItem value="Verduras">🥬 Verduras</MenuItem>
          <MenuItem value="Tubérculos">🥔 Tubérculos</MenuItem>
        </TextField>

        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        
        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          className="add-product-submit-button"
          disabled={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : '✨ Añadir Producto'}
        </Button>
      </Box>
    </Box>
  );
}

export default AddProductForm;