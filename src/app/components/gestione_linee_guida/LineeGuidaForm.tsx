import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import 'app/css/gestione_app/FormElements.css';
import LineaGuidaControl from 'app/control/gestione_autenticazione/LineaGuidaControl';
import { LineaGuida } from 'app/interfaces/gestione_autenticazione/LineaGuida';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
        const medicoId = parseInt(localStorage.getItem('medicoId') || '', 10);
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
      <h2
        style={{ textAlign: 'center', color: coloreBottone, marginTop: '20px' }}
      >
        Creazione Linee Guida
      </h2>
      <form className="formflex">
        <div className="riga">
          <TextField
            required
            label="Linea guida"
            value={lineaGuida.linea_guida}
            onChange={(e) =>
              setLineaGuida({ ...lineaGuida, linea_guida: e.target.value })
            }
            multiline
            rows={20}
            style={{ width: '80%', marginRight: '20px' }}
          />
        </div>
        <div className="riga" style={{ marginTop: '20px' }}>
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
    </ThemeProvider>
  );
};

export default LineaGuidaForm;