import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import 'app/css/gestione_app/Caricamento.css';
import { Stack } from '@mui/material';

function Caricamento(): JSX.Element {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%' }}
    >
      <CircularProgress
        sx={{ color: 'blueviolet', width: '10em', height: '10em' }}
      />
    </Stack>
  );
}

export default Caricamento;
