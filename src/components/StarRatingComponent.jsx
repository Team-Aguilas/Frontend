import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Stack, Alert } from '@mui/material';

const StarRatingComponent = ({ 
  productId, 
  currentRating = null, 
  onRatingSubmitted 
}) => {
  const [selectedRating, setSelectedRating] = useState(currentRating?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(currentRating?.comment || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    setMessage('');
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async () => {
    console.log('⭐ INICIANDO handleSubmit...');
    console.log('⭐ selectedRating:', selectedRating);
    
    // DEBUGGING COMPLETO DEL TOKEN
    console.log('🔍 VERIFICANDO AUTENTICACIÓN...');
    const token = localStorage.getItem('accessToken'); // CLAVE CORRECTA
    const tokenAlt = localStorage.getItem('access_token'); // CLAVE ALTERNATIVA
    const sessionToken = sessionStorage.getItem('accessToken');
    
    console.log('🔑 localStorage accessToken:', token);
    console.log('🔑 localStorage access_token:', tokenAlt);
    console.log('🔑 sessionStorage accessToken:', sessionToken);
    console.log('🔑 Todas las claves en localStorage:', Object.keys(localStorage));
    
    if (!token && !tokenAlt && !sessionToken) {
      console.error('🔑 ¡NO HAY TOKEN EN NINGÚN LUGAR!');
      setMessage('❌ Error: No estás autenticado. Inicia sesión nuevamente.');
      setIsSubmitting(false);
      return;
    }
    
    if (selectedRating === 0) {
      setMessage('❌ Por favor selecciona una calificación');
      return;
    }

    setIsSubmitting(true);
    setMessage('📤 Enviando calificación...');

    try {
      const ratingData = {
        rating: selectedRating,
        comment: comment.trim() || null
      };

      console.log('🔍 StarRatingComponent - Enviando calificación:', {
        productId,
        ratingData,
        currentRating
      });

      const result = await onRatingSubmitted(productId, ratingData);
      
      console.log('✅ StarRatingComponent - Calificación enviada exitosamente:', result);
      
      setMessage(currentRating ? '✅ ¡Calificación actualizada exitosamente!' : '✅ ¡Calificación enviada exitosamente!');
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('❌ StarRatingComponent - Error completo:', error);
      console.error('❌ StarRatingComponent - Error detail:', error.detail);
      console.error('❌ StarRatingComponent - Error message:', error.message);
      console.error('❌ StarRatingComponent - Error stack:', error.stack);
      
      let errorMessage = '❌ Error al enviar la calificación. ';
      if (error.detail) {
        errorMessage += `Detalle: ${error.detail}`;
      } else if (error.message) {
        errorMessage += `Detalle: ${error.message}`;
      } else {
        errorMessage += 'Intenta de nuevo.';
      }
      
      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStar = (starNumber) => {
    const isActive = starNumber <= (hoverRating || selectedRating);
    return (
      <Box
        key={starNumber}
        component="span"
        onClick={() => handleStarClick(starNumber)}
        onMouseEnter={() => handleStarHover(starNumber)}
        onMouseLeave={handleStarLeave}
        sx={{
          fontSize: '32px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          color: isActive ? '#FFD700' : '#D3D3D3',
          transition: 'all 0.2s ease',
          display: 'inline-block',
          transform: hoverRating === starNumber ? 'scale(1.2)' : 'scale(1)',
          textShadow: isActive ? '0 0 8px rgba(255, 215, 0, 0.6)' : 'none',
          '&:hover': {
            transform: 'scale(1.2)',
          }
        }}
      >
        ⭐
      </Box>
    );
  };

  return (
    <Box sx={{ 
      mt: 4, 
      p: 3, 
      border: '2px solid', 
      borderColor: 'primary.main',
      borderRadius: 2,
      backgroundColor: 'background.paper',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
        ⭐ {currentRating ? 'Actualizar tu calificación' : 'Califica este producto'}
      </Typography>

      {currentRating && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Tu calificación actual: {currentRating.rating} estrella{currentRating.rating > 1 ? 's' : ''}
          {currentRating.comment && ` - "${currentRating.comment}"`}
        </Alert>
      )}

      <Stack spacing={3}>
        {/* Sección de estrellas */}
        <Box>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 'medium' }}>
            Selecciona tu calificación:
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              gap: 1,
              mb: 2,
              p: 2,
              backgroundColor: 'grey.50',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.300'
            }}
          >
            {[1, 2, 3, 4, 5].map(renderStar)}
          </Box>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ textAlign: 'center', mb: 1 }}
          >
            {selectedRating > 0 ? (
              <>
                Has seleccionado: <strong>{selectedRating} estrella{selectedRating > 1 ? 's' : ''}</strong>
                {hoverRating > 0 && hoverRating !== selectedRating && (
                  <> (Hover: {hoverRating} estrella{hoverRating > 1 ? 's' : ''})</>
                )}
              </>
            ) : (
              'Haz clic en las estrellas para calificar'
            )}
          </Typography>
        </Box>

        {/* Campo de comentario */}
        <TextField
          label="Comentario (opcional)"
          multiline
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isSubmitting}
          variant="outlined"
          fullWidth
          inputProps={{ maxLength: 500 }}
          helperText={`${comment.length}/500 caracteres`}
          placeholder="Comparte tu experiencia con este producto..."
        />

        {/* Mensajes de estado */}
        {message && (
          <Alert 
            severity={
              message.includes('✅') ? 'success' : 
              message.includes('❌') ? 'error' : 'info'
            }
          >
            {message}
          </Alert>
        )}

        {/* Botones de envío y debug */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={selectedRating === 0 || isSubmitting}
            sx={{ minWidth: 200 }}
          >
            {isSubmitting ? 'Enviando...' : currentRating ? 'Actualizar Calificación' : 'Enviar Calificación'}
          </Button>
          
          {selectedRating > 0 && (
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                setSelectedRating(0);
                setHoverRating(0);
                setMessage('');
              }}
              disabled={isSubmitting}
            >
              Limpiar
            </Button>
          )}

          {/* Botón de test de conectividad */}
          {/* <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={async () => {
              try {
                setMessage('🔍 Probando conectividad...');
                const response = await fetch('http://localhost:8001/api/v1/products/', {
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                  }
                });
                if (response.ok) {
                  setMessage('✅ Conectividad OK - Servicio de productos disponible');
                } else {
                  setMessage(`❌ Error de conectividad: ${response.status} ${response.statusText}`);
                }
              } catch (err) {
                setMessage(`❌ Error de red: ${err.message}`);
              }
              setTimeout(() => setMessage(''), 3000);
            }}
          >
            Test Conectividad
          </Button> */}
        </Box>
      </Stack>
    </Box>
  );
};

export default StarRatingComponent;
