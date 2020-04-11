import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import './styles.css';

export default function Repository() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }, [repository]);

  async function handleAddRepository() {
    await api.post('repositories');
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepository(repository.filter(repo => repo.id !== id));
  }

  return (
    <div className="repository-container">
      <div className="content">
        <form onSubmit={handleAddRepository}>
          <div className="input-group">
            <input
              placeholder="Título do Repositório"
            />

            <input
              placeholder="URL"
            />

            <input
              placeholder="Tecnologias"
            />
          </div>
          <button onClick={handleAddRepository}>Adicionar</button>
        </form>

          <ul data-testid="repository-list">
            {repository.map(repo => (
              <li key={repo.id}>
                <p>{repo.title}</p>
                  <button onClick={() => handleRemoveRepository(repo.id)}>
                    Remover
                  </button>
              </li>   
            ))}
          </ul>

      </div>
    </div>
  );
}
