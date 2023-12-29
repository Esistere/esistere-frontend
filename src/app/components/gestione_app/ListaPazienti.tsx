import React, { useEffect, useState } from 'react';
import ElementoLista from './ElementoLista';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import PazienteService from 'app/services/gestione_autenticazione/PazienteService';

function ListaPazienti(): JSX.Element {
  const [pazienti, setPazienti] = useState<Paziente[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (): Promise<void> => {
    const pazienteService = new PazienteService();

    try {
      const data = await pazienteService.fetchPazienti();
      setPazienti(data);
      setIsLoading(false);
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
      {isLoading ? (
        <p>Loading...</p>
      ) : pazienti.length === 0 ? (
        <p>Non ci sono pazienti.</p>
      ) : (
        pazienti.map((paziente, index) => {
          return ElementoLista(index, paziente.nome, paziente.cognome);
        })
      )}
    </div>
  );
}

export default ListaPazienti;
