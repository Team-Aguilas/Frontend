import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const RatingDisplay = ({ averageRating = 0, totalRatings = 0, showDetails = true }) => {
  const displayRating = averageRating > 0 ? averageRating : 0;

  if (totalRatings === 0 && showDetails) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <StarIcon sx={{ color: 'gray', fontSize: '1rem', opacity: 0.3 }} />
        <Typography variant="body2" color="text.secondary">
          Sin calificaciones
        </Typography>
      </Box>
    );
  }

  return (
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
};

export default RatingDisplay;
