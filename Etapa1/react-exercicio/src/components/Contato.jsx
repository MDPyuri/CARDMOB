import React from 'react';

const Item = ({ contato }) => {
  return (
    <>
      <span>
        {contato.nome} - {contato.email} - {contato.telefone}
      </span>
    </>
  );
};

export default Item;