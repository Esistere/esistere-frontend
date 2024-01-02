import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import 'app/css/gestione_app/Caricamento.css';

function Caricamento(): JSX.Element {
  return (
    <div className="CircProgContainer">
      <CircularProgress style={{ color: 'blueviolet' }} />
    </div>
  );
}

export default Caricamento;
