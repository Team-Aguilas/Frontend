import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const RatingDisplay = ({ 
  averageRating = 0, 
  totalRatings = 0, 
  showDetails = true, 
  clickable = false, 
  onClick = null 
}) => {
  const displayRating = averageRating > 0 ? averageRating : 0;

  const content = totalRatings === 0 && showDetails ? (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <StarIcon sx={{ color: 'gray', fontSize: '1rem', opacity: 0.3 }} />
      <Typography variant="body2" color="text.secondary">
        Sin calificaciones
      </Typography>
    </Box>
  ) : (
    <Stack direction="row" alignItems="center" spacing={1}>
      <StarIcon sx={{ color: 'gold', fontSize: '1rem' }} />
      <Typography variant="body2" fontWeight="medium">
        {displayRating.toFixed(1)}
      </Typography>
      {showDetails && (
        <Typography variant="body2" color="text.secondary">
          ({totalRatings} {totalRatings === 1 ? 'calificación' : 'calificaciones'})
        </Typography>
      )}
    </Stack>
  );

  if (clickable && totalRatings > 0 && onClick) {
    return (
      <Box
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.7,
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
};

export default RatingDisplay;
