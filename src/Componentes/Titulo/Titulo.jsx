import React from 'react';

const Titulo = ({ text }) => {
  return (
    <h1
      style={{
        fontFamily: 'Arial,Helvetic',
        textAlign: 'center',
        fontSize: '45px',
      }}
    >
      {text}
    </h1>
  );
};

export default Titulo;
