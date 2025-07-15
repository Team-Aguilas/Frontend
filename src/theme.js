import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#74a57f', // Un verde natural más oscuro para los elementos principales
    },
    secondary: {
      main: '#ff9800', // Un naranja para acentos y botones de acción
    },
    background: {
      default: '#f4f6f8', // Un gris muy claro para el fondo
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
});

export default theme;