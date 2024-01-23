import React, { useState, useEffect } from 'react';
import 'app/css/gestione_app/ElementoLista.css';
import logo from 'app/assets/avatar-icon.png';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import DatiPaziente from './DatiPaziente';

function ElementoLista({
  index,
  patient,
  id,
}: {
  index: number;
  patient: Paziente;
  id: string;
}): JSX.Element {
  const { fetchPazienteData } = DatiPaziente();
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
    <>
      <input id={id} type="button" onClick={handleClick} hidden />
      <div id={id} key={index} className="elemento">
        <img
          id={id}
          className="propiclist"
          src={logo}
          alt={'paziente ' + { index }}
          style={{ marginRight: '0.75em' }}
        />
        <div style={{ display: 'block', marginTop: '10px' }}>
          <p className="pp">
            {patient.nome} {patient.cognome}
          </p>
        </div>
      </div>
    </>
  );
}

export default ElementoLista;
