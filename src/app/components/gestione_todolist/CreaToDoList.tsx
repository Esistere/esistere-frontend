import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToDoList } from 'app/interfaces/gestione_todolist/ToDoList';
import { Attivita } from 'app/interfaces/gestione_todolist/Attivita';
import { ResponseObjectToDoList } from 'app/interfaces/gestione_todolist/ResponseObjectToDoList';
import ToDoListControl from 'app/control/gestione_todolist/ToDoListControl';
import 'app/css/gestione_app/FormElements.css';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import ResponsiveDialog from '../gestione_app/ResponsiveDialog';

interface ToDoTest {
  filled: boolean | undefined;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2',
    },
  },
});

function CreaToDoList(): JSX.Element {
  const location = useLocation();
  const cf = location.state;

  const errorMessage = (element: boolean | undefined): JSX.Element | null => {
    return element === false && element !== undefined ? (
      <div style={{ color: '#D32F2F' }}>
        Inserisci un argomento di al pi&ugrave; 300 caratteri.
      </div>
    ) : null;
  };

  const testa = (element: string): boolean => {
    return element.length <= 300;
  };

  const [test, setTest] = useState<ToDoTest[]>([]);

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [showFail, setShowFail] = React.useState<boolean>(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
    console.log(cf);
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
        const newTests = Array.from(
          { length: additionalQuestions },
          (): ToDoTest => ({ filled: undefined })
        );
        setTest([...test, ...newTests]);
        setAttivita([...attivita, ...newQuestions]);
      } else if (newNumberOfQuestions < attivita.length) {
        // Rimuovi domande se il nuovo numero è minore
        const remainingQuestions = attivita.slice(0, newNumberOfQuestions);
        const remainingToDos = test.slice(0, newNumberOfQuestions);
        setTest(remainingToDos);
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

  const [coloreConfermaBottone, impostaColoreConfermaBottone] =
    useState<string>('#9149f3');

  const gestisciHoverConferma = (isHoveredCrea: boolean): void => {
    const nuovoColore = isHoveredCrea ? '#8036a1' : '#9149f3';
    impostaColoreConfermaBottone(nuovoColore);
  };
  const handleQuestionChange = (
    questionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newQuestionData = [...attivita];
    const newToDo = [...test];
    newToDo[questionIndex].filled =
      testa(event.target.value) && event.target.value.length > 0;
    setTest(newToDo);
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
    setToDoList((prevToDoList) => ({
      ...prevToDoList,
      num_attivita: prevToDoList.num_attivita + 1,
    }));
  };

  const handleQuizCreation = async (): Promise<void> => {
    const domRes: ResponseObjectToDoList = {
      attivita: attivita,
      toDoList: toDoList,
    };
    const isValid = Object.values(test).every((element) => element.filled);
    if (!isValid || toDoList.num_attivita === 0) {
      setShowFail(true);
    } else {
      console.log(domRes);
      const quizAllenamentoContol: ToDoListControl = new ToDoListControl();
      const risultato = await quizAllenamentoContol.inviaDatiToDoList(domRes);
      console.log(risultato);
      if (risultato) {
        setSuccess(true);
        setOpen(true);
      } else {
        setSuccess(false);
        setOpen(true);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        {showFail && <ResponsiveDialog onClose={() => setShowFail(false)} />}
        <div id="test">
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={success ? 'success' : 'error'}
              sx={{ width: '100%' }}
            >
              {success
                ? 'Caricamento ToDoList effettuato con successo!'
                : 'Caricamento ToDoList fallito'}
            </Alert>
          </Snackbar>
        </div>
        <div className="riga" style={{ marginTop: '3.5em' }}>
          <Typography variant="h4" style={{ color: 'blueviolet' }}>
            Creazione ToDoList
          </Typography>
        </div>
        <form className="formflex" style={{ marginTop: '2.5em' }}>
          <TextField
            label="Numero di Attività"
            type="number"
            id="numAttivita"
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
                    id={`attivita${questionIndex + 1}`}
                    fullWidth
                    value={question.testo}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleQuestionChange(questionIndex, event)
                    }
                    style={{ width: '20em', marginTop: '3.5em' }}
                  />
                  {errorMessage(test[questionIndex].filled)}
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
            Aggiungi Attivit&agrave;
          </Button>
          <Button
            style={{
              background: coloreConfermaBottone,
              margin: '1em',
            }}
            id="salvaToDoList"
            type="submit"
            variant="contained"
            onMouseEnter={() => gestisciHoverConferma(true)}
            onMouseLeave={() => gestisciHoverConferma(false)}
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
