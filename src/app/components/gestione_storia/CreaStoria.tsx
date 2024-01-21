import React, { useState } from 'react';
import 'app/css/gestione_app/FormElements.css';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import Navbar from '../Navbar';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import StoriaControl from 'app/control/gestione_storia/StoriaControl';
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Stack,
  Typography,
} from '@mui/material';
import { StoriaMedia } from 'app/interfaces/gestione_storia/StoriaMedia';

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

  const gestisciHoverCaricaFile = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottoneCaricaFile(nuovoColore);
  };

  const gestisciHoverSalva = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottoneSalva(nuovoColore);
  };

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files && event.target.files[0]) {
      const nomeFile = event.target.files[0].name;
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      console.log('Nome del file:', nomeFile);

      const file = event.target.files[0];
      const tipo = event.target.files[0].type;
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
            }
          };
        }
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    if (value.length <= 300) {
      setDatiStoria((prevDatiStoria) => ({
        ...prevDatiStoria,
        [id]: value,
      }));
    }
  };
  const handleDescrChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    if (value.length <= 300) {
      setDatiStoria((prevDatiStoria) => ({
        ...prevDatiStoria,
        media: {
          ...prevDatiStoria.media,
          descrizione: value,
        },
      }));
    }
  };

  const handleSave = async (): Promise<void> => {
    await storiaControl.inviaStoria(datiStoria, file);
    console.log('Storia salvata con successo!');
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navbar />
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Card
            sx={{
              marginTop: 4,
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
                  <TextField
                    required
                    id="testo"
                    label="Testo Storia"
                    multiline
                    rows={8}
                    value={datiStoria.testo}
                    onChange={handleChange}
                    style={{
                      margin: '1em ',
                      width: '60%',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div className="riga">
                  <Button
                    component="label"
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
                      accept="image/*,audio/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                </div>
                <div className="riga">
                  <TextField
                    required
                    fullWidth
                    id="descrizione"
                    label="Descrizione File"
                    multiline
                    rows={4}
                    value={datiStoria.media.descrizione}
                    onChange={handleDescrChange}
                    style={{
                      margin: '1.5em ',
                      width: '60%',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div className="riga">
                  <Button
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
