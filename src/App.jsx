// // src/App.jsx
// import { Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import ProductList from './components/ProductList';
// import Login from './components/Login';
// import Register from './components/Register';

// function App() {
//   return (
//     <div className="App">
//       <NavBar />

//       <main className="p-4">
//         <Routes>
//           <Route path="/" element={<ProductList />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           {/* Más rutas protegiendo con un <PrivateRoute /> en el futuro */}
//         </Routes>
//       </main>

//       <footer className="App-footer p-4 text-center text-sm text-gray-500">
//         &copy; {new Date().getFullYear()} Tu Marketplace Fresco.
//       </footer>
//     </div>
//   );
// }

// export default App;



// src/App.jsx


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import ProductList from './components/ProductList';
// import Login from './components/Login';
// import Register from './components/Register';
// import CreateProductForm from './components/CreateProductForm';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   const token = localStorage.getItem('token');

//   return (
//     <Router>
//       <div className="App">
//         <NavBar />

//         <main className="p-4">
//           <Routes>
//             <Route path="/" element={<ProductList />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route
//               path="/crear-producto"
//               element={
//                 <ProtectedRoute isAuthenticated={!!token}>
//                   <CreateProductForm token={token} />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </main>

//         <footer className="App-footer p-4 text-center text-sm text-gray-500">
//           &copy; {new Date().getFullYear()} Tu Marketplace Fresco.
//         </footer>
//       </div>
//     </Router>
//   );
// }

// export default App;




// src/App.jsx



import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Register from './components/Register';
import CreateProductForm from './components/CreateProductForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="App">
      <NavBar />

      <main className="p-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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


// src/App.jsx
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
