import 'app/css/gestione_app/App.css';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import PazienteService from 'app/services/gestione_autenticazione/PazienteService';
import React, { useEffect, useState } from 'react';
import ElementoLista from './ElementoLista';

function ListaPazienti(): JSX.Element {
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
    <div className="ListaPazienti">
      <header className="ListaPazieti-header"></header>
      {pazienti.map((paziente, index) => {
        return ElementoLista(index, paziente.nome, paziente.cognome);
      })}
    </div>
  );
}

export default ListaPazienti;
