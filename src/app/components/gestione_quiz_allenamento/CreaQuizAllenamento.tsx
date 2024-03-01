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
  Snackbar,
  Alert,
} from '@mui/material';
import { QuizAllenamentoGiornaliero } from 'app/interfaces/gestione_quiz_allenamento/QuizAllenamentoGiornaliero';
import { DomandaRisposta } from 'app/interfaces/gestione_quiz_allenamento/DomandaRisposta';
import { ResponseObject } from 'app/interfaces/gestione_autenticazione/utils/ResponseObject';
import QuizAllenamentoControl from 'app/control/gestione_quiz_allenamento/QuizAllenamentoControl';
import 'app/css/gestione_app/FormElements.css';
import Navbar from '../Navbar';
import ResponsiveLineaGuida from '../gestione_linee_guida/ResponsiveLineaGuida';
import ResponsiveDialog from '../gestione_app/ResponsiveDialog';

interface TestQuiz {
  domanda: boolean | undefined;
  selezionata: boolean | undefined;
  risposta: {
    risposta: boolean | undefined;
  }[];
}

function CreaQuizAllenamento(): JSX.Element {
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

  const [quizAllenamento, setQuizAllenamento] =
    useState<QuizAllenamentoGiornaliero>({
      cg_fam: Number(localStorage.getItem('id')),
      numero_domande: 0,
    });
  const [domandeRisposte, setDomandeRisposte] = useState<DomandaRisposta[]>([]);
  const [testQuiz, setTestQuiz] = useState<TestQuiz[]>([]);

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
        const newTestQuiz = Array.from(
          { length: additionalQuestions },
          (): TestQuiz => ({
            domanda: undefined,
            selezionata: undefined,
            risposta: [
              {
                risposta: undefined,
              },
              {
                risposta: undefined,
              },
              {
                risposta: undefined,
              },
              {
                risposta: undefined,
              },
            ],
          })
        );
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
                id: undefined,
              },
              {
                domanda_ag: undefined,
                risposta: '',
                corretta: undefined,
                selezionata: undefined,
                id: undefined,
              },
              {
                domanda_ag: undefined,
                risposta: '',
                corretta: undefined,
                selezionata: undefined,
                id: undefined,
              },
              {
                domanda_ag: undefined,
                risposta: '',
                corretta: undefined,
                selezionata: undefined,
                id: undefined,
              },
            ],
          })
        );
        setTestQuiz([...testQuiz, ...newTestQuiz]);
        setDomandeRisposte([...domandeRisposte, ...newQuestions]);
      } else if (newNumberOfQuestions < domandeRisposte.length) {
        // Rimuovi domande se il nuovo numero è minore
        const remainingQuestions = domandeRisposte.slice(
          0,
          newNumberOfQuestions
        );
        const remainingTestQuiz = testQuiz.slice(0, newNumberOfQuestions);
        setTestQuiz(remainingTestQuiz);
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
  const [aColoreBottone, impostaAColoreBottone] = useState<string>('#9149f3');

  const gestisciHoverA = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaAColoreBottone(nuovoColore);
  };
  const [cColoreBottone, impostaCColoreBottone] = useState<string>('#9149f3');

  const gestisciHoverC = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaCColoreBottone(nuovoColore);
  };
  const handleQuestionChange = (
    questionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newQuestionData = [...domandeRisposte];
    newQuestionData[questionIndex].domanda = event.target.value;
    const newTestQuiz = [...testQuiz];
    newTestQuiz[questionIndex].domanda = testa(event.target.value);
    setTestQuiz(newTestQuiz);
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
    const newTestQuiz = [...testQuiz];
    newTestQuiz[questionIndex].risposta[optionIndex].risposta = testa(
      event.target.value
    );
    setTestQuiz(newTestQuiz);
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
    const newTestQuiz = [...testQuiz];
    newTestQuiz[questionIndex].selezionata = true;
    setTestQuiz(newTestQuiz);
    console.log(newQuestionData);
    setDomandeRisposte(newQuestionData);
    console.log(newQuestionData);
  };
  const newTQ = {
    domanda: undefined,
    selezionata: undefined,
    risposta: [
      {
        risposta: undefined,
      },
      {
        risposta: undefined,
      },
      {
        risposta: undefined,
      },
      {
        risposta: undefined,
      },
    ],
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
        id: undefined,
      },
      {
        domanda_ag: undefined,
        risposta: '',
        corretta: undefined,
        selezionata: undefined,
        id: undefined,
      },
      {
        domanda_ag: undefined,
        risposta: '',
        corretta: undefined,
        selezionata: undefined,
        id: undefined,
      },
      {
        domanda_ag: undefined,
        risposta: '',
        corretta: undefined,
        selezionata: undefined,
        id: undefined,
      },
    ],
  };

  const handleAddQuestion = (): void => {
    setDomandeRisposte([...domandeRisposte, newQuestion]);
    setTestQuiz([...testQuiz, newTQ]);
    setQuizAllenamento((prevQuiz) => ({
      ...prevQuiz,
      numero_domande: prevQuiz.numero_domande + 1,
    }));
  };

  const handleQuizCreation = async (): Promise<void> => {
    const domaRisp = domandeRisposte.map((domanda, index) => ({
      [`domanda ${index}`]: domanda,
    }));
    console.log(testQuiz);
    const isValid = Object.values(testQuiz).every((test) => {
      return (
        test.domanda === true &&
        test.selezionata === true &&
        test.risposta.every((risposta) => risposta.risposta === true)
      );
    });

    console.log(isValid);
    if (!isValid || quizAllenamento.numero_domande === 0) {
      setShowFail(true);
    } else {
      const domRes: ResponseObject = {
        domandeRisposte: Object.assign({}, ...domaRisp),
        quizAllenamento: quizAllenamento,
      };
      const quizAllenamentoContol: QuizAllenamentoControl =
        new QuizAllenamentoControl();
      const risultato = await quizAllenamentoContol.inviaQuizAllenamento(
        domRes
      );
      console.log(risultato);
      if (risultato) {
        setSuccess(true);
        setOpen(true);
      } else {
        console.log('Errore: Tutti i campi devono essere compilati.');
      }
    }
  };
  // Snackbar
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [show, setShow] = React.useState(false);
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

  return (
    <div>
      <Navbar />
      {show && <ResponsiveLineaGuida onClose={() => setShow(false)} />}
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
              ? 'Caricamento quiz effettuato con successo!'
              : 'Caricamento quiz fallito'}
          </Alert>
        </Snackbar>
      </div>
      <form className="formflex">
        <Typography variant="h4" style={{ color: 'blueviolet' }}>
          Creazione Quiz Allenamento Giornaliero
        </Typography>
        <Button
          style={{
            background: coloreBottone,
            margin: '2em',
          }}
          name="lineaguida"
          id="lineaguida"
          type="submit"
          variant="contained"
          onMouseEnter={() => gestisciHover(true)}
          onMouseLeave={() => gestisciHover(false)}
          onClick={() => setShow(true)}
        >
          Linea guida
        </Button>
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
                <div id={`Domanda-${questionIndex + 1}`}>
                  <TextField
                    id={`Domanda-${questionIndex + 1}`}
                    label="Domanda"
                    fullWidth
                    value={question.domanda}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleQuestionChange(questionIndex, event)
                    }
                    style={{ width: '20em', margin: 'auto' }}
                  />

                  <Typography variant="h6">
                    {errorMessage(testQuiz[questionIndex].domanda)}
                  </Typography>
                </div>
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
                            <>
                              <TextField
                                id={`Risposta-${questionIndex + 1}.${
                                  optionIndex + 1
                                }`}
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
                              <div
                                id={`Risposta ${questionIndex + 1}.${
                                  optionIndex + 1
                                }`}
                              >
                                <Typography variant="h6">
                                  {errorMessage(
                                    testQuiz[questionIndex].risposta[
                                      optionIndex
                                    ].risposta
                                  )}
                                </Typography>
                              </div>
                            </>
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
            background: aColoreBottone,
            margin: '1em',
          }}
          type="submit"
          variant="contained"
          onMouseEnter={() => gestisciHoverA(true)}
          onMouseLeave={() => gestisciHoverA(false)}
          onClick={handleAddQuestion}
        >
          Aggiungi Domanda
        </Button>
        <Button
          id="crea-quiz-button"
          style={{
            background: cColoreBottone,
            margin: '1em',
          }}
          type="submit"
          variant="contained"
          onMouseEnter={() => gestisciHoverC(true)}
          onMouseLeave={() => gestisciHoverC(false)}
          onClick={handleQuizCreation}
        >
          Crea Quiz
        </Button>
      </div>
    </div>
  );
}
export default CreaQuizAllenamento;
