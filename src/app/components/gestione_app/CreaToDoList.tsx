import React, { useState, useEffect } from 'react';
//eslint-disable-next-line
import { ToDoList } from 'app/interfaces/gestione_todolist/ToDoList';
import 'app/css/gestione_app/FormElements.css';
import { TextField } from '@mui/material';
import Pulsante from './Pulsante';

function CreaToDoList(): JSX.Element {
  const [NumAttivita, setNumAttivita] = useState<number | null>(null);
  const [attivitaConfermate, setAttivitaConfermate] = useState<number[]>([]);

  const handleChangeNum = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    setNumAttivita(parseInt(value));
  };

  useEffect(() => {
    if (NumAttivita !== null) {
      console.log(JSON.stringify(NumAttivita));
    }
  }, [NumAttivita]);

  const handleConfermaClick = (): void => {
    if (NumAttivita !== null) {
      const nuovaListaAttivita = Array.from(
        { length: NumAttivita },
        (_, index) => index + 1
      );
      setAttivitaConfermate(nuovaListaAttivita);
    }
  };
  const [testo1] = useState<string>('conferma');
  return (
    <>
      <form style={{ display: 'flex', flexWrap: 'wrap', width: '50%' }}>
        <div className="riga">
          <h2>Quante attività vuoi inserire in questa ToDoList? </h2>
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
            onChange={handleChangeNum}
          />
        </div>
        <div>
          {Pulsante({
            tipologia: 'scuro',
            testo: testo1,
            nome: 'conferma',
            inizio: null,
            fine: null,
            borderColor: '#000000',
            onClick: handleConfermaClick,
          })}
        </div>
        <br />
      </form>
      <form className="formflex">
        {attivitaConfermate.map((attivita, index) => (
          <div key={index} className="riga">
            <TextField
              key={index}
              name={`attivita_${attivita}`}
              label={`Attività ${attivita}`}
              id="outlined-basic"
              style={{
                width: '16.15em',
                margin: '1em',
                boxSizing: 'border-box',
              }}
            />
            <br />
          </div>
        ))}
      </form>
    </>
  );
}
export default CreaToDoList;
