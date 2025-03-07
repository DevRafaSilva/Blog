import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '../Componentes/Button';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';
import './Login.css';
import './Criar.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Criar = () => {
  const [error, setError] = React.useState('');
  const [usuario, setsuario] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const navigate = useNavigate();
  React.useEffect(() => {
    if (
      window.localStorage.getItem('token') &&
      window.location.pathname === '/criar'
    ) {
      navigate('/');
    }
  }, [navigate]);

  async function criarConta() {
    const response = await fetch('https://joebio.xyz/wp-json/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuario: usuario,
        email: email,
        senha: senha,
      }),
    });
    const dados = await response.json();
    console.log(dados);
    if (!dados.code) {
      fazerLogin();
      setError('');
    }

    if (dados.code) setError(dados.message);
  }
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
    window.localStorage.setItem('token', dados.token);
    if (dados.token) validarToken();
  }
  async function validarToken() {
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
              value={usuario}
              onChange={(event) => {
                setsuario(event.target.value);
              }}
              label="Usuário"
              margin="dense"
              id="fullWidth"
            />
            <div className="iconeInput">
              <PersonIcon />
            </div>
          </div>
          <div className="inputDiv emailInput">
            <TextField
              fullWidth
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              label="Email"
              margin="dense"
              id="fullWidth"
              sx={{ mt: 4 }}
            />
            <div className=" emailIcone ">
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
          <NavLink to="/login">
            <p className="LinkLogin">
              Já possui uma conta ? <span className="login">Login</span>
            </p>
          </NavLink>
          {error && <p style={{ margin: '20px 0', color: 'red' }}>{error}</p>}
          <Box display="grid">
            <Button fazerLogin={criarConta} />
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Criar;
