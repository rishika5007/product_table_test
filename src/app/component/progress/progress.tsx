import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface ProgressCircleProps {
  value: number;
  size?: number;
  outerColor?: string;
  innerColor?: string;
  showPercentage?: boolean;
}

const Container = styled('div')({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  size = 40,
  outerColor = '#F44336',
  innerColor = '#FFAB91',
  showPercentage = true,
}) => {
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
