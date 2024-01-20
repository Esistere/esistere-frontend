import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToDoList } from 'app/interfaces/gestione_todolist/ToDoList';
import { Attivita } from 'app/interfaces/gestione_todolist/Attivita';
import { ResponseObjectToDoList } from 'app/interfaces/gestione_todolist/ResponseObjectToDoList';
import ToDoListControl from 'app/control/gestione_todolist/ToDoListControl';
import 'app/css/gestione_app/FormElements.css';
import Navbar from '../Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2',
    },
  },
});

function CreaToDoList(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const cf = location.state;
  const [toDoList, setToDoList] = useState<ToDoList>({
    med: Number(localStorage.getItem('id')),
    id: undefined,
    num_attivita: 0,
    completata: false,
    paziente: cf,
  });
  const [attivita, setAttivita] = useState<Attivita[]>([]);

  const handleNumberOfQuestionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newNumberOfQuestions = Number(event.target.value);
    if (newNumberOfQuestions >= 0) {
      setToDoList({
        ...toDoList,
        ['num_attivita']: newNumberOfQuestions,
      });

      if (newNumberOfQuestions > attivita.length) {
        // Aggiungi nuove domande se il nuovo numero è maggiore
        const additionalQuestions = newNumberOfQuestions - attivita.length;
        const newQuestions = Array.from(
          { length: additionalQuestions },
          (): Attivita => ({
            id: undefined,
            testo: '',
            completata: false,
            commento: '',
            valutazione: 0,
            to_do_list: undefined,
          })
        );
        setAttivita([...attivita, ...newQuestions]);
      } else if (newNumberOfQuestions < attivita.length) {
        // Rimuovi domande se il nuovo numero è minore
        const remainingQuestions = attivita.slice(0, newNumberOfQuestions);
        setAttivita(remainingQuestions);
      }
    } else {
      // Se il nuovo numero è negativo, imposta il numero di domande a 0
      setToDoList({
        ...toDoList,
        num_attivita: 0,
      });
    }
  };
  const [coloreBottone, impostaColoreBottone] = useState<string>('#9149f3');

  const gestisciHover = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottone(nuovoColore);
  };
  const handleQuestionChange = (
    questionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newQuestionData = [...attivita];
    newQuestionData[questionIndex].testo = event.target.value;
    setAttivita(newQuestionData);
  };

  const newQuestion: Attivita = {
    id: undefined,
    testo: '',
    completata: false,
    commento: '',
    valutazione: 0,
    to_do_list: undefined,
  };

  const handleAddQuestion = (): void => {
    setAttivita([...attivita, newQuestion]);
    setToDoList((prevQuiz) => ({
      ...prevQuiz,
      numero_domande: prevQuiz.num_attivita + 1,
    }));
  };

  const handleQuizCreation = async (): Promise<void> => {
    const domRes: ResponseObjectToDoList = {
      attivita: attivita,
      toDoList: toDoList,
    };

    console.log(domRes);
    const quizAllenamentoContol: ToDoListControl = new ToDoListControl();
    const risultato = await quizAllenamentoContol.inviaDatiToDoList(domRes);
    console.log(risultato);
    if (risultato) {
      navigate('/');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        <form className="formflex">
          <Typography variant="h4" style={{ color: 'blueviolet' }}>
            Creazione ToDoList
          </Typography>
          <TextField
            label="Numero di Attività"
            type="number"
            value={toDoList.num_attivita}
            onChange={handleNumberOfQuestionsChange}
          />
          <Grid container spacing={2} style={{ marginTop: '2em' }}>
            {attivita.map((question, questionIndex) => (
              <Grid item xs={12} key={questionIndex}>
                <Paper
                  elevation={3}
                  style={{ padding: '16px', width: '25em', margin: 'auto' }}
                >
                  <Typography variant="h6">
                    Attivit&agrave; {questionIndex + 1}
                  </Typography>
                  <TextField
                    label="Attività"
                    fullWidth
                    value={question.testo}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleQuestionChange(questionIndex, event)
                    }
                    style={{ width: '20em', margin: 'auto' }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </form>

        <div className="riga">
          <Button
            style={{
              background: coloreBottone,
              margin: '1em',
            }}
            type="submit"
            variant="contained"
            onMouseEnter={() => gestisciHover(true)}
            onMouseLeave={() => gestisciHover(false)}
            onClick={handleAddQuestion}
          >
            Aggingi Attivit&agrave;
          </Button>
          <Button
            style={{
              background: coloreBottone,
              margin: '1em',
            }}
            type="submit"
            variant="contained"
            onMouseEnter={() => gestisciHover(true)}
            onMouseLeave={() => gestisciHover(false)}
            onClick={handleQuizCreation}
          >
            Crea ToDoList
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default CreaToDoList;
