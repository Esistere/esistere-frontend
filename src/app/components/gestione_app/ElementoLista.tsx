import React, { useState, useEffect } from 'react';
import 'app/css/gestione_app/ElementoLista.css';
import logo from 'app/assets/logo.svg';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import useFetchPazienteData from './useFetchPazienteData';

function ElementoLista({
  index,
  patient,
}: {
  index: number;
  patient: Paziente;
}): JSX.Element {
  const { fetchPazienteData } = useFetchPazienteData();
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  useEffect(() => {
    if (isButtonPressed) {
      fetchPazienteData(patient.codice_fiscale);
    }
    setIsButtonPressed(false);
  }, [isButtonPressed, patient, fetchPazienteData]);

  const handleClick = (): void => {
    setIsButtonPressed(true);
  };

  return (
    <div key={index} className="elemento" onClick={handleClick}>
      <img className="propiclist" src={logo} alt={'paziente ' + { index }} />
      <div style={{ display: 'block', marginTop: '10px' }}>
        <p className="pp">
          {patient.nome} {patient.cognome}
        </p>
      </div>
    </div>
  );
}

export default ElementoLista;
