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
import { useNavigate } from 'react-router-dom';
import 'app/css/gestione_app/FormElements.css';
import QuizPreliminareControl from 'app/control/gestione_quiz_preliminare/QuizPreliminareControl';
import PazienteControl from 'app/control/gestione_autenticazione/PazienteControl';

function CompilaQuiz(): JSX.Element {
  const [data, setData] = useState<ResponseObjectQP>();

  const navigate = useNavigate();

  const [avvia, setAvvia] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    const pazienteControl: PazienteControl = new PazienteControl();
    const cf = await pazienteControl.fetchCodicePaziente(
      Number(localStorage.getItem('id'))
    );
    console.log(cf);
    const quizPreliminareControl: QuizPreliminareControl =
      new QuizPreliminareControl();
    const risultato =
      await quizPreliminareControl.visualizzaQuizPreliminareByPaz(cf);
    setData(risultato);
    setAvvia(false);
  };

  useEffect(() => {
    if (avvia) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avvia]);

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
              rispostaPaziente: {
                ...prevData.domandeRisposte[index].rispostaPaziente,
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
      const updatedRisposte = Object.values(data.domandeRisposte).map(
        (item) => item.rispostaPaziente
      );
      console.log(updatedRisposte);

      const quizPreliminareControl: QuizPreliminareControl =
        new QuizPreliminareControl();
      quizPreliminareControl.aggiungiRispostePreliminare(updatedRisposte);
      navigate('/');
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {data &&
        Object.keys(data.domandeRisposte).map((dom) => (
          <Card key={dom}>
            <CardContent>
              <Typography variant="h4" color="blueviolet" textAlign="center">
                {data.domandeRisposte[dom].domanda}
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
                value={
                  data.domandeRisposte[dom].rispostaPaziente.risposta ?? ''
                }
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
