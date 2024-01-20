import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QuizAllenamentoGiornaliero } from 'app/interfaces/gestione_quiz_allenamento/QuizAllenamentoGiornaliero';
import { DomandaRisposta } from 'app/interfaces/gestione_quiz_allenamento/DomandaRisposta';
import { ResponseObject } from 'app/interfaces/gestione_autenticazione/utils/ResponseObject';
import QuizAllenamentoControl from 'app/control/gestione_quiz_allenamento/QuizAllenamentoControl';
import 'app/css/gestione_app/FormElements.css';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2',
    },
  },
});
function CreaQuizAllenamento(): JSX.Element {
  const navigate = useNavigate();
  const [quizAllenamento, setQuizAllenamento] =
    useState<QuizAllenamentoGiornaliero>({
      cg_fam: Number(localStorage.getItem('id')),
      numero_domande: 0,
    });
  const [domandeRisposte, setDomandeRisposte] = useState<DomandaRisposta[]>([]);

  const handleNumberOfQuestionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newNumberOfQuestions = Number(event.target.value);
    if (newNumberOfQuestions >= 0) {
      setQuizAllenamento({
        ...quizAllenamento,
        ['numero_domande']: newNumberOfQuestions,
      });

      if (newNumberOfQuestions > domandeRisposte.length) {
        // Aggiungi nuove domande se il nuovo numero è maggiore
        const additionalQuestions =
          newNumberOfQuestions - domandeRisposte.length;
        const newQuestions = Array.from(
          { length: additionalQuestions },
          (): DomandaRisposta => ({
            idDomanda: undefined,
            quiz_ag: undefined,
            corretta: undefined,
            domanda: '',
            risposte: [
              {
                domanda_ag: undefined,
                risposta: '',
                corretta: undefined,
                selezionata: undefined,
                idRisposta: undefined,
              },
              {
                domanda_ag: undefined,
                risposta: '',
                corretta: undefined,
                selezionata: undefined,
                idRisposta: undefined,
              },
              {
                domanda_ag: undefined,
                risposta: '',
                corretta: undefined,
                selezionata: undefined,
                idRisposta: undefined,
              },
              {
                domanda_ag: undefined,
                risposta: '',
                corretta: undefined,
                selezionata: undefined,
                idRisposta: undefined,
              },
            ],
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
      setQuizAllenamento({
        ...quizAllenamento,
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
    newQuestionData[questionIndex].domanda = event.target.value;
    setDomandeRisposte(newQuestionData);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newQuestionData = [...domandeRisposte];
    newQuestionData[questionIndex].risposte[optionIndex].risposta =
      event.target.value;
    setDomandeRisposte(newQuestionData);
  };

  const handleCorrectAnswerChange = (
    questionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newQuestionData = [...domandeRisposte];
    newQuestionData[questionIndex].risposte = newQuestionData[
      questionIndex
    ].risposte.map((option) => ({
      ...option,
      corretta: event.target.value === option.risposta,
    }));
    console.log(newQuestionData);
    setDomandeRisposte(newQuestionData);
    console.log(newQuestionData);
  };

  const newQuestion: DomandaRisposta = {
    idDomanda: undefined,
    quiz_ag: undefined,
    corretta: undefined,
    domanda: '',
    risposte: [
      {
        domanda_ag: undefined,
        risposta: '',
        corretta: undefined,
        selezionata: undefined,
        idRisposta: undefined,
      },
      {
        domanda_ag: undefined,
        risposta: '',
        corretta: undefined,
        selezionata: undefined,
        idRisposta: undefined,
      },
      {
        domanda_ag: undefined,
        risposta: '',
        corretta: undefined,
        selezionata: undefined,
        idRisposta: undefined,
      },
      {
        domanda_ag: undefined,
        risposta: '',
        corretta: undefined,
        selezionata: undefined,
        idRisposta: undefined,
      },
    ],
  };

  const handleAddQuestion = (): void => {
    setDomandeRisposte([...domandeRisposte, newQuestion]);
    setQuizAllenamento((prevQuiz) => ({
      ...prevQuiz,
      numero_domande: prevQuiz.numero_domande + 1,
    }));
  };

  const handleQuizCreation = async (): Promise<void> => {
    const domaRisp = domandeRisposte.map((domanda, index) => ({
      [`domanda ${index}`]: domanda,
    }));
    const domRes: ResponseObject = {
      domandeRisposte: Object.assign({}, ...domaRisp),
      quizAllenamento: quizAllenamento,
    };
    const quizAllenamentoContol: QuizAllenamentoControl =
      new QuizAllenamentoControl();
    const risultato = await quizAllenamentoContol.inviaQuizAllenamento(domRes);
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
            Creazione Quiz Allenamento Giornaliero
          </Typography>
          <TextField
            label="Numero di domande"
            type="number"
            value={quizAllenamento.numero_domande}
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
                  <div className="riga">
                    <FormControl component="fieldset">
                      <RadioGroup
                        value={
                          question.risposte.find(
                            (option) => option.corretta === true
                          )?.risposta
                        }
                        onChange={(event) => {
                          const selectedValue = event.target.value.trim();
                          const isLabelEmpty = question.risposte.every(
                            (option) => option.risposta.trim() === ''
                          );

                          if (
                            !isLabelEmpty &&
                            selectedValue !== '' &&
                            selectedValue !==
                              question.risposte.find(
                                (option) => option.corretta === true
                              )?.risposta
                          ) {
                            handleCorrectAnswerChange(questionIndex, event);
                          }
                        }}
                      >
                        {question.risposte.map((option, optionIndex) => (
                          <FormControlLabel
                            key={optionIndex}
                            value={option.risposta}
                            control={<Radio />}
                            label={
                              <TextField
                                label={`Risposta ${optionIndex + 1}`}
                                fullWidth
                                value={option.risposta}
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  handleOptionChange(
                                    questionIndex,
                                    optionIndex,
                                    event
                                  )
                                }
                                style={{ marginTop: '8px' }}
                              />
                            }
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
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
export default CreaQuizAllenamento;
