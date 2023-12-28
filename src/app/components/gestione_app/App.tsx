import logo from 'app/assets/logo.svg';
import 'app/css/gestione_app/App.css';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import PazienteService from 'app/services/gestione_autenticazione/PazienteService';
import React, { useEffect, useState } from 'react';

function App(): JSX.Element {
  const [pazienti, setPazienti] = useState<Paziente[]>([]);
  const fetchData = async (): Promise<void> => {
    const pazienteService = new PazienteService();

    try {
      const data = await pazienteService.fetchPazienti();
      setPazienti(data);
    } catch (error) {
      console.error('Error fetching pazienti:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ul>
          {pazienti.map((paziente, index) => (
            <li key={index}>
              {paziente.nome} {paziente.cognome}
            </li>
          ))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
