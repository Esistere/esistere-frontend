import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/QuizPreliminare';
import { DomandaRispostaQP } from 'app/interfaces/gestione_quiz_preliminare/DomandaRispostaQP';
import { ResponseObjectQP } from 'app/interfaces/utils/ResponseObjectQP';
import QuizPreliminareControl from 'app/control/gestione_quiz_preliminare/QuizPreliminareControl';
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

function CreaQuizPreliminare(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const cf = location.state;
  const [quizPreliminare, setQuizPreliminare] = useState<QuizPreliminare>({
    id: undefined,
    numero_domande: 0,
    sage: false,
    punteggio_totale: 0,
    med: Number(localStorage.getItem('med')) || 0,
    paziente: cf,
  });
  const [domandeRisposte, setDomandeRisposte] = useState<DomandaRispostaQP[]>(
    []
  );

  const handleNumberOfQuestionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newNumberOfQuestions = Number(event.target.value);
    if (newNumberOfQuestions >= 0) {
      setQuizPreliminare({
        ...quizPreliminare,
        ['numero_domande']: newNumberOfQuestions,
      });

      if (newNumberOfQuestions > domandeRisposte.length) {
        // Aggiungi nuove domande se il nuovo numero è maggiore
        const additionalQuestions =
          newNumberOfQuestions - domandeRisposte.length;
        const newQuestions = Array.from(
          { length: additionalQuestions },
          (): DomandaRispostaQP => ({
            domanda: {
              id: undefined,
              domanda: '',
              quiz_preliminare: undefined,
            },
            risposta: {
              id: undefined,
              domanda: undefined,
              paziente: cf,
              risposta: '',
            },
          })
        );
        setDomandeRisposte([...domandeRisposte, ...newQuestions]);
      } else if (newNumberOfQuestions < domandeRisposte.length) {
        // Rimuovi domande se il nuovo numero è minore
        const remainingQuestions = domandeRisposte.slice(
          0,
          newNumberOfQuestions
        );
        setDomandeRisposte(remainingQuestions);
      }
    } else {
      // Se il nuovo numero è negativo, imposta il numero di domande a 0
      setQuizPreliminare({
        ...quizPreliminare,
        numero_domande: 0,
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
    const newQuestionData = [...domandeRisposte];
    newQuestionData[questionIndex].domanda.domanda = event.target.value;
    setDomandeRisposte(newQuestionData);
  };

  const handleOptionChange = (
    questionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newQuestionData = [...domandeRisposte];
    newQuestionData[questionIndex].risposta.risposta = event.target.value;
    setDomandeRisposte(newQuestionData);
  };

  const newQuestion: DomandaRispostaQP = {
    domanda: {
      id: undefined,
      domanda: '',
      quiz_preliminare: undefined,
    },
    risposta: {
      id: undefined,
      domanda: undefined,
      paziente: cf,
      risposta: '',
    },
  };

  const handleAddQuestion = (): void => {
    setDomandeRisposte([...domandeRisposte, newQuestion]);
    setQuizPreliminare((prevQuiz) => ({
      ...prevQuiz,
      numero_domande: prevQuiz.numero_domande + 1,
    }));
  };

  const handleQuizCreation = async (): Promise<void> => {
    const domaRisp = domandeRisposte.map((domanda, index) => ({
      [`domanda ${index}`]: domanda,
    }));
    const domRes: ResponseObjectQP = {
      domandeRisposte: Object.assign({}, ...domaRisp),
      quizPreliminare: quizPreliminare,
    };
    const quizPreliminareControl: QuizPreliminareControl =
      new QuizPreliminareControl();
    const risultato = await quizPreliminareControl.inviaQuizPreliminare(domRes);
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
            Creazione Quiz Preliminare
          </Typography>
          <TextField
            label="Numero di domande"
            type="number"
            value={quizPreliminare.numero_domande}
            onChange={handleNumberOfQuestionsChange}
          />
          <Grid container spacing={2} style={{ marginTop: '2em' }}>
            {domandeRisposte.map((question, questionIndex) => (
              <Grid item xs={12} key={questionIndex}>
                <Paper
                  elevation={3}
                  style={{ padding: '16px', width: '25em', margin: 'auto' }}
                >
                  <Typography variant="h6">
                    Domanda {questionIndex + 1}
                  </Typography>
                  <TextField
                    label="Domanda"
                    fullWidth
                    value={question.domanda.domanda}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleQuestionChange(questionIndex, event)
                    }
                    style={{ width: '20em', margin: 'auto' }}
                  />
                  <TextField
                    label="Risposta"
                    fullWidth
                    value={question.risposta.risposta}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleOptionChange(questionIndex, event)
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
            Aggingi Domanda
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
            Crea Quiz
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
export default CreaQuizPreliminare;
