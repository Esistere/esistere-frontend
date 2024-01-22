import React, { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import 'app/css/gestione_app/FormElements.css';
import LineaGuidaControl from 'app/control/gestione_autenticazione/LineaGuidaControl';
import { LineaGuida } from 'app/interfaces/gestione_autenticazione/LineaGuida';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from '../Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2',
    },
  },
});
interface LineaGuidaFormProps {
  onClose: () => void;
}

const LineaGuidaForm: React.FC<LineaGuidaFormProps> = (props): JSX.Element => {
  const [lineaGuida, setLineaGuida] = useState<LineaGuida>({
    id: undefined,
    linea_guida: '',
    med: Number(localStorage.getItem('id')),
  });
  const [coloreBottone, impostaColoreBottone] = useState<string>('#9149f3');

  const gestisciHover = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottone(nuovoColore);
  };
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const medicoId = parseInt(localStorage.getItem('medicoId') ?? '', 10);
        const medicoLineaGuida = await getMedicoLineaGuida(medicoId);
        setLineaGuida({ ...lineaGuida, ...medicoLineaGuida });
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
      }
    };

    fetchData();
  }, [lineaGuida]);

  const getMedicoLineaGuida = async (id: number): Promise<LineaGuida> => {
    const lineaGuidaControl = new LineaGuidaControl();
    return await lineaGuidaControl.fetchLineaGuidaByMed(id);
  };

  const handleSave = async (): Promise<void> => {
    const lineaGuidaControl = new LineaGuidaControl();
    await lineaGuidaControl.inviaDatiQuiz(lineaGuida);
    props.onClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className="riga" style={{ marginTop: '3.5em' }}>
        <Typography variant="h4" style={{ color: 'blueviolet' }}>
          Creazione Linee Guida
        </Typography>

        <div className="riga" style={{ marginTop: '2.5em' }}>
          <TextField
            required
            label="Linea guida"
            value={lineaGuida.linea_guida}
            onChange={(e) =>
              setLineaGuida({ ...lineaGuida, linea_guida: e.target.value })
            }
            multiline
            rows={20}
            style={{ width: '60%', marginRight: '20px', height: '70%' }}
          />
        </div>
        <div className="riga" style={{ marginTop: '0.60em' }}>
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
      </div>
    </ThemeProvider>
  );
};

export default LineaGuidaForm;
