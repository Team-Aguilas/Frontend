
// import { Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import ProductList from './components/ProductList';
// import Login from './components/Login';
// import Register from './components/Register';
// import CreateProductForm from './components/CreateProductForm';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   const token = localStorage.getItem('token');

//   return (
//     <div className="App">
//       <NavBar />

//       <main className="p-4">
//         <Routes>
//           <Route path="/" element={<ProductList token={token} />} />
//           {/* <Route path="/" element={<ProductList />} /> */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/crear-producto"
//             element={
//               <ProtectedRoute isAuthenticated={!!token}>
//                 <CreateProductForm token={token} />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </main>

//       <footer className="App-footer p-4 text-center text-sm text-gray-500">
//         &copy; {new Date().getFullYear()} Tu Marketplace Fresco.
//       </footer>
//     </div>
//   );
// }

// export default App;


// // src/App.jsx
// // import { Routes, Route } from 'react-router-dom';
// // import NavBar from './components/NavBar';
// // import ProductList from './components/ProductList';
// // import Login from './components/Login';
// // import Register from './components/Register';
// // import CreateProductForm from './components/CreateProductForm';
// // import ProtectedRoute from './components/ProtectedRoute';

// // function App() {
// //   const token = localStorage.getItem('token');

// //   return (
// //     <div className="App">
// //       <NavBar />

// //       <main className="p-4">
// //         <Routes>
// //           <Route path="/" element={<ProductList token={token} />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />
// //           <Route
// //             path="/crear-producto"
// //             element={
// //               <ProtectedRoute isAuthenticated={!!token}>
// //                 <CreateProductForm token={token} />
// //               </ProtectedRoute>
// //             }
// //           />
// //         </Routes>
// //       </main>

// //       <footer className="App-footer p-4 text-center text-sm text-gray-500">
// //         &copy; {new Date().getFullYear()} Tu Marketplace Fresco.
// //       </footer>
// //     </div>
// //   );
// // }

// // export default App;

// src/App.jsx
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Register from './components/Register';
import CreateProductForm from './components/CreateProductForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // 1) Estado de token en App
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // 2) Función de logout que limpia estado y localStorage
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <div className="App">
      {/* 3) Pasamos token y logout a NavBar */}
      <NavBar token={token} logout={logout} />

      <main className="p-4">
        <Routes>
          {/* 4) Listado de productos recibe token */}
          <Route path="/" element={<ProductList token={token} />} />

          {/* 5) Login recibe setToken para actualizar estado */}
          <Route path="/login" element={<Login setToken={setToken} />} />

          <Route path="/register" element={<Register />} />

          {/* 6) Ruta protegida para crear producto */}
          <Route
            path="/crear-producto"
            element={
              <ProtectedRoute isAuthenticated={!!token}>
                <CreateProductForm token={token} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="App-footer p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Tu Marketplace Fresco.
      </footer>
    </div>
  );
}

export default App;
