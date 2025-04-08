import React from 'react';

const Product = ({ produto }) => {
  return (
    <>
      <span>
      {produto.nome} - {produto.preco}
      </span>  
      <button>Adicionar ao carrinho</button>
    </>
  );
};

export default Product;