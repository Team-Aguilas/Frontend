// // src/components/NavBar.jsx
// import { Link } from 'react-router-dom';

// export default function NavBar() {
//   return (
//     <nav className="navbar p-4 bg-green-600 text-white flex justify-between">
//       <div className="text-xl font-bold">
//         🍏 Mercado Fresco
//       </div>
//       <div>
//         <Link to="/login" className="btn-login px-4 py-2 bg-white text-green-600 rounded hover:bg-green-50">
//           Iniciar sesión
//         </Link>
//       </div>
//     </nav>
//   );
// }


// src/components/NavBar.jsx
// import { useNavigate, Link } from 'react-router-dom';

// export default function NavBar() {
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar p-4 bg-green-600 text-white flex justify-between items-center">
//       <div className="text-xl font-bold">
//         <Link to="/" className="hover:opacity-90">
//           🍏 Mercado Fresco
//         </Link>
//       </div>

//       <div className="space-x-2">
//         {token ? (
//           <>
//             <Link
//               to="/crear-producto"
//               className="px-4 py-2 bg-white text-green-600 rounded hover:bg-green-50"
//             >
//               Crear producto
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Cerrar sesión
//             </button>
//           </>
//         ) : (
//           <Link
//             to="/login"
//             className="px-4 py-2 bg-white text-green-600 rounded hover:bg-green-50"
//           >
//             Iniciar sesión
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }


// src/components/NavBar.jsx
// src/components/NavBar.jsx
// import { useNavigate, Link } from 'react-router-dom';

// export default function NavBar() {
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-green-200 p-4 shadow">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <Link to="/" className="text-2xl font-bold text-green-800 hover:opacity-90">
//           🍏 Mercado Fresco
//         </Link>

//         <div className="flex items-center space-x-3">
//           {token ? (
//             <>
//               <Link
//                 to="/crear-producto"
//                 className="px-4 py-2 bg-white text-green-800 rounded hover:bg-green-50"
//               >
//                 Crear producto
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Cerrar sesión
//               </button>
//             </>
//           ) : (
//             <Link
//               to="/login"
//               className="px-4 py-2 bg-white text-green-800 rounded hover:bg-green-50"
//             >
//               Iniciar sesión
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


// src/components/NavBar.jsx




// import { useNavigate, Link } from 'react-router-dom';

// export default function NavBar() {
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-green-200 fixed top-0 w-full z-10 shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         {/* Logo / Título */}
//         <Link to="/" className="text-2xl font-bold text-green-800 hover:opacity-90">
//           🍏 Mercado Fresco
//         </Link>

//         {/* Botones alineados a la derecha */}
//         <div className="flex items-center space-x-3">
//           {token ? (
//             <>
//               <Link
//                 to="/crear-producto"
//                 className="px-4 py-2 bg-white text-green-800 rounded hover:bg-green-50"
//               >
//                 Crear producto
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Cerrar sesión
//               </button>
//             </>
//           ) : (
//             <Link
//               to="/login"
//               className="px-4 py-2 bg-white text-green-800 rounded hover:bg-green-50"
//             >
//               Iniciar sesión
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }





// src/components/NavBar.jsx

// import { useNavigate, Link } from 'react-router-dom';
// import './NavBar.css';  // si lo separas en otro archivo

// export default function NavBar() {
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar">
//       <Link to="/" className="logo">🍏 Mercado Fresco</Link>
//       <div className="nav-buttons">
//         {token ? (
//           <>
//             <Link to="/crear-producto" className="btn-green">Crear producto</Link>
//             <button onClick={handleLogout} className="btn-red">Cerrar sesión</button>
//           </>
//         ) : (
//           <Link to="/login" className="btn-green">Iniciar sesión</Link>
//         )}
//       </div>
//     </nav>
//   );
// }



// src/components/NavBar.jsx
// import { useNavigate, Link } from 'react-router-dom';
// import './NavBar.css';  // Asegúrate de haber añadido las reglas que vimos antes

// export default function NavBar() {
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         {/* Logo / Título */}
//         <Link to="/" className="logo">
//           🍏 AgroRed
//         </Link>

//         {/* Botones alineados a la derecha */}
//         <div className="nav-buttons">
//           {token ? (
//             <>
//               <Link to="/crear-producto" className="btn-green">
//                 Crear producto
//               </Link>
//               <button onClick={handleLogout} className="btn-red">
//                 Cerrar sesión
//               </button>
//             </>
//           ) : (
//             <Link to="/login" className="btn-green">
//               Iniciar sesión
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }




import { useNavigate, Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar({ token, logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Limpia el token y redirige
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Título */}
        <Link to="/" className="logo">
          🍏 AgroRed
        </Link>

        {/* Botones alineados a la derecha */}
        <div className="nav-buttons">
          {token ? (
            <>
              <Link to="/crear-producto" className="btn-green">
                Crear producto
              </Link>
              <button onClick={handleLogout} className="btn-red">
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-green">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
