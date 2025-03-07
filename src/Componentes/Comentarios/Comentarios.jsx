import { Box } from '@mui/material';
import React from 'react';

const Comentarios = ({ id }) => {
  const [comentarioPost, setComentarioPost] = React.useState([]);
  console.log(id);

  React.useEffect(() => {
    async function getComentarios() {
      try {
        const response = await fetch(
          `https://joebio.xyz/wp-json/api/comentario?post_id='${id}'`,
          {
            method: 'GET',
          },
        );
        const dados = await response.json();
        console.log(dados);
        setComentarioPost(dados);
        console.log(dados);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
      }
    }

    getComentarios();
  }, [id]);

  if (comentarioPost) {
    return (
      <Box component="div">
        {comentarioPost.map((comentario, index) => (
          <Box key={index}>
            <p>{comentario.comment_content}</p>
          </Box>
        ))}
      </Box>
    );
  }
};

export default Comentarios;
