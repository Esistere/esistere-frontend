import React, { useEffect, useState } from 'react';
import { ToDoList } from 'app/interfaces/gestione_todolist/ToDoList';
import ToDoListControl from 'app/control/gestione_todolist/ToDoListControl';
import { ResponseObjectToDoList } from 'app/interfaces/gestione_todolist/ResponseObjectToDoList';
import { Card, CardContent, Typography } from '@mui/material';

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

  return (
    <div>
      {data && (
        <>
          <Typography variant="h4">
            {'Completata: ' + (data.toDoList.completata ? 'Si' : 'No')}
          </Typography>

          {Array.isArray(data.attivita) &&
            data.attivita.map((attivita, indexAtt) => (
              <Card key={indexAtt} style={{ marginTop: 10, marginBottom: 10 }}>
                <CardContent>
                  <Typography variant="h5">
                    {indexAtt + 1 + ') ' + attivita.testo}
                  </Typography>
                  <Typography variant="h6">
                    {`Completata? ${attivita.completata ? 'Si' : 'No'}`}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </>
      )}
    </div>
  );
}
export default ElementoDatiToDoList;
