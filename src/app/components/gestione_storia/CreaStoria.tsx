import React, { useState, useEffect } from 'react';
import 'app/css/gestione_app/FormElements.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import Navbar from '../Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Storia } from 'app/interfaces/gestione_storia/Storia';
import StoriaControl from 'app/control/gestione_storia/StoriaControl';

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
  const [isHovered, setIsHovered] = React.useState(false);
  const [coloreBottone, impostaColoreBottone] = useState<string>('#9149f3');
  const [datiStoria, setDatiStoria] = useState<Storia>({
    id: 0,
    cg_fam: 0,
    testo: '',
    descrizione: '',
  });
  const storiaControl = new StoriaControl();

  const gestisciHover = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottone(nuovoColore);
    setIsHovered(isHovered);
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
        <form className="formflex">
          <div className="riga">
            <TextField
              required
              fullWidth
              id="testo"
              label="Testo Storia"
              multiline
              rows={10}
              value={datiStoria.testo}
              onChange={handleChange}
              style={{ margin: '1.5em ' }}
            />
          </div>
          <div className="riga">
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onMouseEnter={() => gestisciHover(true)}
              onMouseLeave={() => gestisciHover(false)}
              style={{
                backgroundColor: isHovered ? '#8036a1' : '#9149f3',
                color: '#ffffff',
                margin: '1em',
              }}
            >
              Carica file
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </div>
          <div className="riga">
            <TextField
              required
              fullWidth
              id="descrizione"
              label="Descrizione File"
              multiline
              rows={10}
              onChange={handleChange}
              style={{ margin: '1.5em ' }}
            />
          </div>
          <div className="riga">
            <Button
              style={{
                background: coloreBottone,
                color: 'white',
                width: '16.15em',
                margin: '1em',
                boxSizing: 'border-box',
              }}
              onClick={handleSave}
              onMouseEnter={() => gestisciHover(true)}
              onMouseLeave={() => gestisciHover(false)}
            >
              Salva
            </Button>
          </div>
        </form>
      </>
    </ThemeProvider>
  );
}

export default CreaStoria;
