import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { ResponseObjectQP } from 'app/interfaces/utils/ResponseObjectQP';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'app/css/gestione_app/FormElements.css';
import { RispostaQuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/RispostaQuizPreliminare';
import QuizPreliminareControl from 'app/control/gestione_quiz_preliminare/QuizPreliminareControl';

function CompilaQuiz(): JSX.Element {
  const [data, setData] = useState<ResponseObjectQP>();

  const navigate = useNavigate();

  const location = useLocation();

  const quiz = location.state;

  useEffect(() => {
    setData(quiz);
  }, [quiz]);

  const [risposte, setRisposte] = useState<RispostaQuizPreliminare[]>([]);

  const handleUpdateAnswer = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: string
  ): void => {
    setData((prevData) => {
      if (prevData !== undefined) {
        return {
          quizPreliminare: prevData.quizPreliminare || {
            id: 0,
            numero_domande: 0,
            sage: false,
            punteggio_totale: 0,
            med: 0,
            paziente: '',
          },
          domandeRisposte: {
            ...prevData.domandeRisposte,
            [index]: {
              ...prevData.domandeRisposte[index],
              risposta: {
                ...prevData.domandeRisposte[index].risposta,
                risposta: event.target.value,
              },
            },
          },
        };
      } else {
        return prevData;
      }
    });
    console.log(data);
  };

  const handleSubmitAnswers = async (): Promise<void> => {
    if (data !== undefined) {
      const updatedRisposte: RispostaQuizPreliminare[] = Object.keys(
        data.domandeRisposte
      ).map((dom) => ({
        id: data.domandeRisposte[dom].risposta.id,
        domanda: data.domandeRisposte[dom].risposta.domanda,
        risposta: data.domandeRisposte[dom].risposta.risposta,
        paziente: data.domandeRisposte[dom].risposta.paziente,
      }));

      setRisposte(updatedRisposte);

      const quizPreliminareControl: QuizPreliminareControl =
        new QuizPreliminareControl();

      const risultato =
        quizPreliminareControl.aggiungiRispostePreliminare(risposte);

      if (await risultato) {
        navigate('/');
      }
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {data &&
        Object.keys(data.domandeRisposte).map((dom) => (
          <Card key={dom}>
            <CardContent>
              <Typography variant="h4" color="blueviolet" textAlign="center">
                {data.domandeRisposte[dom].domanda.domanda}
              </Typography>
              <TextField
                margin="normal"
                required
                sx={{ width: '20em' }}
                name="Risposta"
                label="Risposta"
                id="risposta"
                variant="outlined"
                color="secondary"
                onChange={(e) => {
                  handleUpdateAnswer(e, dom);
                }}
                value={data.domandeRisposte[dom].risposta.risposta || ''}
              />
            </CardContent>
          </Card>
        ))}
      <div className="riga">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleSubmitAnswers();
          }}
        >
          Conferma
        </Button>
      </div>
    </Box>
  );
}

export default CompilaQuiz;
