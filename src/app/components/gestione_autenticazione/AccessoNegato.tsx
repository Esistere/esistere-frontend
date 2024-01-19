import React from 'react';
//import 'app/css/gestione_app/AccessoNegato.css';
import accessoNegato from 'app/assets/images/accessoNegato.jpg';
import { Typography } from '@mui/material';
import Pulsante from '../gestione_app/Pulsante';
const AccessoNegato: React.FC = (): JSX.Element => {
  const handleGoBack = (): void => {
    window.history.back();
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img src={accessoNegato} style={{ maxWidth: '30em', height: 'auto' }} />
      <br />
      <Typography
        variant="h4"
        style={{ color: 'blueviolet', textAlign: 'center' }}
      >
        Attenzione! Stai tentando di accedere ad un&apos;area protetta.
      </Typography>
      <Pulsante
        tipologia="scuro"
        nome="torna-indietro"
        testo="Torna indietro"
        onClick={() => handleGoBack()}
        style={{ width: '10em' }}
      />
    </div>
    /*<div className="Back">
      <div className="text">
        <h1 style={{ textAlign: 'center', marginTop: '9em' }}>
          Attenzione non sei autorizzato ad accedere a questo servizio
        </h1>
      </div>
      <button onClick={handleGoBack} style={{ backgroundColor: 'blueviolet' }}>
        Torna Indietro
      </button>
    </div> */
  );
};
export default AccessoNegato;
