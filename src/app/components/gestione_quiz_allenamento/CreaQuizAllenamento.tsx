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
import { QuizAllenamentoGiornaliero } from 'app/interfaces/gestione_quiz_allenamento/QuizAllenamentoGiornaliero';
import { DomandaRisposta } from 'app/interfaces/gestione_quiz_allenamento/DomandaRisposta';
import { ResponseObject } from 'app/interfaces/gestione_autenticazione/utils/ResponseObject';
import QuizAllenamentoControl from 'app/control/gestione_quiz_allenamento/QuizAllenamentoControl';

function CreaQuizAllenamento(): JSX.Element {
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

    setQuizAllenamento({
      ...quizAllenamento,
      ['numero_domande']: newNumberOfQuestions,
    });

    if (newNumberOfQuestions > domandeRisposte.length) {
      // Aggiungi nuove domande se il nuovo numero è maggiore
      const additionalQuestions = newNumberOfQuestions - domandeRisposte.length;
      const newQuestions = Array.from(
        { length: additionalQuestions },
        (): DomandaRisposta => ({
          quiz_ag: undefined,
          corretta: undefined,
          domanda: '',
          risposte: [
            {
              domanda_ag: undefined,
              risposta: '',
              corretta: undefined,
              selezionata: undefined,
            },
            {
              domanda_ag: undefined,
              risposta: '',
              corretta: undefined,
              selezionata: undefined,
            },
            {
              domanda_ag: undefined,
              risposta: '',
              corretta: undefined,
              selezionata: undefined,
            },
            {
              domanda_ag: undefined,
              risposta: '',
              corretta: undefined,
              selezionata: undefined,
            },
          ],
        })
      );
      setDomandeRisposte([...domandeRisposte, ...newQuestions]);
    } else if (newNumberOfQuestions < domandeRisposte.length) {
      // Rimuovi domande se il nuovo numero è minore
      const remainingQuestions = domandeRisposte.slice(0, newNumberOfQuestions);
      setDomandeRisposte(remainingQuestions);
    }
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
    newQuestionData[questionIndex].risposte.map((option, optionIndex) => {
      if (event.target.value === option.risposta) {
        newQuestionData[questionIndex].risposte[optionIndex].corretta = true;
      } else {
        newQuestionData[questionIndex].risposte[optionIndex].corretta = false;
      }
    });
    setDomandeRisposte(newQuestionData);
  };

  const newQuestion: DomandaRisposta = {
    quiz_ag: undefined,
    corretta: undefined,
    domanda: '',
    risposte: [
      {
        domanda_ag: undefined,
        risposta: '',
        corretta: undefined,
        selezionata: undefined,
      },
      {
        domanda_ag: undefined,
        risposta: '',
        corretta: undefined,
        selezionata: undefined,
      },
      {
        domanda_ag: undefined,
        risposta: '',
        corretta: undefined,
        selezionata: undefined,
      },
      {
        domanda_ag: undefined,
        risposta: '',
        corretta: undefined,
        selezionata: undefined,
      },
    ],
  };

  const handleAddQuestion = (): void => {
    setDomandeRisposte([...domandeRisposte, newQuestion]);
  };

  const handleQuizCreation = (): void => {
    const domaRisp = domandeRisposte.map((domanda, index) => ({
      [`domanda ${index}`]: domanda,
    }));
    const domRes: ResponseObject = {
      domandeRisposte: Object.assign({}, ...domaRisp),
      quizAllenamento: quizAllenamento,
    };
    const quizAllenamentoContol: QuizAllenamentoControl =
      new QuizAllenamentoControl();
    quizAllenamentoContol.inviaQuizAllenamento(domRes);
  };

  return (
    <div>
      <Typography variant="h4">Quiz Creation Page</Typography>
      <TextField
        label="Number of Questions"
        type="number"
        value={quizAllenamento.numero_domande}
        onChange={handleNumberOfQuestionsChange}
      />

      <Grid container spacing={2}>
        {domandeRisposte.map((question, questionIndex) => (
          <Grid item xs={12} key={questionIndex}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6">Question {questionIndex + 1}</Typography>
              <TextField
                label="Question"
                fullWidth
                value={question.domanda}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleQuestionChange(questionIndex, event)
                }
              />

              <FormControl component="fieldset">
                <RadioGroup
                  value={question.risposte.findIndex(
                    (option) => option.corretta === true
                  )}
                  onChange={(event) =>
                    handleCorrectAnswerChange(questionIndex, event)
                  }
                >
                  {question.risposte.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={option}
                      control={<Radio />}
                      label={
                        <TextField
                          label={`Option ${optionIndex + 1}`}
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
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="primary" onClick={handleAddQuestion}>
        Add Question
      </Button>

      <Button variant="contained" color="primary" onClick={handleQuizCreation}>
        Create Quiz
      </Button>
    </div>
  );
}

export default CreaQuizAllenamento;
