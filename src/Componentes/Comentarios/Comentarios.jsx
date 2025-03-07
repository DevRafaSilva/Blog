import React from 'react';

const Comentarios = ({ id }) => {
  const [comentario, setComentario] = React.useState([]);

  React.useEffect(() => {
    async function getComentarios() {
      try {
        const response = await fetch(
          `https://joebio.xyz/wp-json/api/comentario?post_id=${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const dados = await response.json();
        setComentario(dados);
        console.log(dados);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
      }
    }

    getComentarios();
  }, [id]);

  console.log(comentario);

  return (
    <div>
      {comentario.map((comentario, index) => (
        <div key={index}>
          <p>{comentario.comment_content}</p>
        </div>
      ))}
    </div>
  );
};

export default Comentarios;
