import QuizAllenamentoControl from 'app/control/gestione_quiz_allenamento/QuizAllenamentoControl';
import { ResponseObject } from 'app/interfaces/gestione_autenticazione/utils/ResponseObject';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Pulsante from '../gestione_app/Pulsante';
import Caricamento from '../gestione_app/Caricamento';
import CardDomanda from './CardDomanda';
import SalvaRisposte from './SalvaRisposte';
import { Alert, Snackbar, Typography } from '@mui/material';

let open = false;

let corretta = 0;

function CompilaQuizAllenamento(): JSX.Element {
  const location = useLocation();
  const id = location.state;
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<ResponseObject>();
  const [isLoading, setIsLoading] = useState(true);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [disa] = useState<boolean>(false);
  const salvaRis = new SalvaRisposte();
  const [numerello, setNumerello] = useState<number>(0);

  const fetchData = async (): Promise<void> => {
    try {
      if (isLoading) {
        const quizAllenamentoControl = new QuizAllenamentoControl();
        const data: ResponseObject =
          await quizAllenamentoControl.visualizzaQuizAllenamento(id);
        setQuiz(data);
        setIsLoading(false);
        setGameOver(false);
        console.log(data);
      }
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
      open = true;
    }
  };

  const nextQuestion = (): void => {
    console.log(corretta, salvaRis.getLastCorretta());
    if (salvaRis.getLastCorretta() === true) {
      corretta = corretta + 1;
      console.log(corretta);
    }
    setNumerello(numerello + 1);
    salvaRis.setLastCorretta(false);
    salvaRis.salvaRisposte();
    salvaRis.salvaDomanda();
    salvaRis.reset();
  };

  const prossima = (
    <Pulsante
      nome="prossima"
      testo="Prossima Domanda"
      tipologia="chiaro"
      onClick={nextQuestion}
      disabled={disa}
    />
  );

  const finishQuiz = async (): Promise<void> => {
    nextQuestion();
    const c = corretta;
    corretta = 0;
    console.log('CORRETTA', corretta, c);
    try {
      console.log(quiz);
      setTimeout(async () => {
        navigate('/caregiver/visualizza_quiz_allenamento');
      }, 1500);
      await salvaRis.finishQuiz({
        id: Number(quiz?.quizAllenamento.id),
        cg_fam: Number(quiz?.quizAllenamento.cg_fam),
        numero_domande: Number(quiz?.quizAllenamento.numero_domande),
        punteggio_totale: c,
      });
    } catch (error) {
      console.error('Errore durante il completamento del quiz:', error);
    }
  };

  const termina = (
    <Pulsante
      nome="termina"
      testo="Termina Quiz"
      tipologia="chiaro"
      onClick={finishQuiz}
    />
  );

  const startTrivia = async (): Promise<void> => {
    await fetchData();
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      navigate('/');
    }

    open = false;
    navigate('/');
  };

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleClose}
        style={{ marginTop: '47%' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Errore nel recupero dei dati
        </Alert>
      </Snackbar>
      {gameOver === true && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: '15em',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            style={{ textAlign: 'center', color: 'blueviolet' }}
          >
            Clicca Avvia Quiz non appena ti sentirai pronto <br />
          </Typography>
          <div
            style={{
              width: '10em',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Pulsante
              nome="avvia"
              testo="Avvia Quiz"
              tipologia="scuro"
              onClick={startTrivia}
              style={{ margin: 'auto', maxWidth: '7em' }}
            />
          </div>
        </div>
      )}
      {gameOver === false && isLoading ? <Caricamento /> : null}
      {!isLoading && gameOver === false && (
        <CardDomanda
          domRis={
            quiz?.domandeRisposte ? Object.values(quiz.domandeRisposte) : []
          }
          salvaRisposte={salvaRis}
          mostra={numerello}
        />
      )}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {gameOver === false &&
          !isLoading &&
          numerello < Number(quiz?.quizAllenamento?.numero_domande) - 1 &&
          prossima}
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {numerello === Number(quiz?.quizAllenamento?.numero_domande) - 1 &&
          termina}
      </div>
    </div>
  );
}

export default CompilaQuizAllenamento;
