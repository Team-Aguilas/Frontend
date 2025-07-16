import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { AppBar, Toolbar, Typography, Button, Box, Badge, IconButton } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import './NavBar.css';
// Ya no importamos LocalFloristIcon

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" className="navbar-container" sx={{ backgroundColor: '#74a57f' }}>
      <Toolbar>
        {/* --- INICIO DEL CAMBIO --- */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <Box
            component="img"
            src="/logo.png" // La ruta pública a tu logo
            alt="Mercado Fresco Logo"
            className="navbar-logo"
            sx={{
              height: 80, // Ajusta la altura del logo como prefieras
              mr: 2, // Margen a la derecha
              mt: 0.5,
              mb: 0.5
            }}
          />
        </Link>
        {/* --- FIN DEL CAMBIO --- */}

        <Box sx={{ flexGrow: 1 }} />
        
        <Button 
          color="inherit" 
          component={Link} 
          to="/products"
          className="navbar-button"
        >
          Catálogo
        </Button>

        {/* Carrito de compras */}
        <IconButton
          color="inherit"
          component={Link}
          to="/cart"
          className="navbar-button cart-icon-button"
          sx={{ mx: 1 }}
        >
          <Badge badgeContent={getTotalItems()} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {isLoggedIn ? (
          <>
            <Button 
              color="inherit" 
              component={Link} 
              to="/products/new"
              className="navbar-button add-product-button"
            >
              Añadir Producto
            </Button>
            <Typography 
              variant="subtitle1" 
              component="span" 
              className="user-greeting"
              sx={{ ml: 2, mr: 2 }}
            >
              Hola, {user.full_name || user.email}
            </Typography>
            <Button 
              color="inherit" 
              variant="outlined" 
              onClick={handleLogout}
              className="navbar-button logout-button"
            >
              Cerrar Sesión
            </Button>
          </>
        ) : (
          <Button 
            color="inherit" 
            component={Link} 
            to="/login"
            className="navbar-button login-button"
          >
            Iniciar Sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;