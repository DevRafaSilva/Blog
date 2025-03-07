import React from 'react';
import TextField from '@mui/material/TextField';
import Grid2 from '@mui/material/Grid2';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Chips from '../../componentes/Chips/Chips';
import CardPost from '../../Componentes/CardPost/CardPost';
const Home = () => {
  const [search, setSearch] = React.useState('');
  const [dados, setDados] = React.useState([]);

  React.useEffect(() => {
    async function getPosts() {
      const response = await fetch('https://joebio.xyz/wp-json/api/blog');
      const dados = await response.json();
      console.log(dados);
      setDados(dados);
    }

    getPosts();
  }, []);
  return (
    <>
      <Box component="main" sx={{ maxWidth: '600px', mx: 'auto' }}>
        <Box component="div" sx={{ position: 'relative', px: 2 }}>
          <TextField
            sx={{ my: 5 }}
            fullWidth
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            label="Pesquise algo legal...."
            margin="dense"
            id="fullWidth"
          />
          <Box
            sx={{ position: 'absolute', right: '40px', top: '55px' }}
            component="div"
          >
            <ManageSearchIcon></ManageSearchIcon>
          </Box>
          <Stack
            sx={{ display: 'flex', justifyContent: 'center' }}
            direction="row"
            spacing={1}
          >
            <Chips text="Animais" />
            <Chips text="Passáros" />
            <Chips text="Curiosidades" />
            <Chips text="Vida máritima" />
          </Stack>
          <Stack
            sx={{ display: 'flex', mt: 2, justifyContent: 'center' }}
            direction="row"
            spacing={1}
          >
            <Chips text="Animais" />
            <Chips text="Passáros" />
          </Stack>
        </Box>
      </Box>
      <Grid2
        container
        direction="row"
        sx={{
          my: 5,
          px: 2,
          maxWidth: '900px',
          mx: 'auto',
          justifyContent: 'start',
        }}
        spacing={4}
      >
        {dados && dados.map((post) => <CardPost posts={post}></CardPost>)}
      </Grid2>
    </>
  );
};

export default Home;
