import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface ProgressCircleProps {
  value: number;
  size?: number;
  showPercentage?: boolean;
}

const Container = styled('div')({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const getColors = (value: number) => {
  if (value <= 50) {
    return {
      outerColor: '#F44336', 
      innerColor: '#FFCDD2', 
    };
  } else if (value <= 80) {
    return {
      outerColor: '#FFEB3B', 
      innerColor: '#FFF9C4', 
    };
  } else {
    return {
      outerColor: '#4CAF50', 
      innerColor: '#C8E6C9', 
    };
  }
};

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  size = 40,
  showPercentage = true,
}) => {
  const { outerColor, innerColor } = getColors(value);

  return (
    <Container>
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={4}
        sx={{
          color: innerColor,
          position: 'absolute',
          zIndex: 1,
        }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={4}
        sx={{
          color: outerColor,
          position: 'relative',
          zIndex: 2,
        }}
      />
      {showPercentage && (
        <Typography
          variant="body1"
          component="div"
          color="text.secondary"
          sx={{
            position: 'absolute',
            zIndex: 3,
            fontSize: size / 4,
          }}
        >
          {`${Math.round(value)}%`}
        </Typography>
      )}
    </Container>
  );
};

export default ProgressCircle;
