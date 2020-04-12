import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
        const response = await api.post('repositories', {
          title: 'Be The Hero',
          url: 'https://github.com/luisscarlos/be-the-hero',
          techs: ['Node.js', 'ReactJS'],
        });

        setRepository([...repository, response.data]);
  }

  async function handleRemoveRepository(id) {
      await api.delete(`repositories/${id}`);

      const newRepository = repository.filter(repo => repo.id !== id)
      setRepository(newRepository);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repo => (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>   
          ))}
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
