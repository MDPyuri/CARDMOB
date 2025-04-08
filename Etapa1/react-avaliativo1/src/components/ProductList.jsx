import React, { useState } from "react";
import Product from "./ProductCard";

const ProductList = ({ name }) => {
  const [produtos, setProdutos] = useState([]); // Array de produtos
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingNome, setEditingNome] = useState("");
  const [editingPreco, setEditingPreco] = useState("");

  // Create
  const addProduto = () => {
    if (preco.trim() === "" || nome.trim() === "") return;
    setProdutos([...produtos, { id: Date.now(), nome, preco }]); // Adicionado "nome"
    setNome("");
    setPreco("");
  };

  // Start editing
  const startEditing = (id, produto) => {
    setEditingId(id);
    setEditingNome(produto.nome);
    setEditingPreco(produto.preco);
  };

  // Save edit
  const saveEdit = () => {
    setProdutos(
      produtos.map((produto) =>
        produto.id === editingId
          ? { ...produto, preco: editingPreco, nome: editingNome }
          : produto
      )
    );
    setEditingId(null);
    setEditingNome("");
    setEditingPreco("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditingNome("");
    setEditingPreco("");
  };

  // Delete
  const deleteProduto = (id) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Prateleira {name}</h2>

      <input
        type="text"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
        placeholder="Nome do produto"
      />
      <input
        type="text"
        value={preco}
        onChange={(event) => setPreco(event.target.value)}
        placeholder="Preço do produto"
      />
      <button onClick={addProduto}>Adicionar Produto</button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {produtos.map((produto) => (
          <li key={produto.id} style={{ margin: "10px 0" }}> {/* Corrigido "ptoduto" para "produto" */}
            {editingId === produto.id ? (
              <>
                <input
                  type="text"
                  value={editingNome}
                  onChange={(event) => setEditingNome(event.target.value)}
                  placeholder="Editar Nome"
                />
                <input
                  type="text"
                  value={editingPreco}
                  onChange={(event) => setEditingPreco(event.target.value)}
                  placeholder="Editar Preço"
                />
                <button onClick={saveEdit}>Salvar</button>
                <button onClick={cancelEdit}>Cancelar</button>
              </>
            ) : (
              <>
                <Product produto={produto} /> {/* Passa o objeto produto como prop */}
                <button onClick={() => startEditing(produto.id, produto)}>
                  Editar
                </button>
                <button onClick={() => deleteProduto(produto.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
