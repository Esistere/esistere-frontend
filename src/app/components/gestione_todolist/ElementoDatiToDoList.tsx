import React, { useEffect, useState } from 'react';
import { ToDoList } from 'app/interfaces/gestione_todolist/ToDoList';
import ToDoListControl from 'app/control/gestione_todolist/ToDoListControl';
import { ResponseObjectToDoList } from 'app/interfaces/gestione_todolist/ResponseObjectToDoList';
import { Typography } from '@mui/material';

function ElementoDatiToDoList(toDoList: ToDoList): JSX.Element {
  const [data, setData] = useState<ResponseObjectToDoList>();

  useEffect(() => {
    console.log(toDoList, toDoList.id);
  }, [toDoList]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const toDoListControl = new ToDoListControl();
      try {
        const responseObject = await toDoListControl.fetchToDoListCompleta(
          Number(toDoList.id)
        );
        console.log(responseObject);
        setData(responseObject);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [toDoList.id]);

  return <div>Risultati</div>;
  /*data && (
      <div>
        <Typography variant="h3">
          {'Completata: ' + (data.toDoList.completata ? 'Si' : 'No')}
        </Typography>
        {Array.isArray(data.attivita) &&
          data.attivita.map((attivita, indexAtt) => (
            <div key={indexAtt}>
              <Typography variant="h4">
                {indexAtt + 1 + ') ' + attivita.testo}
              </Typography>
              <Typography variant="h5">
                {`Completata? ${attivita.completata ? 'Si' : 'No'}`}
              </Typography>
              <Typography variant="h5">
                {`Valutazione: ${attivita.valutazione ?? 'Nessuna'}`}
              </Typography>
              <Typography variant="h5">
                {`Commento: ${attivita.commento ?? 'Nessuno'}`}
              </Typography>
            </div>
          ))}
      </div>
    )*/
}

export default ElementoDatiToDoList;
