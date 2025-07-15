import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// Ya no importamos LocalFloristIcon

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#74a57f' }}>
      <Toolbar>
        {/* --- INICIO DEL CAMBIO --- */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <Box
            component="img"
            src="/logo.png" // La ruta pública a tu logo
            alt="Mercado Fresco Logo"
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
        
        <Button color="inherit" component={Link} to="/products">
          Catálogo
        </Button>

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
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;