import React from 'react';
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
  );
};
export default AccessoNegato;
