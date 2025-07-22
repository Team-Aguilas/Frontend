// frontend/src/App.jsx
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import AppRoutes from './AppRoutes';
import { CssBaseline, Container, ThemeProvider } from '@mui/material'; // 1. Importa ThemeProvider
import theme from './theme'; // 2. Importa nuestro nuevo tema
import Chatbot from './components/Chatbot'; 

function App() {
  return (
    // 3. Envuelve todo en el ThemeProvider
    <ThemeProvider theme={theme}> 
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <CssBaseline />
            <div className="App">
              <Navbar />
              <Container component="main" sx={{ mt: 4, mb: 4 }}>
                <AppRoutes />
              </Container>
              <footer className="App-footer">
                <p>&copy; {new Date().getFullYear()} Tu Marketplace Fresco.</p>
              </footer>
              <Chatbot />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;