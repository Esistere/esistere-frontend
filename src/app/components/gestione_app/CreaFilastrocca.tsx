import React from 'react';
import 'app/css/gestione_app/FormElements.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function CreaFilastrocca(): JSX.Element {
  return (
    <>
      <form className="formflex">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="riga">
            <TextField
              required
              fullWidth
              id="outlined-multiline-titolo"
              label="Titolo Filatrocca"
              multiline
              maxRows={1}
            />
          </div>

          <div className="riga">
            <TextField
              required
              fullWidth
              id="outlined-multiline-filastrocca"
              label="Testo Filastrocca"
              multiline
              rows={15}
            />
          </div>

          <div className="riga">
            <TextField
              required
              fullWidth
              id="outlined-multiline-flexible"
              label="Autore Filastrocca"
              multiline
              maxRows={1}
            />
          </div>
        </Box>
      </form>
    </>
  );
}

export default CreaFilastrocca;
