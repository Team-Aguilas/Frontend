import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  // Si aún está cargando el estado de autenticación, no renderices nada todavía.
  if (loading) {
    return <div>Verificando autenticación...</div>;
  }

  // Si no está logueado, redirige a la página de login.
  // 'state={{ from: location }}' ayuda a redirigir al usuario de vuelta
  // a la página que intentaba visitar después de que inicie sesión.
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está logueado, renderiza el componente hijo (la página protegida).
  return children;
}

export default ProtectedRoute;