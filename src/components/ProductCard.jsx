import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { PRODUCTS_SERVER_URL } from '../config';
import RatingDisplay from './RatingDisplay';
import CommentsModal from './CommentsModal';
import { getProductRatings } from '../services/productService';

function ProductCard({ product }) {
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  // Determinar si es URL externa o archivo local
  const isExternalUrl = product.image_url && (
    product.image_url.startsWith('http://') || 
    product.image_url.startsWith('https://') || 
    product.image_url.startsWith('data:')
  );

  const imageUrl = product.image_url 
    ? (isExternalUrl ? product.image_url : `${PRODUCTS_SERVER_URL}${product.image_url}`)
    : `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`;

  const handleShowComments = async (e) => {
    e.preventDefault(); // Evitar que navegue a la página del producto
    e.stopPropagation();
    
    if (product.total_ratings === 0) return;
    
    setLoadingComments(true);
    try {
      const ratingsData = await getProductRatings(product.id || product._id);
      setComments(ratingsData);
      setCommentsModalOpen(true);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
      // Abrir modal aunque falle para mostrar mensaje de error
      setComments([]);
      setCommentsModalOpen(true);
    } finally {
      setLoadingComments(false);
    }
  };

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
          flexGrow: 1,
        }}
      >
        {/* Imagen con margen y bordes redondeados */}
        <Box 
          sx={{
            m : 2,
            height: 250,
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
            height: '100%', // 1. Establecemos una altura fija (puedes ajustarla)
            width: '100%',
            objectFit: 'cover', // 2. La imagen cubrirá el área, recortándose si es necesario
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
          
          {/* Mostrar calificación en la tarjeta - clickeable para ver comentarios */}
          <RatingDisplay 
            averageRating={product.average_rating} 
            totalRatings={product.total_ratings}
            showDetails={false}
            clickable={true}
            onClick={handleShowComments}
          />
        </CardContent>
      </Link>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pt: 0 }}>
        <Typography variant="h5" color="primary" fontWeight="500">
          ${product.price ? product.price.toLocaleString('es-CO') : 'N/A'}
        </Typography>
      </CardActions>
      
      {/* Modal de comentarios */}
      <CommentsModal
        open={commentsModalOpen}
        onClose={() => setCommentsModalOpen(false)}
        comments={comments}
        productName={product.name}
      />
    </Card>
  );
}

export default ProductCard;
