import QuizAllenamentoControl from 'app/control/gestione_quiz_allenamento/QuizAllenamentoControl';
import { ResponseObject } from 'app/interfaces/gestione_autenticazione/utils/ResponseObject';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Pulsante from '../gestione_app/Pulsante';
import Caricamento from '../gestione_app/Caricamento';
import CardDomanda from './CardDomanda';
import SalvaRisposte from './SalvaRisposte';
import { Typography } from '@mui/material';

function CompilaQuizAllenamento(): JSX.Element {
  const location = useLocation();
  const id = location.state;
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<ResponseObject>();
  const [isLoading, setIsLoading] = useState(true);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [corretta, setCorretta] = useState<number>(0);
  const [disa] = useState<boolean>(false);
  const salvaRis = new SalvaRisposte();
  const [numerello, setNumerello] = useState<number>(0);

  const fetchData = async (): Promise<void> => {
    if (isLoading) {
      const quizAllenamentoControl = new QuizAllenamentoControl();
      const data: ResponseObject =
        await quizAllenamentoControl.visualizzaQuizAllenamento(id);
      setQuiz(data);
      setIsLoading(false);
      setGameOver(false);
      console.log(data);
    }
  };

  const nextQuestion = (): void => {
    if (salvaRis.getLastCorretta() === true) {
      setCorretta(corretta + 1);
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
    const risposta = salvaRis.finishQuiz({
      id: Number(quiz?.quizAllenamento.id),
      numero_domande: Number(quiz?.quizAllenamento.numero_domande),
      punteggio_totale: corretta,
      cg_fam: Number(quiz?.quizAllenamento.cg_fam),
    });
    if (await risposta) {
      navigate('/');
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

  return (
    <div>
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
