
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiClient } from '../services/productService';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setError('');
//     try {
//       // FastAPI espera form-url-encoded para OAuth2PasswordRequestForm
//       const params = new URLSearchParams();
//       params.append('username', email);
//       params.append('password', password);

//       const res = await apiClient.post('/auth/login', params, {
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//       });

//       const { access_token } = res.data;
//       localStorage.setItem('token', access_token);

//       // → Aquí redirigimos al formulario de creación de producto
//       navigate('/crear-producto');

//     } catch (err) {
//       setError(err.response?.data?.detail || err.message || 'Error al autenticar');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
//       <h2 className="text-2xl mb-4">Iniciar sesión</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Contraseña</label>
//           <input
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           Entrar
//         </button>
//       </form>

//       <p className="text-center mt-4">
//         ¿No tienes cuenta?{' '}
//         <button
//           onClick={() => navigate('/register')}
//           className="text-green-600 hover:underline"
//         >
//           Regístrate
//         </button>
//       </p>
//     </div>
//   );
// }

// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../services/productService';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const params = new URLSearchParams();
      params.append('username', email);
      params.append('password', password);

      const res = await apiClient.post('/auth/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const { access_token } = res.data;
      localStorage.setItem('token', access_token);

      navigate('/crear-producto');
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.message ||
        'Error al autenticar'
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Iniciar sesión</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Entrar</button>
        </form>

        <p className="register-link">
          ¿No tienes cuenta?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}
