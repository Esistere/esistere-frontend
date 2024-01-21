import React, { useState } from 'react';
import 'app/css/gestione_app/FormElements.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import Navbar from '../Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Stack,
  Typography,
} from '@mui/material';
import { Tac } from 'app/interfaces/gestione_tac/Tac';
import TacControl from 'app/control/gestione_tac/TACControl';
import { useLocation } from 'react-router-dom';

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
function CreaTac(): JSX.Element {
  const location = useLocation();
  const cf = location.state;
  const [coloreBottoneCaricaFile, impostaColoreBottoneCaricaFile] =
    useState<string>('#9149f3');
  const [coloreBottoneSalva, impostaColoreBottoneSalva] =
    useState<string>('#9149f3');
  const [datiTac, setDatiTac] = useState<Tac>({
    id: undefined,
    paziente: cf,
    med: Number(localStorage.getItem('id')),
    stadio: '',
  });
  const tacControl = new TacControl();

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
      if (tipo.startsWith('image/')) {
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            if (e && e.target !== null) {
              setDatiTac((prev) => ({
                ...prev,
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
      setDatiTac((prevDatiTac) => ({
        ...prevDatiTac,
        [id]: value,
      }));
    }
  };

  const handleSave = async (): Promise<void> => {
    await tacControl.inviaTac(datiTac, file);
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
                      Carica la tac di un paziente
                    </Typography>
                    <Typography variant="h5" color="black" textAlign="left">
                      Caricare la tac del paziente
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
                    label="Stadio"
                    value={datiTac.stadio}
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
                    Salva tac
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

export default CreaTac;
