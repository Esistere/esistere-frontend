import React, { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import 'app/css/gestione_app/FormElements.css';
import LineaGuidaControl from 'app/control/gestione_autenticazione/LineaGuidaControl';
import { LineaGuida } from 'app/interfaces/gestione_autenticazione/LineaGuida';
import Button from '@mui/material/Button';
import Navbar from '../Navbar';

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
        console.log('sono arrivato qua');
        const medicoId = Number(localStorage.getItem('id'));
        console.log(medicoId);
        const lineaGuidaControl = new LineaGuidaControl();
        const risultato = await lineaGuidaControl.fetchLineaGuidaByMed(
          medicoId
        );
        console.log(risultato, risultato === null);
        setLineaGuida({ ...lineaGuida, ...risultato });
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (): Promise<void> => {
    const lineaGuidaControl = new LineaGuidaControl();
    await lineaGuidaControl.inviaDatiQuiz(lineaGuida);
    props.onClose();
  };

  return (
    <>
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
            rows={15}
            style={{ width: '50%', marginRight: '20px', height: '100%' }}
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
    </>
  );
};

export default LineaGuidaForm;
