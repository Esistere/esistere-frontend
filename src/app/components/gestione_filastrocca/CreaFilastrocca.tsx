import React, { useState } from 'react';
import 'app/css/gestione_app/FormElements.css';
import {
  TextField,
  Button,
  Typography,
  CssBaseline,
  Container,
  Card,
  CardMedia,
  Stack,
} from '@mui/material';
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
        <Typography
          variant="h4"
          color="blueviolet"
          textAlign="center"
          marginTop="1em"
        >
          Scrivi una nuova filastrocca
        </Typography>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Card
            sx={{
              marginTop: 4,
              display: 'flex',
              alignItems: 'center',
              padding: (theme) => theme.spacing(3),
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 3px 5px 2px rgba(155, 105, 135,.3)',
              color: '#5E35B1',
            }}
          >
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ width: '100%' }}
            >
              <div className="formflex2">
                <div className="riga">
                  <CardMedia
                    component="img"
                    style={{ width: '80%', height: '80%' }}
                    image={require('app/assets/images/scriviFilastrocca.jpg')}
                  />
                </div>
              </div>
              <form className="formflex2" method="post">
                <div className="riga">
                  <TextField
                    required
                    fullWidth
                    id="outlined-multiline-titolo"
                    label="Titolo Filastrocca"
                    multiline
                    maxRows={1}
                    style={{ boxSizing: 'border-box', marginBottom: '1em' }}
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
                    style={{ boxSizing: 'border-box', marginBottom: '1em' }}
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
                    style={{ boxSizing: 'border-box', marginBottom: '1em' }}
                  />
                </div>
                <div>
                  <Button
                    style={{
                      background: coloreBottone,
                      margin: '1em',
                      width: '40%',
                    }}
                    type="submit"
                    variant="contained"
                    onMouseEnter={() => gestisciHover(true)}
                    onMouseLeave={() => gestisciHover(false)}
                  >
                    Crea Filastrocca
                  </Button>
                </div>
              </form>
            </Stack>
          </Card>
        </Container>
      </>
    </ThemeProvider>
  );
}

export default CreaFilastrocca;
