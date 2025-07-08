import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom'; // <-- LA LÍNEA QUE FALTA

function Hero() {
  const heroStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    minHeight: '400px',
    color: '#fff',
    textAlign: 'center',
    backgroundImage: 'url(https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  return (
    <Box sx={heroStyle}>
      <Box sx={overlayStyle} />
      <Container maxWidth="md" sx={{ position: 'relative' }}>
        <Typography
          component="h1"
          variant="h2"
          fontWeight="bold"
          gutterBottom
        >
          Bienvenido a Mercado Fresco
        </Typography>
        <Typography variant="h5" paragraph>
          La mejor selección de frutas y verduras, directo del campo a tu hogar.
        </Typography>
        <Button 
          component={Link} 
          to="/products" 
          variant="contained" 
          color="secondary" 
          size="large"
        >
          Ver Productos
        </Button>
      </Container>
    </Box>
  );
}

export default Hero;