import React from 'react';
import ButtonMUI from '@mui/material/Button';
import { styled } from '@mui/material';
import './Button.css';
const Button = ({ fazerLogin }) => {
  const ButtonMuiStyle = styled(ButtonMUI)(({ theme }) => ({
    backgroundColor: '#ffb333',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#ffb333',
      border: '2px solid #ffb333',
    },
  }));

  return (
    <>
      <ButtonMuiStyle
        className="button"
        onClick={fazerLogin}
        sx={{ px: 2, py: 2, my: 4 }}
        variant="contained"
        disableElevation
      >
        Entrar
      </ButtonMuiStyle>
    </>
  );
};

export default Button;
