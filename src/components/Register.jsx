// frontend/src/components/Register.jsx
import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const newUser = await registerUser({ email, password, full_name: fullName });
      setMessage(`¡Usuario ${newUser.email} registrado con éxito!`);
      // Limpiar campos
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (err) {
      setError(err.detail || 'Error al registrar el usuario.');
    }
  };

  return (
    <div className="register-form-container">
      <h2 className="register-form-title">Registrar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="text"
          placeholder="Nombre Completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
          className="register-input"
        />
        <button type="submit" className="register-button">Registrar</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Register;