import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

import Repository from './components/Repository';

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    console.log(response);
    console.log(response.title);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositórios
          <Repository title={setRepository(repository.map(repo => repo.title === title))} />

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
