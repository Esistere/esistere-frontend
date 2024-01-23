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
  Snackbar,
  Alert,
} from '@mui/material';
import Navbar from '../Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Filastrocca } from 'app/interfaces/gestione_filastrocche/Filastrocca';
import ResponsiveDialog from '../gestione_app/ResponsiveDialog';
import FilastroccaControl from 'app/control/gestione_filastrocca/FilastroccaControl';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2',
    },
  },
});
function CreaFilastrocca(): JSX.Element {
  const [filastrocca, setFilastrocca] = useState<Filastrocca>({
    id: undefined,
    cg_fam: Number(localStorage.getItem('id')),
    titolo: '',
    testo: '',
    autore: '',
  });
  const [isTitoloValid, setIsTitoloValid] = useState<boolean>(true);
  const [titoloErrore, setTitoloErrore] = useState<string>('');
  const handleTitoloChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    if (value.length <= 30) {
      setFilastrocca((prevFilastrocca) => ({
        ...prevFilastrocca,
        titolo: value,
      }));
      setTitoloErrore('');
      setIsTitoloValid(true);
    } else {
      setTitoloErrore('Il campo Titolo deve essere lungo al più 30 caratteri.');
      setIsTitoloValid(false);
    }
  };

  const [isTestoValid, setIsTestoValid] = useState<boolean>(true);
  const [testoErrore, setTestoErrore] = useState<string>('');
  const handleTestoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    if (value.length <= 300) {
      setFilastrocca((prevFilastrocca) => ({
        ...prevFilastrocca,
        testo: value,
      }));
      setTestoErrore('');
      setIsTestoValid(true);
    } else {
      setTestoErrore('Il campo Testo deve essere lungo al più 300 caratteri.');
      setIsTestoValid(false);
    }
  };

  const [isAutoreValid, setIsAutoreValid] = useState<boolean>(true);
  const [autoreErrore, setAutoreErrore] = useState<string>('');
  const handleAutoreChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    if (value.length <= 30) {
      setFilastrocca((prevFilastrocca) => ({
        ...prevFilastrocca,
        autore: value,
      }));
      setAutoreErrore('');
      setIsAutoreValid(true);
    } else {
      setAutoreErrore('Il campo Autore deve essere lungo al più 30 caratteri.');
      setIsAutoreValid(false);
    }
  };

  const [coloreBottone, impostaColoreBottone] = useState<string>('#9149f3');

  const gestisciHover = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottone(nuovoColore);
  };

  const areFieldsFilled = (): boolean => {
    return (
      isTitoloValid &&
      isTestoValid &&
      isAutoreValid &&
      filastrocca.titolo !== '' &&
      filastrocca.testo !== '' &&
      filastrocca.autore !== ''
    );
  };
  // Snackbar
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [show, setShow] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleInserisciFilastrocca = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (areFieldsFilled()) {
      const filastroccaControl = new FilastroccaControl();
      const success = await filastroccaControl.inviaDatiFilastrocca(
        filastrocca
      );
      setSuccess(success);
      setOpen(true);
    } else {
      setShow(true);
      console.log('Errore: Tutti i campi devono essere compilati.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navbar />
        {show && <ResponsiveDialog onClose={() => setShow(false)} />}
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
              <form
                className="formflex2"
                method="post"
                onSubmit={handleInserisciFilastrocca}
              >
                <div className="riga">
                  <div id="titolo-text-area">
                    <TextField
                      required
                      fullWidth
                      name="titolo"
                      id="outlined-multiline-titolo"
                      label="Titolo Filastrocca"
                      multiline
                      maxRows={1}
                      style={{ boxSizing: 'border-box', marginBottom: '1em' }}
                      onChange={handleTitoloChange}
                      value={filastrocca.titolo}
                      error={!isTitoloValid && filastrocca.titolo.length > 0}
                    />
                  </div>
                </div>
                <div
                  className="riga"
                  style={{ marginTop: '1em', marginBottom: '2em' }}
                >
                  {titoloErrore && (
                    <div style={{ color: '#D32F2F' }}>{titoloErrore}</div>
                  )}
                </div>

                <div className="riga">
                  <div id="testo-text-area">
                    <TextField
                      required
                      fullWidth
                      name="testo"
                      id="outlined-multiline-filastrocca"
                      label="Testo Filastrocca"
                      multiline
                      rows={15}
                      style={{ boxSizing: 'border-box', marginBottom: '1em' }}
                      onChange={handleTestoChange}
                      value={filastrocca.testo}
                      error={!isTestoValid && filastrocca.testo.length > 0}
                    />
                  </div>
                </div>
                <div
                  className="riga"
                  style={{ marginTop: '1em', marginBottom: '2em' }}
                >
                  {testoErrore && (
                    <div style={{ color: '#D32F2F' }}>{testoErrore}</div>
                  )}
                </div>

                <div className="riga">
                  <div id="autore-text-area">
                    <TextField
                      required
                      fullWidth
                      name="autore"
                      id="outlined-multiline-flexible"
                      label="Autore Filastrocca"
                      multiline
                      maxRows={1}
                      style={{ boxSizing: 'border-box', marginBottom: '1em' }}
                      onChange={handleAutoreChange}
                      value={filastrocca.autore}
                      error={!isAutoreValid && filastrocca.autore.length > 0}
                    />
                  </div>
                </div>
                <div
                  className="riga"
                  style={{ marginTop: '1em', marginBottom: '2em' }}
                >
                  {autoreErrore && (
                    <div style={{ color: '#D32F2F' }}>{autoreErrore}</div>
                  )}
                </div>
                <div>
                  <Button
                    style={{
                      background: coloreBottone,
                      margin: '1em',
                      width: '40%',
                    }}
                    id="creaFilastrocca"
                    type="submit"
                    variant="contained"
                    onMouseEnter={() => gestisciHover(true)}
                    onMouseLeave={() => gestisciHover(false)}
                  >
                    Crea Filastrocca
                  </Button>
                </div>
                <div id="test">
                  <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity={success ? 'success' : 'error'}
                      sx={{ width: '100%' }}
                    >
                      {success
                        ? 'Caricamento filastrocca effettuato con successo!'
                        : 'Caricamento filastrocca fallita'}
                    </Alert>
                  </Snackbar>
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
