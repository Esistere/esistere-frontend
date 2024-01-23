import { Card, CardContent, Typography } from '@mui/material';
import PazienteControl from 'app/control/gestione_autenticazione/PazienteControl';
import QuizPreliminareControl from 'app/control/gestione_quiz_preliminare/QuizPreliminareControl';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import { ResponseObjectQP } from 'app/interfaces/utils/ResponseObjectQP';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import 'app/css/gestione_app/FormElements.css';

export interface QuizPreliminare {
  id?: number | undefined;
  numero_domande: number;
  sage: boolean;
  punteggio_totale: number;
  med: number;
  paziente: string;
}

function VisualizzaQuizPreliminare(): JSX.Element {
  const location = useLocation();
  const cf = location.state;

  const [data, setData] = React.useState<ResponseObjectQP>();
  const [paziente, setPaziente] = React.useState<Paziente>();

  const fetchData = async (): Promise<void> => {
    const quizPreliminareControl: QuizPreliminareControl =
      new QuizPreliminareControl();
    const response = quizPreliminareControl.visualizzaQuizPreliminareByPaz(cf);
    setData(await response);
    console.log(data);
    const paziente: PazienteControl = new PazienteControl();
    const response2 = paziente.fetchDatiPaziente(cf);
    setPaziente(await response2);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="riga"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Card
          sx={{
            width: '30em',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '5em',
            backgroundColor: '#cecece',
          }}
        >
          <CardContent sx={{ width: '90%', alignSelf: 'center' }}>
            <Typography variant="h4">Quiz preliminare</Typography>
            <Typography variant="h5">
              Paziente: {paziente?.nome} {paziente?.cognome}
            </Typography>
            {data?.domandeRisposte &&
              Object.keys(data.domandeRisposte).map((domande: string) => (
                <Card key={domande} sx={{ width: '25em' }}>
                  <CardContent sx={{ width: '22em' }}>
                    <Typography variant="h6">
                      Domanda: {data.domandeRisposte[domande]?.domanda}
                    </Typography>
                    <Typography variant="h6">
                      Risposta:{' '}
                      {data.domandeRisposte[domande]?.rispostaPaziente.risposta}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default VisualizzaQuizPreliminare;
