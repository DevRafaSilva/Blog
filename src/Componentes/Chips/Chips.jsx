import React from 'react';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material';
const ChipsComponente = ({ text }) => {
  const ChipStyled = styled(Chip)(({ target }) => ({
    '&:hover': {
      backgroundColor: '#1b5e20',
      color: '#e8f5e9',
      cursor: 'pointer',
    },
  }));

  return (
    <>
      <ChipStyled
        sx={{ bgcolor: '#e8f5e9', color: '#1b5e20' }}
        label={text}
        color="primary"
      />
    </>
  );
};

export default ChipsComponente;
