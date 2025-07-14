import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { PRODUCTS_SERVER_URL } from '../config';
import RatingDisplay from './RatingDisplay';

function ProductCard({ product }) {
  const imageUrl = product.image_url 
    ? `${PRODUCTS_SERVER_URL}${product.image_url}` 
    : `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`;

  return (
    <Card sx={{ 
      width: '100%',
      height: '100%', 
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 2,
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 8,
      }
    }}>
      <Link 
        to={`/products/${product.id || product._id}`} 
        style={{ 
          textDecoration: 'none', 
          color: 'inherit', 
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 0,
        }}
      >
        {/* Imagen con margen y bordes redondeados */}
        <Box 
          sx={{
            m : 1,
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={imageUrl}
            alt={product.name}
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'contain', // Asegura esquinas redondeadas visibles
              display: 'block'
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 0, pt: 0 }}>
          <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            Stock: {product.stock}
          </Typography>
          
          {/* Mostrar calificación en la tarjeta */}
          <RatingDisplay 
            averageRating={product.average_rating} 
            totalRatings={product.total_ratings}
            showDetails={false}
          />
        </CardContent>
      </Link>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pt: 0 }}>
        <Typography variant="h5" color="primary" fontWeight="500">
          ${product.price ? product.price.toFixed(2) : 'N/A'}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
