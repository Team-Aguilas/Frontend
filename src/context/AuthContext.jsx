import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser as apiLogin, registerUser, getCurrentUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error("Sesión inválida, limpiando token.", error);
          localStorage.removeItem('accessToken');
          setToken(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const data = await apiLogin({ email, password });
    setToken(data.access_token);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isLoggedIn: !!user,
    loading,
    login,
    logout,
    register: registerUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};