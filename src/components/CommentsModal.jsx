import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  Rating, 
  Divider,
  Avatar,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';

const CommentsModal = ({ open, onClose, comments = [], productName = '' }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          maxHeight: '80vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Typography variant="h6" component="div">
          Comentarios de "{productName}"
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 0 }}>
        {comments.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              Aún no hay comentarios para este producto.
            </Typography>
          </Box>
        ) : (
          <Box>
            {comments.map((comment, index) => (
              <Box key={index}>
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                      {comment.user_email ? comment.user_email.charAt(0).toUpperCase() : '?'}
                    </Avatar>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {comment.user_email || 'Usuario anónimo'}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              sx={{
                                fontSize: '1rem',
                                color: star <= comment.rating ? '#FFD700' : '#E0E0E0'
                              }}
                            />
                          ))}
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                            ({comment.rating}/5)
                          </Typography>
                        </Box>
                      </Box>
                      
                      {comment.comment && (
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          {comment.comment}
                        </Typography>
                      )}
                      
                      {comment.created_at && (
                        <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
                          {new Date(comment.created_at).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
                
                {index < comments.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentsModal;
