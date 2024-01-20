import React, { useState, useEffect } from 'react';
//eslint-disable-next-line
import { ToDoList } from 'app/interfaces/gestione_todolist/ToDoList';
import 'app/css/gestione_app/FormElements.css';
import { TextField, Typography, Grid, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Pulsante from '../gestione_app/Pulsante';
import Navbar from '../Navbar';
import ToDoListControl from 'app/control/gestione_todolist/ToDoListControl';
const theme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2',
    },
  },
});
function CreaToDoList(): JSX.Element {
  const [NumAttivita, setNumAttivita] = useState<number | null>(null);
  const [attivitaConfermate, setAttivitaConfermate] = useState<number[]>([]);
  const [testoSalva] = useState<string>('Salva ToDoList');
  const handleChangeNum = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    console.log(value);
    let newNumAttivita = parseInt(value);

    if (isNaN(newNumAttivita) || newNumAttivita < 0) {
      newNumAttivita = 0;
    }

    setNumAttivita(newNumAttivita);
  };

  useEffect(() => {
    if (NumAttivita !== null) {
      console.log(JSON.stringify(NumAttivita));
    }
  }, [NumAttivita]);

  const handleConfermaClick = (): void => {
    if (NumAttivita !== null && NumAttivita >= 0) {
      const nuovaListaAttivita = Array.from(
        { length: NumAttivita },
        (_, index) => index + 1
      );
      setAttivitaConfermate(nuovaListaAttivita);
    } else {
      setAttivitaConfermate([]);
    }
  };
  const handleSalvaToDoListClick = async (): Promise<void> => {
    try {
      // Costruisci l'oggetto ToDoList da inviare al backend
      const toDoListData = {
        id: undefined,
        num_attivita: NumAttivita !== null ? NumAttivita : 0,
        completata: false,
        med: 1, // Sostituisci con il valore appropriato
        paziente: 'codice_fiscale', // Sostituisci con il valore appropriato
      };

      // Creare un'istanza del control
      const toDoListControl = new ToDoListControl();

      // Chiamare la funzione del control per inviare la ToDoList al backend
      await toDoListControl.inviaDatiToDoList(toDoListData);
      // Puoi anche  dopo il salvataggio, come navigare a un'altra pagina
      // In questo esempio, si ricarica la pagina
      window.location.reload();
    } catch (error) {
      console.error('Errore durante il salvataggio della ToDoList:', error);
      // Puoi gestire gli errori , ad esempio mostrando un messaggio all'utente
    }
  };

  const [testo1] = useState<string>('conferma');
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <form className="formflex">
        <Typography variant="h4" style={{ color: 'blueviolet' }}>
          Quante attività vuoi inserire in questa ToDoList?
        </Typography>

        <div className="riga">
          <TextField
            required
            type="number"
            id="outline-num_attivita"
            label="Numero attività"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            inputProps={{
              min: 0,
            }}
            onChange={handleChangeNum}
          />
        </div>
        <div className="riga">
          {Pulsante({
            tipologia: 'scuro',
            testo: testo1,
            nome: 'conferma',
            inizio: null,
            fine: null,
            onClick: handleConfermaClick,
          })}
        </div>

        {attivitaConfermate.length > 0 && (
          <div>
            <Grid container spacing={3} style={{ marginTop: '2em' }}>
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  style={{
                    padding: '16px',
                    width: '100%',
                    margin: 'auto',
                    textAlign: 'center',
                  }}
                >
                  <form className="formflex">
                    <Typography variant="h6" style={{ color: 'blueviolet' }}>
                      Descrivi le attività:
                    </Typography>
                    {attivitaConfermate.map((attivita, index) => (
                      <div key={index} className="riga">
                        <TextField
                          key={index}
                          name={`attivita_${attivita}`}
                          label={`Attività ${attivita}`}
                          id="outlined-basic"
                          style={{
                            width: '30.5em',
                            margin: '1em',
                            boxSizing: 'border-box',
                          }}
                        />
                        <br />
                      </div>
                    ))}
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </div>
        )}
      </form>
      <div className="riga">
        {Pulsante({
          tipologia: 'scuro',
          testo: testoSalva,
          nome: 'salva-todolist',
          inizio: null,
          fine: null,
          onClick: handleSalvaToDoListClick,
        })}
      </div>
    </ThemeProvider>
  );
}

export default CreaToDoList;
