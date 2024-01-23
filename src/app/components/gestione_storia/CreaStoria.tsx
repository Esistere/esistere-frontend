import React, { useState } from 'react';
import 'app/css/gestione_app/FormElements.css';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import Navbar from '../Navbar';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import StoriaControl from 'app/control/gestione_storia/StoriaControl';
import {
  Alert,
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { StoriaMedia } from 'app/interfaces/gestione_storia/StoriaMedia';
import ResponsiveDialog from 'app/components/gestione_app/ResponsiveDialog';
const theme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2',
    },
  },
});
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
function CreaStoria(): JSX.Element {
  const [coloreBottoneCaricaFile, impostaColoreBottoneCaricaFile] =
    useState<string>('#9149f3');
  const [coloreBottoneSalva, impostaColoreBottoneSalva] =
    useState<string>('#9149f3');
  const [datiStoria, setDatiStoria] = useState<StoriaMedia>({
    id: undefined,
    cg_fam: Number(localStorage.getItem('id')),
    testo: '',
    media: {
      id: undefined,
      storia: undefined,
      descrizione: '',
      tipo: -1,
    },
  });
  const storiaControl = new StoriaControl();
  const [show, setShow] = React.useState(false);
  const gestisciHoverCaricaFile = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottoneCaricaFile(nuovoColore);
  };

  const gestisciHoverSalva = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottoneSalva(nuovoColore);
  };

  const [file, setFile] = useState<File | null>(null);
  const [messaggioErrore, setMessaggioErrore] = useState<string>('');

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files && event.target.files[0]) {
      const nomeFile = event.target.files[0].name;
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      console.log('Nome del file:', nomeFile);

      const tipo = event.target.files[0].type;
      if (tipo.startsWith('image/') || tipo.startsWith('audio/')) {
        setMessaggioErrore('');
        const numTipo = tipo.startsWith('image/') ? 0 : 1;
        if (tipo.startsWith('image/')) {
          if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
              if (e && e.target !== null) {
                setDatiStoria((prev) => ({
                  ...prev,
                  media: {
                    ...prev.media,
                    tipo: numTipo,
                  },
                }));
              } else {
                console.error('Errore durante la lettura del file.');
                setMessaggioErrore('Errore durante la lettura del file.');
              }
            };
          }
        }
      } else {
        setFile(null);
        setMessaggioErrore(
          'Il file selezionato non è un file immagine o audio.'
        );
      }
    }
  };

  const areFieldsFilled = (): boolean => {
    return (
      datiStoria.testo.trim() !== '' &&
      datiStoria.media.descrizione.trim() !== '' &&
      file !== null
    );
  };

  const handleSave = async (): Promise<void> => {
    if (
      areFieldsFilled() &&
      datiStoria.media.tipo !== -1 &&
      datiStoria.testo.trim().length < 300 &&
      datiStoria.media.descrizione.trim().length < 300
    ) {
      const success = await storiaControl.inviaStoria(datiStoria, file);
      setSuccess(success);
      setOpen(true);
    } else {
      setShow(true);
      console.log('Errore: Tutti i campi devono essere compilati.');
    }
  };

  // Controlli
  const [isTestoValid, setIsTestoValid] = useState<boolean>(true);
  const [testoErrore, setTestoErrore] = useState<string>('');
  const handleTestoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newTesto = event.target.value;
    setDatiStoria((prevDatiStoria) => ({
      ...prevDatiStoria,
      testo: newTesto,
      media: {
        ...prevDatiStoria.media,
      },
    }));

    const isTestoValid = newTesto.length <= 300;
    setIsTestoValid(isTestoValid);

    if (!isTestoValid) {
      setTestoErrore('Il campo testo deve essere lungo al più 30 caratteri.');
    } else {
      setTestoErrore('');
    }
  };

  const [isDescrizioneValid, setIsDescrizioneValid] = useState<boolean>(true);
  const [descrizioneErrore, setDescrizioneErrore] = useState<string>('');
  const handleDescrizioneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newDescrizione = event.target.value;
    setDatiStoria((prevDatiStoria) => ({
      ...prevDatiStoria,
      media: {
        ...prevDatiStoria.media,
        descrizione: newDescrizione,
      },
    }));

    const isDescrizioneValid = newDescrizione.length <= 300;
    setIsDescrizioneValid(isTestoValid);

    if (!isDescrizioneValid) {
      setDescrizioneErrore(
        'Il campo descrizione deve essere lungo al più 30 caratteri.'
      );
    } else {
      setDescrizioneErrore('');
    }
  };

  // Snackbar
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navbar />
        <Container component="main" maxWidth="lg">
          {show && <ResponsiveDialog onClose={() => setShow(false)} />}
          <CssBaseline />
          <Card
            sx={{
              marginTop: 8,
              display: 'flex',
              alignItems: 'column',
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
              <div className="formflex2" style={{ alignItems: 'top' }}>
                <div className="riga">
                  <CardContent>
                    <Typography
                      variant="h4"
                      color="blueviolet"
                      textAlign="center"
                      style={{
                        marginBottom: '2em',
                      }}
                    >
                      Scrivi una nuova storia
                    </Typography>
                    <Typography variant="h5" color="black" textAlign="left">
                      Caricare un&apos;immagine o un file vocale potrebbe
                      aiutare a la persona che segui a continuare a ricordare
                      parti importanti della sua vita!
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    style={{ width: '24em', height: 'auto', marginLeft: '2em' }}
                    image={require('app/assets/images/scriviStoria.png')}
                  />
                </div>
              </div>
              <form
                className="formflex"
                method="post"
                encType="multipart/form-data"
              >
                <div className="riga">
                  <div id="text-area">
                    <TextField
                      required
                      error={!isTestoValid}
                      id="testo"
                      name="testo"
                      label="Testo Storia"
                      multiline
                      rows={8}
                      value={datiStoria.testo}
                      onChange={handleTestoChange}
                      style={{
                        margin: '1em ',
                        width: '20em',
                        boxSizing: 'border-box',
                      }}
                    />
                    {testoErrore && (
                      <div style={{ color: '#D32F2F' }}>{testoErrore}</div>
                    )}
                  </div>
                </div>
                <div className="riga">
                  <Button
                    component="label"
                    id="caricaFile"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onMouseEnter={() => gestisciHoverCaricaFile(true)}
                    onMouseLeave={() => gestisciHoverCaricaFile(false)}
                    style={{
                      backgroundColor: coloreBottoneCaricaFile,
                      color: '#ffffff',
                      margin: '1em',
                      width: '25%',
                    }}
                  >
                    Carica file
                    <VisuallyHiddenInput
                      name="file"
                      type="file"
                      accept=".png, .jpg, .jpeg, .bmp, .tif, .tiff, audio/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                </div>
                <div className="riga">
                  {messaggioErrore && (
                    <div style={{ color: '#D32F2F' }}>{messaggioErrore}</div>
                  )}
                </div>
                <div id="descrizione-file">
                  <div className="riga">
                    <TextField
                      required
                      fullWidth
                      id="descrizione"
                      name="descrizione"
                      label="Descrizione File"
                      multiline
                      error={!isDescrizioneValid}
                      rows={4}
                      value={datiStoria.media.descrizione}
                      onChange={handleDescrizioneChange}
                      style={{
                        margin: '1.5em ',
                        width: '20em',
                        boxSizing: 'border-box',
                      }}
                    />
                    {descrizioneErrore && (
                      <div style={{ color: '#D32F2F' }}>
                        {descrizioneErrore}
                      </div>
                    )}
                  </div>
                </div>
                <div className="riga">
                  <Button
                    id="salvaStoria"
                    style={{
                      backgroundColor: coloreBottoneSalva,
                      color: '#ffffff',
                      margin: '1em',
                      width: '25%',
                    }}
                    onClick={handleSave}
                    onMouseEnter={() => gestisciHoverSalva(true)}
                    onMouseLeave={() => gestisciHoverSalva(false)}
                  >
                    Salva storia
                  </Button>
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
                          ? 'Caricamento storia effettuato con successo!'
                          : 'Caricamento storia fallita'}
                      </Alert>
                    </Snackbar>
                  </div>
                </div>
              </form>
            </Stack>
          </Card>
        </Container>
      </>
    </ThemeProvider>
  );
}

export default CreaStoria;
