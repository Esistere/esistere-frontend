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
import { QuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/QuizPreliminare';
import { DomandaRispostaQP } from 'app/interfaces/gestione_quiz_preliminare/DomandaRispostaQP';
import { ResponseObjectQP } from 'app/interfaces/utils/ResponseObjectQP';
import QuizPreliminareControl from 'app/control/gestione_quiz_preliminare/QuizPreliminareControl';
import 'app/css/gestione_app/FormElements.css';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';

let success: boolean | null = null;
let open = false;

function CreaQuizPreliminare(): JSX.Element {
  const location = useLocation();
  const cf = location.state;
  const [quizPreliminare, setQuizPreliminare] = useState<QuizPreliminare>({
    id: undefined,
    numero_domande: 0,
    sage: false,
    punteggio_totale: 0,
    med: Number(localStorage.getItem('id')),
    paziente: cf,
  });
  const [domandeRisposte, setDomandeRisposte] = useState<DomandaRispostaQP[]>(
    []
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    open = false;
  };

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
            idDomanda: undefined,
            domanda: '',
            quiz_preliminare: undefined,
            rispostaPaziente: {
              idRisposta: undefined,
              domanda_preliminare: undefined,
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

  const [coloreAggBottone, impostaColoreAggBottone] =
    useState<string>('#9149f3');

  const gestisciAggHover = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreAggBottone(nuovoColore);
  };
  const handleQuestionChange = (
    questionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newQuestionData = [...domandeRisposte];
    newQuestionData[questionIndex].domanda = event.target.value;
    setDomandeRisposte(newQuestionData);
  };

  const newQuestion: DomandaRispostaQP = {
    idDomanda: undefined,
    domanda: '',
    quiz_preliminare: undefined,
    rispostaPaziente: {
      idRisposta: undefined,
      domanda_preliminare: undefined,
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
    console.log(domRes);
    const quizPreliminareControl: QuizPreliminareControl =
      new QuizPreliminareControl();
    const risultato = await quizPreliminareControl.inviaQuizPreliminare(domRes);
    console.log(risultato);
    if (risultato) {
      success = true;
      open = true;
    } else {
      success = false;
      open = true;
    }
  };

  return (
    <div>
      <Navbar />
      <form className="formflex">
        <Typography
          variant="h4"
          style={{
            color: 'blueviolet',
            marginTop: '2em',
            marginBottom: '1.25em',
          }}
        >
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
                  value={question.domanda}
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
            background: coloreAggBottone,
            margin: '1em',
          }}
          type="submit"
          variant="contained"
          onMouseEnter={() => gestisciAggHover(true)}
          onMouseLeave={() => gestisciAggHover(false)}
          onClick={handleAddQuestion}
        >
          Aggiungi Domanda
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
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {success ? 'Creazione effettuata con successo!' : 'Creazione fallita'}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default CreaQuizPreliminare;
