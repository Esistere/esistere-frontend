import React, { useEffect, useState } from 'react';
import { Attivita } from 'app/interfaces/gestione_todolist/Attivita';
import { ToDoList } from 'app/interfaces/gestione_todolist/ToDoList';
import ToDoListControl from 'app/control/gestione_todolist/ToDoListControl';

function ElementoDatiToDoList(toDoList: ToDoList): JSX.Element {
  const [data, setData] = useState<Attivita[] | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const toDoListControl = new ToDoListControl();
      try {
        const attivita = await toDoListControl.fetchAttivitaByToDoList(
          Number(toDoList.id)
        );
        setData(attivita);
      } catch (error) {
        console.error('Error fetching activities', error);
      }
    };
    fetchData();
  }, [toDoList.id]);

  return (
    <div>
      {data &&
        data.map((attivita, index) => (
          <div key={index}>
            <p>{`Testo: ${attivita.testo}`}</p>
            <p>{`Completata: ${attivita.completata ? 'Sì' : 'No'}`}</p>
            <p>{`Commento: ${attivita.commento}`}</p>
            <p>{`Valutazione: ${attivita.valutazione}`}</p>
          </div>
        ))}
      ;
    </div>
  );
}

export default ElementoDatiToDoList;
