// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist'; // Un ícono bonito

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2e7d32' }}>
      <Toolbar>
        <LocalFloristIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Mercado Fresco
          </Link>
        </Typography>
        <Box>
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/products/new">
                Añadir Producto
              </Button>
              <Typography variant="subtitle1" component="span" sx={{ ml: 2, mr: 2 }}>
                Hola, {user.full_name || user.email}
              </Typography>
              <Button color="inherit" variant="outlined" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Iniciar Sesión
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;