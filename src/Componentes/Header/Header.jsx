import React from 'react';
import './Header.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
const Header = () => {
  const navigate = useNavigate();
  const ColorButton = styled(Button)(({ theme }) => ({
    '&:hover': {
      backgroundColor: '#FFB333',
      color: '#fff8e1',
      border: '2px solide #ff6f00',
    },
  }));

  function logout() {
    window.localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      <Box component="header" sx={{ borderBottom: '1px solid #333' }}>
        <Box
          component="nav"
          sx={{ px: 2, py: 2, maxWidth: '900px', mx: 'auto' }}
        >
          <Box
            component="ul"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <NavLink to="/">
              <li>logo</li>
            </NavLink>
            {!window.localStorage.getItem('token') && (
              <Box
                component="div"
                sx={{ display: 'flex', gap: 4, alignItems: 'center' }}
              >
                <NavLink to="/criar">
                  <ColorButton
                    sx={{ borderColor: '#FFB333', color: '#FFB333' }}
                    variant="outlined"
                  >
                    CADASTRE-SE
                  </ColorButton>
                </NavLink>
                <NavLink to="/login">
                  <Box
                    component="li"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      fontSize: '15px',
                    }}
                  >
                    LOGIN <ArrowForwardIcon></ArrowForwardIcon>
                  </Box>
                </NavLink>
              </Box>
            )}
            {window.localStorage.getItem('token') && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
                onClick={logout}
              >
                SAIR
                <LogoutIcon />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
