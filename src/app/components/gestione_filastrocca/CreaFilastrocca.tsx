import React, { useState } from 'react';
import 'app/css/gestione_app/FormElements.css';
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';
import Navbar from '../Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2',
    },
  },
});
function CreaFilastrocca(): JSX.Element {
  const [coloreBottone, impostaColoreBottone] = useState<string>('#9149f3');

  const gestisciHover = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottone(nuovoColore);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navbar />
        <form className="formflex">
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '35ch' },
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
            <Button
              style={{
                background: coloreBottone,
                margin: '1em',
              }}
              type="submit"
              variant="contained"
              onMouseEnter={() => gestisciHover(true)}
              onMouseLeave={() => gestisciHover(false)}
            >
              Crea Filastrocca
            </Button>
          </Box>
        </form>
      </>
    </ThemeProvider>
  );
}

export default CreaFilastrocca;
