import React, { useState } from "react";
import Item from "./Contato";

const ContatoList = ({ name }) => {
  const [contatos, setContatos] = useState([]); // Array de contatos
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingNome, setEditingNome] = useState("");
  const [editingEmail, setEditingEmail] = useState("");
  const [editingTelefone, setEditingTelefone] = useState("");

  // Create
  const addContato = () => {
    if (nome.trim() === "" || email.trim() === "" || telefone.trim() === "") return;
    setContatos([...contatos, { id: Date.now(), nome, email, telefone }]);
    setNome("");
    setEmail("");
    setTelefone("");
  };

  // Start editing
  const startEditing = (id, contato) => {
    setEditingId(id);
    setEditingNome(contato.nome);
    setEditingEmail(contato.email);
    setEditingTelefone(contato.telefone);
  };

  // Save edit
  const saveEdit = () => {
    setContatos(
      contatos.map((contato) =>
        contato.id === editingId
          ? { ...contato, nome: editingNome, email: editingEmail, telefone: editingTelefone }
          : contato
      )
    );
    setEditingId(null);
    setEditingNome("");
    setEditingEmail("");
    setEditingTelefone("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditingNome("");
    setEditingEmail("");
    setEditingTelefone("");
  };

  // Delete
  const deleteContato = (id) => {
    setContatos(contatos.filter((contato) => contato.id !== id));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Lista de Contatos {name}</h2>

      <input
        type="text"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
        placeholder="Nome do contato"
      />
      <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email do contato"
      />
      <input
        type="text"
        value={telefone}
        onChange={(event) => setTelefone(event.target.value)}
        placeholder="Telefone do contato"
      />
      <button onClick={addContato}>Adicionar Contato</button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {contatos.map((contato) => (
          <li key={contato.id} style={{ margin: "10px 0" }}>
            {editingId === contato.id ? (
              <>
                <input
                  type="text"
                  value={editingNome}
                  onChange={(event) => setEditingNome(event.target.value)}
                  placeholder="Editar Nome"
                />
                <input
                  type="text"
                  value={editingEmail}
                  onChange={(event) => setEditingEmail(event.target.value)}
                  placeholder="Editar Email"
                />
                <input
                  type="text"
                  value={editingTelefone}
                  onChange={(event) => setEditingTelefone(event.target.value)}
                  placeholder="Editar Telefone"
                />
                <button onClick={saveEdit}>Salvar</button>
                <button onClick={cancelEdit}>Cancelar</button>
              </>
            ) : (
              <>
                <Item contato={contato} /> {/* Passa o objeto contato como prop */}
                <button onClick={() => startEditing(contato.id, contato)}>
                  Editar
                </button>
                <button onClick={() => deleteContato(contato.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContatoList;
