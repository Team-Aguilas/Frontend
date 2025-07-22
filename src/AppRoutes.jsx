// frontend/src/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage'; 
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/products" element={<CatalogPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route
        path="/products/new"
        element={
          <ProtectedRoute>
            <AddProductPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/edit/:productId"
        element={
          <ProtectedRoute>
            <EditProductPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;