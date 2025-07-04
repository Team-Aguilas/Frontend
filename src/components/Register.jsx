// frontend/src/components/Register.jsx
import React, { useState } from 'react';
import { registerUser } from '../services/authService';

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

  const formStyle = {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '20px auto'
  };

  const inputStyle = {
    display: 'block',
    width: '95%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1.5px solid #ddd',
  };

  return (
    <div style={formStyle}>
      <h2>Registrar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Nombre Completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
          style={inputStyle}
        />
        <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>Registrar</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Register;