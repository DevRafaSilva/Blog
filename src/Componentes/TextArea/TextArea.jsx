import React from 'react';
import TextField from '@mui/material/TextField';
const TextArea = ({ setComentario }) => {
  return (
    <>
      <TextField
        onChange={(event) => setComentario(event.target.value)}
        fullWidth
        id="outlined-multiline-static"
        label="Comentário"
        multiline
        rows={4}
        placeholder="Deixe seu comentário"
      />
    </>
  );
};

export default TextArea;
