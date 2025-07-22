import React, { useState } from 'react';
import { Box, Fab, Paper, Typography, TextField, IconButton, CircularProgress } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh'; // 1. Importamos el nuevo ícono
import axios from 'axios';

const CHATBOT_API_URL = 'http://localhost:8003/api/v1/chat';
const INITIAL_MESSAGE = { sender: 'bot', text: '¡Hola! Soy FrescoBot. ¿En qué puedo ayudarte hoy?' };

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]); // Usamos la constante
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(CHATBOT_API_URL, { message: input });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: 'Lo siento, estoy teniendo problemas para conectar. Inténtalo más tarde.' };
      setMessages(prev => [...prev, errorMessage]);
      console.error("Error fetching bot reply:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSend();
    }
  };

  // 2. Creamos la función para borrar la conversación
  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <>
      <Fab color="secondary" sx={{ position: 'fixed', bottom: 32, right: 32 }} onClick={toggleChat}>
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>

      {isOpen && (
        <Paper 
          elevation={8}
          sx={{ 
            position: 'fixed', bottom: 112, right: 32,
            width: 350, height: 500,
            display: 'flex', flexDirection: 'column', borderRadius: 4,
            zIndex: 1300,
          }}
        >
          {/* 3. Añadimos el botón de borrar a la cabecera */}
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">FrescoBot</Typography>
            <IconButton onClick={handleClearChat} size="small" sx={{ color: 'white' }}>
              <RefreshIcon />
            </IconButton>
          </Box>
          
          {/* El resto del componente no cambia */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            {messages.map((msg, index) => (
              <Box key={index} sx={{ mb: 2, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    display: 'inline-block', p: 1.5, borderRadius: 3,
                    bgcolor: msg.sender === 'user' ? 'secondary.main' : 'grey.200',
                    color: msg.sender === 'user' ? 'white' : 'black',
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
            {loading && <Box sx={{textAlign: 'center'}}><CircularProgress size={24} /></Box>}
          </Box>
          <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
            <TextField 
              fullWidth variant="outlined" size="small" placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <IconButton color="primary" onClick={handleSend} disabled={loading}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}

export default Chatbot;