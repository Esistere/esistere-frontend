import React, { useState, useEffect } from 'react';
import 'app/css/gestione_app/ElementoLista.css';
import logo from 'app/assets/logo.svg';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import PazienteService from 'app/services/gestione_autenticazione/PazienteService';

function ElementoLista({
  key,
  cf,
  name,
  surname,
}: {
  key: number;
  cf: string;
  name: string;
  surname: string;
}): JSX.Element {
  const [paziente, setPaziente] = useState<Paziente | null>(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  useEffect(() => {
    if (isButtonPressed) {
      const fetchData = async (): Promise<void> => {
        const pazienteService = new PazienteService();

        try {
          const data = await pazienteService.fetchDatiPaziente(cf);
          setPaziente(data);
        } catch (error) {
          console.error('Error fetching paziente:', error);
        }
      };
      fetchData();
    }
  }, [isButtonPressed, cf]);

  const handleClick = (): void => {
    setIsButtonPressed(true);
  };

  return (
    <div key={key} className="elemento" onClick={handleClick}>
      <img className="propiclist" src={logo} alt={'paziente ' + { key }} />
      <p className="pp">
        {name} {surname}
      </p>
      <br />
      <div>
        <p>
          {paziente?.codice_fiscale} {paziente?.nome}
        </p>
      </div>
    </div>
  );
}

export default ElementoLista;
