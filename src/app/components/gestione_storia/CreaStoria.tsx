import React, { useState } from 'react';
import 'app/css/gestione_app/FormElements.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import Navbar from '../Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Storia } from 'app/interfaces/gestione_storia/Storia';
import StoriaControl from 'app/control/gestione_storia/StoriaControl';
import {
  Card,
  CardMedia,
  Container,
  CssBaseline,
  Stack,
  Typography,
} from '@mui/material';

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
function CreaStoria({ onClose }: { onClose: () => void }): JSX.Element {
  // TODO remove
  /* eslint-disable */
  const [isHoveredCaricaFile, setIsHoveredCaricaFile] = React.useState(false);
  const [isHoveredSalva, setIsHoveredSalva] = React.useState(false);
  // TODO remove
  /* eslint-enable */

  const [coloreBottoneCaricaFile, impostaColoreBottoneCaricaFile] =
    useState<string>('#9149f3');
  const [coloreBottoneSalva, impostaColoreBottoneSalva] =
    useState<string>('#9149f3');
  const [datiStoria, setDatiStoria] = useState<Storia>({
    id: 0,
    cg_fam: 0,
    testo: '',
    descrizione: '',
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

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files) {
      const nomeFile = event.target.files[0].name;
      console.log('Nome del file:', nomeFile);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    setDatiStoria((prevDatiStoria) => ({
      ...prevDatiStoria,
      [id]: value,
    }));
  };

  const handleSave = async (): Promise<void> => {
    await storiaControl.inviaStoria(datiStoria);
    onClose();
    console.log('Storia salvata con successo!');
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navbar />
        <Typography variant="h3" color="blueviolet" textAlign="center">
          Scrivi una nuova storia
        </Typography>
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
              <div className="formflex2">
                <div className="riga">
                  <CardMedia
                    component="img"
                    style={{ width: '110%', height: 'auto', marginLeft: '2em' }}
                    image={require('app/assets/images/scriviStoria.png')}
                  />
                </div>
              </div>
              <form className="formflex">
                <div className="riga">
                  <TextField
                    required
                    id="testo"
                    label="Testo Storia"
                    multiline
                    rows={15}
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
                      type="file"
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
                    rows={8}
                    onChange={handleChange}
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
