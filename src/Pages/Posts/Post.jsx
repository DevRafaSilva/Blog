import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextArea from '../../Componentes/TextArea/TextArea';
import Titulo from '../../Componentes/Titulo/Titulo';
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import Comentarios from '../../Componentes/Comentarios/Comentarios';

const Post = () => {
  const [dados, setDados] = React.useState([]);
  const [comentario, setComentario] = React.useState('');
  const [comentarioDados, setComentarioDados] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [comentarioAtualizado, setComentarioAtualizado] = React.useState(0);

  const { id } = useParams();

  React.useEffect(() => {
    async function getPosts() {
      const response = await fetch(`https://joebio.xyz/wp-json/api/blog/${id}`);
      const dados = await response.json();
      setDados(dados);
    }

    getPosts();
  }, [loading, id]);

  async function enviarComentario() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://joebio.xyz/wp-json/api/comentario?post_id=${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post_id: id,
            content: comentario,
          }),
        },
      );
      const dados = await response.json();
      console.log(dados);
      setComentarioDados(dados);
      setComentarioAtualizado((prev) => prev + 1);
      setComentario('');
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: '900px',
          borderBottom: '1px solid #ddd',
          mx: 'auto',
          my: 5,
          px: 2,
          py: 4,
        }}
        component="main"
      >
        <Box component="div">
          <Titulo text={dados.post_title} />
          <Box
            key={dados.ID}
            sx={{
              fontFamily: 'Helvetica',
              textAlign: 'left',
              my: 3,
              letterSpacing: 0.8,
              lineHeight: 1.5,
            }}
            component="p"
          >
            {dados.conteudo &&
              dados.conteudo.conteudo.map((conteudo) => (
                <p style={{ display: 'block' }}>{conteudo}</p>
              ))}
          </Box>
          <img
            style={{
              height: '600px',
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src={dados.imagens && dados.imagens[0].src}
            alt=""
          />
        </Box>
      </Box>
      <Box
        sx={{ maxWidth: '900px', mx: 'auto', px: 2, mb: 15 }}
        component="div"
      >
        <Box
          sx={{ mb: 10, display: 'flex', alignItems: 'top', gap: '20px' }}
          component="div"
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <div>
            <p style={{ color: '#FFB333' }}>Diego</p>
            <span
              style={{ marginTop: '8px', display: 'block', color: '#333ee' }}
            >
              <Comentarios id={id} key={comentarioAtualizado} />
            </span>
          </div>
        </Box>
        <TextArea setComentario={setComentario} />
        <Box sx={{ display: 'grid', placeSelf: 'end', mt: 5 }} component="div">
          <Button
            onClick={enviarComentario}
            sx={{ bgcolor: '#FFB333' }}
            variant="contained"
            endIcon={<SendIcon />}
          >
            ENVIAR
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Post;
