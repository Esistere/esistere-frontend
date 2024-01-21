import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import 'app/css/gestione_app/Caricamento.css';
function Caricamento(): JSX.Element {
  return (
    <div className="allContainer">
      <CircularProgress
        sx={{ color: 'blueviolet', width: '10em', height: '10em' }}
      />
    </div>
  );
}

export default Caricamento;
