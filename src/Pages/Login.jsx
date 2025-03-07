import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '../Componentes/Button';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import './Login.css';
import './Criar.css';
import { NavLink, useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (
      window.localStorage.getItem('token') &&
      window.location.pathname === '/login'
    ) {
      navigate('/');
    }
  }, [navigate]);

  async function fazerLogin() {
    const response = await fetch(
      'https://joebio.xyz/wp-json/jwt-auth/v1/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: senha,
        }),
      },
    );
    const dados = await response.json();
    dados.code ? setError(dados.message) : setError('');

    if (dados.token) {
      window.localStorage.setItem('token', dados.token);

      validarToken();
    }
  }

  async function validarToken() {
    setError('');
    const response = await fetch(
      'https://joebio.xyz/wp-json/jwt-auth/v1/token/validate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      },
    );
    const dados = await response.json();
    console.log(dados);
    if (dados.data.status === 200) navigate('/');
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: 500,
          height: '100vh',
          mx: 'auto',
          display: 'grid',
          alignItems: 'center',
        }}
      >
        <div className="divInputs">
          <div className="inputDiv">
            <TextField
              fullWidth
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              label="Email"
              margin="dense"
              id="fullWidth"
            />
            <div className="iconeInput">
              <EmailIcon />
            </div>
          </div>
          <div className="inputDiv">
            <TextField
              fullWidth
              value={senha}
              onChange={(event) => {
                setSenha(event.target.value);
              }}
              label="Senha"
              sx={{ mt: 4 }}
              id="fullWidth"
            />
            <div className="iconeInput password">
              <PasswordIcon />
            </div>
          </div>
          <NavLink to="/criar">
            <p className="LinkLogin">Criar Conta</p>
          </NavLink>
          {error && <p style={{ margin: '20px 0px', color: 'red' }}>{error}</p>}
          <Box display="grid">
            <Button fazerLogin={fazerLogin} />
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Login;
