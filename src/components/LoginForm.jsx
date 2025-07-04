import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/'); // Redirige a la página principal después del login
    } catch (err) {
      setError(err.detail || 'Credenciales incorrectas.');
    }
  };
  
  // (Usa los mismos estilos que el componente de Registro para consistencia)
  const formStyle = { padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: '40px auto' };
  const inputStyle = { display: 'block', width: '95%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1.5px solid #ddd' };

  return (
    <div style={formStyle}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
        <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LoginForm;