// components/button/CustomButton.tsx

import React from 'react';
import { Button } from '@mui/material';
import  styled  from '@emotion/styled';

interface CustomButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  color?: string; // Accept any CSS color value
  customStyles?: { [key: string]: string | number }; // Custom styles as key-value pairs
  onClick?: () => void; // Define onClick
}

const StyledButton = styled(Button)<{ customStyles?: { [key: string]: string | number }; color?: string }>`
  ${({ customStyles }) => customStyles && { ...customStyles }};
  ${({ color }) => color && { backgroundColor: color }};
`;

const CustomButton: React.FC<CustomButtonProps> = ({ label, type = 'button', color, customStyles, onClick, ...rest }) => {
  return (
    <StyledButton
      type={type}
      style={{ backgroundColor: color }}
      customStyles={customStyles}
      onClick={onClick} // Apply the onClick prop
      {...rest}
    >
      {label}
    </StyledButton>
  );
};

export default CustomButton;
