// frontend/src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { PRODUCTS_SERVER_URL } from '../config';

function ProductCard({ product }) {
  const imageUrl = product.image_url 
    ? `${PRODUCTS_SERVER_URL}${product.image_url}` 
    : `https://via.placeholder.com/345x160?text=${encodeURIComponent(product.name)}`;

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: 6, // Aumenta la sombra en hover
      }
    }}>
      <Link to={`/products/${product.id || product._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="180"
          image={imageUrl}
          alt={product.name}
          sx={{ objectFit: 'contain', pt: 2 }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock}
          </Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pt: 0 }}>
        <Typography variant="h6" color="primary">
          ${product.price ? product.price.toFixed(2) : 'N/A'}
        </Typography>
        <IconButton color="secondary" aria-label="add to shopping cart">
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;